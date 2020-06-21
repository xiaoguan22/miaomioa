var { Email } =require('../untils/config.js')
var UserModel = require('../models/users.js')



var login =async(req,res,next)=>{
    var {username,password} =req.body;

    var result = await UserModel.findLogin({
        username,
        password
    });
    
    if(result){
        req.session.username =username;
        req.session.isAdmin = result.isAdmin;

        res.send({
            msg:'登陆成功',
            status:0
        });
    }else{
        res.send({
            msg:'登陆失败',
            status:-1
        })
    }

};
var register =async(req,res,next)=>{
    var {username ,password,email,verify}=req.body;
    if(email !==req.session.email || verify !== req.session.verify){
        res.send({
            msg : '验证码错误',
            status : -1
        });
    }

    var result = await UserModel.save({
        username,
        password,
        email
    });

    if(result){
        res.send({
            msg :'注册成功',
            status : 0
        });
    }else{
        res.send({
            msg : '注册失败',
            status : -2
        })
    }

};
var verify =async(req,res,next)=>{
    var email = req.query.email;
    var verify =Email.verify;

    req.session.verify =verify;
    req.session.email = email;

    var mailOptions ={
        from: '苗苗网 <1146687188@qq.com>', // sender address
        to: email, // list of receivers
        subject: '马里奥网邮箱验证码', // Subject line
        text: '验证码：' +verify // plain text body
       
    }
    Email.transporter.sendMail(mailOptions,(err)=>{
          if(err){
            res.send({
                msg: '验证码发送失败',
                status :-1
            }); 
            }else{
                res.send({
                    msg :'验证码发送成功',
                    status :0
                })
            }
     });

};
var logout =async(req,res,next)=>{
    req.session.username = '';
    res.send({
        msg:'退出成功',
        status:0
    })

};
var getUser =async(req,res,next)=>{
    if(req.session.username){
        res.send({
            msg:'获取用户信息成功',
            status:0,
            data:{
                username:req.session.username,
                isAdmin : req.session.isAdmin
            }
        })
    }
    else{
        res.send({
            msg:'获取用户信息失败',
            status: -1
        })
    }

};
var findPassword =async(req,res,next)=>{
    var {email , password , verify} =req.body;
    if( email === req.session.email && verify ===req.session.verify){
        var result = await UserModel.updatePassword(email ,password);
        if(result){
            res.send({
                msg : '修改密码成功',
                status : 0
            })
        }
        else{
            res.send({
                msg:'修改密码失败',
                status:-1
            })
        }
    }else{
        res.send({
            msg:'验证码失败',
            status:-1
        })
    }

};

module.exports ={
    login,
    register,
    verify,
    logout,
    getUser,
    findPassword
};
