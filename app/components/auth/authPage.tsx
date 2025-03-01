import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '~/supabase/supabaseClient';

type AuthTab = 'login' | 'register';

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
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (authError || !data.session) {
      setError(authError?.message ?? 'Login failed. Please try again.');
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 transition-all duration-300 ease-in-out">
      {error && (
        <div role="alert" className="p-3 border border-red-500 text-red-500 rounded">
          {error}
        </div>
      )}
      <input
        ref={emailRef}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

function RegistrationForm(): React.ReactElement {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  // Automatically focus the email field when the component mounts or toggles
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }
    // Optionally, you can update the user profile using the provided name here.
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
      <input
        ref={emailRef}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}