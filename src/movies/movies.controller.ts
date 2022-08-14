import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { MoviesByGenreDto } from './dto/movies-by-genre.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private moviesService: MoviesService){}

    @Get('/genres')
    getGenres(){
        return this.moviesService.getGenres();
    }

    @Get('/byGenre')
    @UsePipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }))
    getMovieByGenre(@Query() queryParams : MoviesByGenreDto){
        return this.moviesService.getMoviesByGenre(queryParams);
    }
}
