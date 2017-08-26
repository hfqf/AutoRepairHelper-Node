/**
 * Created by points on 16/11/19.
 * 采购记录表,包括待入库，已入库，已撤销
 */
var mongoose = require('mongoose');
var Setting = require('../utils/config.js');

var WarehouseGoodsPurchaseRecord = new mongoose.Schema({
    state:{type:String,default:'0'},//0待采购，1待入库,2已入库,3已撤销
    updatetime:{type:String,default:''},//操作时间
    remark:{type:String,default:''},//本次入库备注
    dealer:[{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],//操作人
    purchase:[{ type: mongoose.Schema.Types.ObjectId, ref: 'WarehouseGoodsPurchase' }],
    owner:{type:String,default:''},
    id:{type:String,default:''}
});

mongoose.model(Setting.ModelName.warehouse.WarehouseGoodsPurchaseRecord,WarehouseGoodsPurchaseRecord, Setting.ModelName.warehouse.WarehouseGoodsPurchaseRecord);



