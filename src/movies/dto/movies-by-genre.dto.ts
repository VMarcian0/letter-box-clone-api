import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDefined, IsInt, IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";
/**
 * Here I made some conversions
 * As all the parameters were strings i made the transformations
 */
export class MoviesByGenreDto{
    //TODO: There is room for improvement in here -> validate a array of numbers with regex
    //TODO: Treat the numbers to be int
    @ApiProperty({
        description: "Coma separated numbers"
    })
    @IsDefined()
    @IsNotEmpty()
    @Transform(({value}) => {
        if(typeof value == 'number' || typeof value?.[0] == 'number'){
            return value
        }
        if(JSON.stringify(value).match(/,/gm)){
            let values = [];
            value.split(',').map( (i) => values.push(+i))
            return values;
        }
        return [+value];
    })
    @IsNumber({}, {each: true})
    themes_ids: number[];

    @ApiProperty({required:false})
    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @Transform(({value}) => +value)
    @IsNumber()
    @IsInt()
    page: number;

    @ApiProperty({required:false})
    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @Transform(({value}) => +value)
    @IsNumber()
    @IsInt()
    @Max(20)
    @Min(1)
    pageSize: number;
}