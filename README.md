# LeesFriends

##Setup
1. `cd {project_root}/`
2. `bundle install`
3. `cd client/`
4. `npm install`
5. `bower install`

## Client code
Can be found in `/client` directory.

`gulp` build environment.  
`Typescript` for JS language.  
`Angular 1.X` for framework.  

- `$ gulp` to build an optimized version of your application in folder dist
- `$ gulp serve` to start BrowserSync server on your source files with live reload
- `$ gulp serve:dist` to start BrowserSync server on your optimized application without live reload
- `$ gulp test` to run your unit tests with Karma
- `$ gulp test:auto` to run your unit tests with Karma in watch mode
- `$ gulp protractor` to launch your e2e tests with Protractor
- `$ gulp protractor:dist` to launch your e2e tests with Protractor on the dist files



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