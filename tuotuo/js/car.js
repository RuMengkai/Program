$(function(){
	
//关闭购物车
$("#car span.close_car").hover(function(){
	$(this).css("background","url(images/shoppcart3a.jpg)");//加在了行内样式
},function(){
	$(this).css("background","url(images/shoppcart3.jpg)");
});

$("#car span.close_car").click(function(){
	$("#car").css("display","none");
});
//去结算
$("#car .to_buy .many_go").hover(function(){
	$(this).css("background","url(images/shoppcart5a.jpg)");
},function(){
	$(this).css("background","url(images/shoppcart5.jpg)");
});

//鼠标悬浮增加改变背景图片
$("#car .goods .box .goods_detail li .b_add .add").hover(function(){
	$(this).css("background","url(images/car/shoppcart12a.jpg)");
},function(){
	$(this).css("background","url(images/car/shoppcart12.jpg)");
});

//鼠标悬浮减少改变背景图片
$("#car .goods .box .goods_detail li .b_add .jian").hover(function(){
	$(this).css("background","url(images/car/shoppcart13a.jpg)");
},function(){
	$(this).css("background","url(images/car/shoppcart13.jpg)");
});

//鼠标点击增加 用委托  这样通过脚本创建的元素也能有这个事件
$("#car").delegate(".add","click",function(){
	$(this).parent().parent().find(".a_num").html(function(){
		return parseInt($(this).html())+1 ;
	});
	var _index=$(this).parent().parent().attr("index");
	//console.log(_index);
	//console.log(document.cookie);
	if(document.cookie!=""){
		var _cookie=document.cookie.split(";");
		//console.log(_cookie);
		// ["10={"num":36,"price":2}", " 4={"num":37,"price":2}", " 8={"num":38,"price":2}"]
		for(var i=0;i<_cookie.length;i++){
			if(_cookie[i].match(/\d+/g)[0]==_index){
				var _num=$(this).parent().parent().find(".a_num").html();
				document.cookie=_index+"={\""+"num\":"+_num+","+"\"price\":"+2+"}";
			}
		}
	}
	cal_goods();
});
//鼠标点击减少
$("#car").delegate(".jian","click",function(){
	$(this).parent().parent().find(".a_num").html(function(){
		if($(this).html()>1){
			return parseInt($(this).html())-1 ;
		}
	});
	var _index=$(this).parent().parent().attr("index");
	if(document.cookie!=""){
		var _cookie=document.cookie.split(";");
		for(var i=0;i<_cookie.length;i++){
			if(_cookie[i].match(/\d+/g)[0]==_index){
				var _num=$(this).parent().parent().find(".a_num").html();
				document.cookie=_index+"={\""+"num\":"+_num+","+"\"price\":"+2+"}";
			}
		}
	}
	cal_goods();
});
//计算商品数量
function cal_goods(){
	var _s=0;
	if(document.cookie!=""){
		var _cookie=document.cookie.split(";");
		for(var i=0;i<_cookie.length;i++){
			_s+=JSON.parse(_cookie[i].replace(/\d+=/g,"")).num;
		}
	}
	$(".num").html(_s);
}
//初始化商品数量

cal_goods();
//点击删除所选商品
$("#car").delegate(".delete","click",function(){
	$(this).parent().css("display","none");
	var _index=$(this).parent().attr("index");
	var _cookie=document.cookie.split(";");
	for(var i=0;i<_cookie.length;i++){
		if(_cookie[i].match(/\d+/g)[0]==_index){
			document.cookie=_index+"=2;expires="+new Date("2013/2/2");
		}
	}
});

$(".delete").click(function(){
	$(this).parent().css("display","none");
	$(this).parent().parent().css("display","none");
});




//从cookie获取所购商品
var _cookie=document.cookie;
if(_cookie!=""){
	var _ss=_cookie.split(/;/g);
	for(var i=0;i<_ss.length;i++){
		//哪个商品
		var _goods=_ss[i].match(/\d+/g)[0];
		//商品数量
		var _num=JSON.parse(_ss[i].replace(/\d+=/g,"")).num;
		//创建商品到购物车
		var _li=$("<li></li>").attr("index",_goods);
		var a_num=$("<div></div>").attr("class","a_num").html(_num);
		_li.append(a_num);
		var b_add=$("<div></div>").attr("class","b_add");
		b_add.append("<span class=\"add\"></span><span class=\"jian\"></span>");
		_li.append(b_add);
		var c_img=$("<div></div>").attr("class","c_img");
		var _img=$("<img/>").attr("src","images/car/2627_50.jpg");
		c_img.append(_img);
		_li.append(c_img);
		var d_font=$("<div></div>").attr("class","d_font");
		var _a=$("<a></a>").attr("href","#").html("智利进口樱桃（J车厘子）约50");
		d_font.append(_a);
		var _p=$("<p></p>").html("<span>促销价： ￥42.60 / 份</span>")
		d_font.append(_p);
		_li.append(d_font);
		_li.append("<span class=\"delete\"title=\"删除\"></span>");
		$("#car .goods .box .goods_detail ul").append(_li);
	}
	
}

});






























