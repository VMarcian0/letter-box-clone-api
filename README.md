# Letterbox Clone API

## Description

My first [Nest](https://github.com/nestjs/nest) repository.


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


Meant to be an api clone of letter box where users mark down the movies they watched and leave comments about them.

## Requirements
* MySQL 8
* Node v16.16.0 or greater
* Docker (Optional)

## Setup

### MovieDb Api-key
This application works with a moviedb api key. In order to get one you must first register at [MovieDb Website](https://www.themoviedb.org/) and follow [this tutorial](https://developers.themoviedb.org/3/getting-started/authentication).

### .env
Create a .env file inside the root directory of the application like the following sample:

```
#### sample #####
# PORT
PORT= <API DEFAULT PORT>
# DATABASE
DB_TYPE='mysql'
DB_HOST=<Your db host>
DB_PORT=<Your db port>
DB_USERNAME=<Your db Username>
DB_PASSWORD=<Your db password>
DB_NAME=<your database name>

# JWT
JWT_SECRET=SOME_STRONG_SECRETE_IN_HERE

# SERVICES
## MovieDb config
MOVIE_DB_BASEURL=https://api.themoviedb.org/3
MOVIE_DB_APIKEY=<Your MoviedbApiKey here>
MOVIE_DB_DEFAULT_LANGUAGE=pt-BR
MOVIE_DB_DEFAULT_PAGE_SIZE=20
```


## Installation

```bash
$ npm install -g @feathersjs/cli 
$ npm install
```

## Running the app

```bash
# Make sure you have a mysql database running
# You can achieve that with a docker command
$ docker run --name database -e MYSQL_ROOT_PASSWORD=somePassword -p 3306:3306 -d mysql:8

# development
$ npm run start

# watch mode
$ npm run start:dev
```

## :construction: Test :construction:
#### :construction: :construction:
Currently all the tests are all falling.
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```