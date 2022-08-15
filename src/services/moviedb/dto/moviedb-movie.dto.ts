import { ApiProperty } from "@nestjs/swagger"

export class MovieDbMovieDto {
    @ApiProperty()
    poster_path: string
    @ApiProperty()
    adult: boolean
    @ApiProperty()
    overview: string
    @ApiProperty()
    release_date: string
    @ApiProperty()
    genre_ids: number[]
    @ApiProperty()
    id: number
    @ApiProperty()
    original_title: string
    @ApiProperty()
    original_language: string
    @ApiProperty()
    title: string
    @ApiProperty()
    backdrop_path: string
    @ApiProperty()
    popularity: number
    @ApiProperty()
    vote_count: number
    @ApiProperty()
    video: boolean
    @ApiProperty()
    vote_average: number
}