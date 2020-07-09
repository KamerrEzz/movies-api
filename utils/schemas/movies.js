const joi = require('@hapi/joi');

const movieIdSchema = joi.string().regex(/^[0-9a-fA-f]{24}$/);
const movieTitleSchame = joi.string.max(80);
const movieYearSchema = joi.number().min(1888).max(2077);
const movieCoverSchema = joi.string().uri();
const movieDescSchema = joi.string().max(300)
const movieDurationSchema = joi.string.min(1).max(300);
const moviesContentRatingSchema = joi.string().max(5);
const movieSourceSchema = joi.string().uri();
const movieTagsSchema = joi.array().items(joi.string().max(50))


const createMovieSchema = {
    title: movieTitleSchame.required(),
    year: movieYearSchema.required(),
    cover: movieCoverSchema.required(),
    description: movieDescSchema.required(),
    duration: movieDurationSchema.required(),
    contentRating: moviesContentRatingSchema.required(),
    source: movieSourceSchema.required(),
    tags: movieTagsSchema
};

const updateMovieSchema = {
    title: movieTitleSchame,
    year: movieYearSchema,
    cover: movieCoverSchema,
    description: movieDescSchema,
    duration: movieDurationSchema,
    contentRating: moviesContentRatingSchema,
    source: movieSourceSchema,
    tags: movieTagsSchema
}

module.exports = { createMovieSchema, updateMovieSchema, movieIdSchema }