import { TypeOrmModuleOptions } from "@nestjs/typeorm";



export const typeORMConfig : TypeOrmModuleOptions = {
    type : 'postgres',
    host : 'localhost',
    port : 5432,
    username : 'postgres',
    password : 'postgres',
    database : 'bot-api',
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize : true
};