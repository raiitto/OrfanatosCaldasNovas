import React from "react";
import {useHistory} from "react-router-dom";
import {FiArrowLeft} from "react-icons/fi";

import '../../styles/pages/login.css';

import logoVerticalImg from "../../images/logo-vertical.svg";
import Login from "../../components/login/Login";

export default function IndexLogin() {
    const { goBack } = useHistory();
    return (
        <div id="page-login">
            <aside className={"login-sidebar"}>
                <div className="login-sidebar-content-warper">
                    <img src={logoVerticalImg} alt="Happy" />


                    <div className="location">
                        <strong>Caldas Novas</strong>
                        <span>Goiás</span>
                    </div>
                </div>
            </aside>

            <div className="login-content-warper" >
                <button type="button" className="back-button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#15C3D6" />
                </button>
                <Login />
            </div>
        </div>
    );
}