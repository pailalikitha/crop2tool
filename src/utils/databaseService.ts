// Database Service for Farmers, Vendors, and Offers
export interface Farmer {
  id: string;
  name: string;
  phone: string;
  role: 'farmer';
  isVerified: boolean;
  createdAt: Date;
  aadharNumber: string;
  location: string;
  totalEarnings: number;
  pendingPayments: number;
  rating: number;
  cropsListed: number;
  totalSales: number;
}

export interface Vendor {
  id: string;
  name: string;
  phone: string;
  role: 'vendor';
  isVerified: boolean;
  createdAt: Date;
  gstNumber: string;
  businessName: string;
  rating: number;
  totalPurchases: number;
  location: string;
  cropsPurchased: number;
}

export interface Crop {
  id: string;
  farmerId: string;
  farmerName: string;
  cropName: string;
  quantity: number;
  unit: string;
  quality: string;
  expectedPrice: number;
  description: string;
  status: 'active' | 'sold' | 'expired';
  createdAt: Date;
  offers: Offer[];
}

export interface Offer {
  id: string;
  cropId: string;
  vendorId: string;
  vendorName: string;
  vendorBusiness: string;
  pricePerUnit: number;
  totalAmount: number;
  quantity: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  createdAt: Date;
  expiresAt: Date;
}

class DatabaseService {
  private static instance: DatabaseService;
  
  // Sample Data
  private farmers: Farmer[] = [
    {
      id: 'farmer1',
      name: 'Rajesh Kumar',
      phone: '9876543210',
      role: 'farmer',
      isVerified: true,
      createdAt: new Date('2024-01-01'),
      aadharNumber: '123456789012',
      location: 'Punjab, India',
      totalEarnings: 125000,
      pendingPayments: 15000,
      rating: 4.8,
      cropsListed: 5,
      totalSales: 110000
    },
    {
      id: 'farmer2',
      name: 'Priya Sharma',
      phone: '9876543211',
      role: 'farmer',
      isVerified: true,
      createdAt: new Date('2024-01-15'),
      aadharNumber: '123456789013',
      location: 'Haryana, India',
      totalEarnings: 89000,
      pendingPayments: 8000,
      rating: 4.6,
      cropsListed: 3,
      totalSales: 81000
    },
    {
      id: 'farmer3',
      name: 'Suresh Singh',
      phone: '9876543212',
      role: 'farmer',
      isVerified: true,
      createdAt: new Date('2024-02-01'),
      aadharNumber: '123456789014',
      location: 'Rajasthan, India',
      totalEarnings: 156000,
      pendingPayments: 22000,
      rating: 4.9,
      cropsListed: 7,
      totalSales: 134000
    }
  ];

  private vendors: Vendor[] = [
    {
      id: 'vendor1',
      name: 'Green Valley Trading',
      phone: '9876543220',
      role: 'vendor',
      isVerified: true,
      createdAt: new Date('2024-01-01'),
      gstNumber: '07ABCDE1234F1Z5',
      businessName: 'Green Valley Agricultural Trading Co.',
      rating: 4.7,
      totalPurchases: 250000,
      location: 'Delhi, India',
      cropsPurchased: 12
    },
    {
      id: 'vendor2',
      name: 'Fresh Produce Co.',
      phone: '9876543221',
      role: 'vendor',
      isVerified: true,
      createdAt: new Date('2024-01-10'),
      gstNumber: '07FGHIJ5678K2L6',
      businessName: 'Fresh Produce Company Ltd.',
      rating: 4.5,
      totalPurchases: 180000,
      location: 'Mumbai, India',
      cropsPurchased: 8
    },
    {
      id: 'vendor3',
      name: 'Agri Solutions',
      phone: '9876543222',
      role: 'vendor',
      isVerified: true,
      createdAt: new Date('2024-01-20'),
      gstNumber: '07MNOPQ9012R3S7',
      businessName: 'Agri Solutions Pvt Ltd.',
      rating: 4.8,
      totalPurchases: 320000,
      location: 'Bangalore, India',
      cropsPurchased: 15
    }
  ];

  private crops: Crop[] = [
    {
      id: 'crop1',
      farmerId: 'farmer1',
      farmerName: 'Rajesh Kumar',
      cropName: 'Wheat',
      quantity: 100,
      unit: 'kg',
      quality: 'Grade A',
      expectedPrice: 25,
      description: 'Fresh wheat from organic farming',
      status: 'active',
      createdAt: new Date('2024-01-20'),
      offers: []
    },
    {
      id: 'crop2',
      farmerId: 'farmer2',
      farmerName: 'Priya Sharma',
      cropName: 'Rice',
      quantity: 50,
      unit: 'kg',
      quality: 'Organic',
      expectedPrice: 35,
      description: 'Premium basmati rice',
      status: 'active',
      createdAt: new Date('2024-01-22'),
      offers: []
    },
    {
      id: 'crop3',
      farmerId: 'farmer3',
      farmerName: 'Suresh Singh',
      cropName: 'Tomato',
      quantity: 200,
      unit: 'kg',
      quality: 'Grade A',
      expectedPrice: 15,
      description: 'Fresh red tomatoes',
      status: 'active',
      createdAt: new Date('2024-01-25'),
      offers: []
    }
  ];

