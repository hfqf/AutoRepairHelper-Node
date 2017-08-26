/**
 * Created by points on 16/11/19.
 */
var mongoose = require('mongoose');
var Setting = require('../utils/config.js');

var RepairSchema = new mongoose.Schema({
    id:String,
    carcode:{type:String,default:''},
    totalkm:{type:String,default:''},
    repairetime:{type:String,default:''},
    repairtype:{type:String,default:''},
    addition:{type:String,default:''},
    tipcircle:{type:String,default:''},
    isclose:{type:String,default:'0'},
    circle:{type:String,default:''},
    isreaded:{type:String,default:'0'},
    owner:{type:String,default:''},
    inserttime:{type:String,default:Date.now},
    items:[{ type: mongoose.Schema.Types.ObjectId, ref: 'repairitem' }],
    entershoptime:{type:String,default:''},
    state:{type:String,default:'0'},//维修状态:0维修中 1待结账 2已完成 3已取消
    wantedcompletedtime:{type:String,default:''},//预计提车时间
    customremark:{type:String,default:''},//客户留言备注
    iswatiinginshop:{type:String,default:'0'},//是否一直在店等待
    contactid:{type:String,default:''},//是否一直在店等待
});


// mongoose.model(Setting.ModelNameContact,ContactSchema)
//特别注意 **** 这些modelname在创建数据库表时的名字会自动增加s,并且都是小写。
//下面的第三个参数设置表名
mongoose.model(Setting.ModelNameRepairHistory,RepairSchema,Setting.ModelNameRepairHistory);
