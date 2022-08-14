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
        const pageSize = queryParams.pageSize;
        const defaultPageSize = this.movieDBService.getDefaultPageSize();
        const pageNumber = +queryParams?.page || 1;
        /**
         * Supondo um array com todos os retornos possiveis,
         * esse objeto defin qual é o intervalo desse array que a api precisar retornar
         */
        const slice = {
            start: (pageNumber -1)*pageSize,
            end: (pageSize * pageNumber)
        }
        const pagesToFetch = {
            start: Math.ceil(slice.start/defaultPageSize),
            end: Math.ceil(slice.end/defaultPageSize)
        }
        
        let observables : Observable<MovieDbPaginationType<MovieDbMovieType>>[] = [];
        for(let page = pagesToFetch.start; page<= pagesToFetch.end; page++){
            observables.push(this.movieDBService.getMoviesByGenre(queryParams.themes_ids, page))
        }
        console.log('slice',slice)
        console.log('pagesToFetch',pagesToFetch)
        /**
         * To avoid over fetching the actual array is shorter than the one thats available
         */
        const actualSlice = {
            start:slice.start-(defaultPageSize-pageSize),
            end:slice.end-(defaultPageSize-pageSize)
        }
        console.log('actualSlice', actualSlice);
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
                            actualSlice.start,
                            actualSlice.end
                        )
                    }
                })
            )
    }
}
