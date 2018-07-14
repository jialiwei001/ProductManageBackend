//引入加密的李晓骏
let crypto = require('lxj-crypto');
//引入配置config
let config = require('../config');
//引入service
let userser = require('../server/user-service');


//定义一个判断是否需要token的网址方法
function isNeedToken(url) {
//定义一个网址变量数组
let isNeed=[
    /.*\/user\/register/,
    /.*\/user\/login/
]

    //定义一个常量
    let tokenflag=false
    //遍历数组
    isNeed.forEach(objurl=>{

        if(objurl.test(url)){
            tokenflag= true
        }
    })

    return tokenflag
}

//定义一个中间件 直接输出
module.exports=async (req,res,next)=>{
    //先判断是否需要token的url
    let tokenflag = isNeedToken(req.url);
    if(!tokenflag){
        //获取token
        let tokenres = req.get('token');
        //如果没有获取到
        if(!tokenres){
            throw Error('用户缺少token')
        }
        let aestoken ;


        try { //对token进行解码
            aestoken = JSON.parse(crypto.aesDecrypt(tokenres, config.tokenKey));
        } catch (e) {
            throw Error('token解码失败')
        }

        //判断token是否过期
        if(aestoken.expire<Date.now()){
            throw Error('token已经过期')
        }

        //解码成功，然后获取用户信息
        let userone = await userser.getone(aestoken.username);

        res.user=userone
    }

    next

}

