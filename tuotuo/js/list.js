
$(function(){
	left_list();
	show_car();
	hang_car();
	num_goods();
});
//左侧列表
function left_list(){
	$("#left .goods .ff").click(function(){
		if($(this).next().css("display")=="block"){
			$(this).next().css("display","none");
			$(this).find("img").attr("src","images/list/i_arrow_dl.png");
		}else{
			$(this).next().css("display","block");
			$(this).find("img").attr("src","images/list/i_arrow_d.png");
		}
		//console.log($(this).css("border-bottom-style"));
		
//		if($(this).css("border-bottom-style")=="none"){
//			$(this).css("border-bottom","1px solid #d2d2d2");
//		}else{
//			$(this).css("border-bottom","none");
//		}
		
	});
	$("#left .goods .gg").click(function(){
		if($(this).next().css("display")=="block"){
			$(this).next().css("display","none");
			$(this).find("img").attr("src","images/list/i_arrow_dl.png");
		}else{
			$(this).next().css("display","block");
			$(this).find("img").attr("src","images/list/i_arrow_d.png");
		}
		//console.log($(this).css("border-bottom-style"));
		
		if($(this).css("border-bottom-style")=="none"){
			$(this).css("border-bottom","1px solid #d2d2d2");
		}else{
			$(this).css("border-bottom","none");
		}
		
	});
}
//悬浮显示加入购物车
function show_car(){
	$("#left .hot_goods .hot1").hover(function(){
		$(this).find(".add_car").css("display","block");
	},function(){
		$(this).find(".add_car").css("display","none");
	});
}
//鼠标悬浮加入购物车
function hang_car(){
	$("#right .hot_goods .hot1_1 .add_car .add_car_").hover(function(){
		$(this).css({
			"background":"red url(images/list/i_cart_h.png) no-repeat 3px 4px",
			"color":"#fff"
		});
	},function(){
		$(this).css({
			"background":"#fff url(images/list/i_cart_l.png) no-repeat 3px 4px",
			"color":"#000"
		});
	});
	
	$("#right .hot_goods .hot1_1").hover(function(){
		$(this).css("border","1px solid red");
	},function(){
		$(this).css("border","1px solid #d2d2d2");
	});
}
//商品数量
function num_goods(){
	$("#right .hot_goods .hot1_1 .add_car .add").click(function(){
		var _num=$(this).parent().parent().find(".num");
		_num.html(parseInt(_num.html())+1);
	});
	$("#right .hot_goods .hot1_1 .add_car .jian").click(function(){
		var _num=$(this).parent().parent().find(".num");
		if(parseInt(_num.html())>1){
			_num.html(parseInt(_num.html())-1 );
		}else{
			_num.html(1);
		}
	});
}

























