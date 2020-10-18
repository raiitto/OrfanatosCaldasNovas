import React, {createContext, useContext, useEffect, useState} from "react";
import api from "../services/api";

interface AuthContextData {
    signed: boolean;
    user: string | null;
    signIn(user:string, pass:string, remember: boolean): Promise<void>
    signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [ user, setUser ] = useState<string | null>(null);

    useEffect(()=>{
        const storagedUser = localStorage.getItem('user');
        const storagedToken = localStorage.getItem('token');

        if(storagedUser && storagedToken){
            api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`
            setUser(JSON.parse(storagedUser));
        }

    }, [])

    async function signIn(user:string, pass:string, remember: boolean) {
        try{
            const {data} = await api.post('login', {username: user, password: pass})
            setUser(user);
            api.defaults.headers['Authorization'] = `Bearer ${data.token}`

            if(remember){
                localStorage.setItem('user',JSON.stringify(user))
                localStorage.setItem('token', data.token)
            }
        }catch (error){
            if(error.response.data.error){
                alert(error.response.data.error)
            }
        }

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