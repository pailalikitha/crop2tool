import { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign, 
  Package, 
  User,
  MessageCircle,
  TrendingUp
} from 'lucide-react';
import databaseService from '../utils/databaseService';
import { Offer, Crop } from '../utils/databaseService';

interface OffersManagerProps {
  userId: string;
  userType: 'farmer' | 'vendor';
}

const OffersManager = ({ userId, userType }: OffersManagerProps) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  useEffect(() => {
    loadData();
  }, [userId, userType]);

  const loadData = () => {
    try {
      if (userType === 'farmer') {
        const farmerOffers = databaseService.getOffersForFarmer(userId);
        setOffers(farmerOffers);
      } else {
        const vendorOffers = databaseService.getOffersForVendor(userId);
        setOffers(vendorOffers);
      }
      
      const allCrops = databaseService.getAllActiveCrops();
      setCrops(allCrops);
    } catch (error) {
      console.error('Error loading offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOfferAction = (offerId: string, action: 'accept' | 'reject') => {
    const success = databaseService.updateOfferStatus(offerId, action === 'accept' ? 'accepted' : 'rejected');
    if (success) {
      loadData(); // Reload data to reflect changes
      setSelectedOffer(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'expired': return 'text-gray-600 bg-gray-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'expired': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  const pendingOffers = offers.filter(o => o.status === 'pending');
  const acceptedOffers = offers.filter(o => o.status === 'accepted');
  const rejectedOffers = offers.filter(o => o.status === 'rejected');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Offers</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingOffers.length}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Accepted</p>
              <p className="text-2xl font-bold text-green-600">{acceptedOffers.length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{rejectedOffers.length}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {userType === 'farmer' ? 'Offers on Your Crops' : 'Your Offers to Farmers'}
        </h3>
        
        {offers.length === 0 ? (
          <div className="card text-center py-8">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No offers available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {offers.map((offer) => {
              const crop = crops.find(c => c.id === offer.cropId);
              return (
                <div key={offer.id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(offer.status)}`}>
                          {getStatusIcon(offer.status)}
                          <span className="capitalize">{offer.status}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(offer.createdAt)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {crop?.cropName} - {crop?.quality}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {userType === 'farmer' 
                              ? `From: ${offer.vendorBusiness}` 
                              : `To: ${crop?.farmerName}`
                            }
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">
                            {formatCurrency(offer.totalAmount)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {offer.quantity} {crop?.unit} @ {formatCurrency(offer.pricePerUnit)}/{crop?.unit}
                          </p>
                        </div>
                      </div>
                      
                      {offer.message && (
                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                          <div className="flex items-start space-x-2">
                            <MessageCircle className="h-4 w-4 text-gray-400 mt-0.5" />
                            <p className="text-sm text-gray-700">{offer.message}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {offer.status === 'pending' && userType === 'farmer' && (
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleOfferAction(offer.id, 'accept')}
                          className="btn-primary text-sm px-3 py-1"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleOfferAction(offer.id, 'reject')}
                          className="btn-outline text-sm px-3 py-1"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersManager;


