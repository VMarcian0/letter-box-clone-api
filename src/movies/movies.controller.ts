import { Controller, Get, Query } from '@nestjs/common';
import { MovieDBService } from '../services/moviedb/moviedb.service';
import { MoviesByGenreDto } from './dto/movies-by-genre.dto';

@Controller('movies')
export class MoviesController {
    constructor(private movieDBService: MovieDBService){

    }

    @Get('/genres')
    getGenres(){
        return this.movieDBService.getGenresList();
    }

    @Get('/byGenre')
    getMovieByGenre(@Query() queryParams:MoviesByGenreDto){
        return this.movieDBService.getMoviesByGenre(queryParams.genre);
    }
}
