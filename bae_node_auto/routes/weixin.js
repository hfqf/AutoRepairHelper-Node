/**
 * Created by points on 16/12/15.
 */
var express = require('express');
var router = express.Router();
var Setting = require('../utils/config');
var mongoose = require('mongoose');
var User = mongoose.model(Setting.mongooseModelName);
var Contact = mongoose.model(Setting.ModelNameContact);

var WeixinScheme = mongoose.model(Setting.ModelName.weixin.accesstoken);
var https = require('https');
var xml=require('node-xml');

var http = require("http");
var url = require("url");
var crypto = require("crypto");
var config = {
    token: 'hfqf1234',
    appid: 'wx31c52a0311e313af',
    encodingAESKey: 'dRDVimDOE2OlgN7qcSAd5bGslT6bkGvqT4VgCJhTQPX',
    checkSignature: true // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
};

var WXPusher = require('../weixin/pushtowxuser');


function validateToken(req,res){
    var query = url.parse(req.url,true).query;
    //console.log("*** URL:" + req.url);
    //console.log(query);
    var signature = query.signature;
    var echostr = query.echostr;
    var timestamp = query['timestamp'];
    var nonce = query.nonce;
    var oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = "hfqf1234";//这里是你在微信开发者中心页面里填的token，而不是****
    oriArray.sort();
    var original = oriArray.join('');
    console.log("Original str : " + original);
    console.log("Signature : " + signature );
    var scyptoString = sha1(original);
    if(signature == scyptoString){
        res.end(echostr);
        console.log("Confirm and send echo back");
    }else {
        res.end("false");
        console.log("Failed!");
    }
}

function sha1(str){
    var md5sum = crypto.createHash("sha1");
    md5sum.update(str);
    str = md5sum.digest("hex");
    return str;
}


router.get('/', function(req, res, next) {
        log4bae(req.toString());
        validateToken(req,res);
});

router.post('/', function(req, res, next) {
    if(req.query.signature == undefined){
        res.send('1');
    }else {

        var response=res;
        var formData="";
        req.on("data",function(data){
            formData+=data;
        });
        req.on("end",function(){
            log4bae(formData);
            processMessage(formData,response);
        });
    }
});




router.get('/createMenu',function (req,res,next) {
    WeixinScheme.findOne({},function (err,doc) {
        if(err){

        }else {
            var token = doc.accesstoken;
            var body =  {
                "button":[
                    {
                        "type":"view",
                        "name":"网上预约",
                        "url":Setting.WENXIN_GZH.CUSTOMER_ORDER_URL
                    },
                    {
                        "type":"view",
                        "name":"消费记录",
                        "url":Setting.WENXIN_GZH.CUSTOMER_QUERY_URL
                    }]
            };
            weixinCreateMenu(body,token,function (err,doc1) {
                if(err){
                    res.send(err);

                }else {
                    res.send(doc1);
                }
            });
        }



    });
});

var weixinCreateMenu = function (req,access_token,callback) {

    var strMenus = JSON.stringify(req);
    var data = "";
    var options = {
        host:'api.weixin.qq.com',
        port:443,
        path:'/cgi-bin/menu/create?access_token='+access_token,
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(strMenus)
        }
    }
    var req = https.request(options,function (res) {
        res.on('data',function (chunk) {
            data+=chunk;
        });

        res.on('end',function () {
            var message = JSON.parse(data);
            callback(null,message);
        });

        req.on('error',function(e){
            console.log(e);
            callback(e,null);
        });
})

    req.write(strMenus);
    req.end();
}


//解析返回数据
function processMessage(data,response){
    var ToUserName="";
    var FromUserName="";
    var CreateTime="";
    var MsgType="";
    var Content="";
    var Location_X="";
    var Location_Y="";
    var Scale=1;
    var Label="";
    var PicUrl="";
    var FuncFlag="";

    var tempName="";
    var parse=new xml.SaxParser(function(cb){
        cb.onStartElementNS(function(elem,attra,prefix,uri,namespaces){
            tempName=elem;
        });

        cb.onCharacters(function(chars){
            chars=chars.replace(/(^\s*)|(\s*$)/g, "");
            if(tempName=="CreateTime"){
                CreateTime=chars;
            }else if(tempName=="Location_X"){
                Location_X=cdata;
            }else if(tempName=="Location_Y"){
                Location_Y=cdata;
            }else if(tempName=="Scale"){
                Scale=cdata;
            }


        });

        cb.onCdata(function(cdata){

            if(tempName=="ToUserName"){
                ToUserName=cdata;
            }else if(tempName=="FromUserName"){
                FromUserName=cdata;
            }else if(tempName=="MsgType"){
                MsgType=cdata;
            }else if(tempName=="Content"){
                Content=cdata;
            }else if(tempName=="PicUrl"){
                PicUrl=cdata;
            }else if(tempName=="Label"){
                Label=cdata;
            }
            console.log("cdata:"+cdata);
        });

        cb.onEndElementNS(function(elem,prefix,uri){
            tempName="";
        });

        cb.onEndDocument(function(){
            console.log("onEndDocument");
            tempName="";
            var date=new Date();
            var yy=date.getYear();
            var MM=date.getMonth() + 1;
            var dd=date.getDay();
            var hh=date.getHours();
            var mm=date.getMinutes();
            var ss=date.getSeconds();
            var sss=date.getMilliseconds();
            var result=Date.UTC(yy,MM,dd,hh,mm,ss,sss);
            onReceivedMsgFromClicent(ToUserName,FromUserName,CreateTime,MsgType,Content,Location_X,Location_Y,Label,PicUrl,FuncFlag,tempName,response);
        });
    });
    parse.parseString(data);
}



