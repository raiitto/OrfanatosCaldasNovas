interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    }
}

export function signIn(): Promise<Response>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({
                token: 'sanbbasd549erfowifhjaspf',
                user: {
                    name: 'UsuarioNome',
                    email: 'usuarioemail@email.com'
                }
            })
        }, 2000);
    })
}