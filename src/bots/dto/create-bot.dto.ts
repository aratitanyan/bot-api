import { IsNotEmpty } from 'class-validator';

export class CreateBotDto {

    @IsNotEmpty()
    name: string;

}