/**
 * Auth-related type definitions
 */

// Tab selection for auth forms
export type AuthTab = 'login' | 'register';

// Props for the auth tab switcher
export interface AuthSwitcherProps {
  activeTab: AuthTab;
  setActiveTab: (tab: AuthTab) => void;
}

// Form submission results
export interface AuthResult {
  success: boolean;
  data?: any;
  error?: string | null;
}

// Login form data
export interface LoginFormData {
  email: string;
  password: string;
}

// Registration form data
export interface RegistrationFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  displayName?: string;
}

// Form submission status
export interface FormStatus {
  loading: boolean;
  error: string | null;
}