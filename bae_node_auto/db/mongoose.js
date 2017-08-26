/**
 * Created by points on 16/11/15.
 */
var mongoose = require('mongoose');
var config = require('../utils/config.js');

module.exports=function () {
    mongoose.Promise = global.Promise;
    var db = mongoose.connect(config.mongodb);
    require('../models/user.server.model.js');
    require('../models/model.contact');
    require('../models/model.repair');
    require('../models/model.noticeboard');
    require('../models/model.update');
    require('../models/model.repair.item');
    require('../models/model.weixin.accesstoken');
    require('../models/model.contact.order');

    require('../models/warehouse.goods');
    require('../models/warehouse.goodsactioninfo');
    require('../models/warehouse.goodsinoutrecord');
    require('../models/warehouse.goodspurchase');
    require('../models/warehouse.goodspurchaserecord');
    require('../models/warehouse.goodsstore');
    require('../models/warehouse.goodsstore');
    require('../models/warehouse.goodstoptype');
    require('../models/warehouse.supplier');
    require('../models/warehouse.warehouse');
    require('../models/warehouse.warehouseposition');

    return db;
};