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
    return db;
};