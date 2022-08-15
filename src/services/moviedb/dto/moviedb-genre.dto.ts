import { ApiProperty } from "@nestjs/swagger";

export class MovieDbGenreDto {
    @ApiProperty()
    id: number;
    
    @ApiProperty()
    name: string;
}