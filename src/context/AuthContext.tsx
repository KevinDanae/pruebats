import React, {createContext, useReducer} from 'react';
import {authReducer} from './authReducer';

// Definir como luce o que informacion se va tener
export interface AuthState {
  isLoggedIn: boolean;
  username?: string;
  favoriteIcon?: string;
}

// estado inicial
export const authInicialState: AuthState = {
  isLoggedIn: false,
};

// La usaremos para decirle a react como luce el context
export interface AuthContextProps {
  authState: AuthState;
  signIn: () => void;
  changeFavoriteIcon: (iconName: string) => void;
  logout: () => void;
  changeUser: (username: string) => void;
}

// crear el contexto
export const AuthContext = createContext({} as AuthContextProps);

// Componente que provee el estado
export const AuthProvider = ({children}: any) => {
  const [authState, dispatch] = useReducer(authReducer, authInicialState);

  const signIn = () => {
    dispatch({type: 'signIn'});
  };

  const changeFavoriteIcon = (iconName: string) => {
    dispatch({type: 'changeFavIcon', payload: iconName});
  };

  const logout = () => {
    dispatch({type: 'logout'});
  };

  const changeUser = (username: string) => {
    dispatch({type: 'changeUsername', payload: username});
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        signIn,
        changeFavoriteIcon,
        logout,
        changeUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
