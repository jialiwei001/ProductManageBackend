let db = require('../db');

//导出service包
let Cate = require('../server/category-service');


//测试增加的方法
async function addcate() {
    let category=[{name:'电脑'},{name:'服装'},{name:'母婴'},{name:'食品'},{name:'家具'},{name:'房产'},{name:'玩具'},{name:'生活用品'},{name:'电子产品'},]

    let cateres = Cate.addCategory(category);
    console.log('添加成功分类')

}
//测试查询的方法
async function getone() {


    let  getres =await Cate.getcategory();

    console.log(getres);
}
//测试删除的分类
async function deletecategory() {

    let id= '5b474d451704444440ec1253'


    let s = await Cate.deletecategory(id);

     console.log(s)
}
//测试更新
async function updatecategory() {
    let id='5b474c2335937419dc498c54'
    let category={
        name:'平板手机'
    }
    let updateres = await Cate.updatecategory(id,category);
    console.log(updateres)
}

updatecategory()
//deletecategory()

//getone()
//addcate()