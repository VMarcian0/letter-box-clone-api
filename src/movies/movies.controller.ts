import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MovieByGenreResponseDto, MoviesByGenreQueryDto } from './dto/movies-by-genre.dto';
import { MoviesService } from './movies.service';

@ApiTags(`movies`)
@Controller('movies')
export class MoviesController {
    constructor(private moviesService: MoviesService){}

    @Get('/genres')
    getGenres(){
        return this.moviesService.getGenres();
    }

    @ApiOkResponse({
        type: MovieByGenreResponseDto
    })
    @Get('/byGenre')
    @UsePipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }))
    getMovieByGenre(@Query() queryParams : MoviesByGenreQueryDto){
        return this.moviesService.getMoviesByGenre(queryParams);
    }
}
