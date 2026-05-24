import React from 'react';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

export const Input = React.forwardRef(
  (
    {
      label,
      error,
      helper,
      icon: Icon,
      type = 'text',
      className = '',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputType = showPassword && type === 'password' ? 'text' : type;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white ${
              Icon ? 'pl-10' : ''
            } ${
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
            } ${className}`}
            {...props}
          />
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        {error && (
          <div className="flex items-center gap-1 mt-2 text-red-600 dark:text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
        {helper && !error && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{helper}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const Select = React.forwardRef(
  ({ label, error, helper, options = [], className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
          } ${className}`}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <div className="flex items-center gap-1 mt-2 text-red-600 dark:text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export const Checkbox = React.forwardRef(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          type="checkbox"
          className={`w-5 h-5 rounded border-2 border-gray-200 dark:border-gray-800 text-primary-500 focus:ring-primary-500 focus:ring-2 cursor-pointer transition-colors ${className}`}
          {...props}
        />
        <div>
          {label && (
            <label className="block text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              {label}
            </label>
          )}
          {error && (
            <div className="flex items-center gap-1 mt-1 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export const Textarea = React.forwardRef(
  (
    {
      label,
      error,
      helper,
      maxLength,
      className = '',
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState(0);

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          maxLength={maxLength}
          onChange={(e) => {
            setCharCount(e.target.value.length);
            props.onChange?.(e);
          }}
          className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-900 dark:border-gray-800 dark:text-white resize-none ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
          } ${className}`}
          {...props}
        />
        <div className="flex justify-between mt-2">
          {error && (
            <div className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
          {maxLength && (
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export const FormGroup = ({ children, className = '' }) => {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
};

export default Input;
