/**
 * Created by points on 16/11/18.
 */
var express = require('express');
var router = express.Router();
var Setting = require('../utils/config');
var mongoose = require('mongoose');
var User = mongoose.model(Setting.mongooseModelName);

//注册新用户
router.post('/addNewUser',function (req,res,next) {
        var name = req.body.username;
        var pwd  = req.body.pwd;
        var tel  = req.body.tel;
        var lev  = req.body.viplevel;
        var udid  = req.body.udid;

        var newUser = new  User({
                username:name,
                pwd:pwd,
                tel:tel,
                viplevel:lev,
                udid:udid,
            });

        newUser.save(function (err) {
            if(err){
               return res.send(global.retFormate(0,err,'存入数据失败'));
            }else {
                return res.send(global.retFormate(1,'','存入数据成功'));
            }
        });
    }
);

//注册新用户
router.post('/addNewUser2',function (req,res,next) {
        var name = req.body.username;
        var pwd  = req.body.pwd;
        var tel  = req.body.tel;
        var lev  = req.body.viplevel;
        var udid  = req.body.udid;
        var ostype  = req.body.ostype;
        var version  = req.body.version;
        if(pwd.length > 8){
            return res.send(global.retFormate(0,'密码不能长于八位','密码不能长于八位'));
        }

        global.log4bae('addNewUser2:tel'+req.body.tel);
        global.log4bae('addNewUser2:pwd'+req.body.pwd);


    var newUser = new  User({
            username:name,
            pwd:pwd,
            tel:tel,
            viplevel:lev,
            udid:udid,
            devicemodifyed:'0',
            ostype:ostype,
            version:version,
            pushid:'',
            needasnc:'0',
        });

    User.findOne({tel:tel},function (err,doc) {
            if(err){
                return res.send(global.retFormate(0,err,'存入数据失败'));
            }
            else{
                if(doc){
                    return res.send(global.retFormate(0,'此号码已被注册','此号码已被注册'));
                }
                else{
                    newUser.save(function (err,newdoc) {
                        if(err){
                            return res.send(global.retFormate(0,err,'存入数据失败'));
                        }else {
                            return res.send(global.retFormate(1,newdoc,'存入数据成功'));
                        }
                    });
                }
            }
        }

    );

    }
);

module.exports = router;