var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Setting = require('../utils/config.js');
var User = mongoose.model(Setting.mongooseModelName);
var Crypto = require('../utils/crypto');

/**
 * 2.0登录接口
 */
router.post('/login2',function (req,res,next) {
    global.log4bae('users/login2'+JSON.stringify(req.body));
    var _tel = req.body.username;
    var _pwd  = req.body.pwd;
    var _udid  = req.body.udid;
    var  cond = {
            //平等的条件
            $or:[
                {$and:
                    [{username:_tel},
                        {pwd: _pwd}],
                },
                {$and:
                    [{tel:_tel},
                        {pwd: _pwd}]
                },
            ]
        };
    var _version = req.body.version;
    var _ostype  = req.body.ostype;
    var _pushid  = req.body.pushid;
    var _isfirst  = req.body.isfirstlogin;

    // if(_version != '2.2')
    // {
    //     global.logError4bae('users/login2'+'登录失败,请到AppStore升级到最新版本');
    //     return res.send(global.retFormate(0,'登录失败,请到AppStore升级到最新版本','登录失败,请到AppStore升级到最新版本'));
    // }
    User.findOne(cond,function (err,ret) {
            if(err){
                global.logError4bae('users/login2'+err);
                return res.send(global.retFormate(0,err,'登录失败'));
            }else {



                //发现已有此用户，只不过是老版的字段，需要删除当前记录，并插入最新数据字段记录
                if(ret){

                    //默认是不需要同步数据
                    ret.needasnc = '0';

                    var _name = ret.username;
                    var _viplevel = ret.viplevel;
                    //老版本的用户
                    if(ret.version == undefined){
                        User.remove({tel:_tel},function (err,ret) {
                            if(err){
                                global.logError4bae('users/login2'+err);
                                return res.send(global.retFormate(0,err,'登录失败'));
                            }
                            else {

                                var newModifyUser = new  User({
                                    username:_name,
                                    pwd:_pwd,
                                    tel:_tel,
                                    viplevel:_viplevel,
                                    udid:_udid,
                                    version:_version,
                                    ostype:_ostype,
                                    pushid:_pushid
                                });

                                newModifyUser.save(function (err,ret) {
                                    if(err){
                                        global.logError4bae('users/login2'+err);
                                        return res.send(global.retFormate(0,err,'存入数据失败'));
                                    }else {
                                        ret.devicemodifyed = '1';//因为版本数据不一致,强制数据更新
                                        return res.send(global.retFormate(1, ret, '查询成功'));
                                    }
                                });

                            }
                        });
                    }else {//新版本用户

                        //TODO 等build14上线后，再升级的版本需要根据version的变化确定
                        User.update(cond,{$set:{udid:_udid,
                                version:_version,
                                ostype:_ostype,
                                pushid:_pushid}
                            },
                            function(err,updateRet){
                                if(err){
                                    global.logError4bae('users/login2'+err);
                                    return res.send(global.retFormate(0, updateRet, '更新udid失败'));
                                }else {


                                    if(ret.udid){
                                        if(ret.udid === _udid) {
                                            //2.0以上版本的同一部手机，因为版本升级导致需要删除本地数据,全部同步成服务器的数据。
                                            if(_isfirst == '1'){
                                                ret.needasnc = '1';
                                                ret.devicemodifyed = '0';
                                                return res.send(global.retFormate(1, ret, '查询成功'));
                                            }else {
                                                ret.devicemodifyed = '0';
                                                return res.send(global.retFormate(1, ret, '查询成功'));
                                            }

                                        }else {
                                            ret.devicemodifyed = '0';//由于第一版的用户没有了，现在换手机不需要同步本地数据
                                            return res.send(global.retFormate(1, ret, '查询成功'));
                                        }
                                    }else {
                                        ret.devicemodifyed = '0';
                                        return res.send(global.retFormate(1, ret, '查询成功'));
                                    }
                                }
                            });


                    }

                }else{

                    var _tel = req.body.username;
                    var _pwd  = req.body.pwd;
                    var  cond = {
                        //平等的条件
                        $or:[
                            {username:_tel},
                            {tel:_tel},
                            ]
                    };
                    User.findOne(cond,function (err,ret) {

                        if(err){
                            return res.send(global.retFormate(0, '用户名或密码错误', '用户名或密码错误'));

                        }else {
                            if(ret){
                                return res.send(global.retFormate(0, '密码错误', '密码错误'));

                            }else {
                                return res.send(global.retFormate(0, '账号错误,如还未注册请先注册', '账号错误,如还未注册请先注册'));

                            }
                        }

                    })
                    global.logError4bae('users/login2'+'用户名或密码错误');
                }

            }
        });



});


