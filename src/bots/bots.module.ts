import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BotRepository } from './bot.repository';
import { BotsController } from './bots.controller';
import { BotsService } from './bots.service';

@Module({
    imports: [AuthModule,TypeOrmModule.forFeature([BotRepository])],
    controllers: [BotsController],
    providers: [BotsService]
})
export class BotsModule { }
  