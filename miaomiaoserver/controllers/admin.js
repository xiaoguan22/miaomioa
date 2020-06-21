var UserModel = require('../models/users.js')

var index = async(req,res,next)=>{
    res.send({
        msg: '管理员权限',
        status : 0
    })
}
var userList = async(req,res,next)=>{
    var result = await UserModel.userList();
    if(result){
        res.send({
            msg:'所有用户信息',
            status : 0,
            dat :{
                userList :result
            }
        });
    }else{
        res.send({
            msg:'获取用户信息失败',
            status : -1
        })
    }
}
var updateFreeze = async (req,res,next)=>{
    var { email , isFreeze} = req.body;
    var result = await UserModel.updateFreeze( email , isFreeze);

    if(result){
        res.send({
            msg: '账号冻结操作成功',
            status:0
        })
    }else{
        res.send({
            msg : '账号冻结操作失败',
            status : -1
        })
    }
}


module.exports = {
    index,
    userList,
    updateFreeze
}