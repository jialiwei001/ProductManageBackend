

//定义一个数组，里边两个元素，
let role_permissions = [{
    role: 0,
    permissions: [  //普通用户
        /.*\/product/,
        /.*\/order/,
        /.*\/category/
    ]
}, {           //超级管理员
    role: 100,
    permissions: [
        /.*/
    ]
}]


//搞一个输出中间件
module.exports = (req, res, next) => {

//判断是否有res.user
    if (req.user) {
        //定义一个变量
        let resule = false
        //遍历数组 判断是否包含 res.user.role 权限
        role_permissions.forEach(obj => {

            if (obj.role === req.user.role) {
//如果有那么就遍历这个role里的url
                obj.permissions.forEach(item => {

// 判断是否包含 当前的url
                    if (item.test(req.url)) {
                        resule = true;
                    }
//变量赋值给true
                })


            }


        })
      //判断是否有权限，如果没有权限抛出异常
        if(!resule){
            res.send('用户权限不足')
            throw Error('用户权限不足')
        }

    }
    //到这里没问题，就放行
    next();

}



