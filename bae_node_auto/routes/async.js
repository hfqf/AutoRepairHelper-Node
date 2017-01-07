/**
 * Created by points on 16/11/19.
 */

//用来上传老版本本地数据的数据到服务器上

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Contact = mongoose.model(global.config.ModelNameContact);
let Repair = mongoose.model(global.config.ModelNameRepairHistory);

let async = require('async');


/**
 * 插入单个联系人
 * @param item
 * @param callback
 */


//客户端把所有数据库记录弄成字串上传过来
router.post('/contact',function (req, res, next) {
    let  arrContact = JSON.parse(req.body.contact);

    async.map(arrContact,function (item,callback) {

        let newContact = new  Contact({
            carcode:item.carcode,
            name:item.name,
            tel:item.tel,
            cartype:item.cartype,
            owner:item.owner
        });

        newContact.save(function (err,docs) {
            if(err){
                callback(err,1)
            }else{
                callback(null,docs);
            }

        });

    },(e,v)=>{
        "use strict";
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

        let newRepair = new  Repair({
            carcode:item.carcode,
            totalkm:item.totalkm,
            repairetime:item.repairetime,
            addition:item.addition,
            tipcircle:item.tipcircle,
            isclose:item.isclose,
            circle:item.circle,
            repairtype:item.repairtype,
            owner:item.owner
        });

        newRepair.save(function (err,docs) {
            if(err){
                callback(err,1)
            }else{
                callback(null,docs);
            }

        });

    },(e,v)=>{
        "use strict";
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


module.exports = router;