# LeesFriends

##Environment setup
1. `node -v`-> v6.3.1
2. `npm -v` -> 3.10.5
3. (mongo)[https://docs.mongodb.com/manual/installation/#tutorials]

##Setup
1. `cd {project_root}/`
2. `npm install`
3. `cd ../client`
4. `npm install`
5. `mongo` (start mongo - no credentials needed for local environment)

/!\  

Right now the project is in a bastardized condition:  
The client can be served two ways: webpack and our server.  
The page at `localhost:3000` will be updated upon changes in the `client/`  
The page at `localhost:8080` will be updated only when running the `npm run grunt:dev` command in `server/`  
That's because webpack (in `client/`) will rebuild into `{project_root}/client/dist`.
However `localhost:8080` expects the client code to be in `{project_root}/dist/client`.
The `{project_root}/client/dist` code is copied over into `{project_root}/dist/client` only once `npm run grunt:dev` is run.
> `npm run grunt:dev watch` doesn't look for changes in `client/dist`.  

/!\  

## Client code
Can be found in `client/` directory.

`webpack` build environment.  
`Typescript 2.0.10` for JS language.  
`Angular 2.0` for framework.  

- `npm start` (watched dev mode @ http://localhost:3000)
> For more commands see package.json > scripts: {...}

## Server code
Can be found in `{project_root}`

`Node + express` server  
`Typescript 2.0.10` for language  

1. Start typescript compiling:
- `npm run grunt:dev watch`
2. Start server
- `npm run dev` (watched dev mode @ http://localhost:8080)
