# LeesFriends

##Environment setup
1. `node -v`-> v6.3.1
2. `npm -v` -> 3.10.5

##Setup
1. `cd {project_root}/`
2. `cd client/`
3. `npm install`
4. `cd ../server`
5. `npm install`

## Client code
Can be found in `client/` directory.

`webpack` build environment.
`Typescript 2.0.10` for JS language.
`Angular 2.0` for framework.

> `cd client`

- `npm start` (watched dev mode. For more see package.json > scripts: {...})

## Server code
Can be found in `server/`

`Node + express` server
`Typescript 2.0.10` for language

> `cd server`

1. Start typescript compiling:
- `nohup npm run grunt &` (Runs in background. Look at nohup.out for logs.)
2. Start server
- `npm run dev` (starts on port 8080 - http://localhost:8080)