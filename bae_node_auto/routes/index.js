var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
   if(req.query.signature == undefined){
       res.render('index', { title: '汽车修理小助手',layout:'layout' });
   }else {
       log4bae(req.toString());
       validateToken(req,res);
   }
});

router.post('/', function(req, res, next) {
    if(req.query.signature == undefined){
        res.send('1');
    }else {

        // 微信输入信息都在req.weixin上
        var message = req.body;
        global.logError4bae('weixinpost1'+message);

        if (message.FromUserName === 'diaosi') {
            // 回复屌丝(普通回复)
            res.reply('hehe');
        } else if (message.FromUserName === 'text') {
            //你也可以这样回复text类型的信息
            res.reply({
                content: 'text object',
                type: 'text'
            });
        } else if (message.FromUserName === 'hehe') {
            // 回复一段音乐
            res.reply({
                type: "music",
                content: {
                    title: "来段音乐吧",
                    description: "一无所有",
                    musicUrl: "http://mp3.com/xx.mp3",
                    hqMusicUrl: "http://mp3.com/xx.mp3",
                    thumbMediaId: "thisThumbMediaId"
                }
            });
        } else {
            // 回复高富帅(图文回复)
            res.reply([
                {
                    title: '你来我家接我吧',
                    description: '这是女神与高富帅之间的对话',
                    picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                    url: 'http://nodeapi.cloudfoundry.com/'
                }
            ]);
        }
    }
});



module.exports = router;
