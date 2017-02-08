/**
 * Created by Administrator on 2017/1/17.
 */

$(function(){
//商品
//悬浮小图片出现边框
    function show_border(){
        $("#goods .small img").css("border","2px solid #fff");
        $("#goods .small img").eq(0).css("border","2px solid #ff3300");
        $("#goods .small img").mouseenter(function(){
            //    先隐藏所有的边框
            $("#goods .small img").css("border","2px solid #fff");
            //    再显示当前边框
            $(this).css("border","2px solid #ff3300");
        });
    }
    show_border();//悬浮小图片出现边框
    //鼠标悬浮小图显示大图
    (function(){
        $("#goods .small img").mouseenter(function(){
            $("#goods .big .big_img").css("display","none");
            $($("#goods .big img")[$(this).attr("index")]).css("display","block");
            $(".mirror_img").attr("src",$($("#goods .big img")[$(this).attr("index")]).attr("src"));
        });
    })();
//    放大镜效果
    (function(){
        $("#goods .big").hover(function(){
            $(".big_mirror").css("display","block");

            $(".mirror").css("display","block").mouseenter(function(){$(this).css("display","none")});
            $(this).mousemove(function(e){
                var e=e||window.event;
                var _mouseX=e.clientX;
                var _mouseY=e.clientY;
                var _left=_mouseX-$(this).offset().left-100;
                //console.log($(this).offset().top);//距离网页的顶点的距离
                var _top=_mouseY-100+$(window).scrollTop()-$(this).offset().top;
                if(_left>$(this).width()-$(".big_mirror").width()){
                    _left=$(this).width()-$(".big_mirror").width();
                }
                if(_left<=0){
                    _left=0;
                }
                if(_top>$(this).height()-$(".big_mirror").height()){
                    _top=$(this).height()-$(".big_mirror").height()
                }
                if(_top<=0){
                    _top=0;
                }
                $(".big_mirror").css({
                    "top":_top+"px",
                    "left":_left+"px"
                });
                $(".mirror_img").css({
                    "top":-_top*2+"px",
                    "left":-_left*2+"px"
                });
            });
        },function(){
            $(".big_mirror").css("display","none");
            $(".mirror").css("display","none");
        });
    })();

//    商品数量效果
    (function(){

        var _num=1;
        if(_num<=1){
            $(".buy .reduce").css("cursor","not-allowed");
        }
        $(".buy .add").click(function(){
            _num++;
            if(_num<=1){
                $(".buy .reduce").css({"cursor":"not-allowed","background":"#fff"});
            }else{
                $(".buy .reduce").css({"cursor":"pointer","background":"#f5f5f5"});
            }
            $(".goods_num").val(_num);
        });
        $(".buy .reduce").click(function(){
            _num--;
            if(_num<=1){
                _num=1;
                $(".buy .reduce").css({"cursor":"not-allowed","background":"#fff"});
                $(".goods_num").val(_num);
            }else{
                $(".goods_num").val(_num);
                $(".buy .reduce").css({"cursor":"pointer","background":"#f5f5f5"});
            }

        });
    })();

//    倒计时
    (function(){
        setInterval(function(){
            var future=new Date("2017/1/19");
            var now=new Date();
            var cha=new Date(future.getTime()-now.getTime());
            $(".date").html(cha.getDate());
            $(".hour").html(cha.getHours());
            $(".minute").html(cha.getMinutes());
            $(".second").html(cha.getSeconds());
        },1000);
    })();
//    右侧出现效果
    $("#goods .b").hover(function(){
        $("#goods .hide1").css("display","block");
    },function(){
        $("#goods .hide1").css("display","none");
    });
    $("#goods .c").hover(function(){
        $("#goods .hide2").css("display","block");
    },function(){
        $("#goods .hide2").css("display","none");
    });

//    悬浮出现加入购物车
    $("#main .left .hot .img1").hover(function(){
        $(this).find(".add_car").css("display","block");
    },function(){
        $(this).find(".add_car").css("display","none");
    });

//    点击商品详情 购买评论
    $("#main .right .btn span.detail").click(function(){
        $("#main .right .btn span.buy_comment").css({
            "border-top":"none",
            "color":"#666"
        });
        $("#show_scroll span.buy_comment").css({
            "border-top":"none",
            "color":"#666"
        });
        $(this).css({
            "border-top":"1px solid #ff3300",
            "border-bottom":"1px solid #fff",
            "color":"#ff3300"
        });
        $("#show_scroll span.detail").css({
            "border-top":"1px solid #ff3300",
            "border-bottom":"1px solid #fff",
            "color":"#ff3300"
        });
        //显示详情
        $("#main .right .click_detail").css("display","block");
    });
//    点击购买评论
    $("#main .right .btn span.buy_comment").click(function(){
        $("#main .right .btn span.detail").css({
            "border-top":"none",
            "color":"#666"
        });
        $("#show_scroll span.detail").css({
            "border-top":"none",
            "color":"#666"
        });
        $(this).css({
            "border-top":"1px solid #ff3300",
            "border-bottom":"1px solid #fff",
            "color":"#ff3300"
        });
        $("#show_scroll span.buy_comment").css({
            "border-top":"1px solid #ff3300",
            "border-bottom":"1px solid #fff",
            "color":"#ff3300"
        });
        //隐藏详情
        $("#main .right .click_detail").css("display","none");
        
    });
    
//滚动悬浮点击
$("#show_scroll span.detail").click(function(){
        $("#show_scroll span.buy_comment").css({
            "border-top":"none",
            "color":"#666"
        });
       $("#main .right .btn span.buy_comment").css({
            "border-top":"none",
            "color":"#666"
        });
        
        $(this).css({
            "border-top":"1px solid #ff3300",
            "border-bottom":"1px solid #fff",
            "color":"#ff3300"
        });
        $("#main .right .btn span.detail").css({
            "border-top":"1px solid #ff3300",
            "border-bottom":"1px solid #fff",
            "color":"#ff3300"
        });
        //显示详情
        $("#main .right .click_detail").css("display","block");
    });
    //购买评论
$("#show_scroll span.buy_comment").click(function(){
        $("#show_scroll span.detail").css({
            "border-top":"none",
            "color":"#666"
        });
        $("#main .right .btn span.detail").css({
            "border-top":"none",
            "color":"#666"
        });
        $(this).css({
            "border-top":"1px solid #ff3300",
            "border-bottom":"1px solid #fff",
            "color":"#ff3300"
        });
        $("#main .right .btn span.buy_comment").css({
            "border-top":"1px solid #ff3300",
            "border-bottom":"1px solid #fff",
            "color":"#ff3300"
        });
        //隐藏详情
        $("#main .right .click_detail").css("display","none");
    });
  //滚动一定距离出现商品详情和用户评论
  $(window).scroll(function(){
  	if($(window).scrollTop()>800){
  		$("#show_scroll").css("display","block");
  	}else{
  		$("#show_scroll").css("display","none");
  	}
  });
    
    
  //点击加入购物车
  //var _num=0;
  (function(){
  	
  	$("#goods .center .buy .car").click(function(){
  	//先获取购物车相对窗口的偏移距离 $(this).offset().left是相对网页的偏移距离
  	var _x=$(this).offset().left+10;
  	var _y=$(this).offset().top-$(window).scrollTop();
  	//创建小商品
  	$(this).append($("<img src='images/car/2627_50.jpg'/>").css({
  		"border":"1px solid red",
  		"position":"fixed",
  		"left":_x,
  		"top":_y
  	}));
  	//移动小商品
  	$(this).find("img").animate({
  		"top":"230",
  		"left":"1190"
  	},function(){
  		$(this).animate({
  			"top":"305"
  		},function(){
  			$(this).remove();//删除这个节点
  		})
  	});
  	//把这个商品信息存入cookie（用cookie）
  	//_num++;
  	if(document.cookie!=""){
	  	var _cookie=document.cookie.split(";");
	  	var _flag=false;
	  	for(var n=0;n<_cookie.length;n++){
	  		if(_cookie[n].match(/\d+/g)[0]==10){
	  			var _num=JSON.parse(_cookie[n].replace(/\d+=/g,"")).num;
	  			_num++;
	  			document.cookie="10={\""+"num\":"+_num+","+"\"price\":"+2+"}";
	  			_flag=true;
	  		}
	  	}
	  	if(!_flag){
	  		document.cookie="10={\""+"num\":"+1+","+"\"price\":"+2+"}";
	  	}
	  	//document.cookie="10={\""+"num\":"+_num+","+"\"price\":"+2+"}";
	  	//console.log(document.cookie);
	}else{
		document.cookie="10={\""+"num\":"+1+","+"\"price\":"+2+"}";
	}
  	//刷新购物车
  	if($("#car").css("display")=="block"){
  		$(".show_car").load("car.html");
  	}
  });
  })();
  
    
    
   
});



































