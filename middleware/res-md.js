module.exports=(req,res,next)=>{
    res.success=(data)=>{
        res.send({
            code:0,
            data:data,
            msg:'操作成功'
        })

    };
    res.fail=()=>{
       res.send({
           code:-1,
           msg:'操作失败'
       })
    };

    next();

}