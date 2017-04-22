/**
 * Created by points on 16/12/15.
 */
var express = require('express');
var router = express.Router();
var Setting = require('../utils/config');
var mongoose = require('mongoose');
var Update = mongoose.model(Setting.ModelNameUpdate);


router.get('/ios',function (req,res,next) {

    Update.findOne({},function (err,ret) {
            if(err){
                res.send(global.retFormate(0, err, '获取数据失败'));
            }else {
                res.send(global.retFormate(1, ret, '获取数据成功'));
            }
        });
});


router.get('/android',function (req,res,next) {

    Update.findOne({},function (err,ret) {
        if(err){
            res.send(global.retFormate(0, err, '获取数据失败'));
        }else {
            res.send(global.retFormate(1, ret, '获取数据成功'));
        }
    });
});


module.exports = router;

