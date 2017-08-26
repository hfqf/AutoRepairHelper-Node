/**
 * Created by points on 16/11/19.
 * 商品详情
 */
var mongoose = require('mongoose');
var Setting = require('../utils/config.js');

var WarehouseGoods = new mongoose.Schema({
    picurl:{type:String,default:''},
    name:{type:String,default:''},
    goodsencode:{type:String,default:''},
    category:[{ type: mongoose.Schema.Types.ObjectId, ref: 'goodssubtype' }],
    saleprice:{type:String,default:''},//出售价
    costprice:{type:String,default:''},//成本价
    productertype:{type:String,default:''},
    producteraddress:{type:String,default:''},
    barcode:{type:String,default:''},
    brand:{type:String,default:''},//品牌
    unit:{type:String,default:''},//单位
    minnum:{type:String,default:''},//库存最小预警值
    applycartype:{type:String,default:''},//适用车型
    remark:{type:String,default:''},//商品备注
    isactive:{type:String,default:''},//是否启用此商品
    owner:{type:String,default:''},
    id:{type:String,default:''}
});

mongoose.model(Setting.ModelName.warehouse.goods,WarehouseGoods, Setting.ModelName.warehouse.goods);



