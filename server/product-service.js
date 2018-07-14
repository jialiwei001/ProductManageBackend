//引入实体类
let Product = require('../model/product');

//引入配置文件config
let config = require('../config');

/**
 * 添加商品
 * @param product
 * @returns {Promise<*>}
 */
async function addProduct(product) {


       let addres = await Product.create(product);

       return addres
}


/**
 * 查询商品
 * @param page
 * @returns {Promise<*>}
 */
async function findProduct(page=1) {

 return  await Product.find().skip(config.PageCount*(page-1)).limit(config.PageCount).sort('created')
         .select('-__v')


}


/**
 * 判断商品是否存在
 * @param id
 * @returns {Promise<void>}
 */
async function isProductExist(id) {
    //查询商品是否存在
    let findOne = Product.findOne({_id:id});
    if(!findOne){
        throw Error('商品不存在')
    }
}


/**
 * 删除商品的方法
 * @param id
 * @returns {Promise<*>}
 */
async function deleteProduct(id) {
    //查询商品是否存在
    isProductExist(id)

    let deleteres = await Product.deleteOne({_id:id});

    return deleteres
}

/**
 * 更新商品
 * @param id
 * @param product
 * @returns {Promise<*>}
 */
async function updateProduct(id, product) {
    //查询商品是否存在
    isProductExist(id)

    let updateres = await Product.updateOne({_id:id},product);
    return updateres
}

/**
 * 根据id查询商品
 * @param id
 * @returns {Promise<*>}
 */
async function findProductById(id) {
    //查询商品是否存在
    isProductExist(id)

    return await Product.findOne({_id:id})
}

//导出这些方法

module.exports={
    findProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    findProductById
}