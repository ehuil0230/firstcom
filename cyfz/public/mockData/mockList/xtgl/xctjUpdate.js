import Mock from 'mockjs'
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码

let interestNameList=[]
const postData = function() {
    // 随机生成文章数据
     //let posts = [] // 用于存放文章数据的数组
        let post = {
            cldId: Random.integer(1,7).toString,
            enterprise: Random.loggingDept(),
            interestName: Random.interestName(),
            productName: Random.desc() + "," + Random.desc() + "~~~",
        }
            for (let i = 0; i < 7; i++) {
                let interestName = {
                    interestName: Random.interestName(),
                }

                interestNameList.push(interestName.interestName);
            }
    return { // 返回状态码和文章数据posts
        code,
        result:1,
        info:{post:post,interestNameList:interestNameList},
    }
}
Random.extend({
    desc: function() {
        var desc = ['社会主义核心价值观', '两学一做', '四个意识', '四讲四有', '三严三实', '四个全面', '新发展理念', '20字好干部标准', '五位一体', '强富美高', '供给侧结构性改革', '三解三促','三会一课','四个进一步','三次大讨论','三个新成效','五查摆五强化','两聚一高','抓项目、转作风、促发展','三工程一计划']
        return this.pick(desc)  //pick:从list中随机选取一个元素
    },
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
    interestName: function () {
        var interestName = ['智能服务机器人','智能网联汽车','智能家居产品','智能传感器','智能翻译系统','神经网络芯片','网络安全保障体系','智能网络基础设施','神经网络芯片','华为芯片','小米电动','广电总局之手']
        return this.pick(interestName)
    }
})
Mock.mock(`${domain}/xctjUpdate`, /get|post/i, postData); // 定义请求链接，类型，还有返回数据