/**
 * 处理从微信过来的消息
 */
var onReceivedMsgFromClicent = function(_ToUserName,_FromUserName,_CreateTime,_MsgType,
                                        _Content,_Location_X,_Location_Y,_Label,_PicUrl,_FuncFlag,_tempName,res){



    // 检测是否是绑定数据
    if(_MsgType=="text"){
        if(_Content.indexOf("BD") >= 0 ){
            if(_Content.length == 13){

                var _tel = _Content.substring(2,13);
                log4bae(_tel);

                Contact.findOne({tel:_tel},function (err,doc) {
                        if(err){
                            showTipMsg(_FromUserName,'绑定失败',res);
                        }
                        else {

                            if(doc == null){
                                showTipMsg(_FromUserName,'您还未登入进系统,请联系门店',res);
                            }else {
                                var conditions = {tel : _tel};
                                var update     = {$set : {
                                    isbindweixin:'1',
                                    weixinopenid:_FromUserName,
                                }};
                                var options    = {upsert : false,multi:true};
                                Contact.update(conditions,update,options,function (err,ret) {
                                    if(err){
                                        showTipMsg(_FromUserName,'绑定失败',res);
                                    }
                                    else {

                                        //查找相关门店信息
                                        User.findOne({tel:doc.owner},function (err,ret1) {

                                            if(err){
                                                WXPusher.pushBindSucceedTemplate(_FromUserName,_tel,'',function (err,doc) {

                                                })
                                            }else {
                                                WXPusher.pushBindSucceedTemplate(_FromUserName,_tel,ret1.shopname,function (err,doc) {

                                                })
                                            }

                                        });


                                        showTipMsg(_FromUserName,'绑定成功',res);




                                    }
                                });

                            }

                        }
                    }
                );



            }else {
                showTipMsg(_FromUserName,'手机号码长度有误',res);
            }
        }else{
            showBindTelTip(_FromUserName,res);
        }
    }else {
        showBindTelTip(_FromUserName,res);
    }


}


var returnUserPostResponse = function(openId,res){
    console.log("returnUserPostResponse1");
    var time = Math.round(new Date().getTime() / 1000);
    var output =
        "<xml>" +
        "<ToUserName><![CDATA[" + openId + "]]></ToUserName>" +
        "<FromUserName><![CDATA[" + Setting.WENXIN_GZH.SERVER_WEIXIN_openId + "]]></FromUserName>" +
        "<CreateTime>" + time + "</CreateTime>" +
        "<MsgType><![CDATA[" + "text" + "]]></MsgType>" +
        "<Content><![CDATA[" + "你好,绑定成功!" + "]]></Content>" +
        "</xml>";
        res.type('xml');
    console.log("returnUserPostResponse2");
    console.log("returnUserPostResponse3"+output);
    return res.send(output);
}


/**
 * 提示信息
 * @param openId
 * @param msg
 * @param res
 * @returns {*}
 */
var showTipMsg = function(openId,msg,res){
    console.log("returnUserPostResponse1");
    var time = Math.round(new Date().getTime() / 1000);
    var output =
        "<xml>" +
        "<ToUserName><![CDATA[" + openId + "]]></ToUserName>" +
        "<FromUserName><![CDATA[" + Setting.WENXIN_GZH.SERVER_WEIXIN_openId + "]]></FromUserName>" +
        "<CreateTime>" + time + "</CreateTime>" +
        "<MsgType><![CDATA[" + "text" + "]]></MsgType>" +
        "<Content><![CDATA[" + msg + "]]></Content>" +
        "</xml>";
    res.type('xml');
    return res.send(output);
}


/**
 * 提示用户绑定手机号
 * @param openId
 * @param res
 * @returns {*}
 */
var showBindTelTip = function(openId,res){
    console.log("returnUserPostResponse1");
    var time = Math.round(new Date().getTime() / 1000);
    var output =
        "<xml>" +
        "<ToUserName><![CDATA[" + openId + "]]></ToUserName>" +
        "<FromUserName><![CDATA[" + Setting.WENXIN_GZH.SERVER_WEIXIN_openId + "]]></FromUserName>" +
        "<CreateTime>" + time + "</CreateTime>" +
        "<MsgType><![CDATA[" + "text" + "]]></MsgType>" +
        "<Content><![CDATA[" + "你好,欢迎使用汽修小助手微信公众号,发送BD+您的手机号，如BD18251846048,即可绑定!绑定能成功后可以:1.网上预约门店维修服务 2.自动收到维修进度变化,保养到期和年审到期提醒的微信消息 3.查询已做维修保养" + "]]></Content>" +
        "</xml>";
    res.type('xml');
    return res.send(output);
}


module.exports = router;

