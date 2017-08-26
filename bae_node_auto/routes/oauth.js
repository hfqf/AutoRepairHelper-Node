/**
 * Created by points on 16/12/15.
 */
var express = require('express');
var router = express.Router();
var Setting = require('../utils/config');
var mongoose = require('mongoose');

var request = require('request');
var Repair = mongoose.model(Setting.ModelNameRepairHistory);
var Item = mongoose.model(Setting.ModelNameRepairItem);
var Contact = mongoose.model(Setting.ModelNameContact);
var User = mongoose.model(Setting.mongooseModelName);


/* 微信登陆 */
var AppID = Setting.WENXIN_GZH.APPID;
var AppSecret = Setting.WENXIN_GZH.APPSECRET;

router.get('/order', function(req,res, next){

    // 第一步：用户同意授权，获取code
    // 这是编码后的地址
    var return_uri = encodeURI('http://autorepairhelper.duapp.com/oauth/becomeorderview');
    var scope = 'snsapi_userinfo';

    res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppID+'&redirect_uri='+return_uri+'&response_type=code&scope='+scope+'&state=1#wechat_redirect');

});

router.get('/becomeorderview', function(req,res, next){
    //console.log("get_wx_access_token")
    //console.log("code_return: "+req.query.code)

    // 第二步：通过code换取网页授权access_token
    var code = req.query.code;
    request.get(
        {
            url:'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+AppID+'&secret='+AppSecret+'&code='+code+'&grant_type=authorization_code',
        },
        function(error, response, body){
            if(response.statusCode == 200){
                // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
                //console.log(JSON.parse(body));
                var data = JSON.parse(body);
                var access_token = data.access_token;
                var openid = data.openid;
                res.render('customerorder', { openid:openid ,layout: 'customerorder'});
            }else{
                res.send('操作异常');
            }
        }
    );
});



router.get('/query', function(req,res, next){

    // 这是编码后的地址
    var return_uri = encodeURI('http://autorepairhelper.duapp.com/oauth/becomequeryview');
    var scope = 'snsapi_userinfo';

    res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppID+'&redirect_uri='+return_uri+'&response_type=code&scope='+scope+'&state=1#wechat_redirect');

});

/**
 * 客户自己查询维修记录
 */
router.get('/becomequeryview',function (req, res, next) {
    var code = req.query.code;
    request.get(
        {
            url:'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+AppID+'&secret='+AppSecret+'&code='+code+'&grant_type=authorization_code',
        },
        function(error, response, body){
            if(response.statusCode == 200){

                // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
                console.log(JSON.parse(body));
                var data = JSON.parse(body);
                var openid = data.openid;


                Contact.findOne({weixinopenid:openid},function (err,doc1) {

                    if(err){
                        res.render('repairprint', { value:'查询失败!'  ,layout: 'repairprint'});
                    }else {
                        if(doc1 == null){
                           return res.render('repairprint', {value:'您还不是绑定客户,请先绑定'  ,layout: 'repairprint'});
                        }
                        console.log('ok1'+doc1);
                        Repair.find(
                            {$or:
                                [
                                    {
                                        contactid:'',
                                        carcode:doc1.carcode
                                    },
                                    {
                                        contactid:{$ne:''},
                                        contactid:doc1._id,
                                    }]
                            }
                            )

                            .sort({'_id':-1})
                            .populate('items')
                            .exec(function (err,ret) {
                                    if(err){
                                        console.log('ok3'+err);
                                        res.render('repairprint', {value:'查询错误!'  ,layout: 'repairprint'});
                                    }else {
                                        console.log('ok2'+ret);
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
                                            res.render('customerhistory', { value: insert,layout: 'customerhistory'});
                                        }else {
                                            res.render('customerhistory', { value:'暂无数据!'  ,layout: 'customerhistory'});
                                        }
                                    }
                                }
                            );
                    }



                });



            }else{
                console.log(response.statusCode);
            }
        }
    );











}),


module.exports = router;

