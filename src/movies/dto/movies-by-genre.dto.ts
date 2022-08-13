import { IsDefined, IsNumber } from "class-validator";

export class MoviesByGenreDto{
    @IsDefined()
    @IsNumber()
    genre: string
}