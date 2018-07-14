//先引入web框架express
let express = require('express');
//引入service层的包
let Order = require('../server/order-service');

//创建web链接对象
let router = express.Router();


/**
 * 创建订单的方法
 */
router.post('/',async (req,res)=>{

    let orderres = await Order.addOrder(req.body);

    res.success(orderres)
})


/**
 * 查询订单的方法
 */
router.get('/',async  (req,res)=>{

    let getres = await Order.getOrder(req.query.page);
    res.success(getres)
})




//导出
module.exports=router