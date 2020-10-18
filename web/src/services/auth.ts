import api from "./api";

export interface Response {
    token: string;
    expiresIn: number;
}


export function signIn(username: string, password: string): Promise<Response>{
        return api.post('login', {username, password})
}