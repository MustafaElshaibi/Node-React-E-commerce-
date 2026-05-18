import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Download,
  Calendar,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const orders = [
    {
      id: '#3210',
      customer: 'John Doe',
      email: 'john@example.com',
      products: ['Modern Chair', 'Table Lamp'],
      total: 113.99,
      status: 'Completed',
      date: '2024-01-15',
      paymentMethod: 'Credit Card',
      shippingAddress: '123 Main St, New York, NY'
    },
    {
      id: '#3209',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      products: ['Loveseat Sofa'],
      total: 199.00,
      status: 'Processing',
      date: '2024-01-14',
      paymentMethod: 'PayPal',
      shippingAddress: '456 Oak Ave, Los Angeles, CA'
    },
    {
      id: '#3208',
      customer: 'Bob Johnson',
      email: 'bob@example.com',
      products: ['Accent Chair', 'Floor Lamp'],
      total: 214.98,
      status: 'Shipped',
      date: '2024-01-13',
      paymentMethod: 'Credit Card',
      shippingAddress: '789 Pine St, Chicago, IL'
    },
    {
      id: '#3207',
      customer: 'Alice Brown',
      email: 'alice@example.com',
      products: ['Modern Chair'],
      total: 89.00,
      status: 'Pending',
      date: '2024-01-12',
      paymentMethod: 'Bank Transfer',
      shippingAddress: '321 Elm St, Houston, TX'
    },
    {
      id: '#3206',
      customer: 'Charlie Wilson',
      email: 'charlie@example.com',
      products: ['Table Lamp', 'Accent Chair'],
      total: 149.98,
      status: 'Cancelled',
      date: '2024-01-11',
      paymentMethod: 'Credit Card',
      shippingAddress: '654 Maple Dr, Phoenix, AZ'
    }
  ];

  const statuses = ['all', 'Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled'];
  const dateRanges = ['all', 'today', 'week', 'month', 'quarter'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const orderStats = [
    {
      title: 'Total Orders',
      value: orders.length.toString(),
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Total Revenue',
      value: `$${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Pending Orders',
      value: orders.filter(o => o.status === 'Pending').length.toString(),
      icon: Package,
      color: 'text-yellow-600'
    },
    {
      title: 'Completed Orders',
      value: orders.filter(o => o.status === 'Completed').length.toString(),
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {orderStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent w-full"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Statuses' : status}
              </option>
            ))}
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.products.map((product, index) => (
                        <div key={index}>{product}</div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;

