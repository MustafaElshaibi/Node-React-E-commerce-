import React, { useState } from 'react';
import { Save, Upload, Bell, Shield, Globe, Palette, Database } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'data', label: 'Data & Privacy', icon: Database }
  ];

  const GeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Store Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
            <input
              type="text"
              defaultValue="3legant"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Email</label>
            <input
              type="email"
              defaultValue="admin@3legant.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Store Description</label>
          <textarea
            rows={4}
            defaultValue="3legant is a gift & decorations store based in HCMC, Vietnam. Est since 2019."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Business Hours</h3>
        <div className="space-y-3">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
            <div key={day} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 w-20">{day}</span>
              <div className="flex items-center space-x-2">
                <input
                  type="time"
                  defaultValue="09:00"
                  className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="time"
                  defaultValue="18:00"
                  className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Closed</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {[
            { label: 'New Orders', description: 'Get notified when new orders are placed' },
            { label: 'Low Stock Alerts', description: 'Receive alerts when products are running low' },
            { label: 'Customer Messages', description: 'Notifications for new customer inquiries' },
            { label: 'Weekly Reports', description: 'Weekly summary of store performance' },
            { label: 'Security Alerts', description: 'Important security notifications' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
        <div className="space-y-4">
          {[
            { label: 'Browser Notifications', description: 'Show notifications in your browser' },
            { label: 'Mobile App Notifications', description: 'Push notifications to mobile app' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={index === 0} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Password & Authentication</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">Enable 2FA</p>
            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
          </div>
          <Button variant="outline">Setup 2FA</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Login Sessions</h3>
        <div className="space-y-3">
          {[
            { device: 'MacBook Pro', location: 'New York, US', time: 'Current session' },
            { device: 'iPhone 13', location: 'New York, US', time: '2 hours ago' },
            { device: 'Chrome Browser', location: 'Los Angeles, US', time: '1 day ago' }
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">{session.device}</p>
                <p className="text-sm text-gray-500">{session.location} • {session.time}</p>
              </div>
              {index !== 0 && (
                <Button variant="outline" size="sm">Revoke</Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Theme</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: 'Light', active: true },
            { name: 'Dark', active: false },
            { name: 'Auto', active: false }
          ].map((theme, index) => (
            <div
              key={index}
              className={`p-4 border-2 rounded-lg cursor-pointer ${
                theme.active ? 'border-black' : 'border-gray-200'
              }`}
            >
              <div className={`h-20 rounded mb-2 ${
                theme.name === 'Light' ? 'bg-white border' :
                theme.name === 'Dark' ? 'bg-gray-900' : 'bg-gradient-to-r from-white to-gray-900'
              }`}></div>
              <p className="text-sm font-medium text-center">{theme.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Brand Colors</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
            <div className="flex items-center space-x-2">
              <input type="color" defaultValue="#000000" className="w-12 h-10 border border-gray-300 rounded" />
              <input
                type="text"
                defaultValue="#000000"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
            <div className="flex items-center space-x-2">
              <input type="color" defaultValue="#666666" className="w-12 h-10 border border-gray-300 rounded" />
              <input
                type="text"
                defaultValue="#666666"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DataSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Data Export</h3>
        <div className="space-y-4">
          {[
            { label: 'Export All Data', description: 'Download all your store data in JSON format' },
            { label: 'Export Orders', description: 'Download order history as CSV' },
            { label: 'Export Customers', description: 'Download customer data as CSV' },
            { label: 'Export Products', description: 'Download product catalog as CSV' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Data Retention</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order Data Retention</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="5">5 Years</option>
              <option value="forever">Forever</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Data Retention</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
              <option value="2">2 Years</option>
              <option value="5">5 Years</option>
              <option value="forever">Forever</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'data':
        return <DataSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your store settings and preferences</p>
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {renderTabContent()}
            
            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-end">
                <Button className="bg-black text-white hover:bg-gray-800">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

