//引入数据库的包，运行
require('./db')
//引入错误处理中间件  直接给前端回应
    //require('express-async-errors')  // 放到最前面引入

//引入解析工具的插件
let bodyParser = require('body-parser');
//引入打印日志的插件
let morgan = require('morgan');
//引入web框架expres
let express = require('express');
var app = express();


// 注册日志中间件
app.use(morgan('combined'));
// 注册body-parser中间件
app.use(bodyParser.json());

//引入成功失败的中间件
app.use(require('./middleware/res-md'))
//安装token认证的中间件
app.use(require('./middleware/token'))
//添加一个校验权限的role的中间件
app.use(require('./middleware/check'))


//链接router层接口
app.use('/user',require('./router/user-router'))
//链接category router 接口
app.use('/category',require('./router/category-router'))
//链接product router接口
app.use('/product',require('./router/product-router'))
//链接order router接口
app.use('/order',require('./router/order-router'))
//全局异常错误处理中间件
app.use((err,req,res,next)=>{
    res.fail(err.toString())
})



app.listen(require('./config/index').PORT)