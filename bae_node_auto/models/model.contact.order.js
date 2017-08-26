/**
 * Created by points on 16/11/19.
 */
var mongoose = require('mongoose');
var Setting = require('../utils/config.js');

var ContactOrderSchema = new mongoose.Schema({
    openid:String,
    time:String,
    info:String,
    state:{type:String,default:'0'},//0处理中 1已接受
    confirmtime:{type:String,default:''},
    owner:{type:String,default:''},
    inserttime:{type:String,default:Date.now()},
});

mongoose.model(Setting.ModelNameContactOrder,ContactOrderSchema,Setting.ModelNameContactOrder);
