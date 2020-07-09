const express = require('express');
const MoviesService = require("../services/movies");

function moviesApi(app){
    const router = express.Router();
    app.use('/api/movies', router);

    const moviesService = new MoviesService()

    router.get("/", async (req, res, next) => {
        const { tags } = req.query;
        try {
            const movies = await moviesService.getMovies({ tags })
        
            res.status(200).json({
                data: movies,
                message: "movies listed"
            })
        } catch (error) {
            next(error)
        }
    })
    router.get("/:movieId", async (req, res, next) => {
        try {
            const movies = await Promise.resolve(moviesMock[0]);
        
            res.status(200).json({
                data: movies,
                message: "movies recivied"
            })
        } catch (error) {
            next(error)
        }
    })
    router.post("/", async (req, res, next) => {
        try {
            const createMovie = await Promise.resolve(moviesMock[0].id);
        
            res.status(201).json({
                data: createMovie,
                message: "movies created"
            })
        } catch (error) {
            next(error)
        }
    })
    router.put("/:movieId", async (req, res, next) => {
        try {
            const updateMovies = await Promise.resolve(moviesMock[0].id);
        
            res.status(200).json({
                data: updateMovies,
                message: "movies update"
            })
        } catch (error) {
            next(error)
        }
    })
    router.delete("/:movieId", async (req, res, next) => {
        try {
            const deleteMovies = await Promise.resolve(moviesMock[0].id);
        
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