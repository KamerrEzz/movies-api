const express = require('express');
const MoviesService = require("../services/movies");

function moviesApi(app) {
    const router = express.Router();
    app.use('/api/movies', router);

    const moviesService = new MoviesService()

    router.get("/", async (req, res, next) => {
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
    router.get("/:movieId", async (req, res, next) => {
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
    router.post("/", async (req, res, next) => {
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
    router.put("/:movieId", async (req, res, next) => {
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
    router.delete("/:movieId", async (req, res, next) => {
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