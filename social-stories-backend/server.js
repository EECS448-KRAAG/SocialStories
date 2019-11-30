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
const bodyParser = require("body-parser");

const coursesRoute = require("./routes/courses");
const usersRoute = require("./routes/users");

const app = express();
const port = process.env.NODE_ENV === "test" ? 9001 : 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use("/api/course", coursesRoute);
app.use("/api/user", usersRoute);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
