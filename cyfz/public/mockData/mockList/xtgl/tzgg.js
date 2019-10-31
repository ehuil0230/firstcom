import Mock from 'mockjs'
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const domain = 'http://mockjs.com/api' // 定义默认域名，随便写
const code = 200 // 返回的状态码

let listData=[]

//数据初始化
const postData = function(req) {
    listData = []
    let totalSize = 30
    let pagination = JSON.parse(req.body)
    let pageSize =  pagination.pageSize;
    for (let i = 0; i < pageSize; i++) {
        let post = {
            uuid: Random.integer(1,7).toString+i,
            title: Random.name(),
            createUserName: Random.cname(),
            createOrgName: Random.draftDept(),
            createTime: Random.date() + ' ' + Random.time(), // 随机生成时间
            stateName: Random.draftStatus(),
            content:'<h1 class="ql-align-center">让群众感受法律温暖</h1><p><br></p ><p class="ql-align-center">人民日报本报记者 张腾扬2019-09-21 00:00</p ><p class="ql-align-center"><br></p ><p class="ql-align-justify">\t\t日前，河北省石家庄的米女士绿灯直行过十字路口，被对面拐弯的轿车撞倒，造成右肱骨粉碎性骨折。经交警事故认定，轿车车主全责。本来，肇事车辆有保险，可走正常理赔。然而，扣除了住院期间车主垫付的医药费后，保险公司只愿意对米女士赔付8000元。实际上，米女士事故受伤后很长一段时间生活无法自理，后续护理费、营养费、误工费总计数万元。</p ><p class="ql-align-justify">\t\t争执不休，只能走法律诉讼。米女士来到石家庄市公共法律服务中心想找律师咨询，值班律师袁晓丽热情接待了她。之后，服务大厅法律援助中心指派袁律师作为米女士的代理律师，提供无偿的法律服务。最终，经过两次诉讼，保险公司赔付了米女士7万多元。米女士喜极而泣，“公共法律服务中心帮助解决了大问题！”</p ><p class="ql-align-justify">\t\t“设立公共法律服务中心，不仅提供包括法律咨询、法律援助、人民调解等无偿或公益性服务，也包括面向社会公众的公证、司法鉴定、仲裁等服务指引。这里设有明确的制度，确定了服务对象、内容、标准等。”石家庄市法律援助中心副主任任连义告诉记者。</p ><p class="ql-align-justify">河北省司法厅在“不忘初心、牢记使命”主题教育中，针对检视出公共法律服务供给与人民群众需求不匹配、各地公共法律服务体系标准不统一等问题，对照习近平总书记提出的“尽快建成覆盖全业务、全时空的法律服务网络”的指示要求，出台了河北省基本公共法律服务实施标准（2019—2022年）。标准对法治宣传教育服务、法律咨询服务、法律查询服务、法律便利服务、法律援助服务、人民调解服务、村（居）法律顾问服务、服务平台建设、法治宣传阵地建设9项服务项目进行细化量化，为打通公共法律服务的“最后一公里”提供制度保障。</p ><p class="ql-align-justify">\t\t除了在现场办理具体法律事务，河北省司法厅还设立了“12348”热线指挥中心，对全省热线服务情况进行统一指挥、监管和数据分析；11个市及定州、辛集设立了“12348”热线咨询中心，24小时负责受理解答群众法律咨询和服务指引。同时，河北省司法厅建立了河北法律服务网（冀法通），与中国法律服务网实现了对接，提供网上免费法律咨询和指引服务，目前网站注册人数达68万余人。</p ><p class="ql-align-justify"><br></p ><p class="ql-align-right">人民日报      </p ><p class="ql-align-right">2019年9月3日</p >'
        }
        window.console.log('=============', post, '=============')
        listData.push(post)
    }
    return { // 返回状态码和文章数据posts
        result:1,
        info:{list:listData,totalSize:totalSize}
    }
}
Random.extend({
    name: function() {
        var name = ['以法律之剑止暴制乱要执法必严', '民族运动会闭幕', '九一八事变88周年', '利文斯顿宣布退役', '宁波落户新政', '任正非回应退休', '新发展理念', '20字好干部标准', '五位一体', '强富美高', '供给侧结构性改革', '三解三促','三会一课','四个进一步','三次大讨论','三个新成效','五查摆五强化','两聚一高','抓项目、转作风、促发展','三工程一计划']
        return this.pick(name)  //pick:从list中随机选取一个元素
    },
    draftDept: function() {
        var draftDept = ['法律部','办公厅','网络部','信息中心','烟草协会','海关协会','网工部','计算机室','工信部','政治部','工商部','广电总局']
        return this.pick(draftDept)
    },
    draftStatus: function() {
        var draftStatus = ['已发布','未发布']
        return this.pick(draftStatus)
    },
    content: function(){
        var content = ['\n' +
        '\n' +
        '北京时间9月20日，篮协主席姚明一直都非常受人尊重，不仅仅是之前篮球世界杯，中国男篮出局之后，姚明主动承担责任。还是因为他确实是唯一一个可以代表中国篮球、甚至亚洲篮球历史上最高水平的球员，甚至没有人能够看到他的背影。\n' +
        '\n' +
        '而且不仅仅是姚明在场内打出的统治力和取得的成就，在场外姚明的高情商和他伟大的人格，更是他收获所有人尊重的主要原因。就在近日，中国篮球公开赛正式在北京举行了发布会，篮协主席姚明也亲自的露面，而在这一次的公开赛开幕现场，姚明再次做出了一个让人感动的举动。\n' +
        '\n' +
        '当时在发布会的现场，领导们挨个就座，姚明也成为了领导中的一员。不过耐人寻味的是，当时现场给姚明准备的并不是一个普通的凳子，而是一个巨大的、甚至有一些宽阔的沙发。原因就是现场的主办方考虑到了姚明的身高，特意为他定制了那样一个非常显眼的沙发。\n' +
        '\n' +
        '而当时姚明和领导挨个就座，可姚明走到他的位置上发现了那个巨大沙发的时候，他先是愣了一下，接着立刻把工作人员拉了过来，要求工作人员给他换成跟其他所有人一样的塑料凳子。接下来在姚明执意要求下，工作人员把他的沙发换成了一个塑料凳，姚明的这个举动也引得了现场所有人的点赞。\n' +
        '\n' +
        '此前姚明在参加政协培训班的时候，他也曾经拒绝定制那种专门为他设计的大号椅子，宁可非常不舒服的全程弯着腰听课，也拒绝特殊待遇，这就是为什么姚明会受到尊重。\n' +
        '\n' +
        '在男篮世界杯结束之后，中国男篮丢掉了奥运会入场券，姚明现场道歉，表示如果有一个人要为男篮的表现承担责任，那么就是我。这一个字也引来了包括新华社在内权威媒体的赞扬。现在姚明在出席活动的时候再次体现了他的人格，这样的人很难不成功。而这样，一个坚决摒弃特权的领导，我们有理由相信，他会带领中国男篮，走向更光明的未来。']
        return content
    }
})
Mock.mock(`${domain}/tzgg`, /get|post/i, postData); // 定义请求链接，类型，还有返回数据

