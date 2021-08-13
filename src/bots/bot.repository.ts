import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { Bot } from "./bot.entity";
import { BotsService } from "./bots.service";
import { CreateBotDto } from "./dto/create-bot.dto";

@EntityRepository(Bot)
export class BotRepository extends Repository<Bot>{

    async getBots(user: User): Promise<Bot[]> {

        const query = this.createQueryBuilder('bot');
          
        query.where('bot.userId = :userId',{userId : user.id})

        const bots = await query.getMany();

        return bots;
    }

    async createBot(createBotDto: CreateBotDto, user: User): Promise<Bot> {

        const { name } = createBotDto;

        const bot = new Bot();
        bot.name = name;
        bot.user = user;
        await bot.save();

        delete bot.user;

        return bot;
    }

}