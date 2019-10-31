import Mock from 'mockjs'
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码

let listData = []
const postData = function(req) {
    listData = []
    for (let i = 0; i < 15; i++) {
        let post = {
            uuid: i,
            title: Random.title(),
            createUserName: Random.cname(),
            createTime: Random.datetime(),
            stateName: Random.stateName()
        }
        window.console.log('=============', post, '=============')
        listData.push(post)
    }
    return { // 返回状态码和文章数据posts
        code,
        info:{list:listData}
    }
}
Random.extend({
    title: function() {
        const title = ['以法律之剑止暴制乱', '纪念“8.15”，不容历史“默默隐去”', '深化新时代学校思想政治理论改革创新',
            '美国有关政客助纣为虐，就是暴力犯罪分子幕后黑手', '美国单边主义霸权主义行为加剧全球市场动荡',]
        return this.pick(title)  //pick:从list中随机选取一个元素
    },
    stateName: function() {
        const stateName = ['已提交', '未提交']
        return this.pick(stateName)  //pick:从list中随机选取一个元素
    }
})
Mock.mock(`${domain}/cgfb`, /get|post/i, postData); // 定义请求链接，类型，还有返回数据