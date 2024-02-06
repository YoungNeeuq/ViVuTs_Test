## Quick Start

Clone the repo:

```bash
git clone https://github.com/bigDevUranus/uvivu-backend.git
```

Install the dependencies:

```bash
yarn install
```

## Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=8080

# URL of the Mongo DB
MONGODB_URL=mongodb+srv://haulvdev:xMqMyLR5joP5RU1p@cluster0.sop7o7l.mongodb.net/Vivu_DBretryWrites=true&w=majority

```

### API Endpoints

List of available routes:

**Authen routes**:\
`POST /authen/register` - register\
`POST /authen/login` - login
