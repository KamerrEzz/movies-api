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
        const userMovies = await this.mongoDB.create(this.collection, userMovie)

        return userMovies
    }

    async deleteUserMovie({ userMoviesId}){
        const UserMoviesId = await this.mongoDB.delete(this.collection, userMoviesId)

        return UserMoviesId
    }
}

module.exports = userMoviesServices;