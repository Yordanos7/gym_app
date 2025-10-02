// gymapp/app/hooks/useAuth.ts this component is for ..
import { useState, useEffect, createContext, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { loginUser, registerUser } from "../services/authService"; // Assuming you'll create this service
import { User } from "../constants/types"; // Import User interface that is merrior for the modele on the database

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined); // i write this line of code is context for auth

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // this function will load the auth data from SecureStore, SecureStore is a way to store data on the device using secure storage
    const loadAuthData = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("userToken");
        const storedUser = await SecureStore.getItemAsync("userData");
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to load auth data from SecureStore", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAuthData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user: loggedInUser, token: authToken } = await loginUser(
        email,
        password
      );
      await SecureStore.setItemAsync("userToken", authToken);
      await SecureStore.setItemAsync("userData", JSON.stringify(loggedInUser));
      setToken(authToken);
      setUser(loggedInUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const newUser = await registerUser(email, password, name);
      // After registration, you might want to automatically log them in
      // or navigate them to the login screen. For now, let's just log them in.
      const { user: loggedInUser, token: authToken } = await loginUser(
        email,
        password
      );
      await SecureStore.setItemAsync("userToken", authToken);
      await SecureStore.setItemAsync("userData", JSON.stringify(loggedInUser));
      setToken(authToken);
      setUser(loggedInUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("userToken");
      await SecureStore.deleteItemAsync("userData");
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
