# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js v18.16.0 - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

- `npm start` to start application
- `npm start:dev` to start application in development/watch mode
- `docker compose up` to start application in development/watch mode in docker container

NOTE: on DB schema change containers needs to be restarted, on changes in packages docker image needs to be rebuilt

## OpenAPI

After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

Alternatively, you can open https://editor.swagger.io/ and upload `doc/apiUpdated.yaml`. Make sure you manually update port if your server running on non-default one.

## Environment

Please see `.env.example` to setup your local environment
```
PORT=4000

DB_NAME=home_library
DB_USER=home_library_service
DB_PASSWORD=your_strong_db_password
DB_HOST=database
DB_PORT=5432
DB_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public
```
NOTE: For usage with docker compose provided containerized database, DB_HOST should be configured to be service name `db` it's aliases: `database` or `postgres`

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
