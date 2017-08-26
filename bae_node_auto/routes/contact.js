/**
 * Created by points on 16/11/19.
 */

//用来上传老版本本地数据的数据到服务器上

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Contact = mongoose.model(global.config.ModelNameContact);
var Repair = mongoose.model(global.config.ModelNameRepairHistory);
var ContactOrder = mongoose.model(global.config.ModelNameContactOrder);
var WXPusher = require('../weixin/pushtowxuser');
var JPush = require("jpush-sdk");
var client = JPush.buildClient(global.config.JPush.JPushAppKey, global.config.JPush.JPushMasterSecret);
var User = mongoose.model(global.config.mongooseModelName);
/**
 * 增加客户
 */
router.post('/add',function (req, res, next) {

    global.log4bae('contact/add'+JSON.stringify(req.body));

    var newContact = new  Contact({
        carcode:req.body.carcode,
        name:req.body.name,
        tel:req.body.tel,
        cartype:req.body.cartype,
        owner:req.body.owner,
    });

    //插入新联系人之前先要检查是否已经记录过,根据号码，车牌号，登录的用户
    Contact.findOne({tel:req.body.tel,carcode:req.body.carcode,owner:req.body.owner},function (err,doc) {
            if(err){
                return res.send(global.retFormate(0,err,'存入数据失败'));
            }
            else {
                if(doc){
                    return res.send(global.retFormate(0,doc,'已存在此记录'));
                }else {
                    newContact.save(function (err,newdoc) {
                        if(err){
                            return res.send(global.retFormate(0,err,'存入数据失败'));
                        }
                        else {
                            return res.send(global.retFormate(1,newdoc,'存入数据成功'));
                        }
                    });
                }

                }
            }
    );


}),


    /**
     * 删除客户
     * */
    router.post('/del',function (req, res, next) {
        global.log4bae('contact/del'+JSON.stringify(req.body));
        Contact.remove({tel:req.body.tel,owner:req.body.owner},function (err,ret) {
            if(err){
                return res.send(global.retFormate(0,err,'存入数据失败'));
            }
            else {
                return res.send(global.retFormate(1,'保存成功','存入数据成功'));
            }
        });

    }),


    /**
     * 删除客户2.0
     * */
    router.post('/del2',function (req, res, next) {
        global.log4bae('contact/del2'+JSON.stringify(req.body));
        Contact.remove({_id:req.body.id},function (err,ret) {
            if(err){
                return res.send(global.retFormate(0,err,'存入数据失败'));
            }
            else {
                return res.send(global.retFormate(1,'保存成功','存入数据成功'));
            }
        });

    }),

    /**
     *更新客户
     **/
    router.post('/update',function (req, res, next) {
        global.log4bae('contact/update'+JSON.stringify(req.body));
        var conditions = {tel : req.body.tel,owner:req.body.owner};
        var update     = {$set : {
            carcode:req.body.carcode,
            name:req.body.name,
            cartype:req.body.cartype,
        }};
        var options    = {upsert : false};
        Contact.update(conditions,update,options,function (err,ret) {
            if(err){
                return res.send(global.retFormate(0,err,'修改数据失败'));
            }
            else {
                return res.send(global.retFormate(1,'修改成功','修改数据成功'));
            }
        });

    }),

    /**
     *更新客户2.0
     **/
    router.post('/update2',function (req, res, next) {
        global.log4bae('contact/update2'+JSON.stringify(req.body));
        var conditions = {_id : req.body.id};
        var update     = {$set : {
            carcode:req.body.carcode,
            name:req.body.name,
            cartype:req.body.cartype,
            tel : req.body.tel
        }};
        var options    = {upsert : false};
        Contact.update(conditions,update,options,function (err,ret) {
            if(err){
                return res.send(global.retFormate(0,err,'修改数据失败'));
            }
            else {
                return res.send(global.retFormate(1,'修改成功','修改数据成功'));
            }
        });

    }),

    /**
     * 查询所有客户
     **/
    router.post('/queryAll',function (req, res, next) {
        global.log4bae('contact/queryAll'+JSON.stringify(req.body));
        var conditions = {owner:req.body.owner};
        Contact.find(conditions,function (err,ret) {
            if(err){
                return res.send(global.retFormate(0,err,'修改数据失败'));
            }
            else {
                return res.send(global.retFormate(1,ret,'修改数据成功'));
            }
        });

    }),

    /****************************************3.2*************************************/
    /**
     * 增加客户
     */
    router.post('/add3',function (req, res, next) {

        global.log4bae('contact/add'+JSON.stringify(req.body));

        var newContact = new  Contact({
            carcode:req.body.carcode,
            name:req.body.name,
            tel:req.body.tel,
            cartype:req.body.cartype,
            owner:req.body.owner,
            isbindweixin:req.body.isbindweixin,
            weixinopenid:req.body.weixinopenid,
            vin:req.body.vin,
            carregistertime:req.body.carregistertime,
            headurl:req.body.headurl,
            inserttime:new Date().Format('yyyy-MM-dd hh:mm:ss')
        });

        //插入新联系人之前先要检查是否已经记录过,根据号码，车牌号，登录的用户
        Contact.findOne({tel:req.body.tel,carcode:req.body.carcode,owner:req.body.owner},function (err,doc) {
                if(err){
                    return res.send(global.retFormate(0,err,'存入数据失败'));
                }
                else {
                    if(doc){
                        return res.send(global.retFormate(0,doc,'已存在此用户记录,请修改车牌号或车主号码'));
                    }else {
                        newContact.save(function (err,newdoc) {
                            if(err){
                                return res.send(global.retFormate(0,err,'存入数据失败'));
                            }
                            else {
                                return res.send(global.retFormate(1,newdoc,'存入数据成功'));
                            }
                        });
                    }

                }
            }
        );


    }),


    /**
     *更新客户3.2
     **/
    router.post('/update3',function (req, res, next) {
        global.log4bae('contact/update3'+JSON.stringify(req.body));

        var conditions1 = {_id : req.body.id};

        //先查询老客户记录,记录之前的车牌号,为下面修改维修记录做准备
        Contact.findOne(conditions1,function (err,ret1) {
            if(err){
                return res.send(global.retFormate(0,err,'修改数据失败'));

            }else {

                var oldCarCode = ret1.carcode;

                var update1     = {$set : {
                    carcode:req.body.carcode,
                    name:req.body.name,
                    cartype:req.body.cartype,
                    tel : req.body.tel,
                    isbindweixin:req.body.isbindweixin,
                    weixinopenid:req.body.weixinopenid,
                    vin:req.body.vin,
                    carregistertime:req.body.carregistertime,
                    headurl:req.body.headurl,

                }};
                var options    = {upsert : false};
                Contact.update(conditions1,update1,options,function (err,ret2) {
                    if(err){
                        return res.send(global.retFormate(0,err,'修改数据失败'));
                    }
                    else {
                        //由于可能会修改了车牌号,但是老版的Repair的contactid可能是空的，只能通过contactid进行筛选
                        var conditions2 ={$or:
                                            [
                                                {carcode : oldCarCode,owner:req.body.owner},
                                                {contactid : req.body.id,owner:req.body.owner}
                                             ]
                                         };

                        //趁机想老数据里的contactid置为有效值
                        var update2     = {$set : {
                            contactid:req.body.id,
                            carcode:req.body.carcode,
                        }};
                        var options    = {upsert : false,
                                            multi : true};
                        Repair.update(conditions2,update2,options,function (err,ret3) {
                            if(err){
                                return res.send(global.retFormate(0,err,'修改数据失败'));
                            }
                            else {
                                return res.send(global.retFormate(1,ret3,'修改数据成功'));
                            }
                        });
                    }
                });




            }
        });




    }),

    /**
     * 修改当前用户是否绑定微信公众号
     */

    router.post('/updateFollowState',function (req, res, next) {
        global.log4bae('contact/updateFollow'+JSON.stringify(req.body));
        var conditions = {_id : req.body.id};
        var update     = {$set : {
            isbindweixin:req.body.isbindweixin,
            weixinopenid:req.body.weixinopenid,
        }};
        var options    = {upsert : false};
        Contact.update(conditions,update,options,function (err,ret) {
            if(err){
                return res.send(global.retFormate(0,err,'修改数据失败'));
            }
            else {
                return res.send(global.retFormate(1,'修改成功','修改数据成功'));
            }
        });
    }),


    /**
     * 修改用户头像
     */
    router.post('/updateHeadUrl',function (req, res, next) {
        global.log4bae('contact/updateHeadUrl'+JSON.stringify(req.body));
        var conditions = {_id : req.body.id};
        var update     = {$set : {
            headurl:req.body.headurl,
        }};
        var options    = {upsert : false};
        Contact.update(conditions,update,options,function (err,ret) {
            if(err){
                return res.send(global.retFormate(0,err,'修改数据失败'));
            }
            else {
                return res.send(global.retFormate(1,'修改成功','修改数据成功'));
            }
        });
    }),



    /**
     * 删除客户3.2
     * */
    router.post('/del3',function (req, res, next) {
        global.log4bae('contact/del2'+JSON.stringify(req.body));
        Contact.remove({_id:req.body.id},function (err,ret) {
            if(err){
                return res.send(global.retFormate(0,err,'存入数据失败'));
            }
            else {
                Repair.remove({contactid:req.body.id,owner:req.body.owner},function (err,ret) {
                    if(err){
                        return res.send(global.retFormate(0,err,'保存数据失败'));
                    }
                    else {
                        return res.send(global.retFormate(1,'保存成功','存入数据成功'));
                    }
                });
            }
        });

    }),


    /**************************************客户预约***********************************
    /**
     * 客户预约维修保养
     */
    router.post('/addRrderRepair',function (req, res, next) {
        global.log4bae('contact/addRrderRepair'+JSON.stringify(req.body));
        var _openid =  req.body.openid;
        var _time =  req.body.time;
        var _info =  req.body.info;

        Contact.findOne({weixinopenid:_openid},function (err,doc1) {
            if(err){
                return res.send(global.retFormate(0,err,'预约失败'));
            }else {
                global.log4bae('doc1'+JSON.stringify(doc1));
                if(doc1 == null){
                    return res.send(global.retFormate(0,'您还不是绑定客户,请先绑定','您还不是绑定客户,请先绑定'));
                }
                var _owner = doc1.owner;
                ContactOrder.findOne({state:"0",openid:_openid},function (err,doc) {
                    if(err){
                        return res.send(global.retFormate(0,err,'预约失败'));
                    }else {
                        if(doc){
                            return res.send(global.retFormate(0,doc,'您还有未被处理的预约,请耐心等待'));
                        }else {
                            var insertOrder = new ContactOrder({
                                    openid:_openid,
                                    time:_time,
                                    info:_info,
                                    owner:_owner,
                                    inserttime:new Date().Format('yyyy-MM-dd hh:mm:ss')
                            }
                            );
                            insertOrder.save(insertOrder,function (err,doc) {
                                if(err){
                                    return res.send(global.retFormate(0,err,'预约失败'));
                                }else {

                                    //发送给门店老板
                                    User.findOne({tel:_owner},function (err,user) {
                                        if(user.ostype == 'ios' ) {
                                            client.push().setPlatform('ios')
                                                .setOptions(null,null,null,config.JPush_IS_Production,null)
                                                .setAudience(JPush.registration_id([user.pushid]))
                                                .setNotification('您的客户'+doc1.name+'提交了预约申请,快去看看吧', JPush.ios('您的客户'+doc1.name+'提交了预约申请,快去看看吧', '您的客户'+doc1.name+'提交了预约申请,快去看看吧', 1))
                                                .send(function(err, res) {
                                                    if (err) {
                                                        global.log4bae(err.message)
                                                    } else {
                                                        global.log4bae('Sendno: ' + res.sendno)
                                                        global.log4bae('Msg_id: ' + res.msg_id)
                                                    }
                                                });
                                        }else {
                                            client.push().setPlatform('android')
                                                .setAudience(JPush.registration_id([user.pushid]))
                                                .setNotification('您的客户'+doc1.name+'提交了预约申请,快去看看吧', JPush.ios('您的客户'+doc1.name+'提交了预约申请,快去看看吧', '您的客户'+doc1.name+'提交了预约申请,快去看看吧', 1))
                                                .send(function(err, res) {
                                                    if (err) {
                                                        global.log4bae(err.message)
                                                    } else {
                                                        global.log4bae('Sendno: ' + res.sendno)
                                                        global.log4bae('Msg_id: ' + res.msg_id)
                                                    }
                                                });
                                        }
                                    });



                                    return res.send(global.retFormate(1,doc,'预约成功'));
                                }
                            })
                        }

                    }

                });
            }

        });




    }),


    /**
     * 获取客户预约维修保养列表
     */
    router.post('/getOrderRepairList',function (req, res, next) {
        global.log4bae('contact/getOrderRepairList'+JSON.stringify(req.body));

        ContactOrder.find({owner:req.body.owner},function (err,doc) {
            if(err){
                return res.send(global.retFormate(0,err,'查询失败'));
            }else {
                return res.send(global.retFormate(1,doc,'预约成功'));
            }
        });

    }),


    /**
     * 更改预约状态
     */
    router.post('/updateOrderRepair',function (req, res, next) {
        global.log4bae('contact/updateOrderRepair'+JSON.stringify(req.body));

        var _shopName =  req.body.shopname;
        var _openid =  req.body.openid;
        var _orderId =  req.body.id;
        var _confirmtime =  req.body.confirmtime;
        var _ordertime =  req.body.ordertime;
        var _orderinfo =  req.body.orderinfo;
        
        var _update     = {$set : {
            state:req.body.state,
            confirmtime:_confirmtime,
        }};
        ContactOrder.update({_id:_orderId},_update,function (err,doc) {
            if(err){
                return res.send(global.retFormate(0,err,'修改失败'));
            }else {

                WXPusher.pushOrderReceivedTemplate(_openid,_orderId,_confirmtime,_ordertime,
                    _shopName,_orderinfo,function (err,doc) {
                    
                });

                return res.send(global.retFormate(1,doc,'修改成功'));
            }
        });

    }),

    /**
     * 删除预约
     */
    router.post('/delOrderRepair',function (req, res, next) {
        global.log4bae('contact/delOrderRepair'+JSON.stringify(req.body));

        ContactOrder.remove({_id:req.body.id},function (err,doc) {
            if(err){
                return res.send(global.retFormate(0,err,'删除失败'));
            }else {
                return res.send(global.retFormate(1,doc,'删除成功'));
            }
        });

    }),

    module.exports = router;