import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthDto } from './dto/jwt-auth.dto';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { AuthResponseType } from './types/auth-response.type';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(jwtAuthDto: JwtAuthDto) {
        const user = await this.usersService.findByEmail(jwtAuthDto.email);

        const payload = {
            userId: user.id
        };

        return {
            access_token: this.jwtService.sign(payload),
        } as AuthResponseType;
    }

    async validateUser(jwtAuthDto:JwtAuthDto){
        const { email, password } = jwtAuthDto;

        const user = await this.usersService.findByEmail(email);
        if (!(await this.validatePassword(password, user.password))){
            throw new UnauthorizedException();
        }
        
        delete user.password;
        return user;
    }

    private async validatePassword(password:string, hashPassword:string){
        return bcrypt.compare(password, hashPassword)
    }
}
