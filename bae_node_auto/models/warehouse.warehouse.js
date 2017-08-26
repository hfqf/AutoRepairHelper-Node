/**
 * Created by points on 16/11/19.
 * 仓库表
 */
var mongoose = require('mongoose');
var Setting = require('../utils/config.js');

var WareHouse = new mongoose.Schema({
    name:{type:String,default:''},
    desc:{type:String,default:''},
    owner:{type:String,default:''},
    id:{type:String,default:''}

});

mongoose.model(Setting.ModelName.warehouse.warehouse,WareHouse, Setting.ModelName.warehouse.warehouse);



