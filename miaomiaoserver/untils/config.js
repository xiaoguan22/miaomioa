var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

var Mongoose ={
    url:'mongodb://localhost:27017/miaomiao',
    connect(){
        mongoose.connect(this.url,{ useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
            if(err){
                console.log('连接失败');
                return
            }else{
                console.log('数据库连接成功');
            }
            
        });
    }
};

var Email = {
    config : {
        host:"smtp.qq.com", 
        port: 465,
        auth:{
        user:'1146687188@qq.com',
        pass:'ffbqndqeornwgfgh'
        }

    },
    get transporter(){
        return nodemailer.createTransport(this.config);
    },
    get verify(){
        return Math.random().toString().substring(2,6);
    }

}

module.exports ={                               
    Mongoose,
    Email
}
