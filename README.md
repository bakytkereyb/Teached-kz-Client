# Project: Frontend for teached.kz

## Requirements
* Node.js
* npm

## Running the Project
1. Make sure you have Node.js and npm installed.
2. Navigate to the project's root directory.
3. Run the command `npm start` to start the project.
4. The project will be available at `http://localhost:3000`.

## Building the Project
To build the project, use the following command:
`npm run build`
This will create a production build in the build folder.

## Configuring the API
Before starting the application, make sure to configure the `api.js` file in the `constants` folder. Set the API base URL according to your environment:\
`export const API_BASE_URL = "https://teached.kz";`\
or\
`export const API_BASE_URL = "http://localhost:8080";`\
if the backend is running on a local server.
