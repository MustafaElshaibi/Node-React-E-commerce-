import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Orders',
      value: '2,350',
      change: '+180.1%',
      trend: 'up',
      icon: ShoppingCart,
    },
    {
      title: 'Products',
      value: '12,234',
      change: '+19%',
      trend: 'up',
      icon: Package,
    },
    {
      title: 'Active Users',
      value: '573',
      change: '+201',
      trend: 'up',
      icon: Users,
    },
  ];

  const salesData = [
    { name: 'Jan', sales: 4000, orders: 240 },
    { name: 'Feb', sales: 3000, orders: 139 },
    { name: 'Mar', sales: 2000, orders: 980 },
    { name: 'Apr', sales: 2780, orders: 390 },
    { name: 'May', sales: 1890, orders: 480 },
    { name: 'Jun', sales: 2390, orders: 380 },
  ];

  const categoryData = [
    { name: 'Furniture', value: 400, color: '#0088FE' },
    { name: 'Lighting', value: 300, color: '#00C49F' },
    { name: 'Decor', value: 300, color: '#FFBB28' },
    { name: 'Others', value: 200, color: '#FF8042' },
  ];

  const recentOrders = [
    { id: '#3210', customer: 'John Doe', product: 'Modern Chair', amount: '$89.00', status: 'Completed' },
    { id: '#3209', customer: 'Jane Smith', product: 'Table Lamp', amount: '$24.99', status: 'Processing' },
    { id: '#3208', customer: 'Bob Johnson', product: 'Loveseat Sofa', amount: '$199.00', status: 'Shipped' },
    { id: '#3207', customer: 'Alice Brown', product: 'Accent Chair', amount: '$124.99', status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-full">
                  <Icon className="h-6 w-6 text-gray-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#000000" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        </div>
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
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

