import React from 'react';

import { Link } from 'react-router-dom';

import '../styles/pages/sucesso.css';


function Sucesso (){
    return (
        <div id="page-sucesso">
            <div className="content-warper">
                <main>
                    <legend>
                        Ebaaa!
                    </legend>
                    <p>O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)</p>


                    <Link to="/app" className="enter-map">
                        Voltar para o mapa
                    </Link>
                </main>


            </div>
        </div>
    );
}

export default Sucesso;