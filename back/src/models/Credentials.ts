import jwt from 'jsonwebtoken';
import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm'
import bcrypt from "bcrypt";


@Entity('credentials')
export default class Credentials{

    generateToken(expireTime: number) {
        return jwt.sign({ id: this.id }, "secret", {
            expiresIn: expireTime
        });
    }
    async compareHash(password: string){
        return await bcrypt.compare(password,this.password)
    }

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}