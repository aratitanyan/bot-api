import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Bot } from "src/bots/bot.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    username : string;

    @Column()
    password : string;

    @Column()
    salt : string

    @OneToMany(type => Bot , bot =>bot.user, {eager : true})
    bots : Bot [];

    async validatePassword(password : string) : Promise<boolean>{

        const hash  = await bcrypt.hash(password,this.salt);
        return  hash === this.password;
    }

}