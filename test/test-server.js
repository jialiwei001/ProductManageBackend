//引入数据库db包
require('../db')
//引入实体类包
let Service = require('../server/user-service');


//测试注册的方法
async function register() {
    //
    let user={
        username:'ee',
        password:'12345',
        age:16

    }

    let registerres = await Service.registeruser(user);

    console.log(registerres);
}

//测试查询的方法
async function getfind() {

    let username='aa'

let res= await Service.getone(username)
    console.log(res)
}

//测试删除的方法
async  function deleteoneuser() {
    let username='bb'
  let res =await Service.deleteone(username)
    console.log(res)
}

//测试登录的方法
async function login() {

    let user = {
        username:'aa',
        password:'12345'
    }
    let res=   await Service.loginuser(user)
    console.log(res)

}


//register()
//getfind()

//deleteoneuser()
login()