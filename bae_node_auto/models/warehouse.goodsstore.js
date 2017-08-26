/**
 * Created by points on 16/11/19.
 * 商品库存
 */

var mongoose = require('mongoose');
var Setting = require('../utils/config.js');

var WarehouseGoodsStore = new mongoose.Schema({
    goodsid:[{ type: mongoose.Schema.Types.ObjectId, ref: 'goods' }],
    supplier:[{ type: mongoose.Schema.Types.ObjectId, ref: 'supplier' }],
    num:{type:String,default:'0'},//此商品在库存中的数量，如果是待采购就是要减去需要的数量
    warehouseposition:[{ type: mongoose.Schema.Types.ObjectId, ref: 'supplier' }],//仓库库位
    owner:{type:String,default:''},
    id:{type:String,default:''}
});

mongoose.model(Setting.ModelName.goodsstore,WarehouseGoodsStore, Setting.ModelName.warehouse.goodsstore);



