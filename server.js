const express = require('express')
const app = express()

// 引入users
const users = require('./routes/api/users')
// 引入profiles
const profiles = require('./routes/api/profiles')

// 引入body-parser的中间件,解析http请求体
const bodyParser = require('body-parser')

// 引入数据库的配置
const connection = require('./config/mysql_connection')

const passport = require('passport')


// 执行连接数据库的中间件
const mysql_connection = connection.userSchema()
mysql_connection.connect();
const sql = 'SELECT * FROM `schema`';
mysql_connection.query(sql, (err, result, fields) => {
    if (err) {
        console.log('数据连接失败：', err);
        return;
    }
    // console.log('字段数据：', fields)
    console.log('连接成功result：');
})
mysql_connection.end();

// passport初始化
app.use(passport.initialize());
// 把引入的passport传递到passport.js中
require('./config/passport')(passport);


// 使用body-parser,bodyParser.json是用来解析json数据格式的。bodyParser.urlencoded则用来解析我们通常的form表单提交的数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// 使用routes
app.use('/api/users', users)
app.use('/api/profiles', profiles)

const port = process.env.PORT || 5000

app.listen(port, '127.0.0.1', function () {
    console.log(`Server running on port ${port}`)
})
