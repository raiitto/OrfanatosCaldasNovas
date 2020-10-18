import React, {createContext, useContext, useEffect, useState} from "react";
import * as auth from '../services/auth';
import api from "../services/api";

interface AuthContextData {
    signed: boolean;
    user: object | null;
    signIn(): Promise<void>
    signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [ user, setUser ] = useState<object | null>(null);

    useEffect(()=>{
        const storagedUser = localStorage.getItem('user');
        const storagedToken = localStorage.getItem('token');

        if(storagedUser && storagedToken){
            api.defaults.headers['Autorization'] = `Bearer ${storagedToken}`
            setUser(JSON.parse(storagedUser));
        }

    }, [])

    async function signIn() {
        const response = await auth.signIn()
        setUser(response.user);

        api.defaults.headers['Autorization'] = `Bearer ${response.token}`

        localStorage.setItem('user',JSON.stringify(response.user))
        localStorage.setItem('token',response.token)

    }
    function signOut() {
        setUser(null);
        localStorage.clear();
    }
    return (
        <AuthContext.Provider value={{signed: !!user, user: user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth(){
    return useContext(AuthContext);
}