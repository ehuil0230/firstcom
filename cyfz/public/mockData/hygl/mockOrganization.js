import Mock from 'mockjs'
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/mockOrganization' // 定义默认域名，随便写
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
            industry_org_name: Random.csentence(10, 25), // 随机生成长度为10-25的标题
            // deptName: Random.csentence(10, 25),
            legal_person_name: Random.cname(), // 随机生成名字
            //time: Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
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

//修改数据




//删除数据
const delList = function (req) {
    let params = JSON.parse(req.body);
    return {
        code,
        result:1,
        msg:"删除成功"
    } //返回这个数组,也就是返回处理后的假数据
}
Mock.mock(`${domain}/delList`, /get|post/i, delList);//删除数据

