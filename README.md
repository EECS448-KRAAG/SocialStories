# Classes++
*A KRAAG Product*

## Frontend

This section of the project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the `social-stories-frontend` directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `docker`

Alternatively, you can build the frontend for production with docker by running,

`docker build -t social-stories-frontend:test .`

## Backend

The easiest way to run the backend is to follows the instructions in `Putting it together` below since the backend needs an Elasticsearch instance in order to function.

## Putting it together

To run the full stack at once, first make sure you have docker installed and running. Checkout [their website for more info](https://www.docker.com/). Once docker is installed, simply run the following in the root directory of the project,

`
docker-compose up --build
`

to start the project. The frontend will be running on http://localhost:8080 and the backend is accessible at http://localhost:9000
