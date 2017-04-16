/**
 * Created by points on 16/12/15.
 */
var express = require('express');
var router = express.Router();
var Setting = require('../utils/config');
var mongoose = require('mongoose');
var RepairItem = mongoose.model(global.config.ModelNameRepairItem);

router.post('/add',function (req,res,next) {

    global.log4bae('RepairItem/add'+JSON.stringify(req.body));
    var repairItem = new  RepairItem({
        repid:req.body.repid,
        contactid:req.body.contactid,
        price:req.body.price,
        num:req.body.num,
        type:req.body.type,
    });

    repairItem.save(function (err,doc) {
        if(err){
            return res.send(global.retFormate(0,err,'存入数据失败'));
        }
        else {
            return res.send(global.retFormate(1,doc,'存入数据成功'));
        }
    });
});

router.post('/del',function (req,res,next) {

    global.log4bae('RepairItem/add'+JSON.stringify(req.body));
    RepairItem.remove({_id:req.body.id},function (err,doc) {
        if(err){
            return res.send(global.retFormate(0,err,'操作失败'));
        }
        else {
            return res.send(global.retFormate(1,doc,'操作成功'));
        }
    });
});

router.post('/delAll',function (req,res,next) {

    global.log4bae('RepairItem/delAll'+JSON.stringify(req.body));
    RepairItem.remove({contactid:req.body.contactid},function (err,doc) {
        if(err){
            return res.send(global.retFormate(0,err,'操作失败'));
        }
        else {
            return res.send(global.retFormate(1,doc,'操作成功'));
        }
    });
});



router.post('/query',function (req,res,next) {
    global.log4bae('RepairItem/query'+JSON.stringify(req.body));
    RepairItem.find({repid:req.body.repid},function (err,doc) {
        if(err){
            return res.send(global.retFormate(0,err,'操作失败'));
        }
        else {
            return res.send(global.retFormate(1,doc,'操作成功'));
        }
    });
});

module.exports = router;

