/**
 * Created by points on 16/12/15.
 */
var express = require('express');
var router = express.Router();
var Setting = require('../utils/config');
var mongoose = require('mongoose');
var root = require('../bin/start');
var log_bae = require('../utils/logger4js');

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


router.get('/log',function (req,res,next) {

    res.send('ok');
    log_bae.log('hi!');

});



module.exports = router;

