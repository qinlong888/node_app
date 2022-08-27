// login or register
const express = require('express')
const connection = require('../../config/mysql_connection')
const router = express.Router()
const passport = require('passport')
// 导入数据模型的对象
const Profile = require('../../models/Profile')

// api地址：api/profiles/test
// 返回请求的json数据
// @access publicv
router.get('/test', (req, res) => {
    res.json('profiles work');
})

// @route POST api/profiles/add
// @desc 创建信息接口
// @access Private
router.post('/add', passport.authenticate("jwt", { session: false }), (req, res) => {
    const profileFields = {};
    if (req.body) {
        profileFields.type = req.body.type;
        profileFields.describe = req.body.describe;
        profileFields.income = req.body.income;
        profileFields.expend = req.body.expend;
        profileFields.cash = req.body.cash;
        profileFields.remark = req.body.remark;
    }

    const mysql_connection = connection.profileSchema();
    mysql_connection.connect();

    const addSql = "insert into `profiles` (type, `describe`, income, expend, crash, remark) values (?, ?, ?, ?, ?, ?)";
    const params = [profileFields.type, profileFields.describe, profileFields.income, profileFields.expend, profileFields.cash, profileFields.remark];
    mysql_connection.query(addSql, params, (err, result) => {
        if (err) {
            throw err;
        }
        console.log('ressult:', result);
        if(result.affectedRows !== 1) {
            res.status(400).json('数据已被注册！');
            return;
        }
        res.json(profileFields);
        mysql_connection.end();
    })

})

module.exports = router