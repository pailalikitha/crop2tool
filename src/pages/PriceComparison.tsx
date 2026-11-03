import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Truck, 
  Clock, 
  DollarSign, 
  Filter,
  SortAsc,
  SortDesc,
  CheckCircle,
  MessageCircle,
  TrendingUp
} from 'lucide-react';
import { Farmer } from '../types';

interface PriceComparisonProps {
  user: Farmer | null;
}

interface VendorOffer {
  id: string;
  vendorName: string;
  businessName: string;
  rating: number;
  totalRatings: number;
  offeredPrice: number;
  paymentMode: 'Instant' | '3 Days' | '7 Days';
  deliveryOption: 'Pickup' | 'Farmer Delivers';
  message: string;
  location: string;
  isVerified: boolean;
  responseTime: string;
  totalTransactions: number;
  isBestOffer: boolean;
}

const PriceComparison = ({ user }: PriceComparisonProps) => {
  const { cropId } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'payment'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterPayment, setFilterPayment] = useState<string>('all');
  const [filterDelivery, setFilterDelivery] = useState<string>('all');

  // Mock data for demonstration
  const cropDetails = {
    id: cropId || '1',
    name: 'Wheat',
    quantity: 50,
    unit: 'quintal',
    quality: 'Grade A',
    expectedPrice: 2500
  };

  const vendorOffers: VendorOffer[] = [
    {
      id: '1',
      vendorName: 'Green Valley Traders',
      businessName: 'Green Valley Agricultural Trading Co.',
      rating: 4.8,
      totalRatings: 124,
      offeredPrice: 2650,
      paymentMode: 'Instant',
      deliveryOption: 'Pickup',
      message: 'We offer the best prices for Grade A wheat. Quick payment guaranteed.',
      location: 'Ludhiana, Punjab',
      isVerified: true,
      responseTime: '2 hours',
      totalTransactions: 450,
      isBestOffer: true
    },
    {
      id: '2',
      vendorName: 'Farm Fresh Co.',
      businessName: 'Farm Fresh Commodities Ltd.',
      rating: 4.6,
      totalRatings: 89,
      offeredPrice: 2580,
      paymentMode: '3 Days',
      deliveryOption: 'Farmer Delivers',
      message: 'Looking for quality wheat. We can arrange pickup from your location.',
      location: 'Amritsar, Punjab',
      isVerified: true,
      responseTime: '1 hour',
      totalTransactions: 320,
      isBestOffer: false
    },
    {
      id: '3',
      vendorName: 'Agri Solutions',
      businessName: 'Agri Solutions Pvt Ltd',
      rating: 4.9,
      totalRatings: 156,
      offeredPrice: 2520,
      paymentMode: 'Instant',
      deliveryOption: 'Pickup',
      message: 'Premium buyer for organic and Grade A crops. Immediate payment available.',
      location: 'Chandigarh, Punjab',
      isVerified: true,
      responseTime: '30 mins',
      totalTransactions: 680,
      isBestOffer: false
    },
    {
      id: '4',
      vendorName: 'Crop Masters',
      businessName: 'Crop Masters Trading',
      rating: 4.4,
      totalRatings: 67,
      offeredPrice: 2480,
      paymentMode: '7 Days',
      deliveryOption: 'Pickup',
      message: 'Reliable buyer with good payment history. Can negotiate on bulk orders.',
      location: 'Jalandhar, Punjab',
      isVerified: true,
      responseTime: '4 hours',
      totalTransactions: 180,
      isBestOffer: false
    },
    {
      id: '5',
      vendorName: 'Golden Harvest',
      businessName: 'Golden Harvest Enterprises',
      rating: 4.7,
      totalRatings: 98,
      offeredPrice: 2600,
      paymentMode: 'Instant',
      deliveryOption: 'Farmer Delivers',
      message: 'We pay premium prices for quality crops. Quick settlement guaranteed.',
      location: 'Patiala, Punjab',
      isVerified: true,
      responseTime: '1 hour',
      totalTransactions: 290,
      isBestOffer: false
    }
  ];

  const filteredOffers = vendorOffers
    .filter(offer => {
      if (filterPayment !== 'all' && offer.paymentMode !== filterPayment) return false;
      if (filterDelivery !== 'all' && offer.deliveryOption !== filterDelivery) return false;
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'price':
          comparison = a.offeredPrice - b.offeredPrice;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'payment':
          const paymentOrder = { 'Instant': 3, '3 Days': 2, '7 Days': 1 };
          comparison = paymentOrder[a.paymentMode] - paymentOrder[b.paymentMode];
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const bestOffer = vendorOffers.find(offer => offer.isBestOffer);
  const averagePrice = vendorOffers.reduce((sum, offer) => sum + offer.offeredPrice, 0) / vendorOffers.length;

  const handleAcceptOffer = (offerId: string) => {
    // Navigate to sell confirmation page
    navigate(`/farmer/sell-confirmation/${cropId}/${offerId}`);
  };

  const handleNegotiate = (offerId: string) => {
    // Open negotiation modal or navigate to chat
    console.log('Negotiate with offer:', offerId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/farmer/dashboard')}
            className="inline-flex items-center text-primary hover:text-accent mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Price Comparison</h1>
          <p className="text-gray-600 mt-2">
            Compare offers for your {cropDetails.name} from verified vendors
          </p>
        </div>
      </div>

      {/* Crop Summary */}
      <div className="card bg-gradient-to-r from-primary to-accent text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{cropDetails.name}</h2>
            <div className="flex items-center space-x-6 text-lg">
              <span>Quantity: {cropDetails.quantity} {cropDetails.unit}</span>
              <span>Quality: {cropDetails.quality}</span>
              {cropDetails.expectedPrice && (
                <span>Expected: ₹{cropDetails.expectedPrice}/{cropDetails.unit === 'quintal' ? 'qtl' : 'kg'}</span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">₹{averagePrice.toFixed(0)}</div>
            <div className="text-sm opacity-90">Average Price</div>
          </div>
        </div>
      </div>

      {/* Best Offer Highlight */}
      {bestOffer && (
        <div className="card border-2 border-green-500 bg-green-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 text-white p-2 rounded-full">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800">Best Offer!</h3>
                <p className="text-green-600">
                  {bestOffer.vendorName} - ₹{bestOffer.offeredPrice}/{cropDetails.unit === 'quintal' ? 'qtl' : 'kg'}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleAcceptOffer(bestOffer.id)}
              className="btn-primary bg-green-600 hover:bg-green-700"
            >
              Accept Best Offer
            </button>
          </div>
        </div>
      )}

      {/* Filters and Sorting */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-wrap items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="all">All Payment Modes</option>
              <option value="Instant">Instant Payment</option>
              <option value="3 Days">3 Days</option>
              <option value="7 Days">7 Days</option>
            </select>

            <select
              value={filterDelivery}
              onChange={(e) => setFilterDelivery(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="all">All Delivery Options</option>
              <option value="Pickup">Vendor Pickup</option>
              <option value="Farmer Delivers">Farmer Delivers</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'payment')}
              className="text-sm border border-gray-300 rounded-md px-3 py-1"
            >
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="payment">Payment Terms</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Vendor Offers */}
      <div className="space-y-4">
        {filteredOffers.map((offer) => (
          <div
            key={offer.id}
            className={`card ${offer.isBestOffer ? 'ring-2 ring-green-500 bg-green-50' : ''}`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{offer.vendorName}</h3>
                    <p className="text-sm text-gray-600">{offer.businessName}</p>
                  </div>
                  {offer.isVerified && (
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-green-600 font-medium">Verified</span>
                    </div>
                  )}
                  {offer.isBestOffer && (
                    <span className="badge badge-success">Best Offer</span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{offer.rating}</span>
                    <span className="text-sm text-gray-500">({offer.totalRatings} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Responds in {offer.responseTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{offer.location}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{offer.message}</p>

                <div className="flex flex-wrap items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Payment: {offer.paymentMode}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Truck className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Delivery: {offer.deliveryOption}</span>
                  </div>
                  <span className="text-gray-600">{offer.totalTransactions} transactions</span>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-3">
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    ₹{offer.offeredPrice}
                  </div>
                  <div className="text-sm text-gray-600">
                    per {cropDetails.unit === 'quintal' ? 'qtl' : 'kg'}
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    Total: ₹{(offer.offeredPrice * cropDetails.quantity).toLocaleString()}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleNegotiate(offer.id)}
                    className="btn-outline text-sm px-4 py-2"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Negotiate
                  </button>
                  <button
                    onClick={() => handleAcceptOffer(offer.id)}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    Accept Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOffers.length === 0 && (
        <div className="card text-center py-12">
          <div className="text-gray-500">
            <Filter className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No offers match your filters</h3>
            <p className="text-sm">Try adjusting your filter criteria to see more offers.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceComparison;
