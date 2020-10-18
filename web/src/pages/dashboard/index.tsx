import React from "react";

import '../../styles/pages/login.css';
import Sidebar from "../../components/Sidebar";
import Dashboard from "../../components/dashboard/Dashboard";
import Pendentes from "../../components/dashboard/Pendentes";
import {useDashboardContext} from "../../contexts/dashboard";


export default function IndexDashboard() {

    const { mainPage } = useDashboardContext();
    return (
        <div id="page-dashboard">
            <Sidebar dashBoardButtons/>
            {
                mainPage? (
                    <Dashboard />)
                :   (
                    <Pendentes/>
                    )
            }
        </div>
    );
}