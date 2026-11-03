import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import ConditionalHomePage from './components/ConditionalHomePage';
import FarmerLogin from './pages/FarmerLogin';
import FarmerDashboard from './pages/FarmerDashboard';
import UploadCrop from './pages/UploadCrop';
import PriceComparison from './pages/PriceComparison';
import VendorLogin from './pages/VendorLogin';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <Layout user={user} setUser={setUser}>
            <Routes>
              <Route path="/" element={<ConditionalHomePage user={user} setUser={setUser} />} />
              
              {/* Farmer Routes */}
              <Route path="/farmer/login" element={<FarmerLogin setUser={setUser} />} />
              <Route path="/farmer/dashboard" element={<FarmerDashboard user={user} />} />
              <Route path="/farmer/upload-crop" element={<UploadCrop user={user} />} />
              <Route path="/farmer/price-comparison/:cropId" element={<PriceComparison user={user} />} />
              
              {/* Vendor Routes */}
              <Route path="/vendor/login" element={<VendorLogin setUser={setUser} />} />
              <Route path="/vendor/dashboard" element={<VendorDashboard user={user} />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard user={user} />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
