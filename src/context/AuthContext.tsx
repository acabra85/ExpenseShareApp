import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginUser, fetchGroups } from '../api/auth';

// Define a type for the AuthContext value
interface AuthContextType {
  isLoggedIn: boolean;
  jwtToken: string | null;
  message: string;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchProtectedData: () => Promise<any | null>;
  setMessage: (msg: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const API_BASE_URL = 'http://localhost:8080/api';

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setJwtToken(token);
      setIsLoggedIn(true);
      setMessage('Logged in automatically via stored token.');
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setMessage('Attempting to log in...');
    try {
      const data = await loginUser(username, password, API_BASE_URL);
      const token = data.token;
      if (token) {
        localStorage.setItem('jwtToken', token);
        setJwtToken(token);
        setIsLoggedIn(true);
        setMessage('Login successful!');
        return true;
      } else {
        setMessage('Login successful, but no token received. Check backend response.');
        return false;
      }
    } catch (error: any) { // Use 'any' for now, or define a specific error type
      setMessage(`Login failed: ${error.message || 'Unknown error'}`);
      setIsLoggedIn(false);
      setJwtToken(null);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    setJwtToken(null);
    setMessage('You have been logged out.');
  };

  const fetchProtectedData = async (): Promise<any | null> => {
    if (!jwtToken) {
      setMessage('No token available to fetch protected data. Please log in.');
      return null;
    }
    setMessage('Fetching protected data...');
    try {
      const responseData = await fetchGroups(jwtToken, API_BASE_URL);
      setMessage('Successfully fetched protected data!');
      return responseData;
    } catch (error: any) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        setMessage('Access denied. Your token might be invalid or expired. Please log in again.');
        logout();
      } else {
        setMessage(`Failed to fetch protected data: ${error.message || 'Network error'}`);
      }
      return null;
    }
  };

  const authContextValue: AuthContextType = {
    isLoggedIn,
    jwtToken,
    message,
    loading,
    login,
    logout,
    fetchProtectedData,
    setMessage
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
