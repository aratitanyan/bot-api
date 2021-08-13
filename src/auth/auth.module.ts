import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'botsecret2021',
            signOptions: {
                expiresIn: 2400,
            }
        }), TypeOrmModule.forFeature([UserRepository])],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [
        JwtStrategy,
        PassportModule
    ]
})
export class AuthModule { }
