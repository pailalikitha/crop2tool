import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Plus, 
  TrendingUp, 
  Wallet, 
  Package, 
  Star, 
  ArrowUpRight, 
  ArrowDownRight,
  Eye,
  CheckCircle,
  Clock,
  DollarSign,
  MessageCircle
} from 'lucide-react';
import { Farmer } from '../types';
import StatisticsComponent from '../components/Statistics';
import FarmerOffersReceived from '../components/FarmerOffersReceived';
import databaseService, { Crop } from '../utils/databaseService';

interface FarmerDashboardProps {
  user: Farmer | null;
}

const FarmerDashboard = ({ user }: FarmerDashboardProps) => {
  const [farmerCrops, setFarmerCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      const crops = databaseService.getCropsByFarmer(user.id);
      setFarmerCrops(crops);
      setLoading(false);
    }
  }, [user?.id]);

  // Get active crops count
  const activeCropsCount = farmerCrops.filter(crop => crop.status === 'active').length;

  const recentOffers = [
    {
      id: '1',
      vendorName: 'Green Valley Traders',
      cropName: 'Wheat',
      offeredPrice: 2500,
      rating: 4.8,
      paymentMode: 'Instant',
      deliveryOption: 'Pickup'
    },
    {
      id: '2',
      vendorName: 'Farm Fresh Co.',
      cropName: 'Rice',
      offeredPrice: 3200,
      rating: 4.6,
      paymentMode: '3 Days',
      deliveryOption: 'Farmer Delivers'
    },
    {
      id: '3',
      vendorName: 'Agri Solutions',
      cropName: 'Tomato',
      offeredPrice: 45,
      rating: 4.9,
      paymentMode: 'Instant',
      deliveryOption: 'Pickup'
    }
  ];

  const stats = [
    {
      title: 'Total Earnings',
      value: `₹${user?.totalEarnings?.toLocaleString() || '0'}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign
    },
    {
      title: 'Active Crops',
      value: activeCropsCount.toString(),
      change: '+1',
      changeType: 'positive',
      icon: Package
    },
    {
      title: 'Pending Payments',
      value: `₹${user?.pendingPayments?.toLocaleString() || '0'}`,
      change: '-5.2%',
      changeType: 'negative',
      icon: Clock
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      changeType: 'positive',
      icon: Star
    }
  ];

  return (
    <div className="space-y-8 bg-gray-900 dark:bg-gray-900 min-h-screen p-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-lg opacity-90">
          Ready to sell your crops at the best prices? Let's get started!
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/farmer/upload-crop"
          className="card hover:shadow-xl transition-all duration-200 group cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-primary p-3 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upload New Crop</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">List your crops for sale</p>
            </div>
          </div>
        </Link>

        <Link
          to="/farmer/price-comparison"
          className="card hover:shadow-xl transition-all duration-200 group cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-secondary p-3 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <TrendingUp className="h-6 w-6 text-gray-800" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Check Prices</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Compare vendor offers</p>
            </div>
          </div>
        </Link>

        <div className="card hover:shadow-xl transition-all duration-200 group cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="bg-accent p-3 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Earnings Wallet</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Manage your payments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <stat.icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Crops */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Crops</h2>
            <Link
              to="/farmer/upload-crop"
              className="text-primary hover:text-accent font-medium text-sm"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Loading crops...</p>
              </div>
            ) : farmerCrops.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-4">No crops uploaded yet</p>
                <Link
                  to="/farmer/upload-crop"
                  className="btn-primary inline-flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Your First Crop
                </Link>
              </div>
            ) : (
              farmerCrops.map((crop) => (
                <div key={crop.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{crop.cropName}</h3>
                    <span className={`badge ${
                      crop.status === 'active' ? 'badge-success' : 
                      crop.status === 'sold' ? 'badge-info' : 'badge-warning'
                    }`}>
                      {crop.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                    <div>Quantity: {crop.quantity} {crop.unit}</div>
                    <div>Quality: {crop.quality}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Expected Price: </span>
                      <span className="font-semibold text-primary">
                        ₹{crop.expectedPrice}/{crop.unit === 'quintal' ? 'qtl' : 'kg'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{crop.offers.length} offers</span>
                      {crop.status === 'active' && (
                        <Link
                          to={`/farmer/price-comparison/${crop.id}`}
                          className="text-primary hover:text-accent"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Offers */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Offers</h2>
            <Link
              to="/farmer/offers"
              className="text-primary hover:text-accent font-medium text-sm"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentOffers.map((offer) => (
              <div key={offer.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{offer.vendorName}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{offer.rating}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Offering for: <span className="font-medium">{offer.cropName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-primary">
                    ₹{offer.offeredPrice}/{offer.cropName === 'Tomato' ? 'kg' : 'qtl'}
                  </div>
                  <div className="text-right text-sm">
                    <div className="text-gray-600 dark:text-gray-300">{offer.paymentMode}</div>
                    <div className="text-gray-600 dark:text-gray-300">{offer.deliveryOption}</div>
                  </div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="flex-1 btn-primary text-sm py-2">
                    Accept Offer
                  </button>
                  <button className="flex-1 btn-outline text-sm py-2">
                    Negotiate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Offers Received */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <MessageCircle className="h-5 w-5 mr-2 text-primary" />
          Offers Received on Your Crops
        </h2>
        <FarmerOffersReceived farmerId={user?.id || 'farmer1'} />
      </div>

      {/* Statistics */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Your Sales Statistics</h2>
        <StatisticsComponent userId={user?.id || 'farmer1'} userType="farmer" />
      </div>

      {/* Market Insights */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Market Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Wheat Prices</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹2,450/qtl</p>
            <p className="text-sm text-green-600 dark:text-green-400">+5.2% this week</p>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Rice Prices</h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹3,200/qtl</p>
            <p className="text-sm text-blue-600 dark:text-blue-400">+2.1% this week</p>
          </div>
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Tomato Prices</h3>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">₹45/kg</p>
            <p className="text-sm text-orange-600 dark:text-orange-400">-1.8% this week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
