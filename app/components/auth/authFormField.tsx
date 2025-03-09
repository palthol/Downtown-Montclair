import React, { forwardRef } from 'react';
import type { FormFieldProps } from '~/types/ui';

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({
  type,
  placeholder,
  value,
  onChange,
  id,
  label,
  required = false,
  autoComplete,
  className = "w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
  error
}, ref) => {
  const inputId = id ?? `field-${type}-${Math.random().toString(36).substring(2, 9)}`;
  
  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="block text-gray-700 font-medium mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} ${error ? 'border-red-500' : ''}`}
        autoComplete={autoComplete}
        required={required}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

FormField.displayName = "FormField";

export default FormField;