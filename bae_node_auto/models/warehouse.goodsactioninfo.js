/**
 * Created by points on 16/11/19.
 * 商品操作详情,哪个商品，什么数量
 */
var mongoose = require('mongoose');
var Setting = require('../utils/config.js');

var WarehouseGoodsActionInfo = new mongoose.Schema({
    num:{type:String,default:'0'},
    goods:[{ type: mongoose.Schema.Types.ObjectId, ref: 'warehousegood' }],
    owner:{type:String,default:''},
    id:{type:String,default:''}
});

mongoose.model(Setting.ModelName.warehouse.goodsactioninfo,WarehouseGoodsActionInfo, Setting.ModelName.warehouse.goodsactioninfo);



