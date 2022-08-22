const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const keys = require('../config/keys')

const mysql_connection = require('../config/mysql_connection');
// const User = require('../models/User');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secreteOrkey;


module.exports = passport => {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        const connection = mysql_connection.createConnection();
        connection.connect();

        const selectSql = 'select * from `schema` where id=?';
        connection.query(selectSql, [jwt_payload.id], (err, res) => {
            if (err) {
                console.log('查找唯一id的语句失败!', err);
                return;
            }
            console.log(res)
            // 在数据库中找到了这个id对应的用户
            if (res[0].length !== 0) {
                const user = res[0];
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        connection.end();
    }));
}