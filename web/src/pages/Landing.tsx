import React from 'react';
import {FiArrowRight} from 'react-icons/fi';

import { Link } from 'react-router-dom';

import '../styles/pages/landing.css';

import logoImage from '../images/logo.svg';

function Landing (){
    return (
        <div id="page-landing">
            <div className="content-warper">
                <header>
                    <img src={logoImage} alt="Happy" className={"image-logo"}/>

                    <div className="location">
                        <strong>Caldas Novas</strong>
                        <span>Goiás</span>
                    </div>
                </header>
                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças</p>
                </main>

                <Link to="/dashboard/app" className="enter-dashboard">
                    Acesso restrito
                </Link>

                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0,0,0,0.6)"/>
                </Link>
            </div>
        </div>
    );
}

export default Landing;