import React, { FormEvent, useState} from "react";
import { Link } from 'react-router-dom';
import { FiCheck } from "react-icons/fi";
import { useAuth } from "../../contexts/auth";

import '../../styles/components/login/login.css';

export default function Login(){
    const [ user, setUser] = useState('');
    const [ pass, setPass] = useState('');
    const [ remember, setRemember ] = useState(false);

    const { signIn} = useAuth();


    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        //console.log('agora', signed);
        if (user.length<1||pass.length<1){
            return;
        }
        await signIn();
    }

    return (
        <form className="login-component-content-warper" onSubmit={handleSubmit}>
            <label className={"title"}>Fazer Login</label>
            <label className={"input-description"}>E-mail</label>
            <input
                className={user.length>0? "active": ''}
                name="username"
                value={user}
                onChange={event => { setUser(event.target.value)}}
            />
            <label className={"input-description"}>Senha</label>
            <input
                className={pass.length>0? "active": ''}
                name="password"
                type={"password"}
                value={pass}
                onChange={event => { setPass(event.target.value)}}
            />
            <div className={"checkbox-line"}>
                <div>
                    <div
                        className={["checkbox", remember ? "checkbox-checked" : "checkbox-unchecked"].join(" ")}
                        onClick={() => {setRemember(!remember)}}
                    >
                        {remember && <FiCheck color={"#FFF"} size={10} strokeWidth={6}/>}
                    </div>
                    <label className={"input-description"}>Lembrar-me</label>
                </div>
                <Link to={""} className={"input-description"}>Esqueci minha senha</Link>
            </div>

            <button
                className={["login-button", user.length>0&&pass.length>0 ? 'active' : ''].join(" ")}
                type="submit"
            >
                Entrar
            </button>
        </form>
    );
}