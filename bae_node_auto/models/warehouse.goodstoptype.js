/**
 * Created by points on 16/11/19.
 * 商品分类
 */
var mongoose = require('mongoose');
var Setting = require('../utils/config.js');

var GoodsTopType = new mongoose.Schema({
    name:{type:String,default:''},
    owner:{type:String,default:''},
    id:{type:String,default:''}
});

mongoose.model(Setting.ModelName.warehouse.goodstoptype,GoodsTopType, Setting.ModelName.warehouse.goodstoptype);



