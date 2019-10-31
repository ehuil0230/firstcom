import Mock from 'mockjs'
import da from "element-ui/src/locale/lang/da";
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码

const postData2 = function(req) {
    let data = {
        maxCount: 1500 ,
        data:[
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
            {name: '澳门',value: Random.natural(1, 1500) },
            {name: '南海诸岛',value: Random.natural(1, 1500) }
        ]
    }

    return { // 返回状态码和文章数据posts
        code,
        result:1,
        info:data
    }
}
Mock.mock(`${domain}/getMapData`, /get|post/i, postData2); // 定义请求链接，类型，还有返回数据
