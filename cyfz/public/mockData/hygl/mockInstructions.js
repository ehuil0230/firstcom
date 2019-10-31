import Mock from 'mockjs'

const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/instructions' // 定义默认域名，随便写
const code = 200 // 返回的状态码

let listData = []
const postData = function (req) {
    let params = JSON.parse(req.body);
    listData = [];
    for (let i = 0; i < params.pageSize; i++) {
        let post = {
            inman: Random.cname(), // 随机生成名字
            inTitle: Random.csentence(10, 25), // 随机生成长度为10-25的标题
            dep: Random.constellation(),//随机显示的部门
            time: Random.date() + ' ' + Random.time(), // 随机生成年月日 + 时间
        }
        listData.push(post)
    }
    return { // 返回状态码和文章数据posts
        code,
        info: {
            list: listData,
            totalSize:100
        },
        result:1
    }
}

Random.extend({
    constellation: function (date) {
        var constellations = ['工信部', '河北经信委', '河南经信委', '湖南经信委', '天津经信委', '广西经信委', '广东经信委', '北京经信委', '重庆经信委', '湖北经信委', '吉林经信委', '内蒙古经信委']
        return this.pick(constellations)
    }
})
Mock.mock(`${domain}/posts`, /get|post/i, postData); // 定义请求链接，类型，还有返回数据

//新增数据
const addlist = function (req) {
    let params = JSON.parse(req.body);
    return {
        code,
        info: params,
        result:1
    } //返回这个数组,也就是返回处理后的假数据
}
Mock.mock(`${domain}/addForm`, /get|post/i, addlist);//新增数据

