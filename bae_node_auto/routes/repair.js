/**
 * Created by points on 16/11/19.
 */

//用来上传老版本本地数据的数据到服务器上

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Repair = mongoose.model(global.config.ModelNameRepairHistory);
var Item = mongoose.model(global.config.ModelNameRepairItem);
var Contact = mongoose.model(global.config.ModelNameContact);
var WXPusher = require('../weixin/pushtowxuser');
var User = mongoose.model(global.config.mongooseModelName);

        /**
         * 增加记录2.0
         */
        router.post('/add2',function (req, res, next) {
            global.log4bae('repair/add2'+JSON.stringify(req.body));
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
                inserttime:req.body.inserttime == undefined ? new Date().Format('yyyy-MM-dd hh:mm:ss') : req.body.inserttime,
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
             * 增加记录3.0
             */
            router.post('/add3',function (req, res, next) {
                global.log4bae('repair/add2'+JSON.stringify(req.body));
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
                    inserttime:new Date().Format('yyyy-MM-dd hh:mm:ss'),
                    items:req.body.items
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
            global.log4bae('repair/del'+JSON.stringify(req.body));
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
            global.log4bae('repair/delAll'+JSON.stringify(req.body));
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
            global.log4bae('repair/update'+JSON.stringify(req.body));
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
                isreaded:req.body.isreaded == undefined ? '0' : req.body.isreaded,
            }};
            var options    = {upsert : false};
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
             *更新记录
             **/
            router.post('/update3',function (req, res, next) {
                global.log4bae('repair/update'+JSON.stringify(req.body));
                var conditions = {_id : req.body.id,owner:req.body.owner,};
                var update     = {$set : {
                    carcode:req.body.carcode,
                    totalkm:req.body.totalkm,
                    repairetime:req.body.repairetime,
                    repairtype:req.body.repairtype,
                    addition:req.body.addition,
                    tipcircle:req.body.tipcircle == undefined ? '':req.body.tipcircle,
                    isclose:req.body.isclose,
                    circle:req.body.circle,
                    isreaded:req.body.isreaded == undefined ? '0' : req.body.isreaded,
                    items:req.body.items,
                }};
                var options    = {upsert : false};
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
         * 查询某个用户的所有记录
         **/
        router.post('/queryOneAll',function (req, res, next) {
            global.log4bae('repair/queryAll'+JSON.stringify(req.body));
            var conditions = {owner:req.body.owner,carcode:req.body.carcode};
            Repair.find(conditions).populate('items').exec(function (err,ret) {
                if(err){
                    return res.send(global.retFormate(0,err,'查询数据失败'));
                }
                else {
                    return res.send(global.retFormate(1,ret,'查询数据成功'));
                }
            });

        }),

            /**
             * 查询所有记录
             **/
            router.post('/queryAll',function (req, res, next) {
                global.log4bae('repair/queryAll'+JSON.stringify(req.body));
                var conditions = {owner:req.body.owner};
                Repair.find(conditions).populate('items').exec(function (err,ret) {
                    if(err){
                        return res.send(global.retFormate(0,err,'查询数据失败'));
                    }
                    else {
                        return res.send(global.retFormate(1,ret,'查询数据成功'));
                    }
                });

            }),

            /**
             * 查询所有记录
             **/
            router.post('/queryAllTiped',function (req, res, next) {
                global.log4bae('repair/queryAllTiped'+JSON.stringify(req.body));
                var now = new Date().Format("yyyy-MM-dd");
                var conditions = {owner:req.body.owner,
                                    isclose : '0',
                                    tipcircle:{'$lte':now}};

                Repair.find(conditions).
                        sort({'_id':-1}).
                        populate('items').
                        exec(function (err,ret) {
                        if(err){
                            return res.send(global.retFormate(0,err,'查询数据失败'));
                        }
                        else {
                            return res.send(global.retFormate(1,ret,'查询数据成功'));
                        }
                });

            }),


        /**
         * 打印统计
         */
        router.get('/print',function (req, res, next) {
            global.log4bae('repair/print'+JSON.stringify(req.query));
            var caocode =  req.query.carcode;
            var conditions = caocode.length == 0 ?
                {
                    owner:req.query.owner,
                    inserttime:{'$gte':req.query.start,'$lte':req.query.end}
                }:
                {
                    owner:req.query.owner,
                    carcode:req.query.carcode,
                    inserttime:{'$gte':req.query.start,'$lte':req.query.end}
                };

            /*
            var now = new Date().Format("yyyy-MM-dd");
            Repair.find({
                owner:user.tel,
                isclose : '0',
                tipcircle:{'$lte':now}
                */


            Repair.find(conditions).sort({'_id':-1}).populate('items').exec(function (err,ret) {
                if(err){
                    res.render('repairprint', {value:'暂无数据!'  ,layout: 'repairprint'});
                }else {
                    if(ret){
                        var  insert = '';
                        for( var  i = 0;i<ret.length;i++){
                            var info = ret[i];
                            if(info == undefined)
                            {
                                continue;
                            }
                            var arrItems = info.items;
                            var showItems = '';
                            var index = i+1;
                            var total = 0;

                            if(arrItems == null || arrItems == undefined){//无收费项目
                                showItems='暂无';
                            }else
                            {
                                if(arrItems.length == 0) {
                                    showItems='暂无';

                                }else{
                                    for(  var j = 0;j<arrItems.length;j++) {
                                        var itemInfo = arrItems[j];
                                        showItems+='收费项目:'+itemInfo.type+'&nbsp;&nbsp;   总价:'+itemInfo.price+'x'+itemInfo.num+'='+itemInfo.price*itemInfo.num+'<br>';
                                        total +=itemInfo.price*itemInfo.num;
                                    }
                                }
                            }

                            var more = '';
                            if(info.addition == null || info.addition == undefined || info.addition == ''){//无收费项目
                                more='暂无';
                            }else
                            {
                                more = info.addition;
                            }

                             insert +='<tr>' +
                                         '<td>'+index+'</td>'+
                                         '<td>'+info.carcode+'</td>'+
                                         '<td>'+info.inserttime+'</td>'+
                                         '<td>'+info.tipcircle+'</td>'+
                                         '<td>'+total+'</td>'+
                                         '<td>'+showItems+'</td>'+
                                         '<td>'+info.totalkm+'km'+'</td>'+
                                         '<td>'+info.repairtype+'</td>'+
                                         '<td>'+more+'</td>' +
                                      '</tr>';
                        }
                        res.render('repairprint', { value: insert,layout: 'repairprint'});
                    }else {
                        res.render('repairprint', { value:'暂无数据!'  ,layout: 'repairprint'});
                    }
                }
                }
              );
        }),


            /**
             * 获取今天的进账金额和维修次数
             */
            router.post('/getTodayBills',function (req,res,next) {

                global.logError4bae('repair/getTodayBills');

                var start = req.body.day+' 00:00:01';
                var end   = req.body.day+' 23:59:59';
                Repair.find({
                                owner:req.body.owner,
                                inserttime:{'$gte':start,'$lte':end}
                            })
                            .sort({'_id':-1})
                            .populate('items')
                            .exec(function (err,ret){
                    if (err) {
                        return res.send(global.retFormate(0, err, '获取失败'));
                    } else {

                        var totalPrice = 0;
                        var totalRepCount = 0;
                        if(ret == null) {

                        }else{
                            totalRepCount =  ret.length;
                            for( var  i = 0;i<ret.length;i++) {
                                var info = ret[i];
                                if (info == undefined) {
                                    continue;
                                }
                                var arrItems = info.items;

                                if (arrItems == null || arrItems == undefined) {

                                } else {
                                    if (arrItems.length == 0) {

                                    }
                                    else {
                                        for (var j = 0; j < arrItems.length; j++) {
                                            var itemInfo = arrItems[j];
                                            totalPrice += itemInfo.price * itemInfo.num;
                                        }
                                    }
                                }
                            }
                        }

                        return res.send(global.retFormate(1, {'totalprice':totalPrice,'totalRepCount':totalRepCount}, '获取成功'));
                    }
                });

            });


/**
 * 增加记录3.2
 */
router.post('/add4',function (req, res, next) {
    global.log4bae('repair/add4'+JSON.stringify(req.body));
    var newRepair = new  Repair({
        id:req.body.id,
        carcode:req.body.carcode,
        totalkm:req.body.totalkm,
        repairetime:req.body.repairetime,
        repairtype:req.body.repairtype,
        addition:req.body.addition,
        tipcircle:req.body.tipcircle == undefined ? '0' : req.body.tipcircle,
        isclose:req.body.isclose,
        circle:req.body.circle,
        isreaded:req.body.isreaded == undefined ? '0' : req.body.isreaded,
        owner:req.body.owner == undefined ? '' : req.body.owner,
        inserttime:new Date().Format('yyyy-MM-dd hh:mm:ss'),
        items:req.body.items,
        contactid:req.body.contactid,
        wantedcompletedtime:req.body.wantedcompletedtime,
        customremark:req.body.customremark,
        iswatiinginshop:req.body.iswatiinginshop,
        entershoptime:req.body.entershoptime
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
     *更新记录
     **/
    router.post('/update4',function (req, res, next) {
        global.log4bae('repair/update'+JSON.stringify(req.body));
        var conditions = {_id : req.body.id,owner:req.body.owner,};
        var update     = {$set : {
            contactid:req.body.contactid,
            carcode:req.body.carcode,
            totalkm:req.body.totalkm,
            repairetime:req.body.repairetime,
            repairtype:req.body.repairtype,
            addition:req.body.addition,
            tipcircle:req.body.tipcircle == undefined ? '':req.body.tipcircle,
            isclose:req.body.isclose,
            circle:req.body.circle,
            isreaded:req.body.isreaded == undefined ? '0' : req.body.isreaded,
            items:req.body.items,
            state:req.body.state,
            wantedcompletedtime:req.body.wantedcompletedtime == undefined ?'':req.body.wantedcompletedtime,
            customremark:req.body.customremark == undefined?'':req.body.customremark,
            iswatiinginshop:req.body.iswatiinginshop == undefined?'0':req.body.iswatiinginshop,
            entershoptime:req.body.entershoptime == undefined ?'':req.body.entershoptime
        }};
        var options    = {upsert : false};
        Repair.findOne(conditions,function (err,doc1) {
            if(err){

            }else {

                var oldState =  doc1.state;
                Repair.update(conditions,update,options,function (err,ret) {
                    if(err){
                        return res.send(global.retFormate(0,err,'修改数据失败'));
                    }
                    else {
                         //开单后第一次在state为0时update ，或及其他状态修改(不为0)
                            var  isUpdateForState0First =  oldState == 0 && req.body.state == oldState && req.body.repairtype.length >0;
                            var  isUpdateExcepteState0 =  req.body.state != 0 && req.body.repairtype.length >0;
                        if(isUpdateForState0First || isUpdateExcepteState0){
                            //查询当前用户是否已经绑定，发送微信提醒


                            Contact.findOne(  {$or: [
                                    {_id:req.body.contactid,owner:req.body.owner},
                                    {carcode:req.body.carcode,owner:req.body.owner}]
                            },function (err,ret) {
                                if(err){

                                }else {
                                    if(ret != null){
                                        if(ret.isbindweixin == '1'){
                                            // (openId,tel,repairId,repairer,repairContent,carCode,state,shopName,callback) {
                                            //查找相关门店信息
                                            User.findOne({tel:ret.owner},function (err,ret1) {

                                                if(err){

                                                }else {
                                                    WXPusher.pushRepairSateTemplate(ret.weixinopenid,ret.tel,ret._id,ret1.username,
                                                        req.body.repairtype,req.body.carcode,req.body.state,ret1.shopname,function (err,ret2) {

                                                        });

                                                }

                                            })


                                        }
                                    }

                                }

                            });
                        }

                        return res.send(global.retFormate(1,'修改成功','修改数据成功'));
                    }
                });

            }

        });


    }),


    /**
     * 查询某种状态的所有记录
     **/
    router.post('/queryAllWithState',function (req, res, next) {
        global.log4bae('repair/queryAllWithState'+JSON.stringify(req.body));
        var page =  req.body.page == undefined ? 0 :parseInt(req.body.page);
        var pagesize =  req.body.pagesize == undefined ? 20 :parseInt(req.body.pagesize);
        var conditions =  req.body.contactid == undefined ?
                        {owner:req.body.owner,
                          state:req.body.state,
                        }:
                 /*
                  *为了兼容老版本的数据,除了contactid，其它字段都可以默认为空,导致老版本的数据升级后contactid没有，所以搜素时需要带入contactid和carcode
                  *
                  */
                          {$or:[
                              {owner:req.body.owner,
                               state:req.body.state,
                               contactid:req.body.contactid,},
                              {owner:req.body.owner,
                                  state:req.body.state,
                                  carcode:req.body.carcode,}
                            ]};
        Repair.find(conditions).sort({'_id':-1}).populate('items').limit(pagesize).skip(pagesize*page).exec(function (err,ret) {
            if(err){
                return res.send(global.retFormate(0,err,'查询数据失败'));
            }
            else {
                var arrNew = new  Array();
                for(var i=0;i<ret.length;i++){
                    var rep = ret[i];
                    if(rep.entershoptime.length == 0){
                        rep.entershoptime = rep.inserttime;
                    }
                    arrNew.push(rep);
                }
                return res.send(global.retFormate(1,arrNew,'查询数据成功'));
            }
        });

    }),

    /**
     * 取消工单
     **/
    router.post('/cancel',function (req, res, next) {
        global.log4bae('repair/cancel'+JSON.stringify(req.body));
        var conditions = {owner:req.body.owner,
                        _id : req.body.id
                        };
        var update     = {$set : {
                state:'3'
            }};
        var options    = {upsert : false};
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
     * 恢复工单
     **/
    router.post('/revert',function (req, res, next) {
        global.log4bae('repair/revert'+JSON.stringify(req.body));
        var conditions = {owner:req.body.owner,
            _id : req.body.id
        };
        var update     = {$set : {
            state:'0'
        }};
        var options    = {upsert : false};
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
     * 修改工单状态
     **/
    router.post('/updateState',function (req, res, next) {
        global.log4bae('repair/updateState'+JSON.stringify(req.body));
        var conditions = {owner:req.body.owner,
            _id : req.body.id
        };
        var update     = {$set : {
            state:req.body.state
        }};
        var options    = {upsert : false};
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
     * 删除当个客户的所有维修记录
     * */
    router.post('/delAll3',function (req, res, next) {
        global.log4bae('repair/delAll3'+JSON.stringify(req.body));
        Repair.remove({$or:[
                            {carcode:req.body.carcode,owner:req.body.owner},
                            {contactid:req.body.contactid,owner:req.body.owner}]
    },function (err,ret) {
            if(err){
                return res.send(global.retFormate(0,err,'删除数据失败'));
            }
            else {
                return res.send(global.retFormate(1,'删除成功','删除成功'));
            }
        });

    }),

    /**
     * 查询某个用户的所有记录
     **/
    router.post('/queryOneAll3',function (req, res, next) {
        global.log4bae('repair/queryOneAll3'+JSON.stringify(req.body));
        var conditions = {$or:[
            {carcode:req.body.carcode,owner:req.body.owner},
            {contactid:req.body.contactid,owner:req.body.owner}]
        }
        Repair.find(conditions).sort({'_id':-1}).populate('items').exec(function (err,ret) {
            if(err){
                return res.send(global.retFormate(0,err,'查询数据失败'));
            }
            else {
                var arrNew = new  Array();
                for(var i=0;i<ret.length;i++){
                    var rep = ret[i];
                    if(rep.entershoptime.length == 0){
                        rep.entershoptime = rep.inserttime;
                    }
                    arrNew.push(rep);
                }
                return res.send(global.retFormate(1,arrNew,'查询数据成功'));
            }
        });

    }),


    /**
     * 查询所有记录3.2
     **/
    router.post('/queryAllTiped1',function (req, res, next) {
        global.log4bae('repair/queryAllTiped1'+JSON.stringify(req.body));
        var now = new Date().Format("yyyy-MM-dd");
        var conditions = {owner:req.body.owner,
            isclose : '0',
            tipcircle:{'$lte':now}};

        Repair.find(conditions).
        sort({'_id':-1}).
        populate('items').
        exec(function (err,ret) {
            if(err){
                return res.send(global.retFormate(0,err,'查询数据失败'));
            }
            else {
                return res.send(global.retFormate(1,ret,'查询数据成功'));
            }
        });

    }),




    module.exports = router;