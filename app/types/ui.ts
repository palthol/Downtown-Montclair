/**
 * UI component type definitions
 */

// Form field props
export interface FormFieldProps {
    type: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    id?: string;
    label?: string;
    required?: boolean;
    autoComplete?: string;
    className?: string;
    error?: string;
  }
  
  // Button props
  export interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    text: string;
    className?: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  }
  
  // Error alert props
  export interface ErrorAlertProps {
    message: string;
    onDismiss?: () => void;
  }