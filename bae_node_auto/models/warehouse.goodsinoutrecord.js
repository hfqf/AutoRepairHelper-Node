/**
 * Created by points on 16/11/19.
 * 商品进出详情记录表
 */
var mongoose = require('mongoose');
var Setting = require('../utils/config.js');

var WarehouseInoutRecord = new mongoose.Schema({
    state:{type:String,default:'0'},//0全部,1其它入库,2采购入库,3盘盈入库,4调拨入库,5顾客退货,6退料入库,7领料出库,8其他出库,9盘亏出库,10采购退货
    //11调拨出库，12移库入库,13移库出库
    repairid:[{ type: mongoose.Schema.Types.ObjectId, ref: 'repairhistory' }],//正常流程是开单形成的采购，此时需要存入工单记录ID
    paytype:{type:String,default:''},//支付方式,0现金，1银行卡,2挂帐,3微信,4支付宝,5其它,6支票,7转账
    supplier:[{ type: mongoose.Schema.Types.ObjectId, ref: 'supplier' }],//供应商
    updatetime:{type:String,default:''},//操作时间
    dealer:[{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],//操作人
    remark:{type:String,default:''},//备注
    goods:[{ type: mongoose.Schema.Types.ObjectId, ref: 'WarehouseGoodsPurchase' }],
    owner:{type:String,default:''},
    id:{type:String,default:''}

});

mongoose.model(Setting.ModelName.warehouse.goodsinandoutrecord,WarehouseInoutRecord, Setting.ModelName.warehouse.goodsinandoutrecord);



