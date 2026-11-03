import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  DollarSign,
  CheckCircle,
  AlertCircle,
  Leaf,
  Wheat,
  Sprout
} from 'lucide-react';
import { Farmer } from '../types';
import statisticsService from '../utils/statisticsService';
import databaseService from '../utils/databaseService';

interface UploadCropProps {
  user: Farmer | null;
}

const UploadCrop = ({ user }: UploadCropProps) => {
  const [formData, setFormData] = useState({
    cropName: '',
    quantity: '',
    unit: 'kg' as 'kg' | 'quintal',
    quality: 'Grade A' as 'Grade A' | 'Grade B' | 'Grade C' | 'Organic',
    expectedPrice: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'preview' | 'success'>('form');
  const navigate = useNavigate();

  const cropOptions = [
    'Wheat', 'Rice', 'Tomato', 'Potato', 'Onion', 'Corn', 'Sugarcane',
    'Cotton', 'Soybean', 'Groundnut', 'Sunflower', 'Mustard', 'Chickpea',
    'Lentil', 'Barley', 'Millet', 'Sorghum', 'Pigeon Pea', 'Black Gram',
    'Green Gram', 'Red Gram', 'Finger Millet', 'Pearl Millet'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('preview');
  };

  const handleConfirmUpload = async () => {
    setLoading(true);
    
    try {
      // Add crop to database
      if (user && formData.cropName && formData.quantity) {
        const newCrop = databaseService.addCrop({
          farmerId: user.id,
          farmerName: user.name,
          cropName: formData.cropName,
          quantity: parseInt(formData.quantity),
          unit: formData.unit,
          quality: formData.quality,
          expectedPrice: formData.expectedPrice ? parseInt(formData.expectedPrice) : 0,
          description: formData.description,
          status: 'active'
        });

        // Add a sample transaction for the uploaded crop
        statisticsService.addTransaction({
          type: 'sale',
          userId: user.id,
          userName: user.name,
          cropName: formData.cropName,
          quantity: parseInt(formData.quantity),
          unit: formData.unit,
          pricePerUnit: formData.expectedPrice ? parseInt(formData.expectedPrice) : 0,
          totalAmount: formData.expectedPrice ? parseInt(formData.expectedPrice) * parseInt(formData.quantity) : 0,
          quality: formData.quality,
          status: 'pending',
          partnerId: 'vendor1',
          partnerName: 'Green Valley Trading'
        });
      }
      
      setStep('success');
    } catch (error) {
      console.error('Error uploading crop:', error);
      alert('Failed to upload crop. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/farmer/dashboard');
  };

  if (step === 'preview') {
    return (
      <div className="min-h-screen relative"
           style={{
             backgroundImage: `linear-gradient(rgba(232, 245, 232, 0.4), rgba(240, 248, 240, 0.4)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundAttachment: 'fixed'
           }}>
        <div className="max-w-4xl mx-auto py-8 px-4 relative z-10">
          <div className="mb-6">
            <button
              onClick={() => setStep('form')}
              className="inline-flex items-center text-primary hover:text-accent mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Form
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Review Your Crop Listing</h1>
            <p className="text-gray-600 mt-2">Please review the details before publishing your crop listing.</p>
          </div>

          <div className="card">
            <div className="flex items-center mb-6">
              <div className="bg-primary p-3 rounded-full mr-4">
                <Wheat className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Crop Details</h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Crop Name</label>
                  <p className="text-xl font-semibold text-gray-900 flex items-center">
                    <Leaf className="h-5 w-5 mr-2 text-green-600" />
                    {formData.cropName}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quality Grade</label>
                  <p className="text-xl font-semibold text-gray-900">{formData.quality}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <p className="text-xl font-semibold text-gray-900">
                    {formData.quantity} {formData.unit}
                  </p>
                </div>
                {formData.expectedPrice && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Price</label>
                    <p className="text-xl font-semibold text-primary">
                      ₹{formData.expectedPrice}/{formData.unit === 'quintal' ? 'qtl' : 'kg'}
                    </p>
                  </div>
                )}
              </div>
              {formData.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{formData.description}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => setStep('form')}
              className="btn-outline"
            >
              Edit Details
            </button>
            <button
              onClick={handleConfirmUpload}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Publishing...' : 'Publish Listing'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen relative flex items-center justify-center"
           style={{
             backgroundImage: `linear-gradient(rgba(232, 245, 232, 0.4), rgba(240, 248, 240, 0.4)), url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundAttachment: 'fixed'
           }}>
        <div className="max-w-2xl mx-auto text-center px-4 relative z-10">
          <div className="card">
            <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Crop Listed Successfully! 🎉
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your {formData.cropName} listing has been published. Vendors will now be able to see and make offers on your crop.
            </p>
            <div className="space-y-4">
              <button
                onClick={handleGoToDashboard}
                className="w-full btn-primary py-3 text-lg"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => {
                  setStep('form');
                  setFormData({
                    cropName: '',
                    quantity: '',
                    unit: 'kg',
                    quality: 'Grade A',
                    expectedPrice: '',
                    description: ''
                  });
                }}
                className="w-full btn-outline py-3 text-lg"
              >
                List Another Crop
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gray-900"
         style={{
           backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundAttachment: 'fixed'
         }}>
      <div className="max-w-4xl mx-auto py-8 px-4 relative z-10">
        <div className="mb-8">
          <button
            onClick={() => navigate('/farmer/dashboard')}
            className="inline-flex items-center text-primary hover:text-accent mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
          
          <div className="text-center mb-8">
            <div className="bg-primary p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Sprout className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">List Your Crop</h1>
            <p className="text-xl text-gray-300">Share your harvest with verified vendors and get the best prices</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="card">
            <div className="flex items-center mb-6">
              <div className="bg-primary p-3 rounded-full mr-4">
                <Package className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Crop Information</h2>
            </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="cropName" className="block text-sm font-medium text-gray-700 mb-2">
                Crop Name *
              </label>
              <select
                id="cropName"
                name="cropName"
                required
                value={formData.cropName}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="">Select a crop</option>
                {cropOptions.map((crop) => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-2">
                Quality Grade *
              </label>
              <select
                id="quality"
                name="quality"
                required
                value={formData.quality}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="Grade A">Grade A (Premium)</option>
                <option value="Grade B">Grade B (Good)</option>
                <option value="Grade C">Grade C (Standard)</option>
                <option value="Organic">Organic (Certified)</option>
              </select>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                required
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                className="input-field"
                min="1"
              />
            </div>

            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
                Unit *
              </label>
              <select
                id="unit"
                name="unit"
                required
                value={formData.unit}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="kg">Kilogram (kg)</option>
                <option value="quintal">Quintal (qtl)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="expectedPrice" className="block text-sm font-medium text-gray-700 mb-2">
                Expected Price (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="expectedPrice"
                  name="expectedPrice"
                  type="number"
                  value={formData.expectedPrice}
                  onChange={handleInputChange}
                  placeholder="Enter expected price per unit"
                  className="input-field pl-10"
                  min="0"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                This helps vendors understand your price expectations
              </p>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your crop, growing conditions, harvest date, etc."
                className="input-field"
              />
            </div>
          </div>
        </div>


          <div className="card bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">Important Notes</h3>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li>• Your crop listing will be visible to all verified vendors</li>
                  <li>• You can edit or remove your listing anytime from the dashboard</li>
                  <li>• Vendors will make offers based on current market prices</li>
                  <li>• All transactions are secure and protected</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/farmer/dashboard')}
              className="btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Review & Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadCrop;
