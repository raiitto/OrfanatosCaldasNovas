import {Request,Response} from 'express';

import {getRepository} from "typeorm";
import Orphanage from "../models/Orphanage";
import orphanages_view from "../views/orphanages_view";
import * as Yup from 'yup';
import auth from "../middlewares/auth";
import Image from "../models/Image";

import {unlink} from 'fs';
import {promisify} from 'util';
import path from 'path';


export default {
    async remove(request: Request, response: Response){
        const { id } = request.params;
        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });
        await orphanagesRepository.delete(id);
        const removeFile = promisify(unlink);
        orphanage.images.forEach(image => {

            removeFile(path.join(__dirname, "..", "..", "uploads",image.path));
        })

        return response.json({message: `O orfanato '${orphanage.name}' foi apagado.`});
    },
    async update(request: Request, response: Response){
        const { id } = request.params;
        const idInt = parseInt(id);
        const allow = request.query.allow === 'true';
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            telephone,
            opening_hours,
            open_on_weekends
        } = request.body;

        const orphanagesRepository = getRepository(Orphanage);
        const imagesRepository = getRepository(Image);
        orphanagesRepository.findOneOrFail(id);

        const requestImages = request.files as Express.Multer.File[];

        const schema = Yup.object().shape({
            id: Yup.number().required(),
            name: Yup.string(),
            latitude: Yup.number(),
            longitude: Yup.number(),
            about: Yup.string(),
            instructions: Yup.string(),
            telephone: Yup.string(),
            opening_hours: Yup.string(),
            open_on_weekends: Yup.boolean(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string()
                })),
        })

        const data =
            {
                id: idInt,
                name: name ? name : undefined,
                latitude: latitude ? latitude : undefined,
                longitude: longitude ? longitude : undefined,
                about: about ? about : undefined,
                instructions: instructions ? instructions : undefined,
                telephone: telephone ? telephone : undefined,
                opening_hours: opening_hours ? opening_hours : undefined,
                open_on_weekends: open_on_weekends ? open_on_weekends == 'true' : undefined,
                pending: allow ? false : undefined
            };

        await schema.validate(data,{
            abortEarly: false,
        });

        const orphanage = orphanagesRepository.create(data);
        await orphanagesRepository.save(orphanage)
        const images = requestImages.map(image => {
            return { path: image.filename, orphanage: orphanage}
        })
        images.forEach(item=>{
            const image = imagesRepository.create(item);
            imagesRepository.save(image);
        })

        return response.json(orphanage);
    },
    async index(request: Request, response: Response){
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images'],
            where: {
                pending: false
            }
        });

        return response.json(orphanages_view.renderMany(orphanages));
    },
    async hasPending(request: Request, response: Response){
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            where: {
                pending: true
            }
        });
        if(orphanages.length>0){
            return response.json({hasPending: true});
        }else{
            return response.json({hasPending: false});
        }
    },
    async pending(request: Request, response: Response){
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images'],
            where: {
                pending: true
            }
        });

        return response.json(orphanages_view.renderMany(orphanages));
    },
    async show(request: Request, response: Response){
        const { id } = request.params;
        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        if(orphanage.pending){
            return await auth(request,response,()=>{
                return response.json(orphanages_view.render(orphanage));
            })
        }

        return response.json(orphanages_view.render(orphanage));
    },
    async create(request: Request, response: Response){
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            telephone,
            opening_hours,
            open_on_weekends
        } = request.body;

        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename}
        })

        const schema = Yup.object().shape({
            name: Yup.string().required("Nome Obrigatório"),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required(),
            instructions: Yup.string().required(),
            telephone: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
            })),
        })

        const data =
            {
                name,
                latitude,
                longitude,
                about,
                instructions,
                telephone,
                opening_hours,
                open_on_weekends: open_on_weekends == 'true',
                pending: true,
                images
            };

        await schema.validate(data,{
            abortEarly: false,
        });

        const orphanage = orphanagesRepository.create(data);

        await orphanagesRepository.save(orphanage)

        return response.status(201).json(orphanage);
    }
}