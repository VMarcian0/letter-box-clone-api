import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDefined, IsInt, IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";
import { MovieDbMovieDto } from "../../services/moviedb/dto/moviedb-movie.dto";
import { MovieDbMovieType } from "../../services/moviedb/types/movie.type";
/**
 * Here I made some conversions
 * As all the parameters were strings i made the transformations
 */
export class MoviesByGenreQueryDto{
    //TODO: There is room for improvement in here -> validate a array of numbers with regex
    //TODO: Treat the numbers to be int
    @ApiProperty({
        description: "Coma separated numbers",
        isArray: false,
        format: 'number,number'
    })
    @IsDefined()
    @IsNotEmpty()
    @Transform(({value}) => {
        if(typeof value == 'number' || typeof value?.[0] == 'number'){
            return value
        }
        const valueAsString = JSON.stringify(value);
        if(valueAsString.match(/,/gm)){
            let values = [];
            
            valueAsString
                .replace('[','')
                .replace(']','')
                .replace(/"{1,}/gm,'')
                .split(',')
                .map( (i) => {
                    values.push(+i)
                })
            
            return values;
        }
        return [+value];
    })
    @IsNumber({}, {each: true})
    themes_ids: number[];

    @ApiProperty({
        required:false,
        default: 1
    })
    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @Transform(({value}) => +value)
    @IsNumber()
    @IsInt()
    page?: number;

    @ApiProperty({
        required:false,
        default: 20,
        maximum: 20
    })
    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @Transform(({value}) => +value)
    @IsNumber()
    @IsInt()
    @Max(20)
    @Min(1)
    pageSize?: number;
}

export class MovieByGenreResponseDto{
    @ApiProperty()
    total: number;

    @ApiProperty()
    total_pages: number;

    @ApiProperty()
    page: number;

    @ApiProperty({
        isArray: true,
        type: MovieDbMovieDto
    })
    results: MovieDbMovieType;
}