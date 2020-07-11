const { request } = require("express");

const sinon = require('sinon');

const {moviesMock, filteredMoviesMock} = require('./movies');

const getAllstub = sinon.stub();
getAllstub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ['Drama']}}
getAllstub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

const createStub = sinon.stub().resolves(moviesMock[0].id);

class mongoLibMock {
    getAll(collection, query){
        return getAllstub(collection, query)
    }

    create(collection, data){
        return createStub(collection, data)
    }
}

module.exports = {
    getAllstub,
    createStub,
    mongoLibMock
}