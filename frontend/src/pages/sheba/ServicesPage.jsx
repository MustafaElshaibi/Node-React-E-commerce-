import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, Clock, DollarSign, CheckCircle, Card as CardIcon } from 'lucide-react';
import { Card, ServiceCard } from '@/components/common/Card';
import Button from '@/components/common/Button';
import { Input } from '@/components/common/Form';
import { services, ministries } from '@/constants/mockData';

const ServicesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [...new Set(services.map((s) => s.category))];
  const statuses = ['active', 'coming-soon', 'beta'];

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.ministry.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || service.category === selectedCategory;
      const matchesStatus = !selectedStatus || service.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary-50 dark:from-primary-900/20 to-transparent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Government Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Browse and apply for services from all government ministries
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 mb-12"
        >
          {/* Search Bar */}
          <div className="relative">
            <Input
              placeholder="Search services by name or ministry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={Search}
              className="text-lg"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>

            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory('')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
              >
                {selectedCategory}
                <X className="w-4 h-4" />
              </button>
            )}

            {selectedStatus && (
              <button
                onClick={() => setSelectedStatus('')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400"
              >
                {selectedStatus}
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-6"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Category
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-primary-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Status
                </h3>
                <div className="space-y-2">
                  {statuses.map((status) => (
                    <label key={status} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={selectedStatus === status}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-4 h-4 text-primary-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold">{filteredServices.length}</span> of {services.length} services
          </p>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full p-6 flex flex-col hover:border-primary-300 dark:hover:border-primary-700">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {service.ministry}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        service.status === 'active'
                          ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400'
                          : 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">
                    {service.description || 'Apply for this service'}
                  </p>

                  {/* Service Details */}
                  <div className="space-y-3 mb-6 py-4 border-y border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Processing Time
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {service.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Fee
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {service.fee}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Eligibility
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {service.eligibility}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button fullWidth size="md" variant="primary">
                    Apply Now
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center mx-auto mb-4">
              <CardIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No services found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your filters or search query
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
                setSelectedStatus('');
              }}
            >
              Reset Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
