import React, {FormEvent, useEffect, useState} from "react";
import {useHistory, useParams} from 'react-router-dom';

import '../../styles/components/login/login.css';
import '../../styles/components/dashboard/confirm.css';
import api from "../../services/api";
import Sidebar from "../../components/Sidebar";
import {Map, Marker, TileLayer} from "react-leaflet";
import mapIcon from "../../utils/mapIcon";
import {FiCheck, FiPlus, FiX} from "react-icons/fi";
import Orphanage from "../Orphanage";
import {LeafletMouseEvent} from "leaflet";

interface OrphanageParams{
    id: string;
}

export default function DashboardConfirmar(){
    const history = useHistory();
    const params  = useParams<OrphanageParams>();
    const [orphanage, setOrphanage] = useState<Orphanage>();
    const [previewImages, setPreviewImages] = useState<string[]>([]);


    useEffect(()=>{
        api.get(`orphanages/${params.id}`).then( response => {
            setOrphanage(response.data);
            interface respon {
                images: Array<{url:string}>;
            }
            const  resp:respon = response.data;
                setPreviewImages(resp.images.map((image)=>{
                    return image.url;
                }));
        })
    },[params.id]);

    if(!orphanage){
        return <p>Carregando...</p>
    }

    function handleMapClick(event: LeafletMouseEvent){
        const { lat, lng} = event.latlng;
        if(orphanage){
            orphanage.latitude=lat;
            orphanage.longitude=lng;
        }
    }

    function handleSubmit(event: FormEvent){
        event.preventDefault();
    }

    function handleRecuseOrphanage(){
        api.delete(`orphanages/${params.id}`)
        history.push('/dashboard/app');

    }
    function handleAceptOrphanage(){
        api.put(`orphanages/${params.id}?allow=true`)
        history.push('/dashboard/app');
    }

    return (
        <div id="page-orphanage">
            <Sidebar />

            <main>
                <form onSubmit={handleSubmit} className="create-orphanage-form">
                    <fieldset>
                        <legend>Dados</legend>

                        <Map
                            center={[orphanage.latitude,orphanage.longitude]}
                            style={{ width: '100%', height: 280 }}
                            zoom={15}
                            onClick={handleMapClick}
                            dragging={false}
                            touchZoom={false}
                            zoomControl={false}
                            scrollWheelZoom={false}
                            doubleClickZoom={false}
                        >
                            <div className={"bottom-map-description"} >Clique no mapa para adicionar a localização</div>
                            <TileLayer
                                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${"pk.eyJ1IjoicmFpaXR0byIsImEiOiJja2djbHFlbGQwMHd5MnBudzBjbW1zNWg1In0.YLzZoweNHAxE7Yn3ym5gtQ"}`}
                            />

                            {orphanage.latitude !== 0 && (
                                <Marker
                                    interactive={false}
                                    icon={mapIcon}
                                    position={[
                                        orphanage.latitude,
                                        orphanage.longitude
                                    ]} />
                            )}


                        </Map>

                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input
                                className={orphanage.name.length>0? "active": ''}
                                id="name"
                                value={orphanage.name}
                                //onChange={event => { setName(event.target.value)}}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                            <textarea
                                className={orphanage.about.length>0? "active": ''}
                                id="sobre"
                                maxLength={300}
                                value={orphanage.about}
                                //onChange={event => { setAbout(event.target.value)}}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="telephone">Número de Whatsapp</label>
                            <input
                                className={orphanage.telephone.length>0? "active": ''}
                                id="telephone"
                                value={orphanage.telephone}
                                //onChange={event => { setTelephone(event.target.value)}}
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="images">Fotos</label>

                            <div className="images-container">
                                {previewImages.map(image => {
                                    return (
                                        <img key={image} src={image} alt={orphanage.name}/>
                                    )
                                })}
                                {/*
                                <label htmlFor="image[]" className="new-image">
                                    <FiPlus size={24} color="#15b6d6" />
                                </label>
                                */}
                            </div>

                            <input multiple
                                   //onChange={handleSelectImages}
                                   type="file" id="image[]"/>

                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Visitação</legend>

                        <div className="input-block">
                            <label htmlFor="instructions">Instruções</label>
                            <textarea
                                className={orphanage.instructions.length>0? "active": ''}
                                id="instructions"
                                value={orphanage.instructions}
                                //onChange={event => { setInstructions(event.target.value)}}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="opening_hours">Horário das visitas</label>
                            <input
                                className={orphanage.opening_hours.length>0? "active": ''}
                                id="opening_hours"
                                value={orphanage.opening_hours}
                                //onChange={event => { setOpeningHours(event.target.value)}}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="open_on_weekends">Atende fim de semana?</label>

                            <div className="button-select">
                                <button
                                    type="button"
                                    className={orphanage.open_on_weekends ? 'active': ''}
                                    //onClick={()=> setOpenOnWeekends(true)}
                                >Sim</button>
                                <button
                                    type="button"
                                    className={!orphanage.open_on_weekends ? 'active': ''}
                                   // onClick={()=> setOpenOnWeekends(false)}
                                >Não</button>
                            </div>
                        </div>
                    </fieldset>

                    <div className={"confirm-buttons"}>
                        <a
                            className={["confirm-button",'left' ].join(" ")}
                            type="submit"
                            onClick={handleRecuseOrphanage}
                        >
                            <FiX
                            size={24}
                            color={"#FFF"}
                            />
                            Recusar

                        </a>
                        <a
                            className={["confirm-button",'right' ].join(" ")}
                            type="submit"
                            onClick={handleAceptOrphanage}
                        >
                            <FiCheck
                                size={24}
                                color={"#FFF"}
                            />
                            Aceitar
                        </a>
                    </div>

                </form>
            </main>
        </div>
    );
}