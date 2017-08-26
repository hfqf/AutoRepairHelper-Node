/**
 * Created by points on 16/11/19.
 * 供应商表。可以是真正的供应商，也可以是自己直接购买。
 */
var mongoose = require('mongoose');
var Setting = require('../utils/config.js');

var Supplier = new mongoose.Schema({
    supplierCompanyName:{type:String,default:''},
    managerName:{type:String,default:''},
    tel:{type:String,default:''},
    address:{type:String,default:''},
    remark:{type:String,default:''},
    owner:{type:String,default:''},
    id:{type:String,default:''}
});

mongoose.model(Setting.ModelName.warehouse.supplier,Supplier, Setting.ModelName.warehouse.supplier);



