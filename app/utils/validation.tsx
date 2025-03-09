export function validatePassword(password: string, confirmPassword?: string): { valid: boolean, error?: string } {
    if (confirmPassword !== undefined && password !== confirmPassword) {
      return { valid: false, error: "Passwords don't match" };
    }
    
    if (password.length < 8) {
      return { valid: false, error: "Password must be at least 8 characters" };
    }
    
    // Add more complex validation as needed:
    // const hasUpperCase = /[A-Z]/.test(password);
    // const hasNumber = /[0-9]/.test(password);
    // const hasSpecialChar = /[!@#$%^&*]/.test(password);
    
    return { valid: true };
  }
  
  export function validateUsername(username: string): { valid: boolean, error?: string } {
    if (username.length < 3) {
      return { valid: false, error: "Username must be at least 3 characters" };
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return { valid: false, error: "Username can only contain letters, numbers, and underscores" };
    }
    
    return { valid: true };
  }
  
  export function validateEmail(email: string): { valid: boolean, error?: string } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      return { valid: false, error: "Please enter a valid email address" };
    }
    
    return { valid: true };
  }