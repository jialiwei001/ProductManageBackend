process.env.NODE_ENV="dev";
let config =null;
if(process.env.NODE_ENV==='product'){
    config=require('./pro')
}else {
    config = require('./dve')
}

module.exports=config;