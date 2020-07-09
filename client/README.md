# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.1.

## Development server

1. Create .env with:
> GOOGLE_MAP_API_KEY=[how to get it](#google-api-keys)
2. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Adjust local environment settings
[local-env-producer.ts](./local-env-producer.ts)
> ie. API_URL

## Google API keys
To load the Contact Us map, you'll need to add your public IP address to the whitelist in the [Google Cloud Console](https://console.cloud.google.com/?pli=1).  
Please contact an admin of the Cloud Console to do so.
Another solution is to generate your own key to use during development.

## Client code
Can be found in `client/` directory.

`webpack` build environment.  
`Typescript 2.0.10` for JS language.  
`Angular 2.0` for framework.  

- `npm start` (watched dev mode @ http://localhost:3000)
> For more commands see package.json > scripts: {...}

