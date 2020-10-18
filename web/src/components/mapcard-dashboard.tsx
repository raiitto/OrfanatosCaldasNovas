import React from "react";

import '../styles/components/mapcard-dashboard.css';
import {Map, Marker, TileLayer} from "react-leaflet";
import mapIcon from "../utils/mapIcon";
import {FiTrash, FiEdit3, FiArrowRight} from "react-icons/fi";
import {useHistory} from "react-router-dom";
import api from "../services/api";

interface MapcardProps{
    id: number,
    name: string,
    mainPage: boolean,
    position: {
        latitude: number,
        longitude: number
    }
}

export default function Mapcard(props: MapcardProps){
    const history = useHistory();

    async function handleEditOrphanage(){
        history.push(`/dashboard/edit/${props.id}`)
    }
    function handleRemoveOrphanage(){
        api.delete(`orphanages/${props.id}`).then( response => {
            history.push(`/dashboard`)
        }).catch(error=>{
            if(error.response.data.error){
                alert(error.response.data.error)
            }else{
                console.log(error.message);
            }
        })
    }

    function handleAprove(){
        history.push(`/dashboard/aprove/${props.id}`)
    }

    return (
        <div className={"mapcard-dashboard"} >

            <Map
                center={[props.position.latitude,props.position.longitude]}
                style={{ width: '100%', height: '100%' }}
                zoom={15}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
            >
                <div className={"bottom-mapcard-description"} >
                    <label>
                        {props.name}
                    </label>
                        {props.mainPage ? (
                            <div className={"card-buttons"}>
                                <button type={"button"} className="card-button left" onClick={handleEditOrphanage} >
                                    <FiEdit3 size={24} color="#15C3D6" />
                                </button>
                                <button type={"button"} className="card-button right" onClick={handleRemoveOrphanage}>
                                    <FiTrash size={24} color="#15C3D6" />
                                </button>
                            </div>
                            ) : (
                            <div className={"card-buttons"}>
                                <button type={"button"} className="card-button right" onClick={handleAprove}>
                                    <FiArrowRight size={24} color="#15C3D6" />
                                </button>
                            </div>
                        )}
                </div>
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${"pk.eyJ1IjoicmFpaXR0byIsImEiOiJja2djbHFlbGQwMHd5MnBudzBjbW1zNWg1In0.YLzZoweNHAxE7Yn3ym5gtQ"}`}
                />

                {props.position.latitude !== 0 && (
                    <Marker
                        interactive={false}
                        icon={mapIcon}
                        position={[
                            props.position.latitude,
                            props.position.longitude
                        ]} />
                )}


            </Map>
        </div>
    );
}