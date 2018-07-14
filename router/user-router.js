//导入web框架的包
let express = require('express');
//引入server层的包
let Ser = require('../server/user-service');

//创建框架对象
let router = express.Router();

/**
 * 查询用户的方法
 */
router.get('/:username',async (req,res)=>{

    let getres = await Ser.getone(req.params.username);

     console.log('查询成功')
    res.success(getres)
})

/**
 * 删除用户的方法
 */
router.delete('/:username',async (req,res)=>{
    let deleteres = await Ser.deleteone(req.params.username);

    console.log('删除用户成功')
    res.send(deleteres)
})
/**
 * 注册用户的方法
 */
router.post('/register',async (req,res)=>{
    let registerres = await Ser.registeruser(req.body);

    console.log('注册用户成功')
    res.success(registerres)
})
/**
 * 用户登录的方法
 */
router.post('/login',async (req,res)=>{
    let token = await Ser.loginuser(req.body);

    console.log('登录用户成功')
    res.success(token)
})

//输出接口
module.exports=router