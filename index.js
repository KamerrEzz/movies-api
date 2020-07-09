const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.routes');

const {errorHandler, logErros} = require('./utils/middleware/errorHandlers');

app.use(express.json())

moviesApi(app) //ruta 

//middlerware
app.use(logErros); 
app.use(errorHandler);

app.listen(config.port, () => {
    console.log("APP iniciado")
});