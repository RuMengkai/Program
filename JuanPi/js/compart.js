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