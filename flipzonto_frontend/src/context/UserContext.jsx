// src/context/UserContext.jsx
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On mount, try to get user info from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    console.log("User from localStorage:", savedUser); // Debug log
  
    if (savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
      try {
        setUser(JSON.parse(savedUser)); // Parse the stored user
      } catch (error) {
        console.error("Error parsing user:", error);
        localStorage.removeItem('user'); // Remove invalid data
      }
    }
  }, []);
  

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};