//引入service category包
let Cate = require('../server/category-service');
//引入web框架插件
let express = require('express');

let router = express.Router();


/**
 * 查询分类的方法
 */
router.get('/',async (req,res)=>{

   let getres= await Cate.getcategory(req.query.page)
    console.log(req.query.page)
   res.success(getres)
})
/**
 * 添加的方法
 */
router.post('/add',async (req,res)=>{
    let addres = await Cate.addCategory(req.body);
    res.success(addres)
})

/**
 * 删除的方法
 */
router.put('/:id',async (req,res)=>{


    let updateres = await Cate.updatecategory(req.params.id,req.body);

    res.success(updateres)
})

router.delete('/:id',async (req,res)=>{

    let deleteres = await Cate.deletecategory(req.params.id);

    res.success(deleteres)
})


//导出
module.exports=router