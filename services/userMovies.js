const MongoLib = require('../lib/mongo');


class userMoviesServices {
    constructor(){
        this.collection = 'user-movies';
        this.mongoDB = new MongoLib();
    }

    async getUserMovies({ userId }){
        const query = userId && { userId};
        const userMovies = await this.mongoDB.getAll(this.collection, query)

        return userMovies || []
    }

    async createUserMovie({ userMovie }){
        const userMoviesId = await this.mongoDB.getAll(this.collection, userMovie)

        return userMoviesId
    }

    async deleteUserMovie({ userMoviesId}){
        const userMoviesId = await this.mongoDB.delete(this.collection, userMoviesId)

        return userMoviesId
    }
}

module.exports = userMoviesServices;