/**
 * Created by points on 16/11/15.
 */
var mongoose = require('mongoose');
var Setting = require('../utils/config.js');

var UserSchema = new  mongoose.Schema({
        username:String,
        pwd:String,
        tel:String,
        viplevel:String,
        udid:String,
        devicemodifyed:{type:String,default:'0'},
        ostype:String,
        version:String,
        pushid:String,
       //2.1所加,确认当前设备是否因为版本升级同步数据时，要先删除本地数据库数据
        needasnc:{type:String,default:'0'},
});

//实例方法
// var PersonSchema = new Schema({name:String,type:String});
// PersonSchema.methods.findSimilarTypes = function(cb){
//         return this.model('Person').find({type:this.type},cb);
// }


//静态方法
// PersonSchema.statics.findByName = function(name,cb){
//         this.find({name:new RegExp(name,'i'),cb});
// }
// var PersonModel = mongoose.model('Person',PersonSchema);
// PersonModel.findByName('krouky',function(err,persons){
//         //找到所有名字叫krouky的人
// });



/*虚拟属性
 *
Schema中如果定义了虚拟属性，那么该属性将不写入数据库，例如：

var PersonSchema = new Schema({
        name:{
                first:String,
                last:String
        }
});
var PersonModel = mongoose.model('Person',PersonSchema);
var krouky = new PersonModel({
        name:{first:'krouky',last:'han'}
});
如果每次想使用全名就得这样

console.log(krouky.name.first + ' ' + krouky.name.last);
显然这是很麻烦的，我们可以定义虚拟属性：

PersonSchema.virtual('name.full').get(function(){
        return this.name.first + ' ' + this.name.last;
});
那么就能用krouky.name.full来调用全名了，反之如果知道full，也可以反解first和last属性

PersonSchema.virtual('name.full').set(function(name){
        var split = name.split(' ');
        this.name.first = split[0];
        this.name.last = split[1];
});
var PersonModel = mongoose.model('Person',PersonSchema);
var krouky = new PersonModel({});
krouky.name.full = 'krouky han';//会被自动分解
console.log(krouky.name.first);//krouky
*/



// mongoose.model(Setting.ModelNameContact,ContactSchema)
//特别注意 **** 这些modelname在创建数据库表时的名字会自动增加s,并且都是小写。
//下面的第三个参数设置表名
mongoose.model(Setting.mongooseModelName,UserSchema,Setting.mongooseModelName);