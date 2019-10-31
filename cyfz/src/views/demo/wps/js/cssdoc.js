const C = (function( $, window ){
  var ie = !!window.ActiveXObject || "ActiveXObject" in window, //edge为false,ie11为true
	document = window.document,
	_args, _path = (function( script, i, me )
	{
	    var l = script.length;
		for( ; i < l; i++ )
		{
			me = !!document.querySelector ? script[i].src : script[i].getAttribute('src',4);
			if( me.substr(me.lastIndexOf('/')).indexOf('cssdoc') !== -1 )
			    break;
		}
		me = me.split('?'); _args = me[1];
		return me[0].substr( 0, me[0].lastIndexOf('/') + 1 );
	})(document.getElementsByTagName('script'),0),
	_getArgs = function( name )
	{
	    if( _args )
		{
		    var p = _args.split('&'), i = 0, l = p.length, a;
			for( ; i < l; i++ )
			{
			    a = p[i].split('=');
				if( name === a[0] ) return a[1];
			}
		}
		return;
	},
	uuid = function(){
		var len=32,radix=16;
		var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		var uuid=[],i;
		radix=radix||chars.length;if(len){for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];}else{var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';uuid[14]='4';for(i=0;i<36;i++){if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[(i==19)?(r&0x3)|0x8:r];}}}
		return uuid.join('');
	};
var _setting = {
	objFunc : {'createDocumentUos':2,'openDocumentRemote':2},
	docFunc : {'enableProtect':2,'enableRevision':2,'showRevision':2,'saveURL':2,'getDocumentFieldValue':1,'setDocumentField':2,'insertDocumentField':1,'insertDocument':2,'print':0
		,'setCompsiteVisible':2,'registListener':3,'setPrintCopies':1,'insertPicture':5,'cursorToDocumentField':2,'insertText':1},
	m : 'editor',
    type : '',
	c : 'WPS',
	id : 'objId',
	objW : window.screen.width + 'px',
	objH : '610px',
	printNum:null,//打印份号
	printCopies:null//打印份数
};
var doObjFunc = function(obj,funcName,param,n){
	if(param){
		param = Array.prototype.slice.call(param);
		switch (n) {
			case 0:
				obj[funcName]();
				break;
			case 1:
				obj[funcName](param[0]);
				break;
			case 2:
				obj[funcName](param[0],param[1]);
				break;
			case 3:
				obj[funcName](param[0],param[1],param[2]);
				break;
			default:
				obj[funcName](param);
			break;
		}
	}else{
		obj[funcName]();
	}
}
//TODO 为什么控件需要先赋给_obj，不直接赋给that.obj
//为什么控件方法的参数个数也需要一致
var _obj=null;
var CSSDOC = function(config){
	var that = this;
	config = config || {};
	var setting = _setting;
	for( var i in setting )
	{
		if( config[i] === undefined ) config[i] = _getArgs(i);
		if( config[i] === undefined ) config[i] = setting[i];
	}
	this.config = config;
	this.lock = new LOCK();
	this.obj = null;

	//this.init();

	for(var i in this.config.objFunc){
		(function(){
			   var name = i;
			   var value = that.config.objFunc[i];
			   //如果CSSOA存在同名的静态方法,则用重载(加上lock)静态方法到实例里
			   var func = null;
			   if(that[i] && typeof(that[i])==='function'){
				   func = that[i];
			   }
		       that[i] = function(){
					that.lock.obj.load(function(data) {
						if(!!func){
							that.doFunc(func,data);
						}else{
							if(name in that.obj){
								doObjFunc(that.obj,name,data,value)
							}else{
								alert('can not get funciton ['+name+'] with '+value+' param.');
							}
						}
					},arguments);
				}
		  })();
	}
	for(var i in this.config.docFunc){
		(function(){
			   var name = i;
			   var value = that.config.docFunc[i];
			   //如果CSSOA存在同名的静态方法,则用重载(加上lock)静态方法到实例里
			   var func = null;
			   if(that[i] && typeof(that[i])==='function'){
				   func = that[i];
			   }
		       that[i] = function(){
					that.lock.content.load(function(data) {
						if(!!func){
							that.doFunc(func,data);
						}else{
							if(name in that.obj){
								doObjFunc(that.obj,name,data,value)
							}else{
								alert('can not get funciton ['+name+'] with '+value+' param.');
							}
						}
					},arguments);
				}
		  })();
	}

	//TODO 怎么判断content已经加载完毕
	this.lock.obj.load(function(){
		try{
			setTimeout(function(){
				that.lock.content.open();
			},10);
		}catch(e){
			alert('打开文档出错:'+e);
		}
	});

};

CSSDOC.prototype = {
	init : function(ext){
		var that = this;
		that.lock.page.load(function(){
			if(ie) {
				that.config.objH = document.documentElement.clientHeight - '40';
			} else {
				that.config.objH = window.innerHeight - '40';
			}
			if((""+that.config.objH).indexOf("px") < 0){
				that.config.objH += "px";
			}
		});
		that.lock.page.load(function(){
			var url = '';
			switch(that.config.m)
			{
			case 'editor':
			{
				switch(that.config.c)
				{
					case 'WPS':
						var init = function () {
							that.lock.js.load(function() {
								try{
									var check = setInterval(function(){
										if(that.config.c=='WPS' && !ie &&  _obj){
											that.obj = _obj.Application;
										}else{
											that.obj = _obj;
										}
										var loaded = !!that.obj;
										if(that.config.c=='WPS' && !ie && that.obj){
											//loaded = that.obj.IsLoad();
										}
										if(loaded){
											clearInterval(check);
											that.lock.obj.open();
										}
									},1000);
								}catch(e){
									alert('加载流式出错:'+e);
								}
							});
							var html = '';
							if(ext == "et"){
								if(ie) {
									var codes=[];
									codes.push('<object id=DocFrame1 height=' + that.config.objH + ' width=' + that.config.objW + ' ');
									codes.push('data=data:application/x-oleobject;base64,7Kd9juwHQ0OBQYiirbY6XwEABAA7DwMAAgAEAB0AAAADAAQAgICAAAQABAD///8ABQBcAFgAAABLAGkAbgBnAHMAbwBmAHQAIABBAGMAdABpAHYAZQBYACAARABvAGMAdQBtAGUAbgB0ACAARgByAGEAbQBlACAAQwBvAG4AdAByAG8AbAAgADEALgAwAAAA ');
									codes.push('classid=clsid:8E7DA7EC-07EC-4343-8141-88A2ADB63A5F viewastext=VIEWASTEXT></object> ');
									html = codes.join("");
								} else {
									var codes=[];
									codes.push("<object  name='webet' id=DocFrame1 type='application/x-et' data='../dzgw/zhengwen/editor/wps/normal.et'  width='"+that.config.objW+"'  height='"+that.config.objH+"'>");
									codes.push('<param name="quality" value="high" />');
									codes.push('<param name="bgcolor" value="#ffffff" />');
									codes.push('<param name="Enabled" value="1" />');
									codes.push('<param name="allowFullScreen" value="true" />');
									codes.push('</object>');
									html = codes.join("");
								}
							} else {
								if(ie) {
									var codes=[];
									codes.push('<object id=DocFrame1 height=' + that.config.objH + ' width=' + that.config.objW + ' ');
									codes.push('data=data:application/x-oleobject;base64,7Kd9juwHQ0OBQYiirbY6XwEABAA7DwMAAgAEAB0AAAADAAQAgICAAAQABAD///8ABQBcAFgAAABLAGkAbgBnAHMAbwBmAHQAIABBAGMAdABpAHYAZQBYACAARABvAGMAdQBtAGUAbgB0ACAARgByAGEAbQBlACAAQwBvAG4AdAByAG8AbAAgADEALgAwAAAA ');
									codes.push('classid=clsid:8E7DA7EC-07EC-4343-8141-88A2ADB63A5F viewastext=VIEWASTEXT></object> ');
									html = codes.join("");
								} else {
									html ="<object  name='webwps' id='DocFrame1' type='application/x-wps' data='../src/assets/a.wpt' width='"+that.config.objW+"'  height='"+that.config.objH+"' >  </object>";
								}
							}
							var iframe = document.getElementById(that.config.id);
							iframe.innerHTML = html;
							_obj = document.getElementById('DocFrame1');
							if(!_obj){
								alert('加载流式金山出错!');
							}
							return _obj;
						}
						init();
						//TODO 直接document.getElementById，能确保obj已经加载完毕吗？
						that.obj = _obj;
						that.lock.js.open();
						break;
					default:
				}
				if(url && url!=''){
					that.lock.js.load(function() {
						try{
							that.obj = window.init(that.config.id, that.config.objW, that.config.objH);
							var check = setInterval(function(){
								if(that.obj != null){
									clearInterval(check);
									that.lock.obj.open();
								}
							},10);
						}catch(e){
							alert('加载流式出错:'+e);
						}
					});
					var onload = function() {
						that.lock.js.open();
					};
					$.getScript(url, function(){
						onload();
					});
				}
				break;
			}
			case 'viewer':
			{
				var url = '';
				switch(that.config.c)
				{
				/*case 'FX':
					that.lock.js.load(function() {
						try{
							if(ie) {
								that.obj = OFD.OCX.init(that.config.id, that.config.objW, that.config.objH);
								that.obj.ready(that.obj._id);
							} else {
								that.obj = foxit.ofdReaderInit(that.config.id, that.config.objW, that.config.objH);
							}
							if(that.obj != null){
								that.lock.obj.open();
							}
						}catch(e){
							alert('加载版式福昕出错:'+e);
						}
					});
					url = _path + (ie ? 'dzgw/zhengwen/viewer/fx/foxit.ofd.ocx.js':'dzgw/zhengwen/viewer/fx/Foxit_npapi.js');
					var onload = function() {
						that.lock.js.open();
					};
					$.getScript(url, function(){
						onload();
					});
					break;*/
				case 'SK':
                    that.lock.js.load(function() {
                        try{
                            that.obj = suwell.ofdReaderInit(that.config.id, that.config.objW, that.config.objH);
                            if (that.obj)
                            {
                                var obj = that.obj;
                                obj.setCompsiteVisible([ "print" ], true);
                                if(that.config.printCopies && that.config.printCopies!=0){
                                    obj.printCopies = 1;
                                    obj.printNum = that.config.printNum;
                                    //obj.setCompsiteVisible([ "print" ], true);//显示/隐藏按钮
                                    //obj.setCompsiteEnable([ "print" ], true);//开启/禁用按钮
                                    obj.registListener("print","printPerforming",false);//打印。执行回调函数 true事后调用	false事前调用
                                    obj.registListener("print","printPerformed",true);
                                    obj.setPrintCopies(obj.printCopies);  //设置最大打印份数
                                }
                            } else {
                                alert("请确认是否正确安装了数科阅读器，并检查浏览器设置是否正确!");
                            }
                            if(that.obj){
                                that.lock.obj.open();
                            }
                        }catch(e){
                            alert('加载版式数科出错:'+e);
                        }
                    });
                    url = _path + "sk/suwell_ofdReader.js";
                    var onload = function() {
                        that.lock.js.open();
                    };
                    $.getScript(url, function(){
                        onload();
                    });
                    break;
				default:
				}
				break;
			}
			default:
			}
		});
		$(function(){
			that.lock.page.open();
		});
	},
	doFunc : function(func,param){
		if(param){
			param = Array.prototype.slice.call(param);
			switch (param.length) {
			case 0:
				func.call(this);
				break;
			case 1:
				func.call(this,param[0]);
				break;
			case 2:
				func.call(this,param[0],param[1]);
				break;
			case 3:
				func.call(this,param[0],param[1],param[2]);
				break;
			case 5:
				func.call(this,param[0],param[1],param[2],param[3],param[4]);
				break;
			default:
				func.call(this,param);
			break;
			}
		}else{
			func.call(this);
		}
	},
	openDocumentRemote : function(url,readOnly){
		var that = this;
		if(that.config.m == 'editor') {
			that.obj.openDocumentRemote(url,readOnly);
		}else if(that.config.m == 'viewer'){
			if(url.indexOf('?')!=-1)
				url += '&rnd='+Math.random();
			that.obj.openFile(url,readOnly);
		}
	},
	createDocumentUos : function(){
		var obj = this.obj;
		if(ie){
			obj.createDocument("uos");
		}else {
			document.getElementById("DocFrame1").Application.Workbooks.Add();
		}
	},
	saveURL : function(url, fileName,cb){
		var that = this;
		var result = '';
		if(that.config.m == 'editor') {
			result = that.obj.saveURL(url, fileName);
		}else if(that.config.m == 'viewer'){
			result =  that.obj.saveFile(url);
		}
		if(cb && typeof(cb)==='function' ){
			cb(result);
		}
	},
	showRevision : function(type){// type: 0、1、2
		var obj = this.obj;
		obj.showRevision(type);
	},
	enableRevision : function(type){//type：true or false
		var obj = this.obj;
		obj.enableRevision(type);
	},
	enableProtect : function(type){//type：true or false
		var obj = this.obj;
		obj.enableProtect(type);
	},
	deleteMJLine:function(prom1, prom2){
		var obj = this.obj;
		obj.cursorToDocumentField(prom2, 1);
		obj.deleteDocumentField(prom2);
		obj.backspace();
		obj.deleteDocumentField(prom1);
		obj.backspace();
	},
	addMJLine:function(prom1, prom2, prom3){
		var obj = this.obj;
		if(obj.getDocumentFieldValue(prom1) == "" || obj.getDocumentFieldValue(prom1) == null){
			obj.setDocumentField(prom3,prom3);
			obj.cursorToDocumentField(prom3, 2);
			var selection = obj.ActiveDocument.Application.Selection;
			selection.TypeParagraph;
			obj.insertDocumentField(prom1);
			obj.setDocumentField(prom1,prom1);
			obj.cursorToDocumentField(prom1, 2);
			obj.insertDocumentField(prom2);
			obj.setDocumentField(prom2,prom2);
			obj.cursorToDocumentField(prom1, 2);
			obj.insertText("★");
			obj.setDocumentField(prom3,"");

		}
	},
	deleteJJCDLine:function(prom1){
		var obj = this.obj;
		obj.cursorToDocumentField(prom1, 1);
		obj.deleteDocumentField(prom1);
		obj.backspace();
	},
	addJJCDLine:function(prom1, prom2, prom3){
		var obj = this.obj;
		if(obj.getDocumentFieldValue(prom1) == "" || obj.getDocumentFieldValue(prom1) == null){
			if(obj.getDocumentFieldValue(prom2) == "" || obj.getDocumentFieldValue(prom2) == null){
				obj.setDocumentField(prom3,prom3);
				obj.cursorToDocumentField(prom3, 2);
				var selection = obj.ActiveDocument.Application.Selection;
				selection.TypeParagraph;
				obj.insertDocumentField(prom1);
				obj.setDocumentField(prom1,prom1);
				obj.setDocumentField(prom3,"");
			}else{
				obj.cursorToDocumentField(prom2, 2);
				var selection = obj.ActiveDocument.Application.Selection;
				selection.TypeParagraph;
				obj.insertDocumentField(prom1);
				obj.setDocumentField(prom1,prom1);
			}
		}
	},
	cleanCopySendField:function(prom1){
		var obj = this.obj;
		obj.setDocumentField(prom1,prom1);
		var fieldArray = new Array();
		fieldArray = obj.getAllDocumentField().split(",");
		fieldArray.sort(function(a,b){return a<b?1:-1});
		for(var i=0;i<fieldArray.length;i++){
			if(fieldArray[i] == prom1){
				break;
			}else if(fieldArray[i].substring(0,5) == (prom1 + "_")){
				obj.cursorToDocumentField(prom1,1);
				obj.backspace();
				obj.deleteDocumentField(fieldArray[i]);
			}
		}
		obj.setDocumentField(prom1,"");
	},
	insertCopySendField:function(prom1, prom2, prom3){
		var obj = this.obj;
		obj.setDocumentField(prom3,prom3);
		obj.cursorToDocumentField(prom3, 1);
		obj.insertDocumentField(prom1);
		obj.cursorToDocumentField(prom3, 1);
		obj.insertText(prom2);
		obj.setDocumentField(prom3,"");
	},
	cursorToDocumentField:function(prom1){
		var obj = this.obj;
		obj.cursorToDocumentField(prom1, 1);
	},
	backspace:function(){
		var obj = this.obj;
		obj.backspace();
	}
};

var LOCK = function(){
	this._page = $.Deferred();
	this._js = $.Deferred(),
	this._obj = $.Deferred(),
	this._content=$.Deferred();
	this._list = {};
	var that = this;
	return {
		page : {
			load : function(func){
				$.when.apply($, [that._page.promise()]).done(function(data){
				    func(data);
				});
				return this;
			},
			open : function(data){
				that._page.resolve(data);
			}
		},
		js :  {
			load : function(func){
				$.when.apply($, [that._js.promise(),that._page.promise()]).done(function(data){
				    func(data);
				});
				return this;
			},
			open : function(data){
				that._js.resolve(data);
			}
		},
		obj :  {
			load : function(func,param){
			    if(param!==undefined){
			    	func.id = uuid();
			    	if(param!=null)param = Array.prototype.slice.call(param);
			    	that._list[func.id]=param;
			    }
			    $.when.apply($, [that._obj.promise(),that._page.promise(),that._js.promise()]).done(function(data){
			    	var param = that._list[func.id];
			    	var params = param||[];
			    	if(data)params.push(data);
			    	func(params);
				});
				return this;
			},
			open : function(data){
				that._obj.resolve(data);
			}
		},
		content :  {
			load : function(func,param){
				 if(param!==undefined){
				    	func.id = uuid();
				    	if(param!=null)param = Array.prototype.slice.call(param||[]);
				    	that._list[func.id]=param;
				    }
				 $.when.apply($, [that._content.promise(),that._page.promise(),that._js.promise(),that._obj.promise()]).done(function(data){
			    	var param = that._list[func.id];
			    	var params = param||[];
			    	if(data)params.push(data);
			    	func(params);
				});
				return this;
			},
			open : function(data){
				that._content.resolve(data);
			}
		}
	}
}

return new CSSDOC();

})($, window);

export default {
  C
}
