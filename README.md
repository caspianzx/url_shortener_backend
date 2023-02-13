
## Description
Repository for url shortener backend.

## Requisite (for local dev)
Install Node 16 & Docker </br>
Create a .env file and paste the environment variable in .env.example into the .env file

## Installation

```bash
# sets up monggo db using docker
$ npm run db-up

# installs dependencies
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Teardown

```bash
# remove containers
$ npm run db-down

# remove docker db volume
$ npm run db-remove-volume

```