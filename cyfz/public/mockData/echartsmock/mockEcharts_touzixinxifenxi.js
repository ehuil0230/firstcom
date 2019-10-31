import Mock from 'mockjs'
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码

//表格数据
const postData = function(req) {
let listData=[];

    for (let i = 2011; i < 2020; i++) {
        let post = {
            Investment: Random.integer(1, 1000), // 投资
            financing: Random.integer(1, 1000), // 融资
            Merger: Random.integer(1, 1000), // 融资
            research : Random.integer(1, 1000), // 研发经费
            year:i,//年份
        }

        listData.push(post)
    }
    return { // 返回状态码和文章数据posts
        info:{list:listData}
    }
}
Mock.mock(`${domain}/posts`, /get|post/i, postData); // 定义请求链接，类型，还有返回数据


//柱形图数据
const postData2 = function(req) {
    let showData= ['投资','并购','融资','研发经费'];
    let year  = ['2015','2016','2017','2018','2019'];
    let data = [];
    for (let j = 0; j < showData.length; j++) { //4
        let obj = {
            name: '',
            type:'bar',
            data:[],
        }
        obj.name = showData[j].valueOf();
        data.push(obj);
    }
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < year.length; j++) {
            data[i].data.push(Random.natural(1,1500))
        }
    }
    return { // 返回状态码和文章数据posts
        code,
        info:{
            showData:showData,
            year:year,
            data:data,
        }
    }
}
Mock.mock(`${domain}/getzhuxingtuData`, /get|post/i, postData2); // 定义请求链接，类型，还有返回数据
