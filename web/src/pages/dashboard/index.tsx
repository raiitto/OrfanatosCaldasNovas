import React from "react";

import '../../styles/pages/login.css';
import {useAuth} from "../../contexts/auth";


export default function IndexDashboard() {
    const { signOut} = useAuth();
    function handleSignOut(){
        signOut();
    }
    return (
        <div id="page-dashboard">
            <button onClick={handleSignOut}>Sign Out</button >
        </div>
    );
}