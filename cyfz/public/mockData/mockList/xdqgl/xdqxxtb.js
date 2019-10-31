import Mock from 'mockjs'
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码

let listData = []
const postData = function() {
    listData = []
    for (let i = 0; i < 15; i++) {
        let post = {
            uuid: i,
            pilotAreaName: Random.pilotAreaName(),
            pilotLevel: Random.pilotLevel(),
            provinceName: Random.region(),
            createUserName: Random.cname(), // 随机生成时间
            createOrgName: Random.createOrgName(),
            createTime: Random.date(),
        }
        window.console.log('=============', post, '=============')
        listData.push(post)
    }
    return { // 返回状态码和文章数据posts
        code,
        info:{list:listData},
        result:1,
    }
}
Random.extend({
    pilotAreaName: function() {
        const pilotAreaName = ['北京先导区', '重庆先导区', '长沙先导区', '武汉先导区', '广州先导区', '深圳先导区']
        return this.pick(pilotAreaName)  //pick:从list中随机选取一个元素
    },
    pilotLevel: function() {
        const pilotLevel = ['国家级', '省级', '市级']
        return this.pick(pilotLevel)  //pick:从list中随机选取一个元素
    },
    createOrgName: function() {
        const createOrgName = ['工信部']
        return this.pick(createOrgName)  //pick:从list中随机选取一个元素
    }
})
Mock.mock(`${domain}/xdqxxtb`, /get|post/i, postData); // 定义请求链接，类型，还有返回数据

//删除
const delData = function (req) {
    let params = JSON.parse(req.body);
    return {
        code,
        result:1,
        msg:"删除成功"
    } //返回这个数组,也就是返回处理后的假数据
}
Mock.mock(`${domain}/xdqxxtbDel`, /get|post/i, delData);//删除数据