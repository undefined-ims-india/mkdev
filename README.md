# mkdev

_Description of mkdev, targeted audience, what the app is used for_

MkDev is a social networking platform for software developer's that want to connect with each other and share
projects and aspirations in a community. Developers can showcase demos of their projects, source code,....

_Additional line of information text about what the project does. Your introduction should be around 2 or 3 sentences. Don't go overboard, people won't read it._

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed `node 22.1.0`.
- You have locally installed `PostgreSQL@16`.
- You have read `CONTRIBUTING.md` for the git workflow.

### .ENV Configuration

Google Cloud

```
GOOGLE_CLIENT_ID="GOOGLE CLIENT ID HERE"
GOOGLE_CLIENT_Secret="GOOGLE SECRET HERE"
```

Auth0

```
CLIENT_ID="0AUTH ID HERE"
SECRET="OAUTH SECRET HERE"
ISSUER_BASE_URL="OAUTH BASE URL PATH HERE"
PORT=3000
```

PostgreSQL Database

```
DATABASE_URL="postgresql://USER:PASWORD@localhost:5432/DBNAME"
```

## Running mkdev

To install `mkdev`, follow these steps:

```
npm install
npm run build
npm run start
```

## helpful VS Code extensions

`Primsa`
`Prettier TypeScript`

### DB Commands

_Add run commands and examples you think users will find useful. Provide an options reference for bonus points!_

[Set Up](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch) - To start your database start up with these steps

To update prisma db

- prima migrate dev / prisma db push

To seed the database from Prisma/seed.ts

- `npm run seed`

[To Query Database Follow these steps](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/querying-the-database-typescript-postgresql)

## Development Team

- [Cody Daigle](https://github.com/cody-daigle)
- [Alex Hebert](https://github.com/AlexPHebert2000)
- [Patrick Henry](https://github.com/Hackman78)
- [Mike Sammartino](https://github.com/mikesamm)
