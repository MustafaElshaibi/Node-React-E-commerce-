import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera, Shield, Key, Clock, Activity, Settings, Bell, Database, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@3legant.com',
    phone: '+1 (555) 987-6543',
    role: 'Super Administrator',
    department: 'Management',
    employeeId: 'EMP-001',
    dateJoined: '2023-01-15',
    lastLogin: '2024-01-20T10:30:00Z',
    permissions: ['full_access', 'user_management', 'product_management', 'order_management', 'analytics_access']
  });

  const [tempData, setTempData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const activityLog = [
    { id: 1, action: 'Updated product inventory', timestamp: '2024-01-20T10:30:00Z', type: 'product' },
    { id: 2, action: 'Processed order #ORD-1234', timestamp: '2024-01-20T09:15:00Z', type: 'order' },
    { id: 3, action: 'Added new user account', timestamp: '2024-01-19T16:45:00Z', type: 'user' },
    { id: 4, action: 'Generated sales report', timestamp: '2024-01-19T14:20:00Z', type: 'report' },
    { id: 5, action: 'Updated store settings', timestamp: '2024-01-19T11:30:00Z', type: 'settings' }
  ];

  const systemStats = [
    { label: 'Total Users Managed', value: '1,247', icon: Users, color: 'text-blue-600' },
    { label: 'Orders Processed', value: '3,456', icon: BarChart3, color: 'text-green-600' },
    { label: 'Products Updated', value: '892', icon: Database, color: 'text-purple-600' },
    { label: 'System Uptime', value: '99.9%', icon: Activity, color: 'text-orange-600' }
  ];

  const permissions = [
    { id: 'full_access', label: 'Full System Access', description: 'Complete access to all system features' },
    { id: 'user_management', label: 'User Management', description: 'Create, edit, and delete user accounts' },
    { id: 'product_management', label: 'Product Management', description: 'Manage product catalog and inventory' },
    { id: 'order_management', label: 'Order Management', description: 'Process and manage customer orders' },
    { id: 'analytics_access', label: 'Analytics Access', description: 'View reports and analytics data' },
    { id: 'settings_management', label: 'Settings Management', description: 'Modify system and store settings' }
  ];

  const tabs = [
    { id: 'profile', label: 'Admin Profile', icon: User },
    { id: 'permissions', label: 'Permissions', icon: Shield },
    { id: 'activity', label: 'Activity Log', icon: Clock },
    { id: 'security', label: 'Security', icon: Key },
    { id: 'settings', label: 'Preferences', icon: Settings }
  ];

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-12 w-12 text-gray-400" />
          </div>
          <button className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{profileData.firstName} {profileData.lastName}</h2>
          <p className="text-gray-600">{profileData.role}</p>
          <p className="text-sm text-gray-500">Employee ID: {profileData.employeeId}</p>
          <p className="text-sm text-gray-500">Joined {new Date(profileData.dateJoined).toLocaleDateString()}</p>
        </div>
        <div className="ml-auto">
          {!isEditing ? (
            <Button onClick={handleEdit} variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSave} className="bg-black text-white hover:bg-gray-800">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            {isEditing ? (
              <input
                type="text"
                value={tempData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{profileData.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                value={tempData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{profileData.lastName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={tempData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            ) : (
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <p className="text-gray-900">{profileData.email}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            {isEditing ? (
              <input
                type="tel"
                value={tempData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            ) : (
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                <p className="text-gray-900">{profileData.phone}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            {isEditing ? (
              <select
                value={tempData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="Super Administrator">Super Administrator</option>
                <option value="Administrator">Administrator</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
              </select>
            ) : (
              <p className="text-gray-900">{profileData.role}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            {isEditing ? (
              <input
                type="text"
                value={tempData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            ) : (
              <p className="text-gray-900">{profileData.department}</p>
            )}
          </div>
        </div>
      </div>

      {/* Account Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
            <p className="text-gray-900">{profileData.employeeId}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Joined</label>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
              <p className="text-gray-900">{new Date(profileData.dateJoined).toLocaleDateString()}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Login</label>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400 mr-2" />
              <p className="text-gray-900">{new Date(profileData.lastLogin).toLocaleString()}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Status</label>
            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPermissionsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Admin Permissions</h3>
        <Button className="bg-black text-white hover:bg-gray-800">
          <Shield className="h-4 w-4 mr-2" />
          Manage Permissions
        </Button>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-4">
          {permissions.map((permission) => (
            <div key={permission.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{permission.label}</h4>
                <p className="text-sm text-gray-500">{permission.description}</p>
              </div>
              <div className="flex items-center">
                {profileData.permissions.includes(permission.id) ? (
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Granted
                  </span>
                ) : (
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                    Not Granted
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
            <option>All Activities</option>
            <option>Product Updates</option>
            <option>Order Processing</option>
            <option>User Management</option>
          </select>
          <Button variant="outline">Export Log</Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="divide-y divide-gray-200">
          {activityLog.map((activity) => (
            <div key={activity.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'product' ? 'bg-blue-500' :
                    activity.type === 'order' ? 'bg-green-500' :
                    activity.type === 'user' ? 'bg-purple-500' :
                    activity.type === 'report' ? 'bg-orange-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                  activity.type === 'product' ? 'bg-blue-100 text-blue-800' :
                  activity.type === 'order' ? 'bg-green-100 text-green-800' :
                  activity.type === 'user' ? 'bg-purple-100 text-purple-800' :
                  activity.type === 'report' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {activity.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
      
      <div className="space-y-6">
        {/* Password Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
            <Key className="h-5 w-5 mr-2" />
            Password & Authentication
          </h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Change Password</p>
                <p className="text-sm text-gray-500">Last changed 30 days ago</p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Enhanced security for admin access</p>
              </div>
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                Enabled
              </span>
            </div>
          </div>
        </div>

        {/* Session Management */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-4">Active Sessions</h4>
          <div className="space-y-3">
            {[
              { device: 'MacBook Pro', location: 'New York, US', time: 'Current session', current: true },
              { device: 'iPhone 13', location: 'New York, US', time: '2 hours ago', current: false },
              { device: 'Chrome Browser', location: 'Los Angeles, US', time: '1 day ago', current: false }
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{session.device}</p>
                  <p className="text-sm text-gray-500">{session.location} • {session.time}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {session.current && (
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Current
                    </span>
                  )}
                  {!session.current && (
                    <Button variant="outline" size="sm">Revoke</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Access Control */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-4">Access Control</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">IP Restrictions</p>
                <p className="text-sm text-gray-500">Limit access to specific IP addresses</p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Login Notifications</p>
                <p className="text-sm text-gray-500">Get notified of new login attempts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Admin Preferences</h3>
      
      <div className="space-y-6">
        {/* Dashboard Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Dashboard Preferences
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Dashboard View</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
                <option>Analytics Overview</option>
                <option>Sales Dashboard</option>
                <option>Inventory Status</option>
                <option>Customer Insights</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data Refresh Interval</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
                <option>Real-time</option>
                <option>Every 5 minutes</option>
                <option>Every 15 minutes</option>
                <option>Every hour</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Admin Notifications
          </h4>
          <div className="space-y-4">
            {[
              { label: 'System Alerts', description: 'Critical system notifications and errors' },
              { label: 'Order Notifications', description: 'New orders and order status changes' },
              { label: 'Inventory Alerts', description: 'Low stock and inventory warnings' },
              { label: 'User Activity', description: 'New user registrations and account changes' },
              { label: 'Security Alerts', description: 'Login attempts and security events' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={index < 3} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* System Preferences */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-4">System Preferences</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
                <option>Eastern Time (ET)</option>
                <option>Central Time (CT)</option>
                <option>Mountain Time (MT)</option>
                <option>Pacific Time (PT)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Auto-logout</p>
                <p className="text-sm text-gray-500">Automatically log out after inactivity</p>
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>2 hours</option>
                <option>Never</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'permissions':
        return renderPermissionsTab();
      case 'activity':
        return renderActivityTab();
      case 'security':
        return renderSecurityTab();
      case 'settings':
        return renderSettingsTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
        <p className="text-gray-600">Manage your admin account and system preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

