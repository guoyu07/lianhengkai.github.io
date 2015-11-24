// 1.定义一个函数，用于获取指定id的DOM对象
function $(id){
	return document.getElementById(id);
}

/* 
 * 2.创建一个addEvent函数解决事件监听兼容问题
 * 核心思路：判断浏览器类型
 * @param1	object	obj : 要绑定的对象
 * @param2	string	type : 事件类型，不带前缀
 * @param3	function	callback : 事件的处理程序
*/
function addEvent(obj,type,callback){
	if(obj.addEventListener){
		// W3C内核
		obj.addEventListener(type,callback);
	}else{
		// IE内核
		obj.attachEvent('on' + type,callback);
	}
}

/*
 * 3.创建一个removeEvent函数解决移除事件兼容性问题
 * 核心思路：判断浏览器类型
 * @param1	object	obj : 要绑定的对象
 * @param2	string	type : 事件类型，不带前缀
 * @param3	function	callback : 事件的处理程序
*/
function removeEvent(obj,type,callback){
	if(obj.removeEventListener){
		// W3C内核
		obj.removeEventListener(type,callback);
	}else{
		// IE内核
		obj.detachEvent('on' + type,callback);
	}
}

/*
 * 4.创建一个stopBubble函数解决冒泡问题
 * 核心思路：判断浏览器类型
 * @param1	object	event W3C 事件对象
*/
function stopBubble(event){
	if(window.event){
		// IE内核
		window.event.cancelBubble = true;
	}else{
		// W3C内核
		event.stopPropagation();
	}
}

/*
 * 5.创建一个prevent函数解决默认行为问题
 * 核心思路：判断浏览器类型
 * @param1	object	event W3C 事件对象
*/
function prevent(event){
	if(window.event){
		// IE内核
		window.event.returnValue = true;
	}else{
		// W3C内核
		event.preventDefault();
	}
}

/*
 * 6.创建一个closeWin函数解决关闭页面问题
*/
function closeWin(){
	var userAgent = navigator.userAgent;
	if(userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Presto") != -1){
		window.location.replace("about:blank");
	}else{
		window.opener = null;
		window.open("","_self");
		window.close();
	}
}
