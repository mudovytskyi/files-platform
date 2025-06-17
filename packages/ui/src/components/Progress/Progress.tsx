import React from 'react';

interface ProgressProps {
  value: number;
  maxValue?: number;
  className?: string;
  variant?: 'default' | 'success' | 'error';
}

export function Progress({
  value,
  maxValue = 100,
  className = '',
  variant = 'default',
}: ProgressProps) {
  const percentage = Math.min(100, (value / maxValue) * 100);

  const variantStyles = {
    default: 'bg-blue-600',
    success: 'bg-green-600',
    error: 'bg-red-600',
  };

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={maxValue}
      aria-valuenow={value}
      className={`h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
    >
      <div
        className={`h-full transition-all ${variantStyles[variant]}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
