const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const boom = require('@hapi/boom');

const UsersService = require('../../../services/users');
const { config} = require('../../../config/index');
const UsersServices = require('../../../services/users');


passport.use(
    new Strategy({
        secretOrKey: config.authJwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() //donde estara el jwt
    },
    async (tokenPayload, cb) => {
        const userService = new UsersServices();

        try {
            const user = await userService.getUser({ email: tokenPayload.email});

            if(!user){
                return cb(boom.unauthorized(), false)
            }

            delete user.password

            cb(null, {...user, scope: tokenPayload.scopes})
        } catch (error) {
            return cb(error)
        }
    })
)