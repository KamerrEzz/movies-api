const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.routes');
const userMoviesApi = require('./routes/userMovies.routes');

const {errorHandler, logErros, wrapErros} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const notFoundHanlder = require('./utils/middleware/notFoundHandler');
const userMovies = require('./utils/schemas/userMovies');


app.use(express.json())

moviesApi(app) //ruta 
userMoviesApi(app) // movies users

// Catch 404
app.use(notFoundHanlder)

//middlerware Errors
app.use(logErros); 
app.use(wrapErros); //error boom
app.use(errorHandler);

app.listen(config.port, () => {
    console.log("APP iniciado")
});