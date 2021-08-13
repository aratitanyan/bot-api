import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeORMConfig } from './config/typeorm.config';
import { BotsModule } from './bots/bots.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig),AuthModule, BotsModule]
})
export class AppModule {}
