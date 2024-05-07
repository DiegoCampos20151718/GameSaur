import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (TokenData: string) => Promise<void>;
  logout: () => Promise<void>;
  token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: string | null = null;
      try {
        userToken = await AsyncStorage.getItem('authToken');
      } catch (e) {
        // Restore token failed
      }
      setIsLoggedIn(!!userToken);
      setToken(userToken ?? '');
    };

    bootstrapAsync();
  }, []);

  const login = async (TokenData: string) => {
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useToken = (): string => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useToken must be used within an AuthProvider');
  }
  return context.token;
};

export class AuthService {
  static async setToken(token: string): Promise<void> {
    await AsyncStorage.setItem('authToken', token);
  }

  static async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem('authToken');
  }

  static async removeToken(): Promise<void> {
    await AsyncStorage.removeItem('authToken');
  }
}

export default AuthService;
