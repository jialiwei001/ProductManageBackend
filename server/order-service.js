//引入实体类的包
let Order = require('../model/order');
//引入 商品的service包  为了操作商品
let Pro = require('./product-service');
//引入配置变量config
let config = require('../config');
//引入big文件
let big = require('big.js');

/**
 * 添加订单的方法
 * @param order
 * @returns {Promise<*>}
 */
async function addOrder(order) {
    //查询订单商品是否存在
    let Idres = await Pro.findProductById(order.productId);
    if(!Idres){
        throw Error('商品id不存在')
    }
    //判断商品的数量是否够
    if(Idres.stock<order.count){
        throw Error('商品数量不足')
    }
    //给某些变量设置值
    order.productName= Idres.name
    order.productPrice= Idres.price
    order.tatlePrice= big(order.productPrice).times(order.count);

    //创建订单
    let orderres = await Order.create(order);
    //减去商品的库存
    await Pro.updateProduct(Idres._id,{stock:Idres.stock-order.count})

    return orderres


}


/**
 * 分页查询订单的方法
 * @param page
 * @returns {Promise<*>}
 */
async function getOrder(page=1) {

   let orderlist=await Order.find().skip((page-1)*config.PageCount)
        .limit(config.PageCount).sort('created').select('-__v')

    return orderlist;

}

module.exports={
    addOrder,
    getOrder
}