var express = require('express');
var adminContoller = require('../controllers/admin.js')
var router = express.Router();


/* GET users listing. */

router.use((req,res,next)=>{
    if(req.session.username && req.session.isAdmin){
         next();
    }else{
        res.send({
            msg :'没有管理权力',
            status : -1
        });
    }
})

router.get('/', adminContoller.index);
router.get('/userList',adminContoller.userList);
router.post('/updateFreeze' , adminContoller.updateFreeze);




module.exports = router;