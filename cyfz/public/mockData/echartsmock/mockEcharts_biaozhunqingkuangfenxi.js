import Mock from 'mockjs'
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码

const postData = function(req) {
    let showData= ['标准总量'];
    let year  = ['2013','2014','2015','2016','2017','2018','2019'];
    let data=[];
    for (let j = 0; j < showData.length; j++) { //4
        let obj = {
            name: '',
            type: 'bar',
            data: [],
            barWidth : 30,
            itemStyle: {
                normal: {
                    color: '#E5A529',
                },
            },
            label: {
                normal: {
                    show: true, //显示数字
                    position: 'top' //这里可以自己选择位置
                }
            }
        }
        obj.name = showData[j].valueOf();
        data.push(obj);
    }
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < year.length; j++) {
            data[i].data.push(Random.natural(1,15000));
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
Mock.mock(`${domain}/getbiaozhun`, /get|post/i, postData); // 定义请求链接，类型，还有返回数据

const postData2 = function(req) {
    let data = [
        {name: '北京',value: Random.natural(1, 1500) },
        {name: '天津',value: Random.natural(1, 1500) },
        {name: '上海',value: Random.natural(1, 1500) },
        {name: '重庆',value: Random.natural(1, 1500) },
        {name: '河北',value: Random.natural(1, 1500) },
        {name: '河南',value: Random.natural(1, 1500) },
        {name: '云南',value: Random.natural(1, 1500) },
        {name: '辽宁',value: Random.natural(1, 1500) },
        {name: '黑龙江',value: Random.natural(1, 1500) },
        {name: '湖南',value: Random.natural(1, 1500) },
        {name: '安徽',value: Random.natural(1, 1500) },
        {name: '山东',value: Random.natural(1, 1500) },
        {name: '新疆',value: Random.natural(1, 1500) },
        {name: '江苏',value: Random.natural(1, 1500) },
        {name: '浙江',value: Random.natural(1, 1500) },
        {name: '江西',value: Random.natural(1, 1500) },
        {name: '湖北',value: Random.natural(1, 1500) },
        {name: '广西',value: Random.natural(1, 1500) },
        {name: '甘肃',value: Random.natural(1, 1500) },
        {name: '山西',value: Random.natural(1, 1500) },
        {name: '内蒙古',value: Random.natural(1, 1500) },
        {name: '陕西',value: Random.natural(1, 1500) },
        {name: '吉林',value: Random.natural(1, 1500) },
        {name: '福建',value: Random.natural(1, 1500) },
        {name: '贵州',value: Random.natural(1, 1500) },
        {name: '广东',value: Random.natural(1, 1500) },
        {name: '青海',value: Random.natural(1, 1500) },
        {name: '西藏',value: Random.natural(1, 1500) },
        {name: '四川',value: Random.natural(1, 1500) },
        {name: '宁夏',value: Random.natural(1, 1500)},
        {name: '海南',value: Random.natural(1, 1500) },
        {name: '台湾',value: Random.natural(1, 1500)},
        {name: '香港',value: Random.natural(1, 1500) },
        {name: '澳门',value: Random.natural(1, 1500) }
    ]
    let xData = [];
    let yData = [];
    for (let item of data){
        xData.push(item.name);
        yData.push(item.value);
    }
    return { // 返回状态码和文章数据posts
        code,
        info:{
            xData:xData,
            yData:yData,
        }
    }
}
Mock.mock(`${domain}/getbiaozhunXYData`, /get|post/i, postData2); // 定义请求链接，类型，还有返回数据

const postData3 = function(req) {
    let data = [
        {caption: '2019',code:'1' },
        {caption: '2018',code:'2'},
        {caption: '2017',code:'3' },
        {caption: '2016',code:'4' },
        {caption: '2015',code:'5' },
        {caption: '2014',code:'6' },
        {caption: '2013',code:'7' },
        {caption: '2012',code:'8' },
        {caption: '2011',code:'9' },
        {caption: '2010',code:'10' },

    ];
    return { // 返回状态码和文章数据posts
        code,
        info:{
            list:data,
        }
    }
}
Mock.mock(`${domain}/getyearSelect`, /get|post/i, postData3); // 定义请求链接，类型，还有返回数据
