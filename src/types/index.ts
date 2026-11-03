export interface User {
  id: string;
  name: string;
  email?: string;
  phone: string;
  role: 'farmer' | 'vendor' | 'admin';
  isVerified: boolean;
  createdAt: Date;
}

export interface Farmer extends User {
  role: 'farmer';
  aadharNumber?: string;
  location: string;
  totalEarnings: number;
  pendingPayments: number;
  rating?: number;
  cropsListed?: number;
  totalSales?: number;
}

export interface Vendor extends User {
  role: 'vendor';
  gstNumber: string;
  businessName: string;
  rating: number;
  totalPurchases: number;
  location?: string;
  cropsPurchased?: number;
}

export interface Crop {
  id: string;
  farmerId: string;
  name: string;
  quantity: number;
  unit: 'kg' | 'quintal';
  quality: 'Grade A' | 'Grade B' | 'Grade C' | 'Organic';
  imageUrl?: string;
  expectedPrice?: number;
  status: 'active' | 'sold' | 'expired';
  createdAt: Date;
}

export interface VendorOffer {
  id: string;
  vendorId: string;
  cropId: string;
  offeredPrice: number;
  paymentMode: 'Instant' | '3 Days' | '7 Days';
  deliveryOption: 'Pickup' | 'Farmer Delivers';
  message?: string;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  cropId: string;
  farmerId: string;
  vendorId: string;
  quantity: number;
  price: number;
  totalAmount: number;
  paymentMode: string;
  deliveryOption: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  completedAt?: Date;
}

export interface VendorRequirement {
  id: string;
  vendorId: string;
  cropName: string;
  quantity: number;
  unit: 'kg' | 'quintal';
  maxPrice: number;
  quality: string;
  deliveryMode: 'Pickup' | 'Vendor Collects';
  status: 'active' | 'fulfilled' | 'expired';
  createdAt: Date;
}
