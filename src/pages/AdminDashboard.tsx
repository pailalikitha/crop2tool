import { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  Shield,
  BarChart3,
  Activity,
  UserCheck,
  UserX
} from 'lucide-react';
import { User } from '../types';

interface AdminDashboardProps {
  user: User | null;
}

const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'disputes' | 'analytics'>('overview');

  // Mock data for demonstration
  const pendingVerifications = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      type: 'farmer',
      phone: '+91 98765 43210',
      aadharNumber: '1234****5678',
      submittedAt: '2 hours ago',
      status: 'pending'
    },
    {
      id: '2',
      name: 'Green Valley Traders',
      type: 'vendor',
      phone: '+91 98765 43211',
      gstNumber: '07ABCDE1234F1Z5',
      submittedAt: '4 hours ago',
      status: 'pending'
    },
    {
      id: '3',
      name: 'Suresh Singh',
      type: 'farmer',
      phone: '+91 98765 43212',
      aadharNumber: '2345****6789',
      submittedAt: '1 day ago',
      status: 'pending'
    }
  ];

  const recentDisputes = [
    {
      id: '1',
      type: 'Payment Issue',
      farmerName: 'Rajesh Kumar',
      vendorName: 'Green Valley Traders',
      amount: 25000,
      status: 'open',
      createdAt: '1 day ago'
    },
    {
      id: '2',
      type: 'Quality Dispute',
      farmerName: 'Suresh Singh',
      vendorName: 'Farm Fresh Co.',
      amount: 15000,
      status: 'resolved',
      createdAt: '3 days ago'
    }
  ];

  const stats = [
    {
      title: 'Total Users',
      value: '1,247',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Total Transactions',
      value: '₹2.5Cr',
      change: '+18.3%',
      changeType: 'positive',
      icon: DollarSign
    },
    {
      title: 'Active Disputes',
      value: '3',
      change: '-2',
      changeType: 'negative',
      icon: AlertTriangle
    },
    {
      title: 'Platform Revenue',
      value: '₹2.5L',
      change: '+25.1%',
      changeType: 'positive',
      icon: TrendingUp
    }
  ];

  const handleVerifyUser = (userId: string, action: 'approve' | 'reject') => {
    console.log(`${action} user:`, userId);
    // Handle user verification logic here
  };

  const handleResolveDispute = (disputeId: string) => {
    console.log('Resolve dispute:', disputeId);
    // Handle dispute resolution logic here
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Admin Dashboard 🔧
        </h1>
        <p className="text-lg opacity-90">
          Monitor platform activity, verify users, and resolve disputes.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <stat.icon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="card">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'User Verification', icon: UserCheck },
              { id: 'disputes', label: 'Disputes', icon: AlertTriangle },
              { id: 'analytics', label: 'Analytics', icon: Activity }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">New vendor verified</p>
                  <p className="text-xs text-green-600">Green Valley Traders - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Large transaction completed</p>
                  <p className="text-xs text-blue-600">₹2.5L wheat sale - 4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">New dispute reported</p>
                  <p className="text-xs text-yellow-600">Payment issue - 6 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">New farmer registered</p>
                  <p className="text-xs text-green-600">Rajesh Kumar - 1 day ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Health */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Platform Health</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">System Uptime</span>
                <span className="text-sm font-medium text-green-600">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Users</span>
                <span className="text-sm font-medium text-blue-600">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Transaction Success Rate</span>
                <span className="text-sm font-medium text-green-600">98.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Dispute Resolution Time</span>
                <span className="text-sm font-medium text-yellow-600">2.3 days</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Pending User Verifications</h2>
          <div className="space-y-4">
            {pendingVerifications.map((user) => (
              <div key={user.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <span className={`badge ${
                        user.type === 'farmer' ? 'badge-info' : 'badge-warning'
                      }`}>
                        {user.type}
                      </span>
                      <span className="badge badge-warning">Pending</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>Phone: {user.phone}</div>
                      {user.aadharNumber && <div>Aadhar: {user.aadharNumber}</div>}
                      {user.gstNumber && <div>GST: {user.gstNumber}</div>}
                      <div>Submitted: {user.submittedAt}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleVerifyUser(user.id, 'approve')}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      <UserCheck className="h-4 w-4 mr-1" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleVerifyUser(user.id, 'reject')}
                      className="btn-outline text-sm px-4 py-2 text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <UserX className="h-4 w-4 mr-1" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'disputes' && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Dispute Resolution Center</h2>
          <div className="space-y-4">
            {recentDisputes.map((dispute) => (
              <div key={dispute.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{dispute.type}</h3>
                      <span className={`badge ${
                        dispute.status === 'resolved' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {dispute.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-2">
                      <div>Farmer: {dispute.farmerName}</div>
                      <div>Vendor: {dispute.vendorName}</div>
                      <div>Amount: ₹{dispute.amount.toLocaleString()}</div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Reported: {dispute.createdAt}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="h-4 w-4" />
                    </button>
                    {dispute.status === 'open' && (
                      <button
                        onClick={() => handleResolveDispute(dispute.id)}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        <Shield className="h-4 w-4 mr-1" />
                        Resolve
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Transaction Analytics */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Transaction Analytics</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-green-800">Total Volume</span>
                <span className="text-lg font-bold text-green-600">₹2.5Cr</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-blue-800">Average Transaction</span>
                <span className="text-lg font-bold text-blue-600">₹25,000</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm font-medium text-yellow-800">Success Rate</span>
                <span className="text-lg font-bold text-yellow-600">98.5%</span>
              </div>
            </div>
          </div>

          {/* User Analytics */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">User Analytics</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-green-800">Active Farmers</span>
                <span className="text-lg font-bold text-green-600">847</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-blue-800">Active Vendors</span>
                <span className="text-lg font-bold text-blue-600">400</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm font-medium text-yellow-800">New Registrations</span>
                <span className="text-lg font-bold text-yellow-600">+47 this week</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
