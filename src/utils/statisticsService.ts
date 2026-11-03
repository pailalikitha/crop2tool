// Statistics Service for tracking purchases and sales
export interface Transaction {
  id: string;
  type: 'purchase' | 'sale';
  userId: string;
  userName: string;
  cropName: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalAmount: number;
  quality: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  completedAt?: Date;
  partnerId: string;
  partnerName: string;
}

export interface Statistics {
  totalTransactions: number;
  totalAmount: number;
  totalQuantity: number;
  completedTransactions: number;
  pendingTransactions: number;
  averagePrice: number;
  monthlyStats: MonthlyStat[];
  topCrops: CropStat[];
  recentTransactions: Transaction[];
}

export interface MonthlyStat {
  month: string;
  transactions: number;
  amount: number;
  quantity: number;
}

export interface CropStat {
  cropName: string;
  totalQuantity: number;
  totalAmount: number;
  averagePrice: number;
  transactions: number;
}

class StatisticsService {
  private static instance: StatisticsService;
  private transactions: Transaction[] = [];

  static getInstance(): StatisticsService {
    if (!StatisticsService.instance) {
      StatisticsService.instance = new StatisticsService();
      // Initialize with some sample data
      StatisticsService.instance.initializeSampleData();
    }
    return StatisticsService.instance;
  }

  private initializeSampleData() {
    const sampleTransactions: Transaction[] = [
      {
        id: '1',
        type: 'sale',
        userId: 'farmer1',
        userName: 'Rajesh Kumar',
        cropName: 'Wheat',
        quantity: 100,
        unit: 'kg',
        pricePerUnit: 25,
        totalAmount: 2500,
        quality: 'Grade A',
        status: 'completed',
        createdAt: new Date('2024-01-15'),
        completedAt: new Date('2024-01-16'),
        partnerId: 'vendor1',
        partnerName: 'Green Valley Trading'
      },
      {
        id: '2',
        type: 'purchase',
        userId: 'vendor1',
        userName: 'Green Valley Trading',
        cropName: 'Rice',
        quantity: 50,
        unit: 'kg',
        pricePerUnit: 35,
        totalAmount: 1750,
        quality: 'Organic',
        status: 'completed',
        createdAt: new Date('2024-01-20'),
        completedAt: new Date('2024-01-21'),
        partnerId: 'farmer2',
        partnerName: 'Priya Sharma'
      },
      {
        id: '3',
        type: 'sale',
        userId: 'farmer1',
        userName: 'Rajesh Kumar',
        cropName: 'Tomato',
        quantity: 200,
        unit: 'kg',
        pricePerUnit: 15,
        totalAmount: 3000,
        quality: 'Grade A',
        status: 'pending',
        createdAt: new Date('2024-01-25'),
        partnerId: 'vendor2',
        partnerName: 'Fresh Produce Co.'
      }
    ];
    
    this.transactions = sampleTransactions;
  }

  // Add new transaction
  addTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>): Transaction {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    this.transactions.push(newTransaction);
    return newTransaction;
  }

  // Get statistics for a user
  getStatistics(userId: string, userType: 'farmer' | 'vendor'): Statistics {
    const userTransactions = this.transactions.filter(t => 
      t.userId === userId || t.partnerId === userId
    );

    const completedTransactions = userTransactions.filter(t => t.status === 'completed');
    const pendingTransactions = userTransactions.filter(t => t.status === 'pending');

    const totalAmount = completedTransactions.reduce((sum, t) => sum + t.totalAmount, 0);
    const totalQuantity = completedTransactions.reduce((sum, t) => sum + t.quantity, 0);
    const averagePrice = totalQuantity > 0 ? totalAmount / totalQuantity : 0;

    // Monthly statistics (last 6 months)
    const monthlyStats = this.getMonthlyStats(userTransactions);
    
    // Top crops
    const topCrops = this.getTopCrops(userTransactions);
    
    // Recent transactions (last 10)
    const recentTransactions = userTransactions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);

    return {
      totalTransactions: userTransactions.length,
      totalAmount,
      totalQuantity,
      completedTransactions: completedTransactions.length,
      pendingTransactions: pendingTransactions.length,
      averagePrice,
      monthlyStats,
      topCrops,
      recentTransactions
    };
  }

  private getMonthlyStats(transactions: Transaction[]): MonthlyStat[] {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const currentMonth = new Date().getMonth();
    
    return months.map((month, index) => {
      const monthTransactions = transactions.filter(t => {
        const transactionMonth = t.createdAt.getMonth();
        const targetMonth = (currentMonth - 5 + index + 12) % 12;
        return transactionMonth === targetMonth;
      });

      return {
        month,
        transactions: monthTransactions.length,
        amount: monthTransactions.reduce((sum, t) => sum + t.totalAmount, 0),
        quantity: monthTransactions.reduce((sum, t) => sum + t.quantity, 0)
      };
    });
  }

  private getTopCrops(transactions: Transaction[]): CropStat[] {
    const cropMap = new Map<string, CropStat>();

    transactions.forEach(transaction => {
      const existing = cropMap.get(transaction.cropName);
      if (existing) {
        existing.totalQuantity += transaction.quantity;
        existing.totalAmount += transaction.totalAmount;
        existing.transactions += 1;
        existing.averagePrice = existing.totalAmount / existing.totalQuantity;
      } else {
        cropMap.set(transaction.cropName, {
          cropName: transaction.cropName,
          totalQuantity: transaction.quantity,
          totalAmount: transaction.totalAmount,
          averagePrice: transaction.pricePerUnit,
          transactions: 1
        });
      }
    });

    return Array.from(cropMap.values())
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 5);
  }

  // Update transaction status
  updateTransactionStatus(transactionId: string, status: Transaction['status']): boolean {
    const transaction = this.transactions.find(t => t.id === transactionId);
    if (transaction) {
      transaction.status = status;
      if (status === 'completed') {
        transaction.completedAt = new Date();
      }
      return true;
    }
    return false;
  }

  // Get all transactions for a user
  getUserTransactions(userId: string): Transaction[] {
    return this.transactions
      .filter(t => t.userId === userId || t.partnerId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export default StatisticsService.getInstance();


