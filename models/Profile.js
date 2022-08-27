// 用户的数据模型类
class Profiles {
    constructor() {
        return {
            type: {
                type: String,
                required: true
            },
            describe: {
                type: String,
            },
            income: {
                type: String,
                required: true
            },
            expend: {
                type: String,
                required: true
            },
            cash: {
                type: String,
            },
            remark: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    }
}


module.exports = Profiles