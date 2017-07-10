var dateUtil = {
	isLeapYear: function(year) {
		if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
			return true;
		}
		return false;

	},
	formatDate: function(oDate, str) {
		var yy = oDate.getFullYear();
		var mm = oDate.getMonth() + 1;
		var dd = oDate.getDate();
		mm = mm < 10 ? "0" + mm : mm;
		dd = dd < 10 ? "0" + dd : dd;
		var dateStr = yy + str + mm + str + dd;
		return dateStr;

	},
	getDays: function(year, month) {
		switch(month + 1) {
			case 2:
				if(dateUtil.isLeapYear(year)) {
					return 29;
				}
				return 28;
			case 4:
			case 6:
			case 9:
			case 11:
				return 30;
			default:
				return 31;
		}
	},
	getChaDays: function(oDate1, oDate2) {
		var ms = oDate1 - oDate2; //两个日期相减，得到相差的毫秒数
		var cha = Math.abs(ms / (1000 * 60 * 60 * 24));
		return cha;
	},
	getNDays: function(oDate, n, str) {
		var day = oDate.getDate();
		oDate.setDate(day + 30); //设置日期时，直接加一个数，自动判断
		return dateUtil.formatDate(oDate, str);
	}
}

function getStyle(obj, attr) {
	if(typeof getComputedStyle == "function") {
		return getComputedStyle(obj, false)[attr];
	} else {
		return obj.currentStyle[attr];
	}
	/*	if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}*/
}

function addEvent(obj, type, fn) {
	if(obj.addEventListener) {
		obj.addEventListener(type, fn);
	} else {
		obj.attachEvent("on" + type, fn);
	}
}

function removeEvent(obj, type, fn) {
	if(obj.removeEventListener) {
		obj.removeEventListener(type, fn);
	} else {
		obj.detachEvent("on" + type, fn);
	}
}
//
function getCookie(name) {
	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");
	for(var i in arrCookie) {
		var arr = arrCookie[i].split("=");
		if(name == arr[0]) {
			return arr[1];
		}
	}
}

function setCookie(name, val, day) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + day);
	document.cookie = name + "=" + val + ";expires=" + oDate;
}

function removeCookie(name) {
	setCookie(name, 1, -1);
}
function getStyle(obj, attr) {
				if(obj.currentStyle) {
					return obj.currentStyle[attr];
				} else {
					return getComputedStyle(obj, false)[attr];
				}
			}
function startMove(obj,json,fn){//json对象存的是运动物体（对象）的样式属性和目标值
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true; //看到此定义时，先忽略，具体为什么要定义flag，参考下边的说明
		//px,透明度（注意区分透明度的处理方式，opacity和filter兼容以及取值问题）
		for(var attr in json){ //attr对应的是json对象的属性
			//判断属性中是否有透明度的变化
			if(attr == "opacity"){
				// *100 会有误差 0000007 之类的 所以要用 Math.round() 会四舍五入
				var iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				//取得运动物体当前的属性值，parseInt()只取值，不带单位（比如px）
				var iCur = parseInt(getStyle(obj,attr));
			}
			//取得运动物体样式的一个终值,即目标值，通过对象取属性值[]的语法来获取，
			var iTarget = json[attr];
			//求缓冲运动的速率
			var iSpeed = (iTarget - iCur)/8;
			//iSpeed有正负，注意取整问题，正值向上取整，因为运动对象的属性是无限接近目标值，如果向下取整的话，着iSpeed为小数时，直接变成0，没法到达目标值
			//负值向下取整
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			//此时让当前对象相应的属性发生改变，变化的速率就是iSpeed，还要考虑透明度的问题
			if(attr == "opacity"){
				obj.style.opacity = (iCur + iSpeed)/100;				
				obj.style.filter = "alpha(opacity="+(iCur+iSpeed)+")";
			}else{
				obj.style[attr] = iCur + iSpeed + "px";
			}
			//正常来讲，当当前值和目标值相等时要清除定时器，但是此时可能设计多个属性值同时发生变化
			//如果其中某一个属性值先达到目标值，直接清除，其他属性值没法再发生变化
			//考虑使用一个公共变量去相应各个属性值的变化 定义一个flag
			//只要没有达到目标值，就让flag值为flase，此时不清除定时器
			if(iCur != iTarget){
				flag = false;
			}
			
		}
		//所有都到达了目标值
		if(flag){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
		
	},30)
}
//获取元素的非行间样式值
   function getStyle(object,oCss) {
       if (object.currentStyle) {
         return object.currentStyle[oCss];
       }else{
         return getComputedStyle(object,null)[oCss];
       }
   }

   function getStyle(object,oCss){
	if(typeof getComputedStyle=="function"){
		return getComputedStyle(object,null)[oCss];

	}else{
		return object.currentStyle[oCss];
	}
   }