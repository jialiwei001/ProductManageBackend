//引入实体类
let Category = require('../model/category');

//引入配置config的包
let config = require('../config');


/**
 * 查询分类
 * @param page
 * @returns {Promise<void>}
 */
async function getcategory(page=1) {
  return   await Category.find().skip(config.PageCount*(page-1)).limit(config.PageCount).sort('created').select('-__v');
}


/**
 * 添加分类的方法
 * @param category
 * @returns {Promise<category>}
 */
async function addCategory(category) {

    //await Category.findOne({_id:category.id})


    return Category.create(category)
}

/**
 * 删除分类的方法
 * @param id
 * @returns {Promise<string>}
 */
async function deletecategory(id) {
  //查询是否存在
  isExistcategory(id)

  let deleteres = await Category.deleteOne({_id:id});
  return '分类删除成功'+JSON.stringify(deleteres)

}


/**
 * 判断商品分类是否存在
 * @param id
 * @returns {Promise<void>}
 */
async function isExistcategory(id) {
    //判断商品分类是否存在
    let findres = await Category.findOne({_id:id});
    if(!findres){
        throw Error('商品分类不存在')
    }
}


//更新分类
async function updatecategory(id,category) {
   //判断商品分类是否存在
   isExistcategory(id)

    let updateres = await Category.updateOne({_id:id},category);

     if(updateres.n<1){
       throw Error('更新失败')
     }
     return updateres;
}


//导出这些方法
module.exports={
  getcategory,
    deletecategory,
    updatecategory,
    addCategory,
}
