//引入mongodb数据库的包，因为要从中读取数据
require('../db')

//引入配置变量config
let config = require('../config');
//引入数据库redis的包
let redis = require('redis');
//创建链接数据库对象
let client = redis.createClient('reids://127.0.0.1:6379');
//引入自带工具类
let util = require('util');
//封装了redis 获取数组值的命令
let getAsync = util.promisify(client.get).bind(client);
//封装了redis集合读取的命令
let lrangeAsync = util.promisify(client.lrange).bind(client);
//封装redis的存储集合命令  这样成为了promise函数了
let rpushAsync= util.promisify(client.rpush).bind(client);
//封装redis 获取集合长度的方法
let llenAsync = util.promisify(client.llen).bind(client);



//监听链接数据库redis失败的函数
client.on('error',err=>{
    console.log('redis connect fail:'+err.toString());

})

//测试redis  key value 键值对的存读，
async function testSetAndGet() {
    //client.set('abc','窗前明月光，疑是地上霜')

    let res = await getAsync('abc');

    console.log(res)
}

//testSetAndGet()

//测试redis数据的存读
async function testlist() {

    /*client.rpush('aaa','aa')
    client.rpush('aaa','bb')
    client.rpush('aaa','cc')
    client.rpush('aaa','dd')*/

    let res = await  lrangeAsync('aaa',0,-1);

    console.log(res)

}
//testlist()


//定义一个变量key
 let key = 'product'

//引入实体类 product
let Pro = require('../model/product');

//定义一个函数
async function testProduct() {
    //先获取这个类里的数据
    let productres = await Pro.find();
    //console.log(productres)

    //遍历这个数组
    productres.forEach( async obj=>{
        await  rpushAsync(key,JSON.stringify(obj))


    })

}

//testProduct()

//按页去数据

async function testgetpage(page = 1) {
    //判断redis 里边 集合 product是否为空
    let len = await llenAsync(key);
   //let len = await client.llen(key);

    console.log(len)
    if(len>0){

    let skip = (page-1)*config.PageCount
    let stop = skip+5-1


    let getres = await lrangeAsync(key,skip,stop);

    console.log(getres)
    }else{
        let findres = await Pro.find().skip((page-1)*config.PageCount)
            .limit(config.PageCount).sort('created').select('-__v');
        console.log(findres)
    }
}

testgetpage(2)