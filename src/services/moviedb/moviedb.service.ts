import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MovieDbConfigType } from '../../config/types/movie-db.config.type';
import { configService } from '../../config/config.service';
import { GenreType } from './types';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class MovieDBService {
    private config : MovieDbConfigType;
    constructor(private http: HttpService){
        this.config = configService.getMovieDbConfig();
    }

    getGenresList(language?:string): Observable<GenreType[]> {
        const endpoint = `/genre/movie/list`;
        return this.http.get(
            `${this.config.baseUrl}` +
            `${endpoint}` +
            `?api_key=${this.config.apiKey}` +
            `&language=${language ? language : this.config.defaultLanguage}`
        )
        .pipe(
            map( response => response?.data?.genres || [] )
        )
    }

    getMoviesByGenre(genre:string,language?:string): Observable<any> {
        const endpoint = `/discover/movie`;
        return this.http.get(
            `${this.config.baseUrl}` +
            `${endpoint}` +
            `?api_key=${this.config.apiKey}` +
            `&language=${language ? language : this.config.defaultLanguage}` +
            `&with_genres=${+genre}`
        )
        .pipe(
            map( response => response?.data )
        )
    }
}
