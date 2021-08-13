import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Bot } from './bot.entity';
import { BotRepository } from './bot.repository';
import { CreateBotDto } from './dto/create-bot.dto';
import * as puppeteer from 'puppeteer'



@Injectable()
export class BotsService {

    constructor(
        @InjectRepository(BotRepository)
        private botRepository: BotRepository
    ) { }


    async getBots(user: User): Promise<Bot[]> {

        return this.botRepository.getBots(user);
    }



    async getBotById(id: number, user: User): Promise<Bot> {

        const found = await this.botRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Bot with id ${id} not found`);

        }
        return found;
    }


    async deleteBot(id: number): Promise<void> {


        const result = await this.botRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Bot with id ${id} not found`);
        }

    }

    async createBot(createBotDto: CreateBotDto, user: User): Promise<Bot> {

        return this.botRepository.createBot(createBotDto, user);

    }

    async quikLinks(id: number) {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://memberlink.unacuhcp.org/");

        await page.type('input[rel="Username"]', "JohnDoe");
        await page.type('input[rel="Password"]', "Success1$");

        await page.click('input[value="Login"]');

        await Promise.race([
            page.waitForSelector("#errorContainer p"),
            page.waitForNavigation(),
        ]);

        await page.waitForSelector("#ctl00_Body_QuickLinks");

        const quickLinksData = await page.$$eval(
            "#ctl00_Body_QuickLinks a",
            (links) =>
                links.map((link) => {
                    return { text: link.textContent, href: link['href'] };
                })
        );

        await browser.close();

        return quickLinksData;
    }
    

    async yourInfo(id : number) {


        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://memberlink.unacuhcp.org/");

        await page.type('input[rel="Username"]', "JohnDoe");
        await page.type('input[rel="Password"]', "Success1$");

        await page.click('input[value="Login"]');

        await Promise.race([
            page.waitForSelector("#errorContainer p"),
            page.waitForNavigation(),
        ]);

        await page.waitForSelector("#ctl00_Body___114__divAboutMe__1");
        
        const userInfoData = await page.$$eval(
            "#ctl00_Body___114__divAboutMe__1",
            (elements) => {
                return [...elements[0].children].map((child) => {
                    return [...child.children].map((data) => {
                        return data.textContent;
                    })
                }).map(data => {
                    const name = data[0];
                    const value = data[1];
                    return value !== undefined ? { [name]: value } : name
                }).filter(x => x);
            }
        );

        await browser.close();

        return userInfoData;

    }

    async quickContacts(id : number) {


        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://memberlink.unacuhcp.org/");

        await page.type('input[rel="Username"]', "JohnDoe");
        await page.type('input[rel="Password"]', "Success1$");

        await page.click('input[value="Login"]');

        await Promise.race([
            page.waitForSelector("#errorContainer p"),
            page.waitForNavigation(),
        ]);

        await page.waitForSelector("#ctl00_Body_QuickContacts");
        
        const quickContactsData = await page.$$eval(
            "#ctl00_Body_QuickContacts",
            (elements) => {
                return [...elements[0].children].map((child) => {
                    return [...child.children].map((data) => {
                        return data.textContent;
                    })
                }).map(data => {
                    const name = data[0];
                    const value = data[1];
                    return value !== undefined ? { [name]: value } : name
                }).filter(x => x);
            }
        );

        await browser.close();

        return quickContactsData;

    }


}
