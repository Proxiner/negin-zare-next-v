import React, { useState } from 'react';
import { AuthContext } from './Auth.jsx';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
