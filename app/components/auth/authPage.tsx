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

    try {
      // Step 1: Authenticate the user
      console.log("Attempting to sign in with email:", email);
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (authError) {
        console.error("Authentication error:", authError);
        throw new Error(authError.message || 'Login failed. Please try again.');
      }
      
      if (!data || !data.session) {
        console.error("No session returned after login");
        throw new Error('Login succeeded but no session was created. Please try again.');
      }

      console.log("Login successful, checking for user profile...");
      
      // Step 2: Verify that a profile exists for this user
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      if (profileError) {
        console.error("Profile fetch error:", profileError);
        
        // Check if it's a "not found" error or something else
        if (profileError.code === "PGRST116") {
          console.warn("Profile not found, attempting to create one");
          
          // Try to create a profile as fallback
          const { error: createProfileError } = await supabase
            .from('profiles')
            .insert([{
              id: data.user.id,
              email: email,
              username: `user_${data.user.id.substring(0, 8)}`,
            }]);
            
          if (createProfileError) {
            console.error("Failed to create missing profile:", createProfileError);
            setError("Account exists but profile creation failed. Please contact support.");
            setLoading(false);
            return;
          } else {
            console.log("Created new profile successfully");
          }
        } else {
          // Not a "not found" error, something else is wrong
          setError("Account exists but profile access failed. Please contact support.");
          setLoading(false);
          return;
        }
      } else {
        console.log("Profile found:", profileData);
      }
      
      // Login successful, navigate home
      console.log("Login complete, navigating to home page");
      navigate('/');
      
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
        className="w-full border p-3 sm:p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        className="w-full border p-3 sm:p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation remains the same
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Username check remains the same
      console.log("Checking username availability");
      const { data: existingUsers, error: usernameCheckError } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username);
      
      if (usernameCheckError) {
        console.warn("Username check error:", usernameCheckError);
      }
      
      if (existingUsers && existingUsers.length > 0) {
        throw new Error("Username already taken. Please choose another.");
      }
  
      // Auth user creation remains the same
      console.log("Creating new auth user");
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (signUpError) {
        throw new Error(signUpError.message || "Registration failed. Please try again.");
      }
      
      if (!authData?.user?.id) {
        throw new Error("Auth account created but user ID is missing");
      }
      
      console.log("Auth user created with ID:", authData.user.id);
      
      // Create profile remains the same
      console.log("Creating profile for new user");
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        email: email,
        username: username,
        display_name: displayName || null,
        created_at: new Date().toISOString()
      });
      
      if (profileError) {
        console.error("Profile creation error:", profileError);
        // Alert but don't prevent continuation
        alert("Account created, but profile setup had issues. Some features may be limited until resolved.");
      }
      
      // Success! Now let's automatically sign them in instead of making them log in again
      console.log("Signing in the new user automatically");
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (signInError) {
        console.error("Auto sign-in failed:", signInError);
        // If auto-login fails, redirect to login screen
        alert("Account created successfully! Please log in with your new credentials.");
        navigate('/auth');
      } else {
        // Success! User is registered AND logged in
        console.log("Registration and login complete!");
        // Redirect to home or welcome page
        navigate('/'); // Or '/welcome' if you have a welcome page
      }
      
    } catch (err) {
      console.error("Registration error:", err);
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Return the form...
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
          Email
        </label>
        <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoComplete="email"
        required
        />
      </div>
      
      <div>
        <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
          Username
        </label>
        <input
         id="username"
         type="text"
         value={username}
         onChange={(e) => setUsername(e.target.value)}
         className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
         autoComplete="username"
         required
        />
      </div>
      
      <div>
        <label htmlFor="displayName" className="block text-gray-700 font-medium mb-1">
          Display Name (optional)
        </label>
        <input
   id="displayName"
   type="text"
   value={displayName}
   onChange={(e) => setDisplayName(e.target.value)}
   className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
   autoComplete="name"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
          Password
        </label>
        <input
         id="password"
         type="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
         autoComplete="new-password"
         required
        />
      </div>
      
      <div>
        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
          Confirm Password
        </label>
        <input
         id="confirmPassword"
         type="password"
         value={confirmPassword}
         onChange={(e) => setConfirmPassword(e.target.value)}
         className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
         autoComplete="new-password"
         required
        />
      </div>
      
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