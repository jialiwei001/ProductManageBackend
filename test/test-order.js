//引入数据库包
require('../db')
//引入service层包
let Ordertest = require('../server/order-service');



//测试添加订单的操作
async function addorderlist() {

    let order= {
            productId:'5b47618ea20f1950a85a7f8b',

            count:8,}

    let res = await Ordertest.addOrder(order);
    console.log(res)
}


//测试查询方法
async function getpageOrder(page) {
    let res = await Ordertest.getOrder(page);
    console.log(res)
}

//addorderlist()

getpageOrder(2)
