import Mock from 'mockjs'
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/mackComminssionTask' // 定义默认域名，随便写
const code = 200 // 返回的状态码

//查询
let listData=[]
const postData = function(req) {
    // 随机生成文章数据
    let params = JSON.parse(req.body);
    listData=[];
    for (let i = 0; i < params.pageSize; i++) {
        let post = {
            id: i,
            name: Random.csentence(4),
            type: Random.csentence(2), // 随机生成名字
            tjsj: Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
        }
        listData.push(post)
    }
    return { // 返回状态码和文章数据posts
        code,
        info:{
            list: listData,
            totalSize:10
        },
        result:1,
    }
}
Mock.mock(`${domain}/posts`, /get|post/i, postData); // 定义请求链接，类型，还有返回数据



