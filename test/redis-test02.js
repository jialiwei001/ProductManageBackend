let config = require('../config');

//引入db
require('../db')
//引入工具包，用于封装异步方法
let util = require('util');
//引入redis
let redis = require('redis');
//创建redis链接客户端
let client = redis.createClient('redis://127.0.0.1:6379');
//封装一个get的读取的promise方法
let getAsync = util.promisify(client.get).bind(client);
//封装一个数组集合的存储和读取对象
let lrangeAsync = util.promisify(client.lrange).bind(client);
//封装一个读取方法
let rpushAsync = util.promisify(client.rpush).bind(client);
//封装一个判断集合长度的方法
//let llenAsync = util.promisify(client.llen).bind(client);

let llenAsync = util.promisify(client.llen).bind(client);

//监听一下链接失败
client.on('error',err=>{
    console.log('redis connect fail:'+err.toString())
})


//演示平时的键值对
async function testkeyvalue() {

    /*await client.set('a1','aa')
    await client.set('a1','bb')
    await client.set('a1','cc')
    await client.set('a1','dd')
    await client.set('a1','ee')
    await client.set('a1','ff')
    await client.set('a1','gg')*/

    //await client.set('a2','aa')



   let getres = await getAsync('a2');
    console.log(getres)

}
//testkeyvalue()
//演示数组的存取
async function testset() {
    /*await rpushAsync('a3','aa')
    await rpushAsync('a3','bb')
    await rpushAsync('a3','cc')
    await rpushAsync('a3','dd')
    await rpushAsync('a3','ee')*/

    let lrangeres = await lrangeAsync('a3',0,-1);
    console.log(lrangeres)
}

//testset()

//演示读取缓存
//引入实体类对象
let Pro = require('../model/product');

    //这是一个key
    let key = 'product'

async function testProduct() {

    //先查询数据
    let findres = await Pro.find();
    console.log(findres)
    //遍历这个集合
    findres.forEach(async obj=>{
        await rpushAsync(key,obj);

    })


}

//testProduct()

//测试取值
async function getValve(page=1) {

     let len = await llenAsync(key);
     console.log(len)
    if(len>0){
         let start= (page-1)*config.PageCount;
         let stop= start+5-1

        let resultres = await lrangeAsync(key,start,stop)
        console.log(resultres)
    }else {
      return    await Pro.find().skip((page-1)*config.PageCount).limit(config.PageCount)
             .sort("created").select("-__v")
    }

}

getValve()