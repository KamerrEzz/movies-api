const assert = require('assert');
const proxyquire = require('proxyquire');

const {getAllstub, createStub, mongoLibMock} = require('../utils/mocks/mongoLib');
const { moviesMock} = require('../utils/mocks/movies')


describe("services - movies", () => {
    const moviesServices = proxyquire('../services/movies', {
        '../lib/mongo': mongoLibMock
    })

    const moviesservices = new moviesServices();

    describe('when getMovies method is called', async () => {
        it('shuoild call the getall MongoLub method', async () => {
            await moviesservices.getMovies({})
            assert.strictEqual(getAllstub.called, true)
        })

        it('should return an array of movies', async () => {
            const result = await moviesservices.getMovies({})
            const expected = moviesMock;
            assert.deepEqual(result, expected)
        })
    })
})