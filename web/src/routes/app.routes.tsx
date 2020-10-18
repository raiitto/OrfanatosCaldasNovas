import React from 'react';
import {BrowserRouter,Switch, Route }  from 'react-router-dom';

import Landing from '../pages/Landing';
import OrphanagesMap from '../pages/OrphanagesMap';
import Orphanage from '../pages/Orphanage';
import CreateOrphanage from "../pages/CreateOrphanage";
import Dashboard from "../pages/dashboard";
import DashboardConfirmar from "../pages/dashboard/Confirmar";
import DashboardEditar from "../pages/dashboard/Editar";
import Sucesso from "../pages/Sucesso";
import {DashboardProvider} from "../contexts/dashboard";

function AppRoutes(){
    return (
        <BrowserRouter>
            <Switch>
                <DashboardProvider>
                    {/*ROTAS ESCLUSIVAS COM AUTENTICACAO - DASHBOARD*/}
                    <Route path={"/dashboard/aprove/:id"} component={DashboardConfirmar}  />
                    <Route path={"/dashboard/edit/:id"} component={DashboardEditar}  />
                    {/*--------------------------------------------------------*/}
                    <Route path={"/"} exact component={Landing}  />
                    <Route path={"/app"} component={OrphanagesMap}  />
                    <Route path={"/dashboard/app"} component={Dashboard}  />
                    <Route path={"/orphanages/create"} component={CreateOrphanage}  />
                    <Route path={"/orphanages/sucesso"} component={Sucesso}  />
                    <Route path={"/orphanages/:id"} component={Orphanage}  />
                </DashboardProvider>
            </Switch>
        </BrowserRouter>
    );
}

export default AppRoutes;
