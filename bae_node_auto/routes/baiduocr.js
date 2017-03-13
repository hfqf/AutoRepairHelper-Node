/**
 * Created by points on 16/11/18.
 */
var express = require('express');
var router = express.Router();
var config = require('../utils/config');
var mongoose = require('mongoose');

//注册新用户
router.post('/localfile',function (req,res,next) {


        // detectType: `LocateRecognize`代表整图文字检测、识别,以行为单位（默认）
        // languageType: `CHN_ENG`(中英)（默认）
        // imageType: `2`代表图片原文件（只支持JPG，大小不能超过300K）
        // image: 图片流对象 或 base64 编码的字符串

        var ak = config.Baidu.ak;
        var sk = config.Baidu.sk;
        var ocr = require('baidu-ocr-api').create(ak,sk);

        var  image = req.body.base64pic;
        ocr.scan( 'LocateRecognize', 'CHN_ENG', 2, image, function( err, data ) {
            if ( err ) {
                return console.error( err );
            }

            console.log( 'words:' );
            console.log( data.word );
        });
    }
);

//网络图片识别
router.post('/webfile',function (req,res,next) {

    var ak = config.Baidu.ak;
    var sk = config.Baidu.sk;
    var ocr = require('baidu-ocr-api').create(ak,sk);
    ocr.scan({
        url:req.body.base64pic, // 支持本地路径
        type:'text',
    }).then(function (result) {
        return console.log(result)
    }).catch(function (err) {
        console.log('err', err);
    })
 }
);



module.exports = router;