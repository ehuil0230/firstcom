import Mock from 'mockjs'
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码

let listData=[]
const postData = function(req) {
    listData = []
    // 随机生成文章数据
    const totalSize = 15;
    for (let i = 0; i < totalSize; i++) {
        let post = {
            cldId: "1",
            name: Random.name(),
            createTime: Random.date() + ' ' +Random.time(), // 随机生成时间
            content: Random.csentence(100, 150),
        }
       listData.push(post)
    }
    return { // 返回状态码和文章数据posts
        code,
        info:{list:listData}
    }
}
Random.extend({
    name: function() {
        var name = ['以法律之剑止暴制乱要执法必严', '民族运动会闭幕', '九一八事变88周年', '利文斯顿宣布退役', '宁波落户新政', '任正非回应退休', '新发展理念', '20字好干部标准', '五位一体', '强富美高', '供给侧结构性改革', '三解三促','三会一课','四个进一步','三次大讨论','三个新成效','五查摆五强化','两聚一高','抓项目、转作风、促发展','三工程一计划']
        return this.pick(name)  //pick:从list中随机选取一个元素
    },
})
Mock.mock(`${domain}/search`, /get|post/i, postData); // 定义请求链接，类型，还有返回数据
