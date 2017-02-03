/**
 * Created by points on 16/11/19.
 */

//用来上传老版本本地数据的数据到服务器上

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Contact = mongoose.model(global.config.ModelNameContact);

/**
 * 增加客户
 */
router.post('/add',function (req, res, next) {

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
                    return res.send(global.retFormate(0,'已存在此记录','已存在此记录'));
                }else {
                    newContact.save(function (err) {
                        if(err){
                            return res.send(global.retFormate(0,err,'存入数据失败'));
                        }
                        else {
                            return res.send(global.retFormate(1,'保存成功','存入数据成功'));
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
        var conditions = {tel : req.body.tel,owner:req.body.owner};
        var update     = {$set : {
            carcode:req.body.carcode,
            name:req.body.name,
            cartype:req.body.cartype,
        }};
        var options    = {upsert : true};
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
        var conditions = {id : req.body.id};
        var update     = {$set : {
            carcode:req.body.carcode,
            name:req.body.name,
            cartype:req.body.cartype,
            tel : req.body.tel
        }};
        var options    = {upsert : true};
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


    module.exports = router;