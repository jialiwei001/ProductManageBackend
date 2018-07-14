//引入service层 user
let User = require('../server/user-service');
//引入配置变量config
let config = require('../config');
//引入加密李小骏
let crypto = require('lxj-crypto');


//定义一个方法 用来判断是否需要带token
function Isneedtoken(url) {
    let notNeedurl=[
        /.*\/user\/login/,
        /.*\/user\/register/,
    ]

    let Istoken=false;
    //遍历url数组
    notNeedurl.forEach(item=>{
        if(item.test(url)){
            Istoken= true
        }
    })

    return Istoken;
}

module.exports=async (req,res,next)=>{
    //如果不注册登录不需要带token，别的都需要
    let istoken = Isneedtoken(req.url);

    console.log(req.url)
//获取他的url
// 判断是否需要是带token
    if(!istoken){
//如果需要带，取出他的token
        let gettoken = req.get('token');
        //看看是否取到
        if(!gettoken){
            throw  Error('缺少token')
        }
//如果取到对token进行解码
        let token

        try {
             token = JSON.parse(crypto.aesDecrypt(gettoken,config.tokenKey));
        } catch (e) {
            throw Error('token解码错误')
        }

//判断token是否过期
        if(token.expire < Date.now()){
            throw Error('token已经过期')
        }
//得到里边的数据

  //如果没有过期，那就从中取出他的用户信息来
        let getuser = await User.getone(token.username);

        //给req安装一个中间变量，给后边用
        req.user=getuser;

        }

        next()

}
