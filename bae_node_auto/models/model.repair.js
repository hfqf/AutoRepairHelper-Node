/**
 * Created by points on 16/11/19.
 */
var mongoose = require('mongoose');
var Setting = require('../utils/config.js');

var RepairSchema = new mongoose.Schema({
    id:String,
    carcode:String,
    totalkm:String,
    repairetime:String,
    repairtype:String,
    addition:String,
    tipcircle:String,
    isclose:String,
    circle:String,
    isreaded:String,
    owner:String,
    inserttime:String,
    items:[{ type: mongoose.Schema.Types.ObjectId, ref: 'repairitem' }]
});

// mongoose.model(Setting.ModelNameContact,ContactSchema)
//特别注意 **** 这些modelname在创建数据库表时的名字会自动增加s,并且都是小写。
//下面的第三个参数设置表名
mongoose.model(Setting.ModelNameRepairHistory,RepairSchema,Setting.ModelNameRepairHistory);
