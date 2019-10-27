const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');

const storiesRoute = require("./routes/stories");

const app = express();
const port = 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use("/course", storiesRoute);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});