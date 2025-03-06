import { useState, useEffect } from 'react'; 
import type { FormEvent, ChangeEvent } from 'react';
import type { Route } from "./+types/userSettings";
import NavBar from "~/components/UI-Components/navbar";
import Footer from "~/components/UI-Components/footer";
import { AuthProvider } from "~/context/AuthContext";
import { supabase } from "~/supabase/supabaseClient";

// Define types for user and profile
interface User {
  id: string;
  email: string;
  // Add other user properties as needed
}

interface Profile {
  id: string;
  username: string;
  display_name?: string | null;
  bio?: string | null;
  // Add other profile properties as needed
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profile Settings - Downtown Montclair" },
    { name: "description", content: "Update your profile information" },
  ];
}

export default function UserSettings() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <ProfilePage />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

function ProfilePage() {
  // Fix type assignments on state variables
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load user data
  useEffect(() => {
    async function loadUserData() {
      try {
        // Get current user
        const { data } = await supabase.auth.getUser();
        if (!data.user) {
          setLoading(false);
          return;
        }
        
        // Type assertion to match our interface
        setUser(data.user as User);
        
        // Get user profile
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (error) {
          console.error('Error fetching profile:', error);
          setLoading(false);
          return;
        }
        
        setProfile(profileData as Profile);
        setUsername(profileData.username || '');
        setDisplayName(profileData.display_name || '');
        setBio(profileData.bio || '');
      } catch (err) {
        console.error('Error loading user data:', err);
      } finally {
        setLoading(false);
      }
    }
    
    loadUserData();
  }, []);
  
  // Handle form submission with proper event type
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setIsError(false);
    
    try {
      if (!user || !profile) return;
      
      // Check if username is taken (if changed)
      if (username !== profile.username) {
        const { data: existingUsers } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', username)
          .neq('id', user.id);
          
        if (existingUsers && existingUsers.length > 0) {
          setMessage('Username already taken');
          setIsError(true);
          setSaving(false);
          return;
        }
      }
      
      // Update profile
      const { error } = await supabase
        .from('profiles')
        .update({
          username: username,
          display_name: displayName,
          bio: bio,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      setMessage('Profile updated successfully!');
      
      // Refresh profile data
      const { data: updatedProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (updatedProfile) {
        setProfile(updatedProfile as Profile);
      }
      
    } catch (err) {
      console.error('Error updating profile:', err);
      setMessage('Failed to update profile');
      setIsError(true);
    } finally {
      setSaving(false);
    }
  };
  
  // Add type to input event handlers
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'username') setUsername(value);
    if (id === 'displayName') setDisplayName(value);
  };
  
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  // Rest of your component remains the same
  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!user || !profile) {
    return (
      <div className="text-center py-10 text-lg">
        Please log in to access your profile settings
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        {message && (
          <div className={`p-3 mb-4 rounded ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              value={user.email} 
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
            <input 
              type="text" 
              id="username"
              value={username} 
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required
            />
          </div>
          
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium mb-1">Display Name</label>
            <input 
              type="text" 
              id="displayName"
              value={displayName} 
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
            <textarea 
              id="bio"
              value={bio} 
              onChange={handleTextareaChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={saving}
            className={`px-4 py-2 rounded text-white ${saving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}