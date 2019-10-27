const express = require("express");
const morgan = require("morgan");
const storiesRoute = require("./routes/stories");

const bodyParser = require('body-parser');

const app = express();
const port = 9000;
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use("/course", storiesRoute);
app.listen(port);