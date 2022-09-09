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
        profileFields.crash = req.body.crash;
        profileFields.remark = req.body.remark;
    }

    const mysql_connection = connection.profileSchema();
    mysql_connection.connect();

    const addSql = "insert into `profiles` (type, `describe`, income, expend, crash, remark) values (?, ?, ?, ?, ?, ?)";
    const params = [profileFields.type, profileFields.describe, profileFields.income, profileFields.expend, profileFields.crash, profileFields.remark];
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

// @route get api/profiles
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

// @route get api/profiles
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

// @route POST api/profiles/edit
// @desc 编辑信息接口
// @access Private
router.post('/edit/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
    const profileFields = {};
    if (req.body) {
        profileFields.type = req.body.type;
        profileFields.describe = req.body.describe;
        profileFields.income = req.body.income;
        profileFields.expend = req.body.expend;
        profileFields.crash = req.body.crash;
        profileFields.remark = req.body.remark;
    }

    const mysql_connection = connection.profileSchema();
    mysql_connection.connect();

    const getOneSql = "update profiles set type=?, `describe`=?, income=?, expend=?, crash=?, remark=? where id=?";
    const params = [profileFields.type, profileFields.describe, profileFields.income, profileFields.expend, profileFields.crash, profileFields.remark, req.params.id];
    mysql_connection.query(getOneSql, params, (err, result) => {
        if (err) {
            throw err;
        }
        if(result.affectedRows !== 1) {
            console.log('数据修改失败！');
            res.status(400).json('数据修改失败！');
            return ;
        }
        console.log('编辑成功！');
        res.json(profileFields);
    })
})

// @route POST api/profiles/delete
// @desc 删除信息接口
// @access Private
router.post('/delete/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
    
    const mysql_connection = connection.profileSchema();
    mysql_connection.connect();

    const getOneSql = "delete from profiles where id=?";
    const params = [req.params.id];
    mysql_connection.query(getOneSql, params, (err, result) => {
        if (err) {
            throw err;
        }
        if(result.affectedRows !== 1) {
            console.log('数据删除失败！');
            res.status(400).json('数据删除失败！');
            return ;
        }
        console.log('删除成功！');
        res.json('删除成功！');
    })
})
module.exports = router