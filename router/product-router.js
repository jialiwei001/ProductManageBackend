//引入service层的包
let Product = require('../server/product-service');

//引入express框架
let express = require('express');

let router = express.Router();

/**
 * 分页查询商品
 */
router.get('/',async (req,res)=>{

    let findres = await Product.findProduct(req.query.page);


    res.success(findres)
})


/**
 * 根据id查询
 */
router.get('/:id', async (req,res)=>{

    let findoneres = await Product.findProductById(req.params.id);

    res.success(findoneres)

})



/**
 * 添加商品的方法
 */
router.post('/add',async (req,res)=>{

    let addres = await Product.addProduct(req.body);


    res.success(addres)
})


/**
 * 根据id删除
 */
router.delete('/:id', async (req,res)=>{

    let deleteoneres = await Product.deleteProduct(req.params.id);

    res.success(deleteoneres)

})


/**
 * 根据id更新
 */
router.put('/:id', async (req,res)=>{

    let updateoneres = await Product.updateProduct(req.params.id,req.body);

    res.success(updateoneres)

})



module.exports=router