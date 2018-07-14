//链接实体类
let User = require('../model/user');
let crypto = require('lxj-crypto');
//引入配置的包
let config = require('../config');


/**
 * 查询用户的方法
 * @param username
 * @returns {Promise<*>}
 */
async function getone(username) {
    let findres = await User.findOne({username: username});

    if (!findres) {
        throw Error(`${username}用户不存在`)
    }
    return findres;
}

/**
 * 删除一个用户的操作
 * @param username
 * @returns {Promise<*>}
 */
async function deleteone(username) {
    //先查询用户是否存在
    IsUserExist(username)

    let delres = await User.deleteOne({username: username});

    return `${username}用户删除成功`+JSON.stringify(delres)

}

/**
 * 封装一个查询用户是否存在的方法
 * @param username
 * @constructor
 */
function IsUserExist(username) {
    let findoneres = User.findOne({username: username});
    if (!findoneres) {
        throw Error(`${username}用户不存在`)
    }
}

/**
 * 用户注册的信息
 * @param user
 * @returns {Promise<*>}
 */
async function registeruser(user) {
    //先判断用户是否存在
    let findres =await User.findOne({username: user.username});
    if (findres) {
        throw Error(`${user.username}用户已经存在`)
    }

    //用户密码进行加密
    user.password = crypto.sha1Hmac(user.password, user.username)
    //设置他的基本信息
    user.role = 0;
    user.created = Date.now()
    //保存用户信息
    let createres = await User.create(user);
    return `${user.username}用户注册成功` ;

}

/**
 * 登录的方法
 * @param user
 * @returns {Promise<void>}
 */
async function loginuser(user) {
    //也对密码进行加密
    user.password = crypto.sha1Hmac(user.password, user.username)
    //查找用户是否存在
    let find = await User.findOne({username: user.username, password: user.password});
    if (!find) {
        throw Error('用户名和密码不匹配')
    }

    //在通过加密算法生成一个token
    let tokenDate = {
        username: user.username,
        expire: Date.now() + config.tokenTime
    }
    let token = crypto.aesEncrypt(JSON.stringify(tokenDate), config.tokenKey);

    return token

}


//输出这些方法
module.exports = {

    deleteone,
    registeruser,
    loginuser,
    getone
}