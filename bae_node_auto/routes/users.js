var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Setting = require('../utils/config.js');
var User = mongoose.model(Setting.mongooseModelName);
var Crypto = require('../utils/crypto');

//登录接口
router.post('/login',function (req,res,next) {
    var _name = req.body.username;
    var _pwd  = req.body.pwd;
    var _udid  = req.body.udid;
    var  cond = {
            //平等的条件
            $or:[
                {$and:
                    [{username:_name},
                        {pwd: _pwd}],
                },
                {$and:
                    [{tel:_name},
                        {pwd: _pwd}]
                },
            ]
        };

    User.findOne(cond,function (err,ret) {
        if(err){
            return res.send(global.retFormate(0,err,'查询失败'));
        }else {
            User.update(cond,{$set:{udid:_udid}},function(err,updateRet){
                if(err){
                    return res.send(global.retFormate(0, updateRet, '更新udid失败'));
                }else {

                    if(ret.udid){
                        if(ret.udid === _udid) {
                            ret.devicemodifyed = '0';
                            return res.send(global.retFormate(1, ret, '查询成功'));
                        }else {
                            ret.devicemodifyed = '1';
                            return res.send(global.retFormate(1, ret, '查询成功'));
                        }
                    }else {
                        ret.devicemodifyed = '0';
                        return res.send(global.retFormate(1, ret, '查询成功'));
                    }
                }
            });
        }
    });
});


//修改密码
router.post('/resetPwd',function (req,res,next) {



});

router.get('/encrypt',function (req,res,next) {
   var cry = new Crypto();
    var para = req.query.pwd;
    var ret = cry.encryptAuto(para);
    res.end(ret);
});

router.get('/decrypt',function (req,res,next) {
    var cry = new Crypto();
    var para = req.query.pwd;
    var ret = cry.decryptAuto(para);
    res.end(ret);
});

module.exports = router;
