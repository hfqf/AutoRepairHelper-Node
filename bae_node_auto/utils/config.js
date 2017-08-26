/**
 * Created by points on 16/11/15.
 */
module.exports={
    JPush_IS_Production:true,//apns推送的环境是否是生产环境

    mongodb:'mongodb://localhost' ,
    // mongodb:'mongodb://fd1a99ecacc646378349c9bf18ca63cf:704ec5d754d1433ca6317ec09e263cd4@mongo.duapp.com:8908/pIRwQllITuBgowMgPRUo',
    port:18080,
    mongooseModelName:"user",
    ModelNameContact:"contact",
    ModelNameRepairHistory:"repairhistory",
    ModelNameRepairItem:"repairitem",
    ModelNameNoticeBoard:"noticeboard",
    ModelNameUpdate:"update",
    ModelNameContactOrder:"contactorder",



    ModelName:{
        weixin:{
            accesstoken:"accesstoken",
        },
        warehouse:{//仓库管理
            warehouse:"warehouse",//库房
            warehouseposition:"warehouseposition",//库位
            supplier:"supplier",//供应商,
            goodstoptype:"goodstoptype",//商品分类之商品大类
            goodssubtype:"goodssubtype",//商品分类之商品子分类
            goodsinandoutrecord:"goodsinandoutrecord",//出入库记录
            goodsactioninfo:"goodsactioninfo",//商品操作详情
            WarehouseGoodsPurchase:"WarehouseGoodsPurchase",//采购表
            WarehouseGoodsPurchaseRecord:"WarehouseGoodsPurchaseRecord",//采购记录
            goods:"goods",//商品详情
            goodsstore:"goodsstore",//商品库存
        },

    },

    cryptoKey:'704ec5d754d1433ca6317ec09e263cd4',
    Baidu:{
        ak:'fd1a99ecacc646378349c9bf18ca63cf',//access key
        sk:'704ec5d754d1433ca6317ec09e263cd4' //secret key
    },
    Baidu_OCR:{
        ak:'qDY4GG0C0uULA1jpeavsc7OT',//access key
        sk:'btqla09UWHACpMMwxADjCuSVZoPYgQMt' //secret key
    },
    JPush:{
        JPushAppKey:'2c333bb853fee953412917d3',
        JPushMasterSecret:'78b67cb91bdd80f8c0fa92a9',
    },
    WENXIN_GZH:{
        SERVER_WEIXIN_openId:'gh_53c56acd897c',
        APPID:'wx31c52a0311e313af',
        APPSECRET:'a1c42ecdd27c854549bdafa4d236f139',
        // TIME_TO_REFRESH_ACCESSTOEKEN:'00 00 */2 * * *'
        TIME_TO_REFRESH_ACCESSTOEKEN:'00 00 */1 * * *',
        TEMPLATE_ID_REPAIR_EXPRIE:'ELuyW4UF_esQMiSm2CRWieuxACGHfTWmggu4yMK4fDs',
        TEMPLATE_ID_BIND_SUCCEED :'-xhhAgl7lTaRIRe1PE7cIG3kX1fJ_1-jLqq35C2jdjc',
        TEMPLATE_ID_REPAIR_STATE :'NGeRhP6W169FvOQAQXaJliUh6_WFHQMqK7eQKRUv0ks',
        TEMPLATE_ID_REPAIR_ORDER:'vXAtjGEY673ZIFSRtGB27teojRA7iArfGWgw54__bec',
        WEIXIN_REDICT_URL        :"http://autorepairhelper.duapp.com",
        CUSTOMER_ORDER_URL       :"http://autorepairhelper.duapp.com/oauth/order",
        CUSTOMER_QUERY_URL       :"http://autorepairhelper.duapp.com/oauth/query",


    },

    pushTime:'00 00 08 * * *',//类似闹钟,定时发送
};