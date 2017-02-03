/**
 * Created by points on 16/11/19.
 */

//用来上传老版本本地数据的数据到服务器上

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Contact = mongoose.model(global.config.ModelNameContact);
var Repair = mongoose.model(global.config.ModelNameRepairHistory);

var async = require('async');


/**
 * 插入单个联系人
 * @param item
 * @param callback
 */


//客户端把所有数据库记录弄成字串上传过来
router.post('/contact',function (req, res, next) {
    var  arrContact = JSON.parse(req.body.contact);

    async.map(arrContact,function (item,callback) {

        var newContact = new  Contact({
            carcode:item.carcode,
            name:item.name,
            tel:item.tel,
            cartype:item.cartype,
            owner:item.owner == undefined ? '' : item.owner,
            id:item.id == undefined ? '' : item.id
        });

        //查看是否已有此人
        Contact.findOne({carcode:item.carcode},function (err,doc) {
                if(err){
                    callback(err,1)
                 }else {
                     if(doc){
                         callback(null,doc);
                     }else {
                         newContact.save(function (err,doc) {
                             if(err){
                                 callback(err,1)
                             }else{
                                 callback(null,doc);
                             }

                         });
                     }
                }
             }
        );




    },(e,v)=>{
        if(e){
            console.log(e);
            return res.send(global.retFormate(0,e,'存入数据失败'));
        }
        else {
            console.log(v);
            return res.send(global.retFormate(1,'存入数据成功','存入数据成功'));
        }
    })
}),


    /**
     * 插入单个联系人
     * @param item
     * @param callback
     */


//客户端把所有数据库记录弄成字串上传过来 2.0
    router.post('/contact2',function (req, res, next) {
        var  arrContact = JSON.parse(req.body.contact);

        async.map(arrContact,function (item,callback) {

            var newContact = new  Contact({
                carcode:item.carcode,//唯一
                name:item.name,
                tel:item.tel,
                cartype:item.cartype,
                owner:item.owner == undefined ? '' : item.owner,
                id:item.id == undefined ? '' : item.id
            });

            //查看是否已有此人
            Contact.findOne({carcode:item.carcode},function (err,doc) {
                    if(err){
                        callback(err,1)
                    }else {
                        if(doc){
                            callback(null,doc);
                        }else {
                            newContact.save(function (err,doc) {
                                if(err){
                                    callback(err,1)
                                }else{
                                    callback(null,doc);
                                }

                            });
                        }
                    }
                }
            );




        },(e,v)=>{
            if(e){
                console.log(e);
                return res.send(global.retFormate(0,e,'存入数据失败'));
            }
            else {
                console.log(v);
                return res.send(global.retFormate(1,'存入数据成功','存入数据成功'));
            }
        })
    }),
    /**
     * 客户端把所有数据库记录弄成字串上传过来
     */
    router.post('/repair',function (req, res, next) {

    var  arrRepair = JSON.parse(req.body.repair);
    async.map(arrRepair,function (item,callback) {
        var newRepair = new  Repair({
            id:item.id,
            carcode:item.carcode,
            totalkm:item.totalkm,
            repairetime:item.repairetime,
            repairtype:item.repairtype,
            addition:item.addition,
            tipcircle:item.tipcircle,
            isclose:item.isclose,
            circle:item.circle,
            isreaded:item.isreaded == undefined ? '' : item.isreaded,
            owner:item.owner == undefined ? '' : item.owner,
        });

        //没有id肯定是新数据
        if(item.id.length == 0){
            newRepair.save(function (err,doc) {
                if(err){
                    callback(err,1)
                }else{
                    callback(null,doc);
                }

            });
        }
        else {
            //先查看是否已保存过
            Repair.findOne({_id:item.id},function (err,doc) {
                if(err){
                    callback(err,1)
                }else {
                    if(doc){
                        callback(null,doc);
                    }else {
                        newRepair.save(function (err,doc) {
                            if(err){
                                callback(err,1)
                            }else{
                                callback(null,doc);
                            }

                        });
                    }
                }

            });
        }




    },(e,v)=>{
        if(e){
            console.log(e);
            return res.send(global.retFormate(0,e,'存入数据失败'));
        }
        else {
            console.log(v);
            return res.send(global.retFormate(1,'存入数据成功','存入数据成功'));
        }
    })
}),


    /**
     * 客户端把所有数据库记录弄成字串上传过来 2.0
     */
    router.post('/repair2',function (req, res, next) {

        var  arrRepair = JSON.parse(req.body.repair);
        async.map(arrRepair,function (item,callback) {

            var newRepair = new  Repair({
                id:item.id,
                carcode:item.carcode,
                totalkm:item.totalkm,
                repairetime:item.repairetime,
                repairtype:item.repairtype,
                addition:item.addition,
                tipcircle:item.tipcircle,
                isclose:item.isclose,
                circle:item.circle,
                isreaded:item.isreaded == undefined ? '' : item.isreaded,
                owner:item.owner == undefined ? '' : item.owner,
                inserttime:item.inserttime == undefined ? new Date().Format('yyyy-MM-dd hh:mm:ss') : item.inserttime
            });

            if(item.id.length == 0){
                newRepair.save(function (err,doc) {
                    if(err){
                        callback(err,1)
                    }else{
                        callback(null,doc);
                    }

                });
            }
            else {
                //先查看是否已保存过
                Repair.findOne({_id:item.id},function (err,doc) {
                    if(err){
                        callback(err,1)
                    }else {
                        if(doc){
                            callback(null,doc);
                        }else {
                            newRepair.save(function (err,doc) {
                                if(err){
                                    callback(err,1)
                                }else{
                                    callback(null,doc);
                                }

                            });
                        }
                    }

                });
            }




        },(e,v)=>{
            if(e){
                console.log(e);
                return res.send(global.retFormate(0,e,'存入数据失败'));
            }
            else {
                console.log(v);
                return res.send(global.retFormate(1,'存入数据成功','存入数据成功'));
            }
        })
    }),

    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    module.exports = router;