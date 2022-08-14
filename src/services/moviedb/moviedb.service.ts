import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MovieDbConfigType } from '../../config/types/movie-db.config.type';
import { configService } from '../../config/config.service';
import { GenreType } from './types';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MovieDbPaginationType } from './types/pagination.type';
import { MovieDbMovieType } from './types/movie.type';


@Injectable()
export class MovieDBService {
    private config : MovieDbConfigType;
    constructor(private http: HttpService){
        this.config = configService.getMovieDbConfig();
    }

    getDefaultPageSize(): number {
        return this.config.defaultPageSize;
    }

    getGenresList(): Observable<GenreType[]> {
        const endpoint = `/genre/movie/list`;
        return this.http.get(
            `${this.config.baseUrl}` +
            `${endpoint}` +
            `?api_key=${this.config.apiKey}` +
            `&language=${this.config.defaultLanguage}`
        )
        .pipe(
            map( response => response?.data?.genres || [] )
        )
    }

    getMoviesByGenre(genres:number[],page:number): Observable<MovieDbPaginationType<MovieDbMovieType>> {
        const endpoint = `/discover/movie`;
        return this.http.get(
            `${this.config.baseUrl}` +
            `${endpoint}` +
            `?api_key=${this.config.apiKey}` +
            `&language=${this.config.defaultLanguage}` +
            `&with_genres=${genres}` +
            `&page=${page}`
        )
        .pipe(
            map( response => response?.data )
        )
    }
}
