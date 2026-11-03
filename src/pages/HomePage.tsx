import { Link } from 'react-router-dom';
import { ArrowRight, Shield, TrendingUp, Users, Star, CheckCircle } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="space-y-16 bg-gray-900 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="hero-section text-center py-16 rounded-2xl text-white relative overflow-hidden"
               style={{
                 backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.1), rgba(30, 41, 59, 0.1)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundAttachment: 'fixed'
               }}>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            🌾 Crop2Cart
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Connect Farmers with Vendors for Better Prices
          </p>
          <p className="text-lg mb-12 opacity-80">
            Transparent marketplace where farmers get the best prices for their crops 
            and vendors find quality produce directly from the source.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/farmer/login"
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center"
            >
              Login as Farmer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/vendor/login"
              className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-lg font-medium transition-colors duration-200 inline-flex items-center justify-center"
            >
              Login as Vendor
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Crop2Cart?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We provide a transparent, efficient platform that benefits both farmers and vendors
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="card text-center">
            <div className="bg-green-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Direct Trade
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Connect directly with farmers and vendors, eliminating middlemen for better prices.
            </p>
          </div>
          
          <div className="card text-center">
            <div className="bg-blue-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Transparent Pricing
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Compare offers from multiple vendors and get the best price for your crops with our transparent pricing system.
            </p>
          </div>
          
          <div className="card text-center">
            <div className="bg-yellow-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Quality Assurance
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Verified farmers and quality-checked produce ensure you get the best products.
            </p>
          </div>
          
          <div className="card text-center">
            <div className="bg-purple-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Secure Payments
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Safe and secure payment processing with escrow protection for all transactions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-section text-center py-16 rounded-2xl text-white relative overflow-hidden"
               style={{
                 backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.1), rgba(30, 41, 59, 0.1)), url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundAttachment: 'fixed'
               }}>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of farmers and vendors who trust Crop2Cart for their agricultural trade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/farmer/login"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
            >
              Start as Farmer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/vendor/login"
              className="btn-outline text-lg px-8 py-4 inline-flex items-center justify-center"
            >
              Start as Vendor
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Impact
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Numbers that speak for our success
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="card text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">500+</div>
            <div className="text-gray-600 dark:text-gray-300">Active Farmers</div>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">200+</div>
            <div className="text-gray-600 dark:text-gray-300">Verified Vendors</div>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">₹50M+</div>
            <div className="text-gray-600 dark:text-gray-300">Total Transactions</div>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">4.8★</div>
            <div className="text-gray-600 dark:text-gray-300">Average Rating</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Real stories from real farmers and vendors
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              "Crop2Cart helped me get 30% better prices for my wheat. The platform is easy to use and the vendors are reliable."
            </p>
            <div className="text-gray-900 dark:text-white font-semibold">Rajesh Kumar</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">Farmer, Punjab</div>
          </div>
          
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              "As a vendor, I can find quality produce directly from farmers. The quality assurance and transparent pricing make it perfect."
            </p>
            <div className="text-gray-900 dark:text-white font-semibold">Green Valley Trading</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">Vendor, Delhi</div>
          </div>
          
          <div className="card">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              "The secure payment system and escrow protection give me peace of mind. Highly recommended for all agricultural trade."
            </p>
            <div className="text-gray-900 dark:text-white font-semibold">Priya Sharma</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">Farmer, Haryana</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;