import React, { useState, useEffect } from 'react';
import { AuthContext } from './auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('eventManagerUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // Allow any email and password combination for demo purposes
    const mockUser = {
      id: Date.now().toString(),
      name: userData.email.split('@')[0], // Use email prefix as name
      email: userData.email,
      username: userData.email.split('@')[0],
      createdAt: new Date().toISOString()
    };
    
    setUser(mockUser);
    localStorage.setItem('eventManagerUser', JSON.stringify(mockUser));
    return { success: true };
  };

  const register = (userData) => {
    // In a real app, this would make an API call
    const users = JSON.parse(localStorage.getItem('eventManagerUsers') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === userData.email)) {
      return { success: false, error: 'User already exists' };
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('eventManagerUsers', JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('eventManagerUser', JSON.stringify(userWithoutPassword));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('eventManagerUser');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};