  private offers: Offer[] = [];

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // Authentication
  authenticateUser(phone: string, name?: string): Farmer | Vendor | null {
    // Check farmers
    const farmer = this.farmers.find(f => f.phone === phone);
    if (farmer) {
      return farmer;
    }

    // Check vendors
    const vendor = this.vendors.find(v => v.phone === phone);
    if (vendor) {
      return vendor;
    }

    return null;
  }

  // Farmer methods
  getFarmer(id: string): Farmer | null {
    return this.farmers.find(f => f.id === id) || null;
  }

  getAllFarmers(): Farmer[] {
    return this.farmers;
  }

  // Vendor methods
  getVendor(id: string): Vendor | null {
    return this.vendors.find(v => v.id === id) || null;
  }

  getAllVendors(): Vendor[] {
    return this.vendors;
  }

  // Crop methods
  getCropsByFarmer(farmerId: string): Crop[] {
    return this.crops.filter(c => c.farmerId === farmerId);
  }

  getAllActiveCrops(): Crop[] {
    return this.crops.filter(c => c.status === 'active');
  }

  getCrop(id: string): Crop | null {
    return this.crops.find(c => c.id === id) || null;
  }

  addCrop(crop: Omit<Crop, 'id' | 'offers' | 'createdAt'>): Crop {
    const newCrop: Crop = {
      ...crop,
      id: `crop${Date.now()}`,
      offers: [],
      createdAt: new Date()
    };
    this.crops.push(newCrop);
    return newCrop;
  }

  updateCropStatus(cropId: string, status: Crop['status']): boolean {
    const crop = this.crops.find(c => c.id === cropId);
    if (crop) {
      crop.status = status;
      return true;
    }
    return false;
  }

  // Offer methods
  createOffer(offer: Omit<Offer, 'id' | 'createdAt' | 'expiresAt'>): Offer {
    const newOffer: Offer = {
      ...offer,
      id: `offer${Date.now()}`,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    };
    
    // Add offer to crop
    const crop = this.crops.find(c => c.id === offer.cropId);
    if (crop) {
      crop.offers.push(newOffer);
    }
    
    return newOffer;
  }

  getOffersForFarmer(farmerId: string): Offer[] {
    const farmerCrops = this.crops.filter(c => c.farmerId === farmerId);
    const allOffers: Offer[] = [];
    farmerCrops.forEach(crop => {
      allOffers.push(...crop.offers);
    });
    return allOffers;
  }

  getOffersForVendor(vendorId: string): Offer[] {
    const allOffers: Offer[] = [];
    this.crops.forEach(crop => {
      allOffers.push(...crop.offers.filter(offer => offer.vendorId === vendorId));
    });
    return allOffers;
  }

  updateOfferStatus(offerId: string, status: Offer['status']): boolean {
    // Find the offer in any crop
    let offer: Offer | undefined;
    let crop: any;
    
    for (const c of this.crops) {
      offer = c.offers.find(o => o.id === offerId);
      if (offer) {
        crop = c;
        break;
      }
    }
    
    if (offer) {
      offer.status = status;
      
      // If accepted, update crop status and statistics
      if (status === 'accepted') {
        if (crop) {
          crop.status = 'sold';
        }
        
        // Update farmer statistics
        const farmer = this.farmers.find(f => f.id === crop?.farmerId);
        if (farmer) {
          farmer.totalEarnings += offer.totalAmount;
          farmer.totalSales += offer.totalAmount;
          farmer.cropsListed = Math.max(0, farmer.cropsListed - 1);
        }
        
        // Update vendor statistics
        const vendor = this.vendors.find(v => v.id === offer.vendorId);
        if (vendor) {
          vendor.totalPurchases += offer.totalAmount;
          vendor.cropsPurchased += 1;
        }
      }
      
      return true;
    }
    return false;
  }

  // Statistics methods
  getFarmerStats(farmerId: string) {
    const farmer = this.getFarmer(farmerId);
    if (!farmer) return null;

    const farmerCrops = this.getCropsByFarmer(farmerId);
    const farmerOffers = this.getOffersForFarmer(farmerId);
    
    return {
      ...farmer,
      activeCrops: farmerCrops.filter(c => c.status === 'active').length,
      soldCrops: farmerCrops.filter(c => c.status === 'sold').length,
      pendingOffers: farmerOffers.filter(o => o.status === 'pending').length,
      acceptedOffers: farmerOffers.filter(o => o.status === 'accepted').length
    };
  }

  getVendorStats(vendorId: string) {
    const vendor = this.getVendor(vendorId);
    if (!vendor) return null;

    const vendorOffers = this.getOffersForVendor(vendorId);
    
    return {
      ...vendor,
      pendingOffers: vendorOffers.filter(o => o.status === 'pending').length,
      acceptedOffers: vendorOffers.filter(o => o.status === 'accepted').length,
      rejectedOffers: vendorOffers.filter(o => o.status === 'rejected').length
    };
  }

  // Search methods
  searchCrops(query: string): Crop[] {
    const lowercaseQuery = query.toLowerCase();
    return this.crops.filter(c => 
      c.cropName.toLowerCase().includes(lowercaseQuery) ||
      c.farmerName.toLowerCase().includes(lowercaseQuery) ||
      c.quality.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Get available crops for vendors
  getAvailableCropsForVendor(vendorId: string): Crop[] {
    return this.crops.filter(c => 
      c.status === 'active' && 
      !c.offers.some(o => o.vendorId === vendorId && o.status === 'pending')
    );
  }
}

export default DatabaseService.getInstance();
