import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, UserRole } from '../types/user';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Simular verificación de autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // En una app real, aquí verificaríamos el token con el backend
        const savedUser = localStorage.getItem('saludconectada_user');
        
        if (savedUser) {
          const user = JSON.parse(savedUser);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // SIMULACIÓN DE LOGIN - En una app real, esto sería una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Determinar rol basado en el email (esto es temporal)
      let role: UserRole = 'patient';
      if (credentials.email.includes('doctor')) role = 'doctor';
      if (credentials.email.includes('admin')) role = 'admin';

      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: credentials.email,
        name: credentials.email.split('@')[0],
        role: role,
        createdAt: new Date().toISOString(),
      };

      // Guardar en localStorage (simulando token)
      localStorage.setItem('saludconectada_user', JSON.stringify(user));

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw new Error('Error en el login. Por favor, intenta nuevamente.');
    }
  };

  const logout = (): void => {
    localStorage.removeItem('saludconectada_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateUser = (userData: Partial<User>): void => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      setAuthState(prev => ({ ...prev, user: updatedUser }));
      localStorage.setItem('saludconectada_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};