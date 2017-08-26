/**
 * Created by points on 16/11/19.
 * * 商品分类的子分类
 */
var mongoose = require('mongoose');
var Setting = require('../utils/config.js');

var GoodsSubType = new mongoose.Schema({
    name:{type:String,default:''},
    toptypeid:{type:String,default:''},
    id:{type:String,default:''}
});

mongoose.model(Setting.ModelName.warehouse.goodssubtype,GoodsSubType, Setting.ModelName.warehouse.goodssubtype);



