const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMock, moviesServiceMock } = require('../utils/mocks/movies');
const testServer = require('../utils/testServer');
const { requests } = require('sinon');


describe('routes - movies', () => {
    
    const route = proxyquire('../routes/movies.routes',{
        '../services/movies': moviesServiceMock
    });

    const request = testServer(route)
    
    describe('GET /movies', () => {
        it('should respond with status 200', (done) => {
            request.get('/api/movies').expect(200, done);
        })
        it('should respond with the list of movies', (done) => {
            request.get('/api/movies').end((err, res) => {
                assert.deepEqual(res.body, {
                    data: moviesMock,
                    message: 'movies listed'
                });

                done()
            })
        })
    })
})


