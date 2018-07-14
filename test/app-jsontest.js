let app = require('express')();

let bodyParser = require('body-parser');

let multers = require('multer');

app.use(bodyParser.json());
//app.use(multers())

app.post('/',(req,res)=>{
    console.log(req.body);
    //req.json(req.body)
})

app.listen(4001)