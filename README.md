# mkdev

**_mkdev_ is by Developers for Developers.**

_mkdev_ is a social networking platform for software developers to connect and share projects. In mkdev posts and users have tags that are searchable to find users and showcases that use a technology, If you are interested in a technology or topic you can follow tags to see popular posts


## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed `node 22.1.0`.
- You have a `PostgreSQL` server to connect to, we reccomend [Neon](https://neon.tech).
- You have read `CONTRIBUTING.md` for the git workflow.

## Helpful VS Code extensions

- `Primsa` for code highlighting and formatting for .prisma files

- `Pretty TypeScript Errors` for easier to read Typescript errors

### .ENV Configuration

**[Template](.env.example)**

#### You will need API keys from the following resources

- [Google Cloud Console](https://console.cloud.google.com/) => OAuth 2.0 Client IDs
- [AWS IAM](https://us-east-1.console.aws.amazon.com/iam) => AWS Access Keys

## Running mkdev

To install `mkdev`, follow these steps:

- `npm install` => install dependencies
- `npx prisma migrate dev` => builds database with prisma and generates ORM
- `npm run seed` => add some default data to db

To run `mkdev`, follow these steps:

- `npm run build` => check client types and generate dist folder for client
- `npm start` => run server

### DB Commands

_Add run commands and examples you think users will find useful. Provide an options reference for bonus points!_

[Set Up](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch) - To start your database start up with these steps

To update prisma db

- `npx prima migrate dev` / `npx prisma db push`

To seed the database from Prisma/seed.ts

- `npm run seed`

To inspect database with GUI

- `npx prisma studio`

[To Query Database Follow these steps](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/querying-the-database-typescript-postgresql)

## Development Team

- [Cody Daigle](https://github.com/cody-daigle)
- [Alex Hebert](https://github.com/AlexPHebert2000)
- [Patrick Henry](https://github.com/Hackman78)
- [Mike Sammartino](https://github.com/mikesamm)
