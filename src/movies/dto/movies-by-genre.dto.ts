import { Transform } from "class-transformer";
import { IsDefined, IsInt, IsNotEmpty, IsNumber, IsOptional, Max } from "class-validator";

export class MoviesByGenreDto{
    // There is room for improvement in here -> validate a array of numbers with regex
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
        return +value
    })
    @IsNumber({}, {each: true})
    themes_ids: number[];

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @Transform(({value}) => +value)
    @IsNumber()
    @IsInt()
    page: number;

    @IsOptional()
    @IsDefined()
    @IsNotEmpty()
    @Transform(({value}) => +value)
    @IsNumber()
    @IsInt()
    @Max(20)
    pageSize: number;
}