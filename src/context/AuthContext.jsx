import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState(null);

  // Check if already authenticated on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('dashboard_auth');
    if (savedAuth) {
      setPassword(savedAuth);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (inputPassword) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: inputPassword }),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem('dashboard_auth', inputPassword);
        setPassword(inputPassword);
        setIsAuthenticated(true);
        return { success: true };
      }

      return { success: false, error: data.error || 'Invalid password' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Connection error. Please try again.' };
    }
  };

  const logout = () => {
    sessionStorage.removeItem('dashboard_auth');
    setPassword(null);
    setIsAuthenticated(false);
  };

  // Helper to get auth header for API calls
  const getAuthHeader = () => {
    return password ? { 'x-dashboard-auth': password } : {};
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
    getAuthHeader,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
