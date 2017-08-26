/**
 * Created by points on 16/11/18.
 */

var https = require('https');
var config = require('../utils/config');
var CronJob = require('cron').CronJob;
var mongoose = require('mongoose');
var WeixinScheme = mongoose.model(config.ModelName.weixin.accesstoken);

var WXPusher = function () {

    this.pushExpireTemplate = _pushExpireTemplate;
    this.pushBindSucceedTemplate = _pushBindSucceedTemplate;
    this.pushRepairSateTemplate = _pushRepairSateTemplate;
    this.pushOrderReceivedTemplate = _pushOrderReceivedTemplate;
};


/**
 * 推送到绑定成功模版消息
 * @param openId
 * @param callback
 * @private
 */
var  _pushBindSucceedTemplate = function (openId,tel,shopName,callback) {
    WeixinScheme.findOne({},function (err,doc) {

        if(err){
            callback(err,err);
        }else {
            var token = doc.accesstoken;
            var data= {

                "first": {
                    "value":"微信绑定成功",
                    "color":"#173177"
                },
                "keyword1":{
                    "value":tel,
                    "color":"#173177"
                },
                "keyword2": {
                    "value":'你已成功绑定成功',
                    "color":"#173177"
                },
                "remark":{
                    "value":shopName.length == 0 ? '欢迎使用汽修小助手微信公众号，我们竭诚为您服务。' : '欢迎光临'+shopName+', 我们竭诚为您服务。',
                    "color":"#173177"
                }

            };
            sendTemplateMsg(token,openId,config.WENXIN_GZH.TEMPLATE_ID_BIND_SUCCEED,'',data,callback)
        }

    });

}


/**
 * 推送维修状态消息。维修中，已修完，已提车，已取消
 * @param openId
 * @param callback
 * @private
 */
var  _pushRepairSateTemplate = function (openId,tel,repairId,repairer,repairContent,carCode,state,shopName,callback) {
    WeixinScheme.findOne({},function (err,doc) {

        if(err){
            callback(err,err);
        }else {

            var first = '';
            if(state == 0){
                first = '您的车辆:'+carCode+'在'+shopName+'的维修保养服务已开始接单';
            }else if(state == 1){
                first = '您的车辆:'+carCode+'在'+shopName+'的维修保养服务的已完成,等待您去提车';
            }else if(state == 2){
                first = '您的车辆:'+carCode+'在'+shopName+'的维修保养服务已提车';
            }else if(state == 3){
                first = '您的车辆:'+carCode+'在'+shopName+'的维修保养服务已取消';
            }
            var token = doc.accesstoken;

            var data= {

                "first": {
                    "value":first,
                    "color":"#173177"
                },
                "keyword1":{
                    "value":repairId,
                    "color":"#173177"
                },
                "keyword2": {
                    "value":repairer,
                    "color":"#173177"
                },
                "keyword3": {
                    "value":repairContent,
                    "color":"#173177"
                },
                "remark":{
                    "value": shopName +'竭诚为您服务',
                    "color":"#173177"
                }

            };
            sendTemplateMsg(token,openId,config.WENXIN_GZH.TEMPLATE_ID_REPAIR_STATE,'',data,callback)
        }

    });

}



/**
 * 推送到期提醒模版消息
 * @param openId
 * @param callback
 * @private
 */
var  _pushExpireTemplate = function (openId,name,expDate,callback) {
    WeixinScheme.findOne({},function (err,doc) {

        if(err){
            callback(err,err);
        }else {
            var token = doc.accesstoken;
            var data= {

                "first": {
                    "value":"您有快到期的维修保养",
                    "color":"#173177"
                },
                "name":{
                    "value":name,
                    "color":"#173177"
                },
                "expDate": {
                    "value":expDate,
                    "color":"#173177"
                },
                "remark":{
                    "value":"请及时联系门店",
                    "color":"#173177"
                }

            };
            sendTemplateMsg(token,openId,config.WENXIN_GZH.TEMPLATE_ID_REPAIR_EXPRIE,'',data,callback)
        }

    });

}


/**
 * 推送预约维修已被成功受理模版消息
 * @param openId
 * @param callback
 * @private
 */
var  _pushOrderReceivedTemplate = function (openId,orderId,confirmTime,orderTime,shopName,orderInfo,callback) {
    WeixinScheme.findOne({}, function (err, doc) {

        if (err) {
            callback(err, err);
        } else {
            var token = doc.accesstoken;
            var data = {

                "first": {
                    "value": "您的预约单" + orderId + "已于" + confirmTime + "确认,请准时到店!",
                    "color": "#173177"
                },
                "keyword1": {
                    "value": orderTime,
                    "color": "#173177"
                },
                "keyword2": {
                    "value": shopName,
                    "color": "#173177"
                },
                "keyword3": {
                    "value": orderInfo,
                    "color": "#173177"
                },
                "remark": {
                    "value": "感谢您使用预约服务!",
                    "color": "#173177"
                }

            };
            sendTemplateMsg(token, openId, config.WENXIN_GZH.TEMPLATE_ID_REPAIR_ORDER, '', data, callback)
        }

    });
}



//****************************************** private functions ************************************

/**
 * 发送模版消息
 * @param openId
 * @param template_id
 * @param url
 * @param data
 * @param callback
 */
var sendTemplateMsg = function (access_token,openId,template_id,url,data,callback) {
            var req =url.length == 0?
                {
                    'touser':openId,
                    'template_id':template_id,
                    'data':data
                }:
                {
                'touser':openId,
                'template_id':template_id,
                'url':url,
                'data':data
            };

            var strMenus = JSON.stringify(req);
            var data = "";
            var options = {
                host:'api.weixin.qq.com',
                port:443,
                path:'/cgi-bin/message/template/send?access_token='+access_token,
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
                    console.log(message);
                    callback(null,message);
                });

                req.on('error',function(e){
                    console.log(e);
                    callback(e,e);
                });
            })

            req.write(strMenus);
            req.end();

}

 
module.exports = new WXPusher();
