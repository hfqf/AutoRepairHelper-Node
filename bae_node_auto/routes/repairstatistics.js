/**
 * Created by points on 16/12/15.
 */
var express = require('express');
var router = express.Router();
var Setting = require('../utils/config');
var mongoose = require('mongoose');
var Cotact = mongoose.model(Setting.ModelNameContact);
var Repair = mongoose.model(Setting.ModelNameRepairHistory);


/*
打印某个客户的消费记录
   1。消费次数
   2。消费金额
   3。所有目录

   消费具体记录
 */

router.get('/ios',function (req,res,next) {


});

router.get('/android',function (req,res,next) {


});

module.exports = router;

