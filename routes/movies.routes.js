const express = require('express');
const MoviesService = require("../services/movies");

const { movieIdSchema, createMovieSchema, updateMovieSchema } = require('../utils/schemas/movies');

const validationHanlder = require('../utils/middleware/validationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS} = require('../utils/time');

function moviesApi(app) {
    const router = express.Router();
    app.use('/api/movies', router);

    const moviesService = new MoviesService()

    router.get("/", async (req, res, next) => {
        cacheResponse(req, FIVE_MINUTES_IN_SECONDS)
        const { tags } = req.query;
        try {
            const movies = await moviesService.getMovies({ tags })

            // throw new Error("Error gettings movies")

            res.status(200).json({
                data: movies,
                message: "movies listed"
            })
        } catch (error) {
            next(error)
        }
    })
    router.get("/:movieId", validationHanlder({ movieId: movieIdSchema }, 'params'), async (req, res, next) => {
        cacheResponse(req, SIXTY_MINUTES_IN_SECONDS)
        const { movieId } = req.params
        try {
            const movie = await moviesService.getMovie({ movieId })

            res.status(200).json({
                data: movie,
                message: "movies recivied"
            })
        } catch (error) {
            next(error)
        }
    })
    router.post("/", validationHanlder(createMovieSchema), async (req, res, next) => {
        const { body: movie } = req;
        try {
            const createMovie = await moviesService.createMovie({ movie })

            res.status(201).json({
                data: createMovie,
                message: "movies created"
            })
        } catch (error) {
            next(error)
        }
    })
    router.put("/:movieId", validationHanlder({ movieId: movieIdSchema }, 'params'), validationHanlder(updateMovieSchema), async (req, res, next) => {
        const { movieId } = req.params;
        const { body: movie } = req;
        try {
            const updateMovies = await moviesService.updateMovie({
                movieId,
                movie
            })

            res.status(200).json({
                data: updateMovies,
                message: "movies update"
            })
        } catch (error) {
            next(error)
        }
    })
    router.delete("/:movieId", validationHanlder({ movieId: movieIdSchema }, 'params'), async (req, res, next) => {
        const { movieId } = req.params;
        try {
            const deleteMovies = await moviesService.deleteMovie({ movieId });

            res.status(200).json({
                data: deleteMovies,
                message: "movies delete"
            })
        } catch (error) {
            next(error)
        }
    })
}


module.exports = moviesApi;