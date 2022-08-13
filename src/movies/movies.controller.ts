import { Controller, Get, Query } from '@nestjs/common';
import { map } from 'rxjs';
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
        const defaultPageSize = 20;
        const pageSize = +queryParams?.pageSize || defaultPageSize;
        const pageNumber = +queryParams?.page || 1;
        const pageNumberToGet = Math.ceil(pageSize*pageNumber/20);
        /**
         * @Todo
         * Encadear mais de uma chamada para poder funcionar com qualquer page size
         * De acordo com o page size e o page skip definir quantas chamadas vão ser necessárias
         * Pegar os observables dessas chamadas e aí sim paginar de acordo com o necessário
         * 
         *  Evitar de fazer overfetching no servico
         */
        let a = this
            .movieDBService
            .getMoviesByGenre(queryParams.themes_ids, pageNumberToGet)
            .pipe(
                map( (data) => {
                    return {
                        'total': data.total_results,
                        'total_pages': Math.ceil(data.total_results/pageSize),
                        'page': pageNumber,
                        'results': data.results.slice(
                            (pageNumber -1)*pageSize,
                            (pageSize * pageNumber)
                        )
                    }
                })
            )
    }
}
