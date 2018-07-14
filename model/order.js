//引入mongoose包
let mongoose = require('mongoose');

let schema=new mongoose.Schema({
     productId:{
         type:mongoose.Schema.Types.ObjectId,
         required:[true,'商品id不能为空']
     },
     productName:{
          type:String,
          required:[true,'商品名字不能为空']
     },
     productPrice:{
          type:String,
          required:[true,'商品价格不能为空']
     },
     count:{
          type:Number,
          required:[true,'商品数量不能为空'],
          min:[1,'商品数量不能小于1']
     }, //数量
     tatlePrice:{
          type:String,
          required:[true,'商品的价格也不能为空']
     },
     status:{
          type:String,
         default:'unpay',
     },
     created:{
          type:Date,
         default:Date.now()
     },
     payTime:{
          type:Date
     },
     cancelTime:{
          type:Date
     },


})

module.exports=mongoose.model('order',schema)