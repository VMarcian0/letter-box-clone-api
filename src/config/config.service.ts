// src/config/config.service.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { MovieDbConfigType } from './types/movie-db.config.type';

require('dotenv').config();

class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: this.getValue('DB_TYPE') as any,

      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USERNAME'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_NAME'),

      entities: [__dirname + '/../**/*.entity.js'],
      //migrations: ['./migrations/*.js'],
      synchronize: true
    };
  }

  public getJwtConfig(): string{
    return this.getValue('JWT_SECRET');
  }

  public getMovieDbConfig(): MovieDbConfigType{
    const config : MovieDbConfigType = {
      apiKey: this.getValue('MOVIE_DB_APIKEY'),
      baseUrl: this.getValue('MOVIE_DB_BASEURL'),
      defaultLanguage: this.getValue('MOVIE_DB_DEFAULT_LANGUAGE'),
      defaultPageSize: +this.getValue('MOVIE_DB_DEFAULT_PAGE_SIZE')
    }
    return config;
  } 

}

const configService = new ConfigService(process.env)
  .ensureValues([
    // Database
    'DB_TYPE',
    'DB_HOST',
    'DB_PORT',
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_NAME',
    // JWT
    'JWT_SECRET',
    // Services
    // MovieDbConfig
    'MOVIE_DB_BASEURL',
    'MOVIE_DB_APIKEY',
    'MOVIE_DB_DEFAULT_LANGUAGE',
    'MOVIE_DB_DEFAULT_PAGE_SIZE'
  ]);

export { configService };