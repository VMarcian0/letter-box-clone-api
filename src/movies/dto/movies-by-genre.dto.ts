import { IsDefined, IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class MoviesByGenreDto{
    @IsDefined()
    @IsNumber({}, {each: true})
    themes_ids: number[];

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    page?: number;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    pageSize?: number;
}