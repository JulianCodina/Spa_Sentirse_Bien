import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { registerRequest, loginRequest, verificarToken } from "../api/auth";
import Cookies from 'js-cookie';
import IUser from '../types/IUser.ts';

// Definir la interfaz para el usuario


// Definir la interfaz del contexto de autenticación
interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  errors: string[];
  signup: (user: IUser) => Promise<void>;
  signin: (user: IUser) => Promise<void>;
}

// Crear contexto con el tipo definido
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth debe estar dentro de un AuthProvider");
  }

  return context;
};

// Definir las props del AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const signup = async (user: IUser) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        setErrors([error.message]); // Manejo básico del error
      } else {
        setErrors(['Error desconocido']);
      }
    }
  };
  
  const signin = async (user: IUser) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors([error.message]);
      } else {
        setErrors(['Error desconocido']);
      }
    }
  };
  

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verificarToken();
        console.log(res);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data.user);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        console.log(error);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{
      signup,
      signin,
      loading,
      user,
      isAuthenticated,
      errors,
    }}>
      {children}
    </AuthContext.Provider>
  );
};