import { IsEmail, IsNotEmpty } from "class-validator";

export class JwtAuthDto{
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    password: string;
}