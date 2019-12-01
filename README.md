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

The easiest way to run the backend is to follow the instructions in `Putting it together` below since the backend needs an Elasticsearch instance in order to function. To generate fake data for testing follow the instructions below under `bootstrapping`.

### Testing
The backend tests are built and run using Mocha and Chai. You can execute them in the docker-compose environnement described below by running

`
docker-compose run backend npm test
`

## Putting it together

To run the full stack at once, first make sure you have docker installed and running. Checkout [their website for more info](https://www.docker.com/). Once docker is installed, simply run the following in the root directory of the project,

`
docker-compose up --build
`

to start the project. The frontend will be running on http://localhost:3000 and the backend is accessible at http://localhost:9000

### Bootstrapping
To bootstrap the environment with fake data for testing simply run the following after running the `docker-compose` command above

`docker-compose exec backend node bootstrap.js`

## Documentation
To view the most up to date documentation simply open [./documentation/index.html](./documentation/index.html). To generate documentation run:

`npx jsdoc -r -c jsdoc.config.json .`

## Bugs List
* Backend
  * The viewing post list is limited to 250 posts, which means that if there are more than 250 posts, the user has no way to know what they are missing posts.
  * Search input is not sanitized and a few specially crafted queries can overload Elasticsearch for a few seconds due to the wildcard search we're using.
  
* Frontend
