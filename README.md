# LeesFriends

##Environment setup
1. `node -v`-> v6.3.1
2. `npm -v` -> 3.10.5
3. `typings -v` -> 1.3.2
4. `bower -v` -> 1.7.9
> Typings and bower can be installed using `npm`

##Setup
1. `cd {project_root}/`
2. `bundle install`
3. `cd client/`
4. `npm install`
5. `bower install`

## Client code
Can be found in `client/` directory.

`gulp` build environment.  
`Typescript` for JS language.  
`Angular 1.X` for framework.  

> `cd client`

- `$ gulp` to build an optimized version of your application in folder dist
- `$ gulp serve` to start BrowserSync server on your source files with live reload
- `$ gulp serve:dist` to start BrowserSync server on your optimized application without live reload
- `$ gulp test` to run your unit tests with Karma
- `$ gulp test:auto` to run your unit tests with Karma in watch mode
- `$ gulp protractor` to launch your e2e tests with Protractor
- `$ gulp protractor:dist` to launch your e2e tests with Protractor on the dist files


## Server code
Can be found in `server/`

> `cd server`

- `$ DEBUG=myapp:*;PORT=8080 npm start` to start the server in debug mode and on port 8080

## Client coding
### How to add a component:
Steps to add a component called: `MyComponent`

1. Create directory `src/app/components/my-component/`
2. Create typescript file src/app/components/my-component/my-component.ts`
  * `components/home`
  * http://almerosteyn.com/2016/02/angular15-component-typescript
  * https://docs.angularjs.org/error/$compile/nonassign?p0=undefined&p1=awesomeThings&p2=home
3. Add reference to typescript file in `src/app/index.modules.ts`:
  1. import ...
  2. `angular.module('leesFriends.components', []).component('myComponent', new MyComponent())...`
