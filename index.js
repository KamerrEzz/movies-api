const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.routes');

app.use(express.json())

moviesApi(app)

app.listen(config.port, () => {
    console.log("APP iniciado")
});