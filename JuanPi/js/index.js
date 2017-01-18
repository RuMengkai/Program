$(function() {
	//show 
	$(".bag-show").on("mouseover",function() {
		$(".bag-tool").css("display","block");
	});
	$(".bag-show").on("mouseout",function() {
		$(".bag-tool").css("display","none");
	});
	$(".center").on("mouseover",function() {
		$(this).children("div").css("display","block")
	});
	$(".center").on("mouseout",function() {
		$(".center div").css("display","none");
	});
	//手机二维码show
	$(".navigation li:last-child").on("mouseover",function() {
		$(".phone-in").css("display","block");
	});
	$(".navigation li:last-child").on("mouseout",function() {
		$(".phone-in").css("display","none");
	});
	//每日签到show
	$(".state-show").on("mouseover",function() {
		$(".normal-side-box").css("display","block");
	});
	$(".state-show").on("mouseout",function() {
		$(".normal-side-box").css("display","none");
	});
	//初始化banner左边的menu
	for (var i = 1; i < 15; i++) {
		$(".top-menu dd:nth-child("+(i+1)+") i").css("background-position-x", -24*i);
	}
	//today
	$(".brand_data a").on("mouseover",function() {
		$(this).children("div").children('.enter').css({"background":"#ff464e","color":"#fff"});
	});
	$(".brand_data a").on("mouseout",function() {
		$(this).children("div").children('.enter').css({"background":"#fff","color":"#ff464e"});
	});
	//goods list hover
	$(".goods-list").on("mouseover","li",function() {
		$(this).children(".good_bottom").children('a').css({"display":"block"});
	});
	$(".goods-list").on("mouseout","li",function() {
		$(this).children(".good_bottom").children('a').css({"display":"none"});
	});
	//轮播图
	var i=0;
	var _timer=0;
	function delay(){
		$("#btn span").eq(i).css("border-color","transparent");
		$("#images a").eq(i).css({
			"display":"none",
			"opacity":0.3
		});
		i++;
		if(i>=$("#images a").size()){
			i=0;
		}
		$("#images a").eq(i).css("display","block");
		$("#btn span").eq(i).css({"background-color":"#fff","border-color":"#fff"});
		player(true);
		$("#bannerbg").css("display","none");
	}
	function player(_cmd){

		$("#btn span").eq(i).css("background-color","#fff");
		$("#images a").eq(i).animate({
			"opacity":1,
		},600,function(){
			if(_cmd){
				window.clearTimeout(_timer);
				_timer=window.setTimeout(delay,2000);
			}else{stop
				$("#images a").eq(i).finish();
				window.clearTimeout(_timer);
			}
		});
	}
	player(true);
	
	function eventHandle(_current){
		$("#images a").eq(i).finish();
		$("#images a").css({
			"display":"none",
			"opacity":0.3
		});
		$("#btn span").css({
			"background-color":"#fff",
			"border-color":"transparent"
		});
		$(_current).css({
			"background-color":"#fff",
			"border-color":"#fff"
		});
		i=$(_current).index();
		$("#images a").eq(i).css({
			"display":"block"
		});
		window.clearTimeout(_timer);
		player(false);
	}
	$(".banner a").mouseover(function(){
		$("#images a").eq(i).finish();
	});
	$(".banner").mouseover(function(){
		window.clearTimeout(_timer);
		// $("#images a").eq(i).stop();
		$("#arrow div span").animate({opacity: '0.5'},200);
	});
	$(".banner").mouseleave(function(){
		player(true);
		$("#arrow div span").animate({opacity: '0'},200);
	});
	$("#btn span").mouseenter(function(){
		eventHandle(this);
	});
	$("#arrow span.left").click(function(){
		eventHandle($("#btn span").eq(--i)[0]);
	});
	$("#arrow span.right").click(function(){
		eventHandle($("#btn span").eq(++i)[0]);
	});
	//倒计时
	function clock(){
		var _nowDate=new Date();
		var _stopDate=new Date(2017,2,31);
		var _date=new Date(_stopDate.getTime()-_nowDate.getTime());
		var _day=_date.getDate();
		var _hours=_date.getHours()-8;
		var _Minutes=_date.getMinutes();
		var _Seconds=_date.getSeconds();
		var _code='<span class="icon_time"></span>';
		_code+='<span class="brand-days">'+_day+'天</span>';
		_code+='<span class="brand-hours">'+_hours+'时</span>';
		_code+='<span class="brand-minutes">'+_Minutes+'分</span>';
		_code+='<span class="brand-seconds">'+_Seconds+'秒</span>';
		return _code;
	}
	var _timer_djs=0;
	function djs(){
		clearTimeout(_timer_djs);
	 	$(".djs").html(clock());
		_timer_djs=setTimeout(djs,1000);
	}
	djs();//倒计时
	//加载goods list
	var _s=0;
	window.onscroll=function(){
		var scrollh=$(document).scrollTop()//滚动条高度
		var pmh=$(window).height();//页面（屏幕）高度
		var conh=$(document).height();//浏览器内容高度
		// console.log(scrollh+"|"+pmh+"|"+conh);
		console.log(conh);
		if(scrollh+pmh>=conh){
			readGood(_s,_s+30);//读取图片
			_s=_s+35;
		}
	}
	//readGood(0,240);//加载goods
	function readGood(_min,_max){
		$.ajax({
			url: '../api/goodsList.json',
			type: 'POST',
			dataType: 'json',
			data: null,
		})
		.done(function (data) {
			goodsload(data,_min,_max);
		})
		.fail(function() {
			console.log("error");
		})
	}
	//请求回来的json数据处理
	function goodsload(data,_min,_max) {
		var str="";
		var _length=0;
		for (var key in data) {
			_length++;
		}
		// console.log(_min+"-"+(_max<_length?_max:_length));
		for (var key=_min;key<_max && _min<_length;key++,_min++) {
			str+='<li class='+key+'>';
			str+='<a href="#"><div class="'+data[key]["img_icon"]+'"></div>';
			str+='	<img src="'+data[key]["img_good"]+'">';
			str+='	<div class="like"><i></i></div>';
			str+='</a>';
			str+='<p>';
			str+='	<span>'+data[key]["baoyou"]+'</span>';
			str+='	<a href="#" target="_blank">'+data[key]["desc"]+'</a>';
			str+='	<span class="state">上新</span>';
			str+='</p>';
			str+='<div class="good_bottom">';
			str+='	<div class="price">';
			str+='		<em>￥</em>'+data[key]["price"]+'';
			str+='	</div>';
			str+='	<span>';
			str+='		<s><em>￥</em>'+data[key]["sprice"]+'</s>';
			str+='	</span>';
			str+='	<div class="source">';
			str+='		<em class="'+data[key]["smalllogo"]+'"></em>';
			str+='		<span>'+data[key]["source"]+'</span>';
			str+='	</div>';
			str+='	<a href="#">';
			str+=		data[key]["go"];
			str+='	</a>';
			str+='</div>';
			str+='</li>';
		}
		$(".goods-list").append(str);
	}
});