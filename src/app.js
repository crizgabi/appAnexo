require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const useRoutes = require("./routes/userRoutes");

const app = express();
app.use(bodyParser.json());

//rotas

app.use("/users", userRoutes);

module.exports = app;