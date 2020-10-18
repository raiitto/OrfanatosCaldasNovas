import express from 'express';
import path from 'path';
import cors from 'cors';
import 'express-async-errors';

import './database/connection'
import routes from "./routes";

import errorHandler from './errors/handler'

const app = express();
app.use(cors({origin: "*"}));
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, "..","uploads")));
app.use(routes);
app.use(errorHandler);
//Rota = conjunto
//Recurso = usuario
//metodos HTTP = GET, POST, PUT, DELETE


app.listen(3333);
