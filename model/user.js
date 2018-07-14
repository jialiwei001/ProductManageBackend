//引入数据库框架
let mongoose = require('mongoose');

//创建数据库映射
let schema=new mongoose.Schema({

    username:{
        type:String,
        unique:true,//是否是唯一的
        required:[true,'用户名不能为空']

    },
    password:{
        type:String,
        required:[true,'密码不能为空']
    },
    age:{
        type:Number,
        min:[0,'年纪最小不能为0'],
        max:[120,'年纪不能超过120']

    },
    role:{
        type:Number,
        default:0 //0表示普通用户，100表示超级管理员
    },
    created:{
        type:Date,
        default:Date.now()
    },


})
//导出实例类
module.exports=mongoose.model('user1',schema)