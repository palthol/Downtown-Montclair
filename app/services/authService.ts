import { supabase } from '~/supabase/supabaseClient';
import type { AuthResult, LoginFormData, RegistrationFormData } from '~/types/auth';
import type { Profile, ProfileCreationParams } from '~/types/profile';

export async function loginUser(credentials: LoginFormData): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email: credentials.email, 
      password: credentials.password 
    });
    
    if (error) throw new Error(error.message || 'Login failed');
    
    return { success: true, data };
  } catch (err) {
    console.error("Login error:", err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'Login failed. Please try again.'
    };
  }
}

export async function fetchProfile(userId: string): Promise<AuthResult> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw new Error('Error fetching user profile');
    
    return { success: true, data };
  } catch (err) {
    console.error("Profile fetch error:", err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'Failed to fetch profile'
    };
  }
}

// Add this to authService.ts
export async function registerUser(formData: RegistrationFormData): Promise<AuthResult> {
  try {
    // Check username availability
    const { data: existingUsers, error: usernameCheckError } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', formData.username);
    
    if (usernameCheckError) throw new Error('Error checking username availability');
    if (existingUsers && existingUsers.length > 0) {
      return { success: false, error: "Username already taken" };
    }

    // Create auth user
    const { data, error } = await supabase.auth.signUp({
      email: formData.email, 
      password: formData.password
    });
    
    if (error) throw new Error(error.message);
    if (!data?.user?.id) throw new Error("Account created but user ID is missing");

    // Create profile
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      email: formData.email,
      username: formData.username,
      display_name: formData.displayName || null,
      created_at: new Date().toISOString()
    });
    
    if (profileError) throw new Error("Profile creation failed");
    
    return { success: true, data };
  } catch (err) {
    console.error("Registration error:", err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'Registration failed'
    };
  }
}

// Add profile creation function
export async function createProfile(params: ProfileCreationParams): Promise<AuthResult> {
  try {
    const { error } = await supabase.from('profiles').insert({
      id: params.id,
      email: params.email,
      username: params.username,
      display_name: params.display_name
    });
    
    if (error) throw new Error(error.message);
    
    return { success: true };
  } catch (err) {
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'Profile creation failed'
    };
  }
}