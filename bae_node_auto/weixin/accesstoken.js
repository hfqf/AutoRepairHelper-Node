/**
 * Created by points on 16/11/18.
 */

var https = require('https');
var config = require('../utils/config');
var CronJob = require('cron').CronJob;
var mongoose = require('mongoose');
var WeixinTokenScheme = mongoose.model(config.ModelName.weixin.accesstoken);

var refreshWeixinToken = function ( ) {
    // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx31c52a0311e313af&secret=a1c42ecdd27c854549bdafa4d236f139

    var job = new CronJob({
        cronTime: config.WENXIN_GZH.TIME_TO_REFRESH_ACCESSTOEKEN,
        onTick: function() {

            https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+config.WENXIN_GZH.APPID+'&secret='+config.WENXIN_GZH.APPSECRET, function(res) {
                console.log("Got response: "+ new Date() + res.statusCode);
                res.on('data', function(data) {
                    console.log("Got data: " + data);

                    var ret = String.fromCharCode.apply(null, data);
                    var token = JSON.parse(ret).access_token;
                    var newTokenScheme = new WeixinTokenScheme({
                        accesstoken:token,
                        inserttime:new Date().Format('yyyy-MM-dd hh:mm:ss')
                    });
                    WeixinTokenScheme.remove({},function (err,doc) {

                        if(err){

                        }else {

                            newTokenScheme.save(function (err,docSave) {
                                console.log(docSave);
                            })

                        }

                    })


                });
            }).on('error', function(e) {
                console.log("Got error: " + e.message);
            });


        },
        start: true,
        timeZone: 'Asia/Shanghai'
    });




}


exports.refreshWeixinToken =  refreshWeixinToken;