/**
 * 1.0登录接口
 * //TODO 等build14上线后,直接提示升级新版,此接口废弃
 */
router.post('/login',function (req,res,next) {
    var _tel = req.body.username;
    var _pwd  = req.body.pwd;
    var _udid  = req.body.udid;
    var  cond = {
        //平等的条件
        $or:[
            {$and:
                [{username:_tel},
                    {pwd: _pwd}],
            },
            {$and:
                [{tel:_tel},
                    {pwd: _pwd}]
            },
        ]
    };
    var version =  req.body.version;
    var ostype =  req.body.ostype;
    User.findOne(cond,function (err,ret) {
            if(err){
                return res.send(global.retFormate(0,err,'查询失败'));
            }else {
                return res.send(global.retFormate(0, '登录失败,需要升级新版本', '登录失败,需要升级新版本'));
                // User.update(cond,{$set:{udid:_udid}},function(err,updateRet){
                //     if(err){
                //         return res.send(global.retFormate(0, updateRet, '更新udid失败'));
                //     }else {
                //
                //         if(ret.udid){
                //             if(ret.udid === _udid) {
                //                 ret.devicemodifyed = '0';
                //                 return res.send(global.retFormate(1, ret, '查询成功'));
                //             }else {
                //                 ret.devicemodifyed = '1';
                //                 return res.send(global.retFormate(1, ret, '查询成功'));
                //             }
                //         }else {
                //             ret.devicemodifyed = '0';
                //             return res.send(global.retFormate(1, ret, '查询成功'));
                //         }
                //     }
                // });
            }
     });



});


//重置密码
router.post('/regetpwd',function (req,res,next) {

    global.logError4bae('users/regetpwd');
    //TODO 等build14上线后，再升级的版本需要根据version的变化确定
    User.update({tel:req.body.tel},{$set:{pwd:req.body.pwd}}, function(err,updateRet) {
            if (err) {
                return res.send(global.retFormate(0, err, '更新失败'));
            } else {
                return res.send(global.retFormate(1, updateRet, '更新成功'));
            }
        });

});

//修改密码
router.post('/resetPwd',function (req,res,next) {
    global.logError4bae('users/resetPwd');


});

/**
 * 更新用户资料
 */
router.post('/update',function (req,res,next) {

    global.logError4bae('users/update');
    // var setFileds = new Map();
    // if(req.body.headurl != undefined){
    //     setFileds.set('headurl',req.body.headurl);
    // }



    User.update({tel:req.body.tel},{$set:{headurl:req.body.headurl}}, function(err,updateRet) {
        if (err) {
            return res.send(global.retFormate(0, err, '更新失败'));
        } else {
            return res.send(global.retFormate(1, updateRet, '更新成功'));
        }
    });

});

/**
 * 更新用户名
 */
router.post('/updateName',function (req,res,next) {

    global.logError4bae('users/updateName');

    User.update({tel:req.body.tel},{$set:{username:req.body.username}}, function(err,updateRet) {
        if (err) {
            return res.send(global.retFormate(0, err, '更新失败'));
        } else {
            return res.send(global.retFormate(1, updateRet, '更新成功'));
        }
    });

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