//新建
const creFormList = function (req) {
    let params = JSON.parse(req.body);
    return {
        code,
        info: params,
        result:1
    } //返回这个数组,也就是返回处理后的假数据
}
Mock.mock(`${domain}/creForm`, /get|post/i, creFormList);//新增数据

//修改
const updData = function(req) {
    let post = {
        cldId: Random.integer(1,7).toString,
        title: Random.name(),
        createUserName: Random.cname(),
        createOrgName: Random.draftDept(),
        createTime: Random.date() + ' ' + Random.time(), // 随机生成时间
        stateName: Random.draftStatus(),
    }
    window.console.log('=============', post, '=============')
    return { // 返回状态码和文章数据posts
        code,
        result:1,
        info:{post:post},
    }
}
Random.extend({
    name: function() {
        var name = ['以法律之剑止暴制乱要执法必严', '民族运动会闭幕', '九一八事变88周年', '利文斯顿宣布退役', '宁波落户新政', '任正非回应退休', '新发展理念', '20字好干部标准', '五位一体', '强富美高', '供给侧结构性改革', '三解三促','三会一课','四个进一步','三次大讨论','三个新成效','五查摆五强化','两聚一高','抓项目、转作风、促发展','三工程一计划']
        return this.pick(name)  //pick:从list中随机选取一个元素
    },
    draftDept: function() {
        var draftDept = ['法律部','办公厅','网络部','信息中心','烟草协会','海关协会','网工部','计算机室','工信部','政治部','工商部','广电总局']
        return this.pick(draftDept)
    },
    draftStatus: function() {
        var draftStatus = ['已发布','未发布']
        return this.pick(draftStatus)
    }
})
Mock.mock(`${domain}/tzggUpdate`, /get|post/i, updData); // 定义请求链接，类型，还有返回数据
//删除
const delData = function (req) {
    let params = JSON.parse(req.body);
    return {
        code,
        result:1,
        msg:"删除成功"
    } //返回这个数组,也就是返回处理后的假数据
}
Mock.mock(`${domain}/tzggDel`, /get|post/i, delData);//删除数据


