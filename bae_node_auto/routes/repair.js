/**
 * Created by points on 16/11/19.
 */

//用来上传老版本本地数据的数据到服务器上

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Repair = mongoose.model(global.config.ModelNameRepairHistory);


    /**
     * 增加记录
     */
    router.post('/add',function (req, res, next) {

        var newRepair = new  Repair({
            id:req.body.id,
            carcode:req.body.carcode,
            totalkm:req.body.totalkm,
            repairetime:req.body.repairetime,
            addition:req.body.addition,
            tipcircle:req.body.tipcircle,
            isclose:req.body.isclose,
            circle:req.body.circle,
            repairtype:req.body.repairtype,
            owner:req.body.owner,
        });

        newRepair.save(function (err,doc) {
            if(err){
                return res.send(global.retFormate(0,err,'存入数据失败'));
            }
            else {
                return res.send(global.retFormate(1,doc,'存入数据成功'));
            }
        });

}),


        /**
         * 增加记录2.0
         */
        router.post('/add2',function (req, res, next) {
            var newRepair = new  Repair({
                id:req.body.id,
                carcode:req.body.carcode,
                totalkm:req.body.totalkm,
                repairetime:req.body.repairetime,
                repairtype:req.body.repairtype,
                addition:req.body.addition,
                tipcircle:req.body.tipcircle,
                isclose:req.body.isclose,
                circle:req.body.circle,
                isreaded:req.body.isreaded == undefined ? '0' : req.body.isreaded,
                owner:req.body.owner == undefined ? '' : req.body.owner,
                inserttime:req.body.inserttime == undefined ? new Date().Format('yyyy-MM-dd hh:mm:ss') : req.body.inserttime
            });

            newRepair.save(function (err,doc) {
                if(err){
                    return res.send(global.retFormate(0,err,'存入数据失败'));
                }
                else {
                    return res.send(global.retFormate(1,doc,'存入数据成功'));
                }
            });

        }),



        /**
         * 删除某条记录
         * */
        router.post('/del',function (req, res, next) {
            Repair.remove({_id:req.body.id,owner:req.body.owner,},function (err,ret) {
                if(err){
                    return res.send(global.retFormate(0,err,'存入数据失败'));
                }
                else {
                    return res.send(global.retFormate(1,'保存成功','存入数据成功'));
                }
            });

        }),

        /**
         * 删除当前用户的所有维修记录
         * */
        router.post('/delAll',function (req, res, next) {
            Repair.remove({carcode:req.body.carcode,owner:req.body.owner},function (err,ret) {
                if(err){
                    return res.send(global.retFormate(0,err,'保存数据失败'));
                }
                else {
                    return res.send(global.retFormate(1,'保存成功','存入数据成功'));
                }
            });

        }),


        /**
         *更新记录
         **/
        router.post('/update',function (req, res, next) {
            var conditions = {_id : req.body.id,owner:req.body.owner,};
            var update     = {$set : {
                carcode:req.body.carcode,
                totalkm:req.body.totalkm,
                repairetime:req.body.repairetime,
                repairtype:req.body.repairtype,
                addition:req.body.addition,
                tipcircle:req.body.tipcircle,
                isclose:req.body.isclose,
                circle:req.body.circle,
                isreaded:req.body.isreaded == undefined ? '0' : req.body.isreaded
            }};
            var options    = {upsert : true};
            Repair.update(conditions,update,options,function (err,ret) {
                if(err){
                    return res.send(global.retFormate(0,err,'修改数据失败'));
                }
                else {
                    return res.send(global.retFormate(1,'修改成功','修改数据成功'));
                }
            });

        }),


        /**
         * 查询所有记录
         **/
        router.post('/queryAll',function (req, res, next) {
            var conditions = {owner:req.body.owner};
            Repair.find(conditions,function (err,ret) {
                if(err){
                    return res.send(global.retFormate(0,err,'查询数据失败'));
                }
                else {
                    return res.send(global.retFormate(1,ret,'查询数据成功'));
                }
            });

        }),
        module.exports = router;