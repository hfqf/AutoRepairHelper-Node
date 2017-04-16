/**
 * Created by points on 16/11/19.
 */
var mongoose = require('mongoose');
var Setting = require('../utils/config.js');

var RepairItemSchema = new mongoose.Schema({
    repid:String,
    contactid:String,
    price:String,
    num:String,
    type:String,
    id:{type:String,default:'0'},
});

// mongoose.model(Setting.ModelNameContact,ContactSchema)
//特别注意 **** 这些modelname在创建数据库表时的名字会自动增加s,并且都是小写。
//下面的第三个参数设置表名
mongoose.model(Setting.ModelNameRepairItem,RepairItemSchema,Setting.ModelNameRepairItem);
