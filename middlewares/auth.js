const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const db = require('../config/dbConfig');
require('dotenv').config();

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
    try {
        const res = await db.query('SELECT * FROM users WHERE id = $1', [payload.id]);
        if (res.rows.length > 0) {
            return done(null, res.rows[0]);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

const auth = passport.authenticate('jwt', { session: false });
module.exports = auth;
