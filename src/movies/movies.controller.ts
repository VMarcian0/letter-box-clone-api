import { Controller, Get, Query } from '@nestjs/common';
import { combineLatest, map, Observable } from 'rxjs';
import { MovieDBService } from '../services/moviedb/moviedb.service';
import { MovieDbMovieType } from '../services/moviedb/types/movie.type';
import { MovieDbPaginationType } from '../services/moviedb/types/pagination.type';
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
        
        /**
         * @TODO ajustar o slice para condizer com o que foi pedido
         */
        
        const defaultPageSize = 20;
        const pageSize = +queryParams?.pageSize || defaultPageSize;
        const pageNumber = +queryParams?.page || 1;
        const pageNumberToGet = Math.ceil(pageSize*pageNumber/20);
        /**
         * Supondo um array com todos os retornos possiveis,
         * esse objeto definiria qual é o intervalo desse array que a api precisar retornar
         */
        const slice = {
            start: (pageNumber -1)*pageSize,
            end: (pageSize * pageNumber)
        }
        const pagesToFetch = {
            start: Math.ceil(slice.start/defaultPageSize)+1,
            end: Math.ceil(slice.end/defaultPageSize)
        }
        let observables : Observable<MovieDbPaginationType<MovieDbMovieType>>[] = [];
        for(let page = pagesToFetch.start; page<= pagesToFetch.end; page++){
            observables.push(this.movieDBService.getMoviesByGenre(queryParams.themes_ids, page))
        }
        console.log('slice',slice)
        console.log('pagesToFetch',pagesToFetch)

        return combineLatest(observables)
            .pipe(
                map( (result) => {
                    let results : MovieDbMovieType[] = []  
                    result.map((data )=> {results = [...results, ...data.results]});
                    return {
                        'total': result[0].total_results,
                        'total_pages': Math.ceil(result[0].total_results/pageSize),
                        'page': pageNumber,
                        'results': results.slice(
                            slice.start-pageSize,
                            slice.end-pageSize
                        )
                    }
                })
            )
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
                            0,
                            pageSize //gambiara
                        )
                    }
                })
            )
    }
}
