import React from 'react';
import {BrowserRouter,Switch, Route }  from 'react-router-dom';

import Landing from '../pages/Landing';
import OrphanagesMap from '../pages/OrphanagesMap';
import Orphanage from '../pages/Orphanage';
import Login from '../pages/login';
import CreateOrphanage from "../pages/CreateOrphanage";
import Sucesso from "../pages/Sucesso";

function AuthRoutes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"} exact component={Landing}  />
                <Route path={"/app"} component={OrphanagesMap}  />
                <Route path={"/dashboard"} component={Login}  />
                <Route path={"/orphanages/create"} component={CreateOrphanage}  />
                <Route path={"/orphanages/sucesso"} component={Sucesso}  />
                <Route path={"/orphanages/:id"} component={Orphanage}  />
            </Switch>
        </BrowserRouter>
    );
}

export default AuthRoutes;
