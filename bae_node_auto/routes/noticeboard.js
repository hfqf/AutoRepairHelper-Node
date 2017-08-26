/**
 * Created by points on 16/12/15.
 */

"use strict";

var express = require('express');
var router = express.Router();
var Setting = require('../utils/config');
var mongoose = require('mongoose');
var NoticeBoard = mongoose.model(Setting.ModelNameNoticeBoard);


router.get('/ios',function (req,res,next) {

    NoticeBoard.findOne({os:'ios'},function (err,ret) {
            if(err){
                res.render('noticeboard', { value:{notice:'暂无数据!'}  ,layout: 'noticeboard'});
            }else {
                if(ret){
                    res.render('noticeboard', { value: ret.notice ,layout: 'noticeboard'});
                }else {
                    res.render('noticeboard', { value:'暂无数据!'  ,layout: 'noticeboard'});
                }
            }
        });
});

router.get('/android',function (req,res,next) {

    NoticeBoard.findOne({os:'android'},function (err,ret) {
        if(err){
            res.render('noticeboard2', { value:{'notice':'暂无数据!'}  ,layout: 'noticeboard2'});
        }else {
            if(ret){
                res.render('noticeboard2', { value: ret.notice ,layout: 'noticeboard2'});
            }else {
                res.render('noticeboard2', { value:'暂无数据!'  ,layout: 'noticeboard2'});
            }
        }
    });
});


router.get('/order',function (req,res,next) {
    res.render('customerorder', { openid:'24d773423y32r3',layout: 'customerorder'});
});

router.get('/test1',function (req,res,next) {
    res.send('1');
});


module.exports = router;

