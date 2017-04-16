/**
 * Created by points on 16/12/15.
 */
var express = require('express');
var router = express.Router();
var Setting = require('../utils/config');
var mongoose = require('mongoose');
var xlsx = require('node-xlsx');
var fs = require('fs');

router.get('/read',function (req,res,next) {
//读取文件内容
    var obj = xlsx.parse(__dirname+'/0410.xls');
    var excelObj=obj[0].data;
    console.log(excelObj);
    var data = [];
    for(var i in excelObj){
        var arr=[];
        var value=excelObj[i];
        for(var j in value){
            arr.push(value[j]);
        }
        data.push(arr);
    }
});

module.exports = router;

