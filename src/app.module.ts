import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { configService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { MovieDBService } from './services/moviedb/moviedb.service';
import { HttpModule } from '@nestjs/axios';
import { MoviesController } from './movies/movies.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    AuthModule,
    HttpModule
  ],
  controllers: [AppController, MoviesController],
  providers: [AppService, MovieDBService],
})
export class AppModule {}
