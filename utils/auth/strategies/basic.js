const passport = require('passport')
const {BasicStrategy} = require('passport-http')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const UserService = require('../../../services/users')
const { use } = require('passport')

passport.use(new BasicStrategy(async (email, password, cb) => {

    const UserServices = new UserService();

    try {
        const user = await UserServices.getUser({email});
        if(!user){
            return cb(boom.unauthorized(), false);
        }
        if(!await bcrypt.compare(password, user.password)) {
            return cb(boom.unauthorized(), false)
        }

        delete use.password;

        return cb(null, user)

    } catch (error) {
        return cb(error)
    }
}));