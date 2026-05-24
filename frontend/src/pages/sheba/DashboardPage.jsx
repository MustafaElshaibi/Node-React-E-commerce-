import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Wallet, FileText, Calendar, MessageSquare, Settings, ChevronRight } from 'lucide-react';
import { Card, StatCard, NotificationCard } from '@/components/common/Card';
import Button from '@/components/common/Button';
import { notifications, recentServices, appointments, announcements } from '@/constants/mockData';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'grid' },
    { id: 'services', label: 'My Services', icon: 'files' },
    { id: 'appointments', label: 'Appointments', icon: 'calendar' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome Back, Ahmed
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Your government services dashboard
              </p>
            </div>
            <Button variant="secondary" icon={Settings}>
              Account Settings
            </Button>
          </div>

          {/* Digital ID Card Preview */}
          <Card className="p-8 bg-gradient-to-br from-primary-500 to-primary-600 text-white border-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-white/80 text-sm uppercase tracking-wide mb-2">National Digital ID</p>
                <h2 className="text-2xl font-bold mb-6">Ahmed Al-Mansouri</h2>
                <div className="text-sm space-y-1">
                  <p>ID: 784-2024-1234567</p>
                  <p>Status: <span className="font-semibold">Active</span></p>
                  <p>Expires: 31 Dec 2026</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-xs uppercase mb-4">Last Verified</p>
                <p className="text-sm">2 hours ago</p>
                <Button variant="secondary" size="sm" className="mt-4">
                  View Full ID
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <motion.div variants={itemVariants}>
            <StatCard
              label="Active Services"
              value="3"
              color="primary"
              icon={FileText}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Pending Requests"
              value="1"
              color="accent"
              icon={Bell}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Upcoming Appointments"
              value="2"
              color="gold"
              icon={Calendar}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              label="Documents"
              value="12"
              color="primary"
              icon={Wallet}
            />
          </motion.div>
        </motion.div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Notifications
            </h2>
            <div className="space-y-3">
              {notifications.slice(0, 3).map((notification) => (
                <NotificationCard
                  key={notification.id}
                  title={notification.title}
                  message={notification.message}
                  type={notification.type}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Services - Larger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Recent Services
            </h2>
            <div className="space-y-3">
              {recentServices.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ x: 4 }}
                  className="cursor-pointer"
                >
                  <Card className="p-4 hover:border-primary-300 dark:hover:border-primary-700">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {service.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {service.ministry}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            service.status === 'completed'
                              ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400'
                              : service.status === 'in-review'
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                          }`}
                        >
                          {service.status === 'in-review'
                            ? `${service.progress}% Complete`
                            : service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                        </span>
                        {service.progress && (
                          <div className="mt-2 w-32 h-2 bg-surface-200 dark:bg-gray-900 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                              style={{ width: `${service.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Appointments */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Upcoming Appointments
              </h3>
              <div className="space-y-3">
                {appointments.slice(0, 2).map((appointment) => (
                  <Card key={appointment.id} className="p-4">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
                      {appointment.service}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Government Announcements
              </h3>
              <div className="space-y-3">
                {announcements.slice(0, 2).map((announcement) => (
                  <Card key={announcement.id} className="p-4">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">
                      {announcement.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {new Date(announcement.date).toLocaleDateString()}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button fullWidth variant="secondary" size="md">
                  Schedule Appointment
                </Button>
                <Button fullWidth variant="secondary" size="md">
                  Contact Support
                </Button>
                <Button fullWidth variant="secondary" size="md">
                  View Documents
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
