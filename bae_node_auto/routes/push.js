/**
 * Created by points on 16/12/15.
 */
var express = require('express');
var router = express.Router();
var Setting = require('../utils/config');
var mongoose = require('mongoose');
var JPush = require("jpush-sdk");
var client = JPush.buildClient(Setting.JPush.JPushAppKey, Setting.JPush.JPushMasterSecret);
var root = require('../bin/start');

router.get('/ios',function (req,res,next) {

    root.pushTest(function (err, docs) {
        if(err){
            res.send(err);

        }else {
            res.send(docs);
        }
    });
});

router.get('/android',function (req,res,next) {

    root.pushTest(function (err, docs) {
        if(err){
            res.send(err);

        }else {
            res.send(docs);
        }    });

});



module.exports = router;

