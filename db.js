//引入数据库管理框架mongoose
let mongoose = require('mongoose');
//链接真实的数据库链接
mongoose.connect(`mongodb://127.0.0.1/${require('./config').DB}`)
//创建数据库链接对象
let db = mongoose.connection;

db.on('error',(err)=>{
    console.error('err');
})
db.once('open',()=>{
    console.log('链接数据库成功');
})
