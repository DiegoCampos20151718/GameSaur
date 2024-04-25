// AuthService.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('authToken');
      } catch (e) {
        // Restaurar token falló
      }
      setIsLoggedIn(!!userToken);
      setToken(userToken);
    };

    bootstrapAsync();
  }, []);

  const login = async (TokenData) => {
    await AsyncStorage.setItem('authToken', TokenData);
    setToken(TokenData);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useToken = () => {
  return useContext(AuthContext).token;
};

// AuthService.js (Separate file if necessary or you can include these methods in AuthService.jsx)
export class AuthService {
  static async setToken(token) {
    await AsyncStorage.setItem('authToken', token);
  }

  static async getToken() {
    return await AsyncStorage.getItem('authToken');
  }

  static async removeToken() {
    await AsyncStorage.removeItem('authToken');
  }
}

export default AuthService;
