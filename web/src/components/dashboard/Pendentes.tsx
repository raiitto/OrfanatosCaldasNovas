import React, {useEffect, useState} from "react";

import Mapcard from "../../components/mapcard-dashboard";

import '../../styles/components/dashboard/dashboard.css';
import api from "../../services/api";


interface Orphanage{
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: string;
    images: Array<{
        id: number
        url: string
    }>
}


export default function Dashboard(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(()=>{
        api.get('orphanagesPending').then( response => {
            setOrphanages(response.data);
        })
    },[]);

    return (
        <div>
            <div className="dashboard-content-warper">
                <header>
                    <legend>Orfanatos Pendentes</legend>
                </header>
                <hr />
            </div>
            <div className={"content-scroll"}>
                {
                    orphanages.map((orphanage, index) => {
                        return (
                            <Mapcard
                                id={orphanage.id}
                                mainPage={false}
                                name={orphanage.name}
                                position={{
                                    latitude: orphanage.latitude,
                                    longitude:orphanage.longitude
                                }}
                            />
                        )})
                }
            </div>
        </div>
    );
}