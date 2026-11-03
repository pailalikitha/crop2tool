import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogOut, Menu, X, Wheat, ShoppingCart, Users } from 'lucide-react';
import { useState } from 'react';
import { User as UserType } from '../types';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
  children: ReactNode;
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

const Layout = ({ children, user, setUser }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 backdrop-blur-md bg-white/90 dark:bg-gray-800/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-lg">
                <Wheat className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Crop2Cart</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  isActive('/') ? 'text-primary' : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                }`}
              >
                Home
              </Link>
              
              {!user && (
                <>
                  <Link
                    to="/farmer/login"
                    className={`text-sm font-medium transition-colors ${
                      isActive('/farmer/login') ? 'text-primary' : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                    }`}
                  >
                    Farmer Login
                  </Link>
                  <Link
                    to="/vendor/login"
                    className={`text-sm font-medium transition-colors ${
                      isActive('/vendor/login') ? 'text-primary' : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                    }`}
                  >
                    Vendor Login
                  </Link>
                </>
              )}

              {user && (
                <>
                  {user.role === 'farmer' && (
                    <>
                      <Link
                        to="/farmer/dashboard"
                        className={`text-sm font-medium transition-colors ${
                          isActive('/farmer/dashboard') ? 'text-primary' : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                        }`}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/farmer/upload-crop"
                        className={`text-sm font-medium transition-colors ${
                          isActive('/farmer/upload-crop') ? 'text-primary' : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                        }`}
                      >
                        Upload Crop
                      </Link>
                    </>
                  )}
                  
                  {user.role === 'vendor' && (
                    <Link
                      to="/vendor/dashboard"
                      className={`text-sm font-medium transition-colors ${
                        isActive('/vendor/dashboard') ? 'text-primary' : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                      }`}
                    >
                      Dashboard
                    </Link>
                  )}

                  {user.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      className={`text-sm font-medium transition-colors ${
                        isActive('/admin/dashboard') ? 'text-primary' : 'text-gray-700 dark:text-gray-300 hover:text-primary'
                      }`}
                    >
                      Admin Panel
                    </Link>
                  )}

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{user.name}</span>
                      <span className="badge badge-info">{user.role}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
              
              {/* Theme Toggle */}
              <ThemeToggle />
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              {!user && (
                <>
                  <Link
                    to="/farmer/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Farmer Login
                  </Link>
                  <Link
                    to="/vendor/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Vendor Login
                  </Link>
                </>
              )}

              {user && (
                <>
                  {user.role === 'farmer' && (
                    <>
                      <Link
                        to="/farmer/dashboard"
                        className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/farmer/upload-crop"
                        className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Upload Crop
                      </Link>
                    </>
                  )}
                  
                  {user.role === 'vendor' && (
                    <Link
                      to="/vendor/dashboard"
                      className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}

                  {user.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}

                  <div className="border-t border-gray-200 pt-4 pb-3">
                    <div className="flex items-center px-3">
                      <div className="flex-shrink-0">
                        <User className="h-8 w-8 text-gray-500" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.role}</div>
                      </div>
                    </div>
                    <div className="mt-3 px-2">
                      <button
                        onClick={handleLogout}
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md w-full text-left"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary p-2 rounded-lg">
                  <Wheat className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">Crop2Cart</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Connecting farmers with vendors for better prices and transparent transactions.
              </p>
            </div>
            
            <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                For Farmers
              </h3>
              <ul className="space-y-2">
                <li><Link to="/farmer/login" className="text-gray-600 dark:text-gray-300 hover:text-primary">Login</Link></li>
              </ul>
            </div>
            
            <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                For Vendors
              </h3>
              <ul className="space-y-2">
                <li><Link to="/vendor/login" className="text-gray-600 dark:text-gray-300 hover:text-primary">Login</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © 2024 Crop2Cart. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
