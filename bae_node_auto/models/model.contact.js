/**
 * Created by points on 16/11/19.
 */
var mongoose = require('mongoose');
var Setting = require('../utils/config.js');

var ContactSchema = new mongoose.Schema({
    carcode:String,
    name:String,
    tel:String,
    cartype:String,
    owner:String,
    id:String,

    inserttime:{type:String,default:Date.now},
    isbindweixin:{type:String,default:'0'},//是否已经绑定微信
    weixinopenid:{type:String,default:''},//绑定的微信openid
    vin:{type:String,default:''},//车架号
    carregistertime:{type:String,default:''},//注册时间,推算出年审时间
    headurl:{type:String,default:''},//头像
});

// mongoose.model(Setting.ModelNameContact,ContactSchema)
//特别注意 **** 这些modelname在创建数据库表时的名字会自动增加s,并且都是小写。
//下面的第三个参数设置表名
mongoose.model(Setting.ModelNameContact,ContactSchema,Setting.ModelNameContact);



