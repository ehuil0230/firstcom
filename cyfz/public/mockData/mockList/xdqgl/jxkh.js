import Mock from 'mockjs'
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码

let listData = []
const postData = function(req) {
    listData = []
    for (let i = 0; i < 10; i++) {
        let post = {
            uuid: i,
            pilotAreaName: Random.pilotAreaName(),
            province: Random.region(),
            createUserName: Random.cname(),
            createDept: Random.createDept(),
            createTime: Random.datetime(),
            status: Random.status(),
        }
        window.console.log('=============', post, '=============')
        listData.push(post)
    }
    return { // 返回状态码和文章数据posts
        code,
        info:{
            list:listData,
            totalSize:50
        }
    }
}
Random.extend({
    pilotAreaName: function() {
        const pilotAreaName = ['北京先导区', '重庆先导区', '长沙先导区', '武汉先导区', '广州先导区', '深圳先导区']
        return this.pick(pilotAreaName)  //pick:从list中随机选取一个元素
    },
    createDept: function(){
        const createDept = ['信息部','外交部','国防部','科技部']
        return this.pick(createDept);
    },
    status:function () {
        const status = ['已发布','未发布']
        return this.pick(status);
    }
})
Mock.mock(`${domain}/jxkh`, /get|post/i, postData); // 定义请求链接，类型，还有返回数据


//新增数据
const addlist = function (req) {
    let params = JSON.parse(req.body);
    let post = {
        uuid: listData.length+1,
        pilotAreaName: params.pilotAreaName,
        province: params.province,
        createUserName: Random.cname(),
        createDept: Random.createDept(),
        createTime: Random.datetime(),
        status: Random.status(),
    }
    listData.push(post);
    return {
        code,
        info: listData,
        result:1
    } //返回这个数组,也就是返回处理后的假数据
}
Mock.mock(`${domain}/addJxkh`, /get|post/i, addlist);//新增数据

//新增数据
const delList = function (req) {
    let params = JSON.parse(req.body);
    return {
        code,
        info: listData,
        result:1
    } //返回这个数组,也就是返回处理后的假数据
}
Mock.mock(`${domain}/delJxkh`, /get|post/i, delList);//新增数据
