# OSlash

## Requirements

- [Node v16.14.2][nodejs]
- [NPM v8](https://docs.npmjs.com/) Package Manager
- [PostgreSQL][postgress] (v13)
- [pgAdmin]

## Quickstart

Clone the repo `https://github.com/akanksha1909/OSlash-assignment.git`

```bash
cd OSlash-assignment
```

Install NPM 8

```bash
npm i -g npm@8
```

Initialising the repository

Install packages

```
npm i
```

### Connect postgres DB with pgAdmin

- Open pgAdmin
- Click on `Create Server`
- In `General Tab`, give the name of your choice
- In `Connection Tab`
  - Host name/address: "localhost"
  - Port: 5432
  - Maintenace Database: "postgres"
  - Username: "postgres"
  - password: "oslash@Password" // If you wish to use other password, please change into config files too.

### Database Setup

- Create a DB "OSlash" for development environment.
- Create a DB "TestingDB" for test environment.


### Run Migration to create tables in DB

```bash
npm run migrate
```


### Run Server

```bash
npm start
```

### Run tests

```bash
npm run test
```