//toolbar
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
$(".menu").on("mouseenter",function() {
	$(".login-box").css({"display":"block"});
});
$(".menu").on("mouseleave",function() {
	$(".login-box").css({"display":"none"});
});
//判断是否登录
$.post("../api/session.php", function(data){
	if (data==0) {
		$(".nologin").css("display","block");
		$(".login").css("display","none");
	}else{
		console.log(data);
		$(".nologin").css("display","none");
		$(".login").css("display","block");
		var account=JSON.parse(data)["user"];
		$(".user").html(account);
	}
});
//退出
$(".signout").on("click",function () {
	$.ajax({
		url: '../api/signout.php',
		type: 'POST',
		dataType: 'text',
		data: null,
	})
	.done(function (data) {
		if (data==0) {
			alert("成功退出");
			window.location.href="index.html";
		}else{
			alert("抱歉，请求失败");
		}
	})
	.fail(function() {
		console.log("error");
	})
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
//侧栏fixed-right效果
$(".fixed-right ul li").on("mouseenter",function name() {
	$(this).children(".tab-tips").css({"display":"block"});
	$(this).children(".tab-tips").animate({right:36}, 300);
})
$(".fixed-right ul li").on("mouseleave",function name() {
	$(this).children(".tab-tips").css({"right":"98px","display":"none"});
})
//returntop
$("#returntop").click(function() {
	$("html,body").animate({scrollTop:$("#toolbar").offset().top+"px"},700);
});
//侧栏info close
$(".close").click(function() {
	$("#side-login").css("display","none");
});
//打开购物车
var gwc_flg=0;
$(".gwd").click(function() {
	if (gwc_flg==0) {
		$(".shopping-cart").animate({"right": "36px"},200);
		gwc_flg=1;
		return false;
	} else {
		$(".shopping-cart").animate({"right": "-230px"},200);
		gwc_flg=0;
	}
});
$("body").click(function() {
	if (gwc_flg==1) {
		$(".shopping-cart").animate({"right": "-230px"},200);
		gwc_flg=0;
	} 
});
//close购物车
$(".cart_close").click(function() {
	$(".shopping-cart").animate({"right": "-230px"},200);
	gwc_flg=0;
});