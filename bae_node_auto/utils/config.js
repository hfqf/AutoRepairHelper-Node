/**
 * Created by points on 16/11/15.
 */
module.exports={
    // mongodb:'mongodb://localhost',
    mongodb:'mongodb://fd1a99ecacc646378349c9bf18ca63cf:704ec5d754d1433ca6317ec09e263cd4@mongo.duapp.com:8908/pIRwQllITuBgowMgPRUo',
    port:18080,
    mongooseModelName:"user",
    ModelNameContact:"contact",
    ModelNameRepairHistory:"repairhistory",
    ModelNameNoticeBoard:"noticeboard",
    ModelNameUpdate:"update",
    cryptoKey:'704ec5d754d1433ca6317ec09e263cd4',
    Baidu:{
        ak:'fd1a99ecacc646378349c9bf18ca63cf',//access key
        sk:'704ec5d754d1433ca6317ec09e263cd4' //secret key
    },
    JPush:{
        JPushAppKey:'2c333bb853fee953412917d3',
        JPushMasterSecret:'78b67cb91bdd80f8c0fa92a9',
    },
    pushTime:'00 00 08 * * *',//类似闹钟,定时发送
};