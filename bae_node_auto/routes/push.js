/**
 * Created by points on 16/12/15.
 */
var express = require('express');
var router = express.Router();
var Setting = require('../utils/config');
var mongoose = require('mongoose');
var JPush = require("jpush-sdk");
var client = JPush.buildClient(Setting.JPush.JPushAppKey, Setting.JPush.JPushMasterSecret);


  function pushTest (req,httpRes,next) {
        client.push().setPlatform(JPush.ALL)
            .setAudience(JPush.ALL)
            .setNotification('Hi, JPush', JPush.ios('ios alert', 'happy', 5))
            .send(function(err, res) {
                if (err) {
                    console.log(err.message)
                    httpRes.send('ok');
                } else {
                    console.log('Sendno: ' + res.sendno)
                    console.log('Msg_id: ' + res.msg_id)
                    httpRes.send('ok');
                }
            });
};


router.get('/ios',function (req,res,next) {

    /**
     * 测试代码
     */
    pushTest(req,res,next);

});

router.get('/android',function (req,res,next) {

    /**
     * 测试代码
     */
    pushTest(req,res,next);

});



module.exports = router;

