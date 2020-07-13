const express = require('express');
const UserMoviesService = require('../services/userMovies');
const validationHanlder = require('../utils/middleware/validationHandler')


const { movieIdSchema } = require('../utils/schemas/movies')
const { userIdSchema } = require('../utils/schemas/users')
const { createUserMoviesSchema } = require('../utils/schemas/userMovies');
const userMovies = require('../utils/schemas/userMovies');
const userMoviesServices = require('../services/userMovies');

function userMoviesApi(app) {
    const router = express.Router();
    app.use('/api/user-movies', router);

    const userMoviesService = new UserMoviesService();

    router.get('/', validationHanlder({ userId: userIdSchema }, 'query'), async (req, res, next) => {
        const { userId } = req.query;

        try {
            const userMovues = await userMoviesService.getUserMovies({ userId });

            res.status(200).json({
                data: userMovues,
                message: 'user movies listed'
            })
        } catch (error) {
            next(error)
        }
    });


    router.post('/', validationHanlder({createUserMoviesSchema}), async (req, res, next) => {
        const {body: userMovie} = req;

        try {
            const userMoviesCreate = await userMoviesService.createUserMovie({userMovie});

            res.status(201).json({
                data: userMoviesCreate,
                message: 'user movie created'
            })
        } catch (error) {
            
        }
    })

    router.delete('/', validationHanlder({userMovieId: movieIdSchema}, 'params'), async (req, res , next) => {
        const { userMovieId} = req.params;

        try {
            const deleteUserMovie = await userMoviesService.deleteUserMovie({userMovieId});

            res.status(202).json({
                data: deleteUserMovie,
                message: 'user movie deleted'
            })
        } catch (error) {
            
        }
    })
}

module.exports = userMoviesApi;