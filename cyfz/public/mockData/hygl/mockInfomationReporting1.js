import Mock from 'mockjs'
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/mockInfomationReporting1' // 定义默认域名，随便写
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
            com_name:  Random.csentence(10, 25), // 随机生成长度为10-25的标题
            tax_revenue:Random.natural(1,1000),
            total_revenue:Random.natural(1,1000),
            major_income:Random.natural(1,1000),
            exports_accounts:Random.natural(1,1000),
            research_cost:Random.natural(1,1000),
            technical_employee_num:Random.natural(1,1000),
            fresh_property_num:Random.natural(1,1000),
            standard_num:Random.natural(1,1000),
            year: Random.date()// 随机生成年月日 + 时间


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



