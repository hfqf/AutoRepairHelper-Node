/**
 * Created by points on 16/11/19.
 */
var mongoose = require('mongoose');
var Setting = require('../utils/config.js');

var RepairSchema = new mongoose.Schema({
    carcode:String,
    totalkm:String,
    repairetime:String,
    addition:String,
    tipcircle:String,
    isclose:String,
    circle:String,
    repairtype:String,
    onwer:String,
});

mongoose.model(Setting.ModelNameRepairHistory,RepairSchema);
