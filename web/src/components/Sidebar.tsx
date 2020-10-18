import React, {useEffect, useState} from "react";
import mapMarkerImg from "../images/map-marker.svg";
import DotImg from "../images/dot.svg";
import {FiArrowLeft, FiAlertCircle, FiMapPin, FiPower} from "react-icons/fi";
import { useHistory} from 'react-router-dom'

import '../styles/components/sidebar.css';
import {useAuth} from "../contexts/auth";
import {useDashboardContext} from "../contexts/dashboard";
import api from "../services/api";

interface SidebarProps{
    dashBoardButtons?: boolean;
}

export default function Sidebar(props: SidebarProps){
    const { goBack } = useHistory();
    const { signOut} = useAuth();
    const { mainPage ,setMainPage} = useDashboardContext();
    const [hasPending, setHasPending] = useState(false);
    function handleSignOut(){
        signOut();
    }
    useEffect(()=>{
        if(props.dashBoardButtons){
            api.get('hasOrphanagesPending').then( response => {
                const { hasPending } = response.data;
                if(hasPending)setHasPending(hasPending)
            })
        }
    }, [props.dashBoardButtons])
    return (
        <aside className={"app-sidebar"}>
            <img src={mapMarkerImg} alt="Happy" />

            {props.dashBoardButtons && (
                <div className={"middle-buttons"}>
                    <button
                        type={"button"}
                        className={["middle-button", mainPage?'active':'inactive'].join(" ")}
                        onClick={()=>setMainPage(!mainPage)}>
                        <FiMapPin size={24} color={mainPage?"#0089A5":"#FFF"} />
                    </button>
                    <button
                        type={"button"}
                        className={["middle-button", mainPage?'inactive':'active'].join(" ")}
                        onClick={()=>setMainPage(!mainPage)}>
                        <FiAlertCircle size={24} color={mainPage?"#FFF":"#0089A5"} />
                        {hasPending&&mainPage&& (
                            <img src={DotImg} alt={""}/>
                        )}
                    </button>
                </div>
            )}

            <footer>
                {
                    props.dashBoardButtons ? (
                        <button type="button" onClick={handleSignOut}>
                            <FiPower size={24} color="#FFF" />
                        </button>
                    ) : (
                        <button type="button" onClick={goBack}>
                            <FiArrowLeft size={24} color="#FFF" />
                        </button>
                    )
                }
            </footer>
        </aside>);
}