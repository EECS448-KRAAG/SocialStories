/**
 * Main module to run backend server. Starts server on port 9000
 * @module server
 * @requires express
 * @requires morgan
 * @requires body-parser
 * @requires module:routes/courses
 */

const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');

const coursesRoute = require("./routes/courses");

const app = express();
const port = 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use("/api/course", coursesRoute);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});