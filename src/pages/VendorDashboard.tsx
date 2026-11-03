import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Package, 
  TrendingUp, 
  Star, 
  ArrowUpRight, 
  ArrowDownRight,
  Eye,
  MessageCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Users
} from 'lucide-react';
import { Vendor } from '../types';
import StatisticsComponent from '../components/Statistics';
import CropBrowser from '../components/CropBrowser';
import OffersManager from '../components/OffersManager';

interface VendorDashboardProps {
  user: Vendor | null;
}

const VendorDashboard = ({ user }: VendorDashboardProps) => {
  // Mock data for demonstration
  const recentOffers = [
    {
      id: '1',
      farmerName: 'Rajesh Kumar',
      cropName: 'Wheat',
      offeredPrice: 2650,
      status: 'pending',
      createdAt: '2 hours ago'
    },
    {
      id: '2',
      farmerName: 'Suresh Singh',
      cropName: 'Rice',
      offeredPrice: 3200,
      status: 'accepted',
      createdAt: '1 day ago'
    },
    {
      id: '3',
      farmerName: 'Amit Sharma',
      cropName: 'Tomato',
      offeredPrice: 45,
      status: 'negotiating',
      createdAt: '3 days ago'
    }
  ];

  const topFarmers = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      rating: 4.9,
      location: 'Punjab',
      specialty: 'Wheat & Rice'
    },
    {
      id: '2',
      name: 'Suresh Singh',
      rating: 4.8,
      location: 'Amritsar',
      specialty: 'Organic Crops'
    },
    {
      id: '3',
      name: 'Amit Sharma',
      rating: 4.7,
      location: 'Chandigarh',
      specialty: 'Vegetables'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.name}! 🛒
          </h1>
          <p className="text-lg text-gray-300">
            Find quality crops from verified farmers and grow your business.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/vendor/browse-crops"
            className="card hover:shadow-xl transition-all duration-200 group cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-primary p-3 rounded-full group-hover:bg-accent transition-colors">
                <Search className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Browse Crops</h3>
                <p className="text-gray-600 text-sm">Find crops to purchase</p>
              </div>
            </div>
          </Link>

          <Link
            to="/vendor/offers"
            className="card hover:shadow-xl transition-all duration-200 group cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-accent p-3 rounded-full group-hover:bg-primary transition-colors">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">My Offers</h3>
                <p className="text-gray-600 text-sm">Track your offers</p>
              </div>
            </div>
          </Link>

          <Link
            to="/vendor/analytics"
            className="card hover:shadow-xl transition-all duration-200 group cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 p-3 rounded-full group-hover:bg-green-700 transition-colors">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
                <p className="text-gray-600 text-sm">View insights</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Offers Summary */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-primary" />
            Your Recent Offers
          </h2>
          <OffersManager userId={user?.id || 'vendor1'} userType="vendor" />
        </div>

        {/* Browse Crops */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Search className="h-5 w-5 mr-2 text-primary" />
            Browse Available Crops
          </h2>
          <CropBrowser vendorId={user?.id || 'vendor1'} />
        </div>

        {/* Statistics */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Purchase Statistics</h2>
          <StatisticsComponent userId={user?.id || 'vendor1'} userType="vendor" />
        </div>

        {/* Top Farmers */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Farmers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topFarmers.map((farmer) => (
              <div key={farmer.id} className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900">{farmer.name}</h3>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{farmer.rating}</span>
                </div>
                <p className="text-sm text-gray-600">{farmer.specialty} • {farmer.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;