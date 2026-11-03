import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  CheckCircle, 
  Clock,
  BarChart3,
  PieChart
} from 'lucide-react';
import statisticsService, { Statistics } from '../utils/statisticsService';

interface StatisticsComponentProps {
  userId: string;
  userType: 'farmer' | 'vendor';
}

const StatisticsComponent: React.FC<StatisticsComponentProps> = ({ userId, userType }) => {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStatistics = () => {
      try {
        const stats = statisticsService.getStatistics(userId, userType);
        setStatistics(stats);
      } catch (error) {
        console.error('Error loading statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStatistics();
  }, [userId, userType]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="text-center p-8 text-gray-500">
        No statistics available
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total {userType === 'farmer' ? 'Sales' : 'Purchases'}</p>
              <p className="text-2xl font-bold">{formatCurrency(statistics.totalAmount)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Quantity</p>
              <p className="text-2xl font-bold">{formatNumber(statistics.totalQuantity)} kg</p>
            </div>
            <Package className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold">{statistics.completedTransactions}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold">{statistics.pendingTransactions}</p>
            </div>
            <Clock className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Total Transactions</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{statistics.totalTransactions}</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Average Price</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(statistics.averagePrice)}/kg</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <PieChart className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Success Rate</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {statistics.totalTransactions > 0 
              ? Math.round((statistics.completedTransactions / statistics.totalTransactions) * 100)
              : 0}%
          </p>
        </div>
      </div>

      {/* Monthly Statistics Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-primary" />
          Monthly Performance
        </h3>
        <div className="space-y-3">
          {statistics.monthlyStats.map((month, index) => (
            <div key={month.month} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-16 text-sm font-medium text-gray-600">{month.month}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min(100, (month.amount / Math.max(...statistics.monthlyStats.map(m => m.amount), 1)) * 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{formatCurrency(month.amount)}</div>
                <div className="text-xs text-gray-500">{month.transactions} transactions</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Crops */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <PieChart className="h-5 w-5 mr-2 text-primary" />
          Top {userType === 'farmer' ? 'Sold' : 'Purchased'} Crops
        </h3>
        <div className="space-y-3">
          {statistics.topCrops.map((crop, index) => (
            <div key={crop.cropName} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{crop.cropName}</div>
                  <div className="text-sm text-gray-500">{formatNumber(crop.totalQuantity)} kg</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">{formatCurrency(crop.totalAmount)}</div>
                <div className="text-sm text-gray-500">{formatCurrency(crop.averagePrice)}/kg</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        <div className="space-y-2">
          {statistics.recentTransactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  transaction.status === 'completed' ? 'bg-green-500' : 
                  transaction.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <div className="font-medium text-gray-900">{transaction.cropName}</div>
                  <div className="text-sm text-gray-500">
                    {transaction.type === 'sale' ? 'Sold to' : 'Purchased from'} {transaction.partnerName}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">{formatCurrency(transaction.totalAmount)}</div>
                <div className="text-sm text-gray-500">{transaction.quantity} kg</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsComponent;




