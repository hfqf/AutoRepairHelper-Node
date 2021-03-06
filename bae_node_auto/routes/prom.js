/**
 * Created by points on 16/12/15.
 */
var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

router.get('/',function (req,res,next) {

    async.parallel({
        one: function (done) {
            //处理逻辑
            done(null, 'one');
        },
        two: function (done) {
            //处理逻辑
            done(null, 'tow');
        },
        three: function (done) {
            //处理逻辑
            done(null, 'three');
        },
        four: function (done) {
            //处理逻辑
            done(null, 'four');
        }
    }, function (error, result) {
        global.log4bae('one:', result.one);
        global.log4bae('two:', result.two);
        global.log4bae('three:', result.three);
        global.log4bae('four:', result.four);
        console.timeEnd('parallel');
    })

});


module.exports = router;

