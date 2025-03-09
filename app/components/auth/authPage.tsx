import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AuthTab } from '~/types/auth';
import { loginUser, registerUser } from '~/services/authService';
import { validateEmail, validatePassword, validateUsername } from '~/utils/validation';
import FormField from './authFormField';

export default function AuthPage(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const navigate = useNavigate();

  // Handler to go back home
  const handleBack = () => navigate('/');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded shadow-lg p-6 w-full max-w-md overflow-hidden">
        {/* Back to Home Button */}
        <button
          onClick={handleBack}
          className="absolute top-2 left-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          Back
        </button>

        {/* Switcher Tabs */}
        <AuthSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Render the corresponding modal form with simple animation */}
        <div className="relative">
          {activeTab === 'login' ? (
            <LoginForm key="login" />
          ) : (
            <RegistrationForm key="register" />
          )}
        </div>
      </div>
    </div>
  );
}

interface AuthSwitcherProps {
  activeTab: AuthTab;
  setActiveTab: (tab: AuthTab) => void;
}

function AuthSwitcher({ activeTab, setActiveTab }: AuthSwitcherProps): React.ReactElement {
  return (
    <div className="flex mb-4 border-b">
      <button
        onClick={() => setActiveTab('login')}
        className={`flex-1 py-2 text-center transition-colors duration-300 ${
          activeTab === 'login'
            ? 'border-b-2 border-blue-500 font-semibold text-blue-600'
            : 'text-gray-500'
        }`}
      >
        Login
      </button>
      <button
        onClick={() => setActiveTab('register')}
        className={`flex-1 py-2 text-center transition-colors duration-300 ${
          activeTab === 'register'
            ? 'border-b-2 border-blue-500 font-semibold text-blue-600'
            : 'text-gray-500'
        }`}
      >
        Register
      </button>
    </div>
  );
}

function LoginForm(): React.ReactElement {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  // Automatically focus the email field when the component mounts
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Using service instead of direct Supabase calls
    const result = await loginUser({ email, password });
    
    if (!result.success) {
      setError(result.error ?? 'Login failed. Please try again.');
      setLoading(false);
      return;
    }
    
    // Login successful, navigate home
    navigate('/');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 transition-all duration-300 ease-in-out">
      {error && (
        <div role="alert" className="p-3 border border-red-500 text-red-500 rounded">
          {error}
        </div>
      )}
      
      <FormField 
        ref={emailRef}
        type="email"
        placeholder="Email"
        value={email}
        onChange={setEmail}
        autoComplete="email"
        required
      />
      
      <FormField 
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
        autoComplete="current-password"
        required
      />
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 sm:py-2 rounded hover:bg-blue-700 transition duration-300 text-lg"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

function RegistrationForm(): React.ReactElement {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const emailRef = useRef<HTMLInputElement>(null);

  // Focus email field on component mount
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      setError(emailCheck.error ?? "Invalid email"); // Use fallback message
      return;
    }
    
    // Validate username
    const usernameCheck = validateUsername(username);
    if (!usernameCheck.valid) {
      setError(usernameCheck.error ?? "Invalid username");
      return;
    }
    
    // Validate password
    const passwordCheck = validatePassword(password, confirmPassword);
    if (!passwordCheck.valid) {
      setError(passwordCheck.error ?? "Invalid password");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Use registration service
    const registrationResult = await registerUser({
      email,
      username,
      password,
      confirmPassword,
      displayName
    });
    
    if (!registrationResult.success) {
      setError(registrationResult.error ?? "Registration failed");
      setLoading(false);
      return;
    }
    
    // Success! User is registered
    navigate('/');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}
      
      <FormField
        ref={emailRef}
        type="email"
        label="Email"
        value={email}
        onChange={setEmail}
        autoComplete="email"
        required
      />
      
      <FormField
        type="text"
        label="Username"
        value={username}
        onChange={setUsername}
        autoComplete="username"
        required
      />
      
      <FormField
        type="text"
        label="Display Name (optional)"
        value={displayName}
        onChange={setDisplayName}
        autoComplete="name"
      />
      
      <FormField
        type="password"
        label="Password"
        value={password}
        onChange={setPassword}
        autoComplete="new-password"
        required
      />
      
      <FormField
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        autoComplete="new-password"
        required
      />
      
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        } transition-colors duration-300`}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}