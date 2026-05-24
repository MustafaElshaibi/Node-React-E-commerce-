import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hover = true,
  glass = false,
  gradient = false,
  ...props
}) => {
  const baseClasses =
    'rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800 transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-400' : '';
  const glassClasses = glass ? 'backdrop-blur-md bg-white/10 dark:bg-white/5 border-white/20' : '';
  const gradientClasses = gradient ? 'bg-gradient-to-br from-primary-500/5 to-accent-500/5' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={`${baseClasses} ${hoverClasses} ${glassClasses} ${gradientClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const ServiceCard = ({ icon: Icon, title, description, badge, onClick, ...props }) => {
  return (
    <Card hover className="p-6 cursor-pointer" onClick={onClick} {...props}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary-500" />
        </div>
        {badge && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400">
            {badge}
          </span>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </Card>
  );
};

export const StatCard = ({ label, value, unit, icon: Icon, trend, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400',
    accent: 'bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400',
    gold: 'bg-gold-50 dark:bg-gold-900/20 text-gold-600 dark:text-gold-400',
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
            {unit && <span className="text-sm text-gray-600 dark:text-gray-400">{unit}</span>}
          </div>
          {trend && (
            <p className={`text-xs mt-2 ${trend > 0 ? 'text-accent-600 dark:text-accent-400' : 'text-red-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </Card>
  );
};

export const NotificationCard = ({ title, message, type = 'info', icon: Icon, action, onClose }) => {
  const typeClasses = {
    success: 'bg-accent-50 dark:bg-accent-900/20 border-accent-200 dark:border-accent-800 text-accent-900 dark:text-accent-100',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
  };

  const iconColorClasses = {
    success: 'text-accent-600 dark:text-accent-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
    info: 'text-blue-600 dark:text-blue-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`rounded-lg border p-4 ${typeClasses[type]}`}
    >
      <div className="flex gap-4">
        {Icon && <Icon className={`w-5 h-5 flex-shrink-0 ${iconColorClasses[type]}`} />}
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">{title}</h3>
          <p className="text-sm opacity-90">{message}</p>
        </div>
        {action && <button className="text-sm font-medium hover:opacity-75">{action}</button>}
        {onClose && (
          <button onClick={onClose} className="text-sm font-medium hover:opacity-75">
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
};

export const FeatureCard = ({ icon: Icon, title, description, color = 'primary' }) => {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    accent: 'from-accent-500 to-accent-600',
    gold: 'from-gold-500 to-gold-600',
  };

  return (
    <Card className="p-8 relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 bg-gradient-to-br ${colorClasses[color]} rounded-full blur-3xl`} />
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center mb-4 relative z-10`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </Card>
  );
};

export default Card;
