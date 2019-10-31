import Mock from 'mockjs'
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码

const postData = function(req) {
    let pie = {
        data:[
            {value:Random.natural(1, 1500), name:'智能产品'},
            {value:Random.natural(1, 1500), name:'核心基础'},
            {value:Random.natural(1, 1500), name:'智能制造关键技术质量'},
            {value:Random.natural(1, 1500), name:'支撑体系'},
            {value:Random.natural(1, 1500), name:'其它'}
        ]
    }
    let lineChart = {
        data: [
            {name: '智能产品', monthlySales: ['3443.4', '3523', '100.3', '500','855','4578','444','458','484','648','786','456']},
            {name: '核心基础', monthlySales: ['3433.4', '3323', '130.3', '500','875','4558','444','458','764','178','786','456']},
            {name: '智能制造关键技术质量', monthlySales: ['3423.4', '3453', '103.3', '5020','875','4568','484','458','784','148','786','456']},
            {name: '支撑体系', monthlySales: ['3443.4', '3453', '100.3', '5045','835','4578','464','438','787','158','786','456']},
            {name: '其它', monthlySales: ['3463.4', '3453', '108.3', '504','885','4578','474','458','7844','18','796','456']}
        ]
    }
    let histogram = {
        data:[
            {name:'智能网联汽车',value:Random.natural(1, 1500),},
            {name:'智能服务机器人',value:Random.natural(1, 1500),},
            {name:'智能无人机',value:Random.natural(1, 1500),},
            {name:'医疗影像辅助系统',value:Random.natural(1, 1500),},
            {name:'视频图像身份识别系统',value:Random.natural(1, 1500),},
            {name:'智能语言交互系统',value:Random.natural(1, 1500),},
            {name:'智能翻译系统',value:Random.natural(1, 1500),},
            {name:'智能家具产品',value:Random.natural(1, 1500),},
            {name:'智能传感器',value:Random.natural(1, 1500),},
            {name:'神经网络芯片',value:Random.natural(1, 1500),},
            {name:'开源开放平台',value:Random.natural(1, 1500),},
            {name:'智能制造关键技术装备',value:Random.natural(1, 1500),},
            {name:'行业训练资源库',value:Random.natural(1, 1500),},
            {name:'标准测试及知识产权服务',value:Random.natural(1, 1500),},
            {name:'智能化网络基础设施',value:Random.natural(1, 1500),},
            {name:'网络安全保障体系',value:Random.natural(1, 1500),},
            {name:'其他方向',value:Random.natural(1, 1500),}
        ]
    }
    let list = {
        data:[
            {province:Random.province(),annualSales:Random.float(0, 1000000, 0,2)},
            {province:Random.province(),annualSales:Random.float(0, 1000000, 0,2)},
            {province:Random.province(),annualSales:Random.float(0, 1000000, 0,2)},
            {province:Random.province(),annualSales:Random.float(0, 1000000, 0,2)},
            {province:Random.province(),annualSales:Random.float(0, 1000000, 0,2)}
        ]
    }
    let province = [
        {caption: '北京',code:'1' },
        {caption: '天津',code:'2'},
        {caption: '上海',code:'3' },
        {caption: '重庆',code:'4' },
        {caption: '河北',code:'5' },
        {caption: '河南',code:'6' },
        {caption: '云南',code:'7' },
        {caption: '辽宁',code:'8' },
        {caption: '黑龙江',code:'9' },
        {caption: '湖南',code:'10' },
        {caption: '安徽',code:'11' },
        {caption: '山东',code:'12' },
        {caption: '新疆',code:'13' },
        {caption: '江苏',code:'14' },
        {caption: '浙江',code:'15' },
        {caption: '江西',code:'16' },
        {caption: '湖北',code:'17' },
        {caption: '广西',code:'18' },
        {caption: '甘肃',code:'19' },
        {caption: '山西',code:'20' },
        {caption: '内蒙古',code:'21' },
        {caption: '陕西',code:'22' },
        {caption: '吉林',code:'23' },
        {caption: '福建',code:'24' },
        {caption: '贵州',code:'25'},
        {caption: '广东',code:'26' },
        {caption: '青海',code:'27' },
        {caption: '西藏',code:'28' },
        {caption: '四川',code:'29'},
        {caption: '宁夏',code:'30'},
        {caption: '海南',code:'31' },
        {caption: '台湾',code:'32'},
        {caption: '香港',code:'33' },
        {caption: '澳门',code:'34' }
    ];
    return { // 返回状态码和文章数据posts
        code,
        result:1,
        info:{
            pie:pie,
            lineChart:lineChart,
            histogram: histogram,
            list:list,
            province: province,
        }
    }
}
Mock.mock(`${domain}/getChanzhishouyi`, /get|post/i, postData); // 定义请求链接，类型，还有返回数据

