import React from 'react';
import { motion } from 'framer-motion';

const Button = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled = false,
      icon: Icon,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = 'font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary:
        'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-md hover:shadow-lg',
      secondary:
        'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 hover:bg-surface-200 dark:hover:bg-gray-700',
      ghost:
        'text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 active:bg-primary-100 dark:active:bg-primary-900/20',
      accent:
        'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-md hover:shadow-lg',
      danger:
        'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-md hover:shadow-lg',
      outline:
        'border border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/10',
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-3 text-lg',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        disabled={disabled || loading}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        {...props}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {!loading && Icon && <Icon className="w-5 h-5" />}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export const IconButton = React.forwardRef(
  ({ icon: Icon, variant = 'ghost', size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    };

    const baseClasses = 'rounded-lg transition-colors flex items-center justify-center disabled:opacity-50';
    const variants = {
      ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
      primary: 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-800',
      accent: 'bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400 hover:bg-accent-100 dark:hover:bg-accent-800',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${baseClasses} ${sizeClasses[size]} ${variants[variant]}`}
        {...props}
      >
        <Icon className="w-5 h-5" />
      </motion.button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default Button;
