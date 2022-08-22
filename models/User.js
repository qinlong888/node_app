// 用户的数据模型类
class User {
    constructor() {
        return {
            id: {
                type: Number,
            },
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            avatar: {
                type: String,
            },
            identity: {
                type: String,
                require: true
            },
            date: {
                type: String,
                default: Date.now
            }
        }
    }
}


module.exports = User