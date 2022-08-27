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
        if (result.affectedRows !== 1) {
            res.status(400).json('数据已被注册！');
            return;
        }
        res.json(profileFields);
        mysql_connection.end();
    })
})

// @route POST api/profiles
// @desc 获取所有信息接口
// @access Private
router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {

    const mysql_connection = connection.profileSchema();
    mysql_connection.connect();

    const getAllSql = "select * from profiles";
    mysql_connection.query(getAllSql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})

// @route POST api/profiles
// @desc 获取单个信息接口
// @access Private
router.get('/:id', passport.authenticate("jwt", { session: false }), (req, res) => {

    const mysql_connection = connection.profileSchema();
    mysql_connection.connect();

    const getOneSql = "select * from profiles where id=?";
    const params = [req.params.id];
    mysql_connection.query(getOneSql, params, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})

module.exports = router