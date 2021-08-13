import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "jsonwebtoken";
import {Strategy,ExtractJwt} from 'passport-jwt'
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";


@Injectable() 
export class JwtStrategy extends PassportStrategy(Strategy){
    
    constructor(@InjectRepository(UserRepository)
       private userRepository :UserRepository 
    ){

        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : 'botsecret2021'
        });
    }

    async validate(payLoad : JwtPayload) : Promise<User>{

           const {username} = payLoad;
           const user = await this.userRepository.findOne({username});

           if(!user){
               throw new UnauthorizedException();
           }

           return user;

    }
}