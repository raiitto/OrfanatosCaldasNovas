import React, {ChangeEvent, FormEvent, useState} from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from 'react-router-dom';

import {  FiPlus } from "react-icons/fi";

import Sidebar from "../components/Sidebar";

import '../styles/pages/create-orphanage.css';
import mapIcon from "../utils/mapIcon";
import {LeafletMouseEvent} from "leaflet";
import api from "../services/api";


function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({latitude: 0, longitude: 0});

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [telephone, setTelephone] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent){
    const { lat, lng} = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    })

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    if (name.length<1||
        about.length<1||
        instructions.length<1||
        telephone.length<1||
        opening_hours.length<1||
        images.length<1||
        position.latitude===0){
      return;
    }
    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('telephone', telephone);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    })

    api.post('orphanages', data).then(response =>{
        history.push('/orphanages/sucesso');
    }).catch(error => {
        if(error.response.data.error){
            alert(error.response.data.error)
        }else{
            alert(error.message);
        }
    });

    //alert('Cadastro realizado com sucesso');


  }
  return (
    <div id="page-create-orphanage">

      <Sidebar/>

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-17.7520999,-48.6221978]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <div className={"bottom-map-description"} >Clique no mapa para adicionar a localização</div>
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${"pk.eyJ1IjoicmFpaXR0byIsImEiOiJja2djbHFlbGQwMHd5MnBudzBjbW1zNWg1In0.YLzZoweNHAxE7Yn3ym5gtQ"}`}
              />

              {position.latitude !== 0 && (
                  <Marker
                      interactive={false}
                      icon={mapIcon}
                      position={[
                          position.latitude,
                        position.longitude
                      ]} />
                  )}


            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                  className={name.length>0? "active": ''}
                  id="name"
                  value={name}
                  onChange={event => { setName(event.target.value)}}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                  className={about.length>0? "active": ''}
                  id="sobre"
                  maxLength={300}
                  value={about}
                  onChange={event => { setAbout(event.target.value)}}/>
            </div>

            <div className="input-block">
              <label htmlFor="telephone">Número de Whatsapp</label>
              <input
                  className={telephone.length>0? "active": ''}
                  id="telephone"
                  value={telephone}
                  onChange={event => { setTelephone(event.target.value)}}/>
            </div>
            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                      <img key={image} src={image} alt={name}/>
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                  className={instructions.length>0? "active": ''}
                  id="instructions"
                  value={instructions}
                  onChange={event => { setInstructions(event.target.value)}}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário das visitas</label>
              <input
                  className={opening_hours.length>0? "active": ''}
                  id="opening_hours"
                  value={opening_hours}
                  onChange={event => { setOpeningHours(event.target.value)}}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana?</label>

              <div className="button-select">
                <button
                    type="button"
                    className={open_on_weekends ? 'active': ''}
                    onClick={()=> setOpenOnWeekends(true)}
                >Sim</button>
                <button
                    type="button"
                    className={!open_on_weekends ? 'active': ''}
                    onClick={()=> setOpenOnWeekends(false)}
                >Não</button>
              </div>
            </div>
          </fieldset>

          <button
              className={["confirm-button",
                name.length>0&&
                about.length>0 &&
                telephone.length>0 &&
                instructions.length>0 &&
                opening_hours.length>0 &&
                images.length>0 &&
                position.latitude!==0
                    ? 'active' : ''].join(" ")}
              type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
export default CreateOrphanage;
