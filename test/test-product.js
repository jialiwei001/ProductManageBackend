require('../db')

let pro = require('../server/product-service');



async function addpro() {

    let product= [{
        name:'小米手机21',
        price:999,
        stock:100,
        description:"小米手机真不错",
        category:'5b474d451704444440ec123d',


    },{
        name:'小米手机22',
        price:999,
        stock:100,
        description:"小米手机真不错",
        category:'5b474d451704444440ec123d',


    },{
        name:'小米手机23',
        price:999,
        stock:100,
        description:"小米手机真不错",
        category:'5b474d451704444440ec123d',


    },{
        name:'小米手机24',
        price:999,
        stock:100,
        description:"小米手机真不错",
        category:'5b474d451704444440ec123d',


    },{
        name:'小米手机25',
        price:999,
        stock:100,
        description:"小米手机真不错",
        category:'5b474d451704444440ec123d',


    },{
        name:'小米手机26',
        price:999,
        stock:100,
        description:"小米手机真不错",
        category:'5b474d451704444440ec123d',


    },{
        name:'小米手机27',
        price:999,
        stock:100,
        description:"小米手机真不错",
        category:'5b474d451704444440ec123d',


    }]



    let addres = await pro.addProduct(product);

    console.log(addres)
}

//测试查询
async function getfindpage() {

     let page = 2

    let findres = await pro.findProduct(page);

    console.log(findres)
}

//根据id查
async function findid() {

    let id= '5b476111dca54245d869996e'
    let findoneres = await pro.findProductById(id);
    console.log(findoneres)
}

//删除商品
async function delproduct() {
    let id= '5b47618ea20f1950a85a7f86'
    let delres = await pro.deleteProduct(id);
    console.log(delres)
}

//更新商品
async function upproduct() {

    let id='5b47618ea20f1950a85a7f88'

    let product= {
        name:'小米手机10',
        price:3999,
        stock:300,
        description:"小米手机真不错",
        category:'5b474d451704444440ec123d',


    }


    let upres = await  pro.updateProduct(id,product);

    console.log(upres)
}

//getfindpage()
addpro()
//findid()

//delproduct()

//upproduct()