import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>
    ) {}

    async findByEmail(email: string){
        const user = await this.usersRepository.findOneBy({email})
        if(user){
            return user
        }
        throw new NotFoundException();
    }

    async showById(id: string): Promise<Users> {
        const user = await this.findById(id);
    
        delete user.password;
        return user;
    }


    async findById(id: string){
        const user = await this.usersRepository.findOneBy({id})
        if(user){
            delete user?.password;
            delete user?.email;

            return user;
        }
        throw new NotFoundException();
    }

    async create(userData: CreateUserDto){
        const newUser = await this.usersRepository.create(userData);
        await this.usersRepository.save(newUser);
        return newUser;
    }
}
