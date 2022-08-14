import { Injectable } from '@nestjs/common';
import { combineLatest, map, Observable } from 'rxjs';
import { MovieDBService } from '../services/moviedb/moviedb.service';
import { MovieDbMovieType } from '../services/moviedb/types/movie.type';
import { MovieDbPaginationType } from '../services/moviedb/types/pagination.type';
import { MoviesByGenreDto } from './dto/movies-by-genre.dto';

@Injectable()
export class MoviesService {
    constructor(private movieDBService:MovieDBService){}

    getGenres(){
        return this.movieDBService.getGenresList();
    }


    getMoviesByGenre(queryParams : MoviesByGenreDto){
        /**
         * Assuming that all the results are one array to make the pagination
         * Avoiding over fetching - the moviedb has request limit of many recurrent requests
         * Because of that I'm making the max page size equal to the pagesize used by moviedb
         * For the moment it is 20 
         */
        const pageSize = queryParams.pageSize;
        const defaultPageSize = this.movieDBService.getDefaultPageSize();
        const pageNumber = queryParams?.page || 1;
        /**
         * Supondo um array com todos os retornos possiveis,
         * esse objeto define qual é o intervalo desse array que a api precisar retornar
         */
        const slice = {
            start: (pageNumber -1)*pageSize,
            end: (pageSize * pageNumber)
        }
        /**
         * Para evitar sobrecarregar a api do moviedb aqui eu calculo quais são as páginas necessárias para se buscar
         */
        const pagesToFetch = {
            start: Math.ceil(slice.start/defaultPageSize),
            end: Math.ceil(slice.end/defaultPageSize)
        }
        
        /**
         * Por mais que o máximo de chamadas no momento possam ser duas devido as configurações
         * optei por uma solução mais genérica para criar quantos obeersables sejam necessários
         */
        let observables : Observable<MovieDbPaginationType<MovieDbMovieType>>[] = [];
        for(let page = pagesToFetch.start; page<= pagesToFetch.end; page++){
            observables.push(this.movieDBService.getMoviesByGenre(queryParams.themes_ids, page))
        }

        /**
         * To avoid over fetching the actual array is shorter than the one thats available
         */
        /**
         * Devido ao tratamento de overfetching 
         * o array de fato em memória é menor do que o array imaginário
         */
        const actualSlice = {
            start: slice.start-(defaultPageSize-pageSize),
            end: slice.end-(defaultPageSize-pageSize)
        }

        return combineLatest(observables)
            .pipe(
                map( (response) => {
                    let resultAccumulator : MovieDbMovieType[] = []  
                    response.map(( r )=> {resultAccumulator = [...resultAccumulator, ...r.results]});
                    return {
                        'total': response[0].total_results,
                        'total_pages': Math.ceil(response[0].total_results/pageSize),
                        'page': pageNumber,
                        'results': resultAccumulator.slice(
                            actualSlice.start,
                            actualSlice.end
                        )
                    }
                })
            )
    }
}
