//引入db因为要一会要查询里边的数据
require('../db')
//引入redis数据库
let redis = require('redis');
//链接数据库,创建链接对象
let client = redis.createClient('redis://127.0.0.1:6379');
//引入一个工具包
let util = require('util');
//封装一个get方法
let getAsync = util.promisify(client.get).bind(client);
//读取集合数组的方法lrange
let lrangeAsync = util.promisify(client.lrange).bind(client);
//封装一个集合存储的方法
let rpushAsync = util.promisify(client.rpush).bind(client);
//封装一个判断长度的方法
let llenAsync = util.promisify(client.llen).bind(client);
//引入config配置
let config = require('../config');


//引入db的model包数据库
let Pro = require('../model/product');
//搞一个监听失败的方法
client.on('error',err=>{
    console.log('数据库链接失败'+err.toString())
})


//测试添加key value的添加
async function testsetget() {
    //await client.set('a2','大鹏一日同风起，扶摇直上九万里')

    let res = await getAsync('a2');

    console.log(res)

}
//testsetget()
//测试集合数组
async function testarr() {

    /*await client.rpush('a3','aa')
    await client.rpush('a3','vv')
    await client.rpush('a3','bb')
    await client.rpush('a3','cc')
    await client.rpush('a3','dd')
    await client.rpush('a3','ee')*/

    let res = await lrangeAsync('a3',0,-1);
  console.log(res)

}

//testarr()

//测试读取db数据库信息到redis数据库

//定义一个key常亮
let key = 'product01'

async function testlist() {
    //读取db数据库信息
    let prores = await Pro.find();
    console.log(prores)
  //遍历这个集合
    prores.forEach(async obj=>{
        await rpushAsync(key,JSON.stringify(obj))
    })
}

//testlist()

async function testreadlist(page=1) {
    let skip =(page-1)*config.PageCount  //从哪里开始
    let stop= skip+5-1;

    //判断集合key的长度   先读取他的长度
    let   llenres = await llenAsync(key);
    console.log(llenres)

    if(llenres>0){

    let res = await lrangeAsync(key,skip,stop);

    console.log(res)

    }else {
      return   await Pro.find().skip((page-1)*config.PageCount)
            .limit(config.PageCount).sort('created').select('-__v')
    }


}
testreadlist()