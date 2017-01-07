/**
 * Created by points on 16/12/15.
 */
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
            res.render('noticeboard', { value:{'notice':'暂无数据!'}  ,layout: 'noticeboard'});
        }else {
            if(ret){
                res.render('noticeboard', { value: ret.notice ,layout: 'noticeboard'});
            }else {
                res.render('noticeboard', { value:'暂无数据!'  ,layout: 'noticeboard'});
            }
        }
    });
});


module.exports = router;

