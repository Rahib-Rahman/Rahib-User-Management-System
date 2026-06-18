const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../db');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const result = await db.query('SELECT id, email, status FROM users where id = $1', [payload.id]);
                const user = result.rows[0];
                if (user && user.status !== 'blocked') {
                    done(null, user);
                }
                else {
                    done(null, false);
                }
            } catch (error) {
                console.log(error);
                done(error, false);
            }
        })
    );
};