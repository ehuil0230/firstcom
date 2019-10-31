import Mock from 'mockjs'
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档

const domain = 'http://mockjs.com/mockRgznyfjgjs' // 定义默认域名，随便写
const code = 200 // 返回的状态码


//随机生成数据
let listData = []
const postData = function (req) {
    let params = JSON.parse(req.body);
    listData = [];
    for (let i = 0; i < params.pageSize; i++) {
        let post = {
            id:i,
            givenYear: Random.date(), // 年度
            orgNum: Random.integer(20, 100), //   企业新建研发机构数
            prevOrgNum: Random.integer(20, 100),//当年新建研发机构数
            exOrgNum: Random.integer(20, 100), // 在境外研发机构建立数
            orgArea: Random.integer(20, 1000), // 研发场地总面积
            equipAccounts: Random.integer(20, 100),//企业研发设备资产总额
            researcherNum: Random.integer(20, 100), // 研发机构人员
            prevEquipNum: Random.integer(20, 1000), // 当年新增研发设备
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
