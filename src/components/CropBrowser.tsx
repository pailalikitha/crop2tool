import { useState, useEffect } from 'react';
import { 
  Search, 
  Package, 
  User, 
  MapPin, 
  Star, 
  MessageCircle,
  TrendingUp,
  Filter
} from 'lucide-react';
import databaseService from '../utils/databaseService';
import { Crop, Offer } from '../utils/databaseService';

interface CropBrowserProps {
  vendorId: string;
}

const CropBrowser = ({ vendorId }: CropBrowserProps) => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [filteredCrops, setFilteredCrops] = useState<Crop[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerData, setOfferData] = useState({
    pricePerUnit: '',
    quantity: '',
    message: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCrops();
  }, [vendorId]);

  useEffect(() => {
    filterCrops();
  }, [crops, searchQuery]);

  const loadCrops = () => {
    try {
      const availableCrops = databaseService.getAvailableCropsForVendor(vendorId);
      setCrops(availableCrops);
    } catch (error) {
      console.error('Error loading crops:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCrops = () => {
    if (!searchQuery.trim()) {
      setFilteredCrops(crops);
      return;
    }

    const filtered = crops.filter(crop =>
      crop.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.quality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCrops(filtered);
  };

  const handleMakeOffer = (crop: Crop) => {
    setSelectedCrop(crop);
    setOfferData({
      pricePerUnit: crop.expectedPrice.toString(),
      quantity: crop.quantity.toString(),
      message: ''
    });
    setShowOfferForm(true);
  };

  const handleSubmitOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCrop) return;

    try {
      const offer: Omit<Offer, 'id' | 'createdAt' | 'expiresAt'> = {
        cropId: selectedCrop.id,
        vendorId: vendorId,
        vendorName: 'Current Vendor', // This should come from vendor data
        vendorBusiness: 'Current Business', // This should come from vendor data
        pricePerUnit: parseFloat(offerData.pricePerUnit),
        totalAmount: parseFloat(offerData.pricePerUnit) * parseFloat(offerData.quantity),
        quantity: parseFloat(offerData.quantity),
        message: offerData.message,
        status: 'pending'
      };

      databaseService.createOffer(offer);
      
      // Reset form and close
      setShowOfferForm(false);
      setSelectedCrop(null);
      setOfferData({ pricePerUnit: '', quantity: '', message: '' });
      
      // Reload crops to update availability
      loadCrops();
      
      alert('Offer submitted successfully!');
    } catch (error) {
      console.error('Error creating offer:', error);
      alert('Failed to submit offer. Please try again.');
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
      day: 'numeric'
    }).format(new Date(date));
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

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search crops by name, farmer, or quality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <button className="btn-outline flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map((crop) => (
          <div key={crop.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-gray-900">{crop.cropName}</h3>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                {crop.quality}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{crop.farmerName}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>Punjab, India</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>4.8 Rating</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Quantity</span>
                <span className="font-semibold">{crop.quantity} {crop.unit}</span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Expected Price</span>
                <span className="font-semibold text-primary">
                  {formatCurrency(crop.expectedPrice)}/{crop.unit}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Value</span>
                <span className="font-bold text-lg text-primary">
                  {formatCurrency(crop.expectedPrice * crop.quantity)}
                </span>
              </div>
            </div>

            {crop.description && (
              <p className="text-sm text-gray-600 mb-4">{crop.description}</p>
            )}

            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>Listed {formatDate(crop.createdAt)}</span>
              <span>{crop.offers.length} offers</span>
            </div>

            <button
              onClick={() => handleMakeOffer(crop)}
              className="w-full btn-primary"
            >
              Make Offer
            </button>
          </div>
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <div className="card text-center py-8">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No crops available</p>
        </div>
      )}

      {/* Offer Modal */}
      {showOfferForm && selectedCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Make Offer for {selectedCrop.cropName}
            </h3>
            
            <form onSubmit={handleSubmitOffer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per {selectedCrop.unit}
                </label>
                <input
                  type="number"
                  value={offerData.pricePerUnit}
                  onChange={(e) => setOfferData({...offerData, pricePerUnit: e.target.value})}
                  className="input-field"
                  required
                  min="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity ({selectedCrop.unit})
                </label>
                <input
                  type="number"
                  value={offerData.quantity}
                  onChange={(e) => setOfferData({...offerData, quantity: e.target.value})}
                  className="input-field"
                  required
                  min="1"
                  max={selectedCrop.quantity}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={offerData.message}
                  onChange={(e) => setOfferData({...offerData, message: e.target.value})}
                  className="input-field"
                  rows={3}
                  placeholder="Add a message for the farmer..."
                />
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Total Amount:</span>
                  <span className="font-semibold">
                    {formatCurrency(parseFloat(offerData.pricePerUnit || '0') * parseFloat(offerData.quantity || '0'))}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowOfferForm(false)}
                  className="flex-1 btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  Submit Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropBrowser;


