/**
 * Created by points on 16/11/19.
 * 采购表，包括待采购，待入库，已入库，已撤销
 */
var mongoose = require('mongoose');
var Setting = require('../utils/config.js');

var WarehouseGoodsPurchase = new mongoose.Schema({
    state:{type:String,default:'0'},//0待采购，1待入库,2已入库,3已撤销
    storeposition:{type:String,default:''},//存储的库位
    paytype:{type:String,default:''},//商品支付方式,0现金，1银行卡,2挂帐,3微信,4支付宝,5其它,6支票,7转账
    expresscostpaytype:{type:String,default:''},//运费支付方式,0现金，1银行卡,2挂帐,3微信,4支付宝,5其它,6支票,7转账
    expresscompany:{type:String,default:''},//物流公司
    expressserialid:{type:String,default:''},//物流单号
    expresscost:{type:String,default:''},//物流运费
    supplier:[{ type: mongoose.Schema.Types.ObjectId, ref: 'supplier' }],//供应商
    remark:{type:String,default:''},//备注
    goods:[{ type: mongoose.Schema.Types.ObjectId, ref: 'goodsactioninfo' }],
    owner:{type:String,default:''},
    id:{type:String,default:''}

});

mongoose.model(Setting.ModelName.warehouse.WarehouseGoodsPurchase,WarehouseGoodsPurchase, Setting.ModelName.warehouse.WarehouseGoodsPurchase);



