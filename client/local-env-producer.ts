const {writeFile} = require('fs');
const {argv} = require('yargs'); // read environment variables from .env file
require('dotenv').config(); // read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.ts`; // we have access to our environment variables

// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   API_URL: 'http://localhost:8080/api',
   GOOGLE_MAP_API_KEY: "${process.env.GOOGLE_MAP_API_KEY}",
   host: "${process.env.host || 'localhost'}",
   port: "${process.env.port || '3000'}",
};
`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});
