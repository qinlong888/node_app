// login or register
const express = require('express')
const connection = require('../../config/mysql_connection')
const bcrypt = require('bcrypt')
// const User = require('../../models/User')
const router = express.Router()
// 引入头像包
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
// 导入数据模型的对象
const User = require('../../models/User')


// $route get api/users/test
// 返回请求的json数据
// router.get('/test', function (req, res) {
//     res.json({ msg: 'login works' });
// })


router.post('/register', async (req, res) => {
    // console.log(req.body)
    // 查询数据库中是否有这个名字
    const mysql_connection = connection.userSchema();
    mysql_connection.connect();

    // 在确认插入该数据之前，需要对密码进行加密处理
    const hashPassword = await bcrypt.hashSync(req.body.password, 10);

    let addSql = "insert into `schema` (name, email, avatar, password, identity) select ?, ?, ?, ?, ? from dual where not exists (select name from `schema` where email=?)";
    let newUser = {
        name: req.body.name,
        email: req.body.email,
        avatar: req.body.avatar,
        password: hashPassword,
        identity: req.body.identity
    }
    console.log('newUser.identity', newUser.identity)
    let addSqlParam = [newUser.name, newUser.email, newUser.avatar, newUser.password, newUser.identity, newUser.email];

    mysql_connection.query(addSql, addSqlParam, function (err, result) {
        // 数据库中没有这个名字，执行SQL插入语句
        // 判断SQL语句是否执行失败
        if (err) {
            console.log('SQL语句是否执行失败：', err);
            return;
        }
        // 判断数据是否插入成功
        if (result.affectedRows !== 1) {
            console.log('邮箱已被注册！');
            res.status(400).json('邮箱已被注册！');
            return;
        }

        const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
        newUser.avatar = avatar;

        // console.log('注册成功：', result1)
        console.log('newUser:', newUser);
        res.json(newUser);
        mysql_connection.end();
    })
})

// 用户登录，发送token
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const mysql_connection = connection.userSchema();
    mysql_connection.connect();

    const checkSql = 'select * from `schema` where email=?'
    mysql_connection.query(checkSql, [email, password], async (err, result) => {
        // 判断SQL语句是否执行失败
        if (err) {
            console.log('SQL语句是否执行失败：', err);
            return;
        }
        if (result.length === 0) {
            return res.json('用户不存在！' );
        }
        // 密码校验
        const user = result[0];

        const match = await bcrypt.compare(password, user.password);

        console.log(user)
        if (match) {
            // 密码匹配成功
            // token规则
            // const rule = { id: user.id, name: user.name };
            // console.log(rule)
            // token过期时间
            jwt.sign({
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                identity: user.identity
            }, keys.secreteOrkey, { expiresIn: 3600 }, (err, token) => {
                if (err) {
                    throw err;
                }
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                })
            });

            // res.json({ msg: '登录成功！' });
        } else {
            return res.status(400).json('密码错误！');
        }
    })
})

// 用户通过token获取当前信息
router.get('/current', passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.avatar,
        identity: req.identity
    });
})

module.exports = router