var mongoose = require('mongoose');
const { findPassword } = require('../controllers/users');
mongoose.set('useCreateIndex',true);

var UserSchema = new mongoose.Schema({
    username :{type : String ,require : true ,index :{unique :true}},
    password :{type :String ,require :true},
    email : {type : String ,require : true , index : { unique:true}},
    date: {type :String , default : Date.now()},
    isAdmin : {type : Boolean, default  :false},
    isFreeze : {type : Boolean,default:false}
});


var UserModel = mongoose.model('user',UserSchema);
UserModel.createIndexes();
var save =(data)=>{
    var user = new UserModel(data);
    return user.save()
    .then(()=>{
        return true;
    })
    .catch(()=>{
        return false;
    });
};

var findLogin = (data)=>{
    return UserModel.findOne(data);
}

var updatePassword =(email , password)=>{
    return UserModel.update ({email} , { $set : {password}})
        .then(()=>{
            return true;
        })
        .catch(()=>{
            return false;
        })

}
var userList =()=>{
    return UserModel.find(); 
}
var updateFreeze = (email , isFreeze)=>{
    return UserModel.update({email} , {$set : {} })
    .then(()=>{
        return true;
    })
    .catch(()=>{
        return false;
    })

}

module.exports ={
    save,
    findLogin,
    updatePassword,
    userList,
    updateFreeze
}



