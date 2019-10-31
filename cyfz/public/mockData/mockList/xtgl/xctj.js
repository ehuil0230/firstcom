import Mock from 'mockjs'
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码

let listData=[]
//初始化数据
const postData = function(req) {
    listData = []
    let totalSize = 30
    let pagination = JSON.parse(req.body)
    let pageSize =  pagination.pageSize;
    for (let i = 0; i < pageSize; i++) {
        let post = {
            cldId: Random.integer(1,7).toString+i,
            enterprise: Random.loggingDept(),
            interestName: '视频图像身份识别系统',
            productName: '视频图像身份识别',
         }
        window.console.log('=============', post, '=============')
        listData.push(post)
    }
    return { // 返回状态码和文章数据posts
        result:1,
        info:{list:listData,totalSize:totalSize}
    }
}
Random.extend({
    name: function() {
        var name = ['以法律之剑止暴制乱要执法必严', '民族运动会闭幕', '九一八事变88周年', '利文斯顿宣布退役', '宁波落户新政', '任正非回应退休', '新发展理念', '20字好干部标准', '五位一体', '强富美高', '供给侧结构性改革', '三解三促','三会一课','四个进一步','三次大讨论','三个新成效','五查摆五强化','两聚一高','抓项目、转作风、促发展','三工程一计划']
        return this.pick(name)  //pick:从list中随机选取一个元素
    },
    loggingDept: function() {
        var draftDept = ['法律部','办公厅','网络部','信息中心','烟草协会','海关协会','网工部','计算机室','工信部','政治部','工商部','广电总局']
        return this.pick(draftDept)
    },
    loggingStatus: function() {
        var draftStatus = ['已发布','未发布']
        return this.pick(draftStatus)
    },
})
Mock.mock(`${domain}/xctj`, /get|post/i, postData); // 定义请求链接，类型，还有返回数据


//删除数据
const list = function (options) {
    let rtype = options.type.toLowerCase(); //获取请求类型
    switch (rtype) {
        case 'get':
            break;
        case 'post':
            let id = parseInt(JSON.parse(options.body).id) //获取删除的id
            listData = listData.filter(function(val){
                return val.id!=id;//把这个id对应的对象从数组里删除
            });
            break;
        default:
    }
    return {
        result:1,
        info:{list:listData}
    } //返回这个数组,也就是返回处理后的假数据
}
Mock.mock(`${domain}/xctjDel`,/get|post/i, list);//删除数据