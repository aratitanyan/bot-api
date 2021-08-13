import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Bot } from './bot.entity';
import { BotsService } from './bots.service';
import { CreateBotDto } from './dto/create-bot.dto';
import * as puppeteer from 'puppeteer';




@Controller('bots')
@UseGuards(AuthGuard())
export class BotsController {

    constructor(private botService: BotsService) { }

    @Get('/:id')
    async getBotById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Bot> {

        return this.botService.getBotById(id, user);

    }

    @Get()
    async getBots(@GetUser() user: User): Promise<Bot[]> {
        return this.botService.getBots(user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createBot(@Body() createBotDto: CreateBotDto, @GetUser() user: User): Promise<Bot> {

        return this.botService.createBot(createBotDto, user);
    }

    @Delete('/:id')
    async deleteBot(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {

        return this.botService.deleteBot(id);

    }

    @Get('/quick_links/:id')
    async quikLinks(@Param('id', ParseIntPipe) id: number) {

        return this.botService.quikLinks(id);
    }

    @Get('/your_info/:id')
    async yourInfo(@Param('id', ParseIntPipe) id: number) {

        return this.botService.yourInfo(id);
    }

    @Get('/quick_contacts/:id')
    async quickContacts(@Param('id', ParseIntPipe) id: number) {

        return this.botService.quickContacts(id);
    }



}
