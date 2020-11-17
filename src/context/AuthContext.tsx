import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface AuthState {
    token: string;
    user: object;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
}
//variavel global
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

//componente de contexto:  
export const AuthProvider: React.FC = ({ children }) => {


    const [data, setData] = useState<AuthState>(() => {
        //já foi feito o login
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');

        if (token && user) {
            return {
                token,
                user: JSON.parse(user)
            }
        }

        return {} as AuthState;
    });

    //fazendo login
    const signIn = useCallback(async ({ email, password }) => {

        const response = await api.post('/sessions', {
            email,
            password
        })

        const { token, user } = response.data;

        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));

        setData({ token, user });
    }, []);

    return (

        <AuthContext.Provider value={{ user: data.user, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}

