/**
 * Created by points on 16/11/19.
 * 仓库的库位表
 */


var mongoose = require('mongoose');
var Setting = require('../utils/config.js');

var WareHousePosition = new mongoose.Schema({
    name:{type:String,default:''},
    desc:{type:String,default:''},
    warehouseid:{type:String,default:''},
    id:{type:String,default:''}

});

mongoose.model(Setting.ModelName.warehouse.warehouseposition,WareHousePosition, Setting.ModelName.warehouse.warehouseposition);



