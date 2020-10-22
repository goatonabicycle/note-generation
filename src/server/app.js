var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
import setup from "./api";

var app = express();

app.set("views", path.join(__dirname, "../client/views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client/public")));

setup(app);

const port = 8000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
