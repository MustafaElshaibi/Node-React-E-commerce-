import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, Heart, Book, Building, FileText, Scale,
  ArrowRight, Check, Zap, Lock, Users, TrendingUp,
  Smartphone, Download, QrCode, Fingerprint
} from 'lucide-react';
import Button from '@/components/common/Button';
import { Card, StatCard, FeatureCard } from '@/components/common/Card';
import { ministries, statistics } from '@/constants/mockData';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const features = [
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Your digital identity is protected with military-grade encryption and biometric authentication.',
      color: 'primary',
    },
    {
      icon: Zap,
      title: 'Instant Processing',
      description: 'Submit applications and receive approvals in minutes, not days.',
      color: 'accent',
    },
    {
      icon: Lock,
      title: 'Complete Privacy',
      description: 'Your data is never shared without explicit consent. Full transparency and control.',
      color: 'gold',
    },
    {
      icon: Users,
      title: 'Unified Access',
      description: 'Access all government services through one secure digital identity.',
      color: 'primary',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Register Your Identity',
      description: 'Create a secure Sheba account with your national ID and biometric verification.',
    },
    {
      number: '02',
      title: 'Add Digital Documents',
      description: 'Link all your government documents and certifications to your profile.',
    },
    {
      number: '03',
      title: 'Access Services',
      description: 'Browse and apply for any government service with pre-filled information.',
    },
    {
      number: '04',
      title: 'Track Progress',
      description: 'Monitor your applications in real-time with instant notifications.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-b from-primary-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-t from-accent-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  Trusted by 4.5M citizens
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Government at the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">Speed of Life</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Sheba is the unified gateway connecting citizens and residents with all government services through one secure digital identity.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="rounded-full px-8">
                Start Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8">
                Learn More
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-12 border-t border-gray-200 dark:border-gray-800"
            >
              <div>
                <p className="text-3xl font-bold text-primary-500">{statistics.totalCitizens}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Citizens & Residents</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent-500">{statistics.completedServices}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Services Completed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gold-500">{statistics.avgProcessingTime}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Average Processing</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Sheba?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience government services redesigned for the modern citizen.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ministries Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Integrated Government Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Access services from all major ministries through one platform
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {ministries.map((ministry) => (
              <motion.div key={ministry.id} variants={itemVariants}>
                <Card className="p-6 text-center hover:scale-105 cursor-pointer">
                  <div
                    className="w-16 h-16 rounded-lg mx-auto mb-4 flex items-center justify-center text-white"
                    style={{ backgroundColor: ministry.color }}
                  >
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {ministry.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {ministry.description}
                  </p>
                  <p className="text-sm font-semibold text-primary-500">
                    {ministry.services} Services
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Getting Started is Simple
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step, index) => (
              <motion.div key={index} variants={itemVariants} className="relative">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-2xl mb-4 relative z-10">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-lg text-center text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-4 w-8 h-1 bg-gradient-to-r from-primary-500 to-transparent" />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-3xl" />
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-xl">
                <div className="space-y-6">
                  {[
                    { icon: Lock, label: 'End-to-End Encryption', desc: 'Military-grade security' },
                    { icon: Fingerprint, label: 'Biometric Authentication', desc: 'Your data, your control' },
                    { icon: Shield, label: 'Zero-Trust Architecture', desc: 'Every access verified' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent-50 dark:bg-accent-900/20 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{item.label}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                Security You Can Trust
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Your government digital identity is the most important thing you own. We protect it like it's our own.
              </p>
              <ul className="space-y-3">
                {[
                  'ISO 27001 & SOC 2 Certified',
                  'Regular Third-Party Audits',
                  'Transparent Security Reports',
                  'Zero-Knowledge Architecture',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent-500" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Government in Your Pocket
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Download the Sheba app for instant access to all government services from anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" size="lg" icon={Download}>
                  App Store
                </Button>
                <Button variant="secondary" size="lg" icon={Download}>
                  Google Play
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-96"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-3xl" />
              <div className="relative bg-white/10 rounded-3xl h-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                <Smartphone className="w-24 h-24 text-white/50" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              Ready to Experience Digital Government?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Join millions of citizens already using Sheba for seamless government services.
            </p>
            <Button size="lg" className="rounded-full px-8">
              Create Your Account
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
