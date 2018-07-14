

//定义一个数组role的
let role_perssions=[
    {
        role:0,
        perssions:[
            /.*\/product/,
            /.*\/order/,
            /.*\/category/
        ]
    },
    {
        role:100,
        perssions:[

            /.*/
        ]
    }
]

//定义一个输出的中间件
module.exports=(req,res,next)=>{
    //先获取user
   if(res.user){

    //定义一个变量
    let urlflag=false

    //先遍历集合role_perssions
    role_perssions.forEach(obj=>{
        if(obj.role===userone.role){
            //然后在遍历role里边的url
            obj.perssions.forEach(item=>{

                if(item.test(req.url)){

                    urlflag= true

                }

            })

        }

    })
        if(!urlflag){
            throw Error('用户权限不足')
        }
   }
    next()
}