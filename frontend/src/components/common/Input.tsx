'use client';

import { ChangeEvent, ReactNode, forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  variant?: 'default' | 'outlined' | 'filled';
  onChangeValue?: (value: string) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      error,
      icon,
      rightIcon,
      className = '',
      fullWidth = true,
      variant = 'default',
      onChangeValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e);
      if (onChangeValue) onChangeValue(e.target.value);
    };

    const getInputClasses = () => {
      const baseClasses =
        'rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200';
      const widthClasses = fullWidth ? 'w-full' : '';
      const iconClasses = icon ? 'pl-11' : '';
      const errorClasses = error ? 'border-red-500' : 'border-gray-300';
      const variantClasses = {
        default: 'border',
        outlined: 'border',
        filled: 'bg-gray-100',
      }[variant];

      return `${baseClasses} ${widthClasses} ${iconClasses} ${errorClasses} ${variantClasses} ${className}`;
    };

    return (
      <div className={`space-y-2 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label htmlFor={id} className="block text-sm font-bold text-gray-700">
            {label}
          </label>
        )}
        <div className="relative rounded-md shadow-sm">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              {icon}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            className={getInputClasses()}
            onChange={handleChange}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">{rightIcon}</div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
