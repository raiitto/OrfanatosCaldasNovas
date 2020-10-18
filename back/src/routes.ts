import { Router} from 'express';
import multer from "multer";

import uploadConfig from './config/upload'
import OrphanagesController from "./controllers/OrphanagesController";
import CredentialsController from "./controllers/CredentialsController";
import auth from "./middlewares/auth";

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/login', CredentialsController.authenticate);
//routes.use(auth);
routes.post('/register', CredentialsController.register);//O ideal seria bloquear essa rota com autenticacao
routes.use(auth);
routes.get('/hasOrphanagesPending', OrphanagesController.hasPending);
routes.get('/orphanagesPending', OrphanagesController.pending);
routes.put('/orphanages/:id', upload.array('images'), OrphanagesController.update);
routes.delete('/orphanages/:id', OrphanagesController.remove);

export default routes;