import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from "express";

import {promisify} from 'util'

async function auth(request: Request, response: Response, next: NextFunction){
  const authHeader = request.headers.authorization;
  const token = authHeader?.split(" ").pop();
  if (!token) return response.status(401).send({ error: 'Nenhum token fornecido.' });

  const verificar = promisify(jwt.verify);

  try {
    const decoded = await verificar(token, "secret");

    //request.id = decoded.id;


    return next();
  } catch (err) {
    return response.status(401).send({ error: "Token invalido" });
  }
}

export default auth;
