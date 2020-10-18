import React from 'react';

import {useAuth} from "./contexts/auth";

import './styles/global.css';
import 'leaflet/dist/leaflet.css';

import AppRoutes from './routes/app.routes';
import AuthRoutes from './routes/auth.routes';


function App() {
    const {signed} = useAuth();
  return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default App;