import {Request,Response} from 'express';

import {getRepository} from "typeorm";
import bcrypt from "bcrypt";
import * as Yup from 'yup';
import Credentials from "../models/Credentials";
import credentials_view from "../views/credentials_view";

import auth from '../middlewares/auth';


export default {
    async authenticate(request: Request, response: Response){
        const saltRounds = 8;
        const orphanagesRepository = getRepository(Credentials);

        const {
            username,
            password
        } = request.body;

        const credentialsRepository = getRepository(Credentials);

        const data =
            {
                username,
                password
            };

        const schema = Yup.object().shape({
            username: Yup.string().required("Usuário Obrigatório (username)"),
            password: Yup.string().required("Senha Obrigatória (password)")
        })

        await schema.validate(data,{
            abortEarly: false,
        });

        try{
            const credentials = await orphanagesRepository.findOneOrFail({
                where: {
                    username: username
                }
            });
            if(!await credentials.compareHash(password)){
                return response.status(400).json({ error: "Usuario ou senha incorreto." });
            }
            const expiresIn = 3600;// 1 hour
            const token = credentials.generateToken(expiresIn);
            return response.json({token, expiresIn});
        }catch (error){
            return response.status(400).json({ error: "Usuario ou senha incorreto." });
        }
    },
    async register(request: Request, response: Response){
        const saltRounds = 8;
        const {
            username,
            password
        } = request.body;

        const credentialsRepository = getRepository(Credentials);

        const data =
            {
                username,
                password
            };

        const schema = Yup.object().shape({
            username: Yup.string().required("Usuário Obrigatório"),
            password: Yup.string().required("Senha Obrigatória")
        })

        await schema.validate(data,{
            abortEarly: false,
        });

        const credentialsList = await credentialsRepository.find({
            where: {
                username: username
            }
        });
        if(credentialsList.length>0){
            return response.status(400).json({ error: "Usuario já existe." });
        }


        data.password = await bcrypt.hash(data.password,saltRounds);

        const credentials = credentialsRepository.create(data);

        await credentialsRepository.save(credentials)

        return response.status(201).json(credentials_view.render(credentials));
    }
}
