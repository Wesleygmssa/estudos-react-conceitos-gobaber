import React, { createContext, useCallback } from 'react';

interface AuthContextData {
    name: string;
    signIn(): void;
}
export const AuthContext = createContext<AuthContextData>({} as AuthContextData); //variavel global

//componente de contexto
export const AuthProvider: React.FC = ({ children }) => {

    const signIn = useCallback(() => {
        console.log('singIn');
    }, []);

    return (

        <AuthContext.Provider value={{ name: 'Wesley', signIn }}>
            {children}
        </AuthContext.Provider>
    );
}

