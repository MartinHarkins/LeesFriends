# LeesFriends

##Environment setup
1. `node -v`-> v6.3.1
2. `npm -v` -> 3.10.5

##Setup
1. `cd {project_root}/`
2. `npm install`
3. `cd ../client`
4. `npm install`

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
- `nohup npm run grunt &` (Runs in background. Look at nohup.out for logs.)
2. Start server
- `npm run dev` (watched dev mode @ http://localhost:8080)
