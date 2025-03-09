/**
 * Profile-related type definitions
 */

// User profile from database
export interface Profile {
    id: string;
    email: string;
    username: string;
    display_name?: string | null;
    bio?: string | null;
    profile_picture_url?: string | null;
    social_links?: Record<string, string> | null;
    created_at?: string;
    updated_at?: string;
  }
  
  // Profile creation params
  export interface ProfileCreationParams {
    id: string;
    email: string;
    username: string;
    display_name?: string | null;
  }