/**
 * Created by points on 2017/2/3.
 */

if(process.env.BAE_ENV_APPID == undefined){
    process.env.BAE_ENV_APPID = 'appid2dbxqc7f2a';
    process.env.BAE_ENV_LOG_HOST = '123.125.112.229';
    process.env.BAE_ENV_LOG_PORT = '18080';
}else {

}

var log4js = require('log4js');
log4js.loadAppender('baev3-log');

var config = require('./config');
var options = {
    'user': config.Baidu.ak,
    'passwd': config.Baidu.sk
}

log4js.addAppender(log4js.appenders['baev3-log'](options));
var logger = log4js.getLogger('node-log-sdk');
logger.setLevel('TRACE');


function log (msg) {
    logger.trace(msg);
}

function  errBae (msg) {
    logger.error(msg);
}

exports.log = log;

exports.errBae = errBae;