//添加获取url中get方法
(function($) {
$.extend({       
urlGet:function()
{
    var aQuery = window.location.href.split("?");  //取得Get参数
    var aGET = new Array();
    if(aQuery.length > 1)
    {
        var aBuf = aQuery[1].split("&");
        for(var i=0, iLoop = aBuf.length; i<iLoop; i++)
        {
            var aTmp = aBuf[i].split("=");  //分离key与Value
            aGET[aTmp[0]] = aTmp[1];
        }
     }
     return aGET;
 }
})
})(jQuery);
$(function() {
	var GET = $.urlGet();
	//商品编号
	var n=GET['n'];
	//请求公共资源
	getCompart();
	djsClock(1);//参数用来识别不同的倒计时间
	$.ajax({
		url: '../api/goodsList.json',
		type: 'POST',
		dataType: 'json',
		data: null,
	})
	.done(function(data) {
		console.log(data[n]);
		$(".bady-xx-seo").html(data[n]["desc"]);
		$(".pic img").attr("src",data[n]["img_good"]);
		$(".pic1 img").attr("src",data[n]["img_good"]);
	})
	.fail(function() {
		console.log("error");
	})
});
//倒计时
function djsClock(n) {
	function clock(time){
		var _nowDate=new Date();
		var _stopDate=new Date(time);
		var _date=new Date(_stopDate.getTime()-_nowDate.getTime());
		var _day=_date.getDate();
		var _hours=_date.getHours()-8;
		var _Minutes=_date.getMinutes();
		var _Seconds=_date.getSeconds();
		var _code='';
		_code+='<em id="div">'+_day+'</em>天';
		_code+='<em id="h">'+_hours+'</em>时';
		_code+='<em id="m">'+_Minutes+'</em>分';
		_code+='<em id="s">'+_Seconds+'</em>秒';
		return _code;
	}
	var _timer_djs=0;
	function djs(time){
		(function start() {
			clearTimeout(_timer_djs);
			$("#djs").html(clock(time));
			_timer_djs=setTimeout(start,1000);
		})();
	}
	$.ajax({
		url: '../api/data.json',
		type: 'POST',
		dataType: 'json',
		data: null,
	})
	.done(function (data) {
		djs(data[n]["time"]);//倒计时
	})
	.fail(function() {
		console.log("error");
	})
}
function getCompart() {
	//请求toolbar
	$.ajax({
		url: '../tpl/toolbar.html',
		type: 'POST',
		dataType: 'text',
		data: null,
	})
	.done(function (data) {
		$("#toolbar").html(data);
	})
	.fail(function() {
		console.log("toolbar error");
	});
	//请求heard
	$.ajax({
		url: '../tpl/heard.html',
		type: 'POST',
		dataType: 'text',
		data: null,
	})
	.done(function (data) {
		$(".header").html(data);
	})
	.fail(function() {
		console.log("header error");
	});
	//请求mainNav
	$.ajax({
		url: '../tpl/nav.html',
		type: 'POST',
		dataType: 'text',
		data: null,
	})
	.done(function (data) {
		$(".mainNav").html(data);
	})
	.fail(function() {
		console.log("mainNav error");
	});
	//请求右边侧栏
	$.ajax({
		url: '../tpl/rightfixed.html',
		type: 'POST',
		dataType: 'text',
		data: null,
	})
	.done(function (data) {
		$("body").append(data);
		getJs();//获取js
	})
	.fail(function() {
		console.log("rightfixed error");
	});
	//请求footer
	$.ajax({
		url: '../tpl/footer.html',
		type: 'POST',
		dataType: 'text',
		data: null,
	})
	.done(function (data) {
		$(".foot").html(data);
	})
	.fail(function() {
		console.log("toolbar error");
	});
}
function getJs() {
	$.ajax({
		url: '../js/compart.js',
		type: 'POST',
		dataType: 'script',
		data: null,
	})
	.done(function (data) {
		data;
	})
	.fail(function() {
		console.log("js error");
	})
}