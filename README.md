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

run: `gulp serve`


## Client coding
### How to add a component:
Steps to add a component called: `MyComponent`

1. Create directory `src/app/components/my-component/`
2. Create typescript file src/app/components/my-component/my-component.ts`
  * `components/home`
  * http://almerosteyn.com/2016/02/angular15-component-typescript
  * https://docs.angularjs.org/error/$compile/nonassign?p0=undefined&p1=awesomeThings&p2=home
3. Add reference to typescript file in `src/app/modules.ts`:
  1. /// <reference path="components/my-component/my-component.ts" />
  2. `angular.module('leesFriends.components', []).component('myComponent', new MyComponent())...`