//数据新建
const creData = function(req) {
    let post = {
        uuid: Random.integer(1,7).toString,
        proclamationDm: 'tzgg',
        title: Random.name(),
        createUserName: Random.cname(),
        createOrgName: Random.draftDept(),
        createTime: Random.date() + ' ' + Random.time(), // 随机生成时间
        content: Random.content(),
        stateName: Random.draftStatus(),
    }
    window.console.log('=============', post, '=============')
    return { // 返回状态码和文章数据posts
        code,
        result:1,
        info:{post:post},
    }
}
Random.extend({
    name: function() {
        var name = ['以法律之剑止暴制乱要执法必严', '民族运动会闭幕', '九一八事变88周年', '利文斯顿宣布退役', '宁波落户新政', '任正非回应退休', '新发展理念', '20字好干部标准', '五位一体', '强富美高', '供给侧结构性改革', '三解三促','三会一课','四个进一步','三次大讨论','三个新成效','五查摆五强化','两聚一高','抓项目、转作风、促发展','三工程一计划']
        return this.pick(name)  //pick:从list中随机选取一个元素
    },
    draftDept: function() {
        var draftDept = ['法律部','办公厅','网络部','信息中心','烟草协会','海关协会','网工部','计算机室','工信部','政治部','工商部','广电总局']
        return this.pick(draftDept)
    },
    draftStatus: function() {
        var draftStatus = ['已发布','未发布']
        return this.pick(draftStatus)
    },
    content: function(){
        var content = ['\n' +
        '\n' +
        '北京时间9月20日，篮协主席姚明一直都非常受人尊重，不仅仅是之前篮球世界杯，中国男篮出局之后，姚明主动承担责任。还是因为他确实是唯一一个可以代表中国篮球、甚至亚洲篮球历史上最高水平的球员，甚至没有人能够看到他的背影。\n' +
        '\n' +
        '而且不仅仅是姚明在场内打出的统治力和取得的成就，在场外姚明的高情商和他伟大的人格，更是他收获所有人尊重的主要原因。就在近日，中国篮球公开赛正式在北京举行了发布会，篮协主席姚明也亲自的露面，而在这一次的公开赛开幕现场，姚明再次做出了一个让人感动的举动。\n' +
        '\n' +
        '当时在发布会的现场，领导们挨个就座，姚明也成为了领导中的一员。不过耐人寻味的是，当时现场给姚明准备的并不是一个普通的凳子，而是一个巨大的、甚至有一些宽阔的沙发。原因就是现场的主办方考虑到了姚明的身高，特意为他定制了那样一个非常显眼的沙发。\n' +
        '\n' +
        '而当时姚明和领导挨个就座，可姚明走到他的位置上发现了那个巨大沙发的时候，他先是愣了一下，接着立刻把工作人员拉了过来，要求工作人员给他换成跟其他所有人一样的塑料凳子。接下来在姚明执意要求下，工作人员把他的沙发换成了一个塑料凳，姚明的这个举动也引得了现场所有人的点赞。\n' +
        '\n' +
        '此前姚明在参加政协培训班的时候，他也曾经拒绝定制那种专门为他设计的大号椅子，宁可非常不舒服的全程弯着腰听课，也拒绝特殊待遇，这就是为什么姚明会受到尊重。\n' +
        '\n' +
        '在男篮世界杯结束之后，中国男篮丢掉了奥运会入场券，姚明现场道歉，表示如果有一个人要为男篮的表现承担责任，那么就是我。这一个字也引来了包括新华社在内权威媒体的赞扬。现在姚明在出席活动的时候再次体现了他的人格，这样的人很难不成功。而这样，一个坚决摒弃特权的领导，我们有理由相信，他会带领中国男篮，走向更光明的未来。']
        return content
    }
})
Mock.mock(`${domain}/tzggCre`, /get|post/i, creData); // 定义请求链接，类型，还有返回数据
