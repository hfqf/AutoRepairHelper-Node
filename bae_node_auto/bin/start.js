#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../server.js');
var http = require('http');
var config = require('../utils/config');
var CronJob = require('cron').CronJob;
var JPush = require("jpush-sdk");
var client = JPush.buildClient(config.JPush.JPushAppKey, config.JPush.JPushMasterSecret);
var mongoose = require('mongoose');
var User = mongoose.model(config.mongooseModelName);
var Repair = mongoose.model(config.ModelNameRepairHistory);


/**
 * Get port from environment and store in Express.
 */
var port = config.port;

app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;

  var nowTime = new Date();
  console.error('Listening on ' + bind+nowTime);

  //开始定时器
  startPush();



}


/**
 * 根据用户获取未读数，再生成个性化推送提示语
 * @param user
 */
function pushNoti(user) {
    getUnreadCount(user,function (err,count) {
        if(err){
            console.log('getUnreadCount:error'+err);
            return;
        }
        var finalCount = 0;

        if(typeof count ==  'string'){
            finalCount =  parseInt(count);
        }else if(typeof count == 'number' ){
            finalCount = count;
        }else {
            console.log('undefined');
        }

        if(finalCount > 0){
            console.log(user);
            //防止老用户的过期提醒
            if(user.ostype == undefined){
                return;
            }
            if(user.ostype == 'ios' ) {
                client.push().setPlatform('ios')
                    .setOptions(null,null,null,config.JPush_IS_Production,null)
                    .setAudience(JPush.registration_id([user.pushid]))
                    .setNotification('今天您有'+count+'条到期维修记录,快去看看吧', JPush.ios('今天您有'+count+'条到期维修记录,快去看看吧', '今天您有'+count+'条到期维修记录,快去看看吧', count))
                    .send(function(err, res) {
                        if (err) {
                            console.log(err.message)
                        } else {
                            console.log('Sendno: ' + res.sendno)
                            console.log('Msg_id: ' + res.msg_id)
                        }
                    });
            }else {
                client.push().setPlatform('android')
                    .setAudience(JPush.registration_id([user.pushid]))
                    .setNotification('今天您有'+count+'条到期维修记录,快去看看吧', JPush.ios('今天您有'+count+'条到期维修记录,快去看看吧', '今天您有'+count+'条到期维修记录,快去看看吧', count))
                    .send(function(err, res) {
                        if (err) {
                            console.log(err.message)
                        } else {
                            console.log('Sendno: ' + res.sendno)
                            console.log('Msg_id: ' + res.msg_id)
                        }
                    });
            }
        }
    });



};

function startPush () {

    //类似闹钟,每天早晨定时推送维修到期提醒
    var job = new CronJob({
        cronTime: config.pushTime,
        onTick: function() {


                User.find({},function (err,docs) {

                    if(err){

                    }
                    else {
                        for(var i = 0 ;i<docs.length;i++){
                            var user = docs[i];
                           pushNoti(user);
                        }
                    }
                });
        },
        start: true,
        timeZone: 'Asia/Shanghai'
    });


}

/**
 * 获取当前用户的维修到期记录数量
 * @param user
 */
function getUnreadCount(user,callback) {
    var now = new Date().Format("yyyy-MM-dd");
    Repair.find({
        owner:user.tel,
        isclose : '0',
        tipcircle:{'$lte':now}
    },function (err,doc) {

        console.log('getUnreadCount:count'+doc.length);
        console.log('getUnreadCount:doc'+doc.toString());
        if(err){
            return callback(err,0);
        }else {
            return callback(null,doc.length);
        }
    })

}

/**
 * 测试
 */
function pushTest(callback) {
    User.find({},function (err,docs) {

        if(err){
            callback(err,docs);
        }
        else {
            callback(null,docs);
            for(var i = 0 ;i<docs.length;i++){
                var user = docs[i];
                pushNoti(user);
            }
        }
    });
}


exports.pushTest = pushTest;