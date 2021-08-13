
import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bot extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @ManyToOne(type =>User, user => user.bots,{eager : false})
    user : User;

    @Column()
    userId : number;
}