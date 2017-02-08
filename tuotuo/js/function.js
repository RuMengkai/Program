/**
 * Created by Administrator on 2017/1/11.
 */
//拖拽构造函数（功能：通过拖动子元素实现父元素在整个body页面中移动,父元素要绝对定位）
function Drag(ele){
    this.documentWidth=document.documentElement.clientWidth||document.body.clientWidth;
    this.documentHeight=document.documentElement.clientHeight||document.body.clientHeight;
    var _this=this;
    this.drag=function(){
        $(ele).mousedown(function(e){
            var _e=e||window.event;
            var _disx=_e.clientX-$(ele).parent()[0].offsetLeft;
            var _disy=_e.clientY-$(ele).parent()[0].offsetTop;
            document.onmousemove=function(e){
                var _e=e||window.event;
                var _x=_e.clientX-_disx;
                var _y=_e.clientY-_disy;
                if(_x<0){
                    _x=0;
                }
                if(_x>_this.documentWidth-$(ele).parent()[0].offsetWidth){
                    _x=_this.documentWidth-$(ele).parent()[0].offsetWidth;
                }
                if(_y<0){
                    _y=0;
                }
                if(_y>_this.documentHeight-$(ele).parent()[0].offsetHeight){
                    _y=_this.documentHeight-$(ele).parent()[0].offsetHeight;
                }
                $(ele).parent().css({
                    left:_x,
                    top:_y
                });
            };
        });
        document.onmouseup=function(){
            document.onmousemove=null;
        };
    }
}
//动画构造函数，最终值等于目标值
/*
new Animate($("#test"),{
"left":"300px",
    "top":"290px",
    "width":"300px",
    "height":"250px",
    "padding":"46px",
    "opacity":50
});*/

function Animate(ele,json){
    this.speed=0;
    this.current=0;
    var _this=this;
    this.timer=0;
    var _arrTarget=[];//保存目标值
    var _arrCurrent=[];//保存当前值
    var _arrKey=[];//保存key
    this.flag=true;
    for(var k in json){
        _arrTarget.push(parseInt(json[k]));
        _arrKey.push(k);
    }
    this.move=function(){
        clearTimeout(_this.timer);
        for(var key in json){
            _arrCurrent=[];
            //循环每个key时获取当前值
            for(var x=0;x<_arrKey.length;x++){
                if(_arrKey[x]=="opacity"){
                    _this.current=parseFloat(getStyle(ele[0],_arrKey[x]))*100;
                }else{
                    _this.current=parseInt(getStyle(ele[0],_arrKey[x])=="auto"?0:getStyle(ele[0],_arrKey[x]));
                }
                _arrCurrent.push(_this.current);
            }
            //求出当前值和当前速度
            if(key=="opacity"){
                _this.current=parseFloat(getStyle(ele[0],key))*100;
                _this.speed=(parseInt(json[key])-_this.current)/8;
            }else{
                _this.current=parseInt(getStyle(ele[0],key)=="auto"?0:getStyle(ele[0],key));
                _this.speed=(parseInt(json[key])-_this.current)/8;
            }
            //判断速度
            _this.speed=_this.speed>0 ? Math.ceil(_this.speed) : Math.floor(_this.speed);
            //循环判断每一个当期值和对应的目标值是否相等
            for(var i=0;i<_arrTarget.length;i++){
                if(_arrCurrent[i]!=_arrTarget[i]){
                    _this.flag=false;
                    break;
                }else{
                    _this.flag=true;
                }
            }
            //若不等变化
            if(!_this.flag){
                if(key=="opacity"){
                    ele[0].style.opacity=(_this.current+_this.speed)/100;
                    ele[0].style.filter="alpha(opacity:"+(_this.current+_this.speed)+")";
                }else{
                    ele[0].style[key]=_this.current+_this.speed+"px";
                }
            }
        }
        //若不等继续循环
        if(!_this.flag){
            _this.timer=setTimeout(_this.move,30);
        }
    }
    this.move();
}

//获取样式
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,null)[attr];
    }
}
//




//公共部分
$(function(){
	var phone_flag=true;
	var pw_flag=true;
//验证邮箱地址/卡号/手机号
function yan_phone(){
        var _value=$(".user_text").val();
        if(_value==""){//为空
        	phone_flag=false;
            $(".user_void").css("display","block");//显示用户名不能为空
            $(".user_fail").css("display","block");//显示错误图
            $(".user_no_exist").css("display","none");//隐藏不存在
            $(".user_success").css("display","none");//隐藏正确图
            $(".user_text").css("borderColor","#F97D7D");//边框为粉色
        }else{//不为空
        	phone_flag=true;
            $(".user_success").css("display","block");//显示正确图
            $(".user_text").css("borderColor","#5fca9c");//边框为绿色
            $(".user_void").css("display","none");//隐藏用户名不能为空
            $(".user_fail").css("display","none");//隐藏错误图
            $(".user_no_exist").css("display","none");//隐藏不存在
        }
    }
//验证密码
function yan_pw(){
        var _value=$(".password_text").val();
        var _reg=/.{6,12}/g;
        if(_value==""){//为空
        	pw_flag=false;
            $(".password_void").css("display","block");//显示请输入密码
            $(".password_fail").css("display","block");//显示错误图
            $(".password_text").css("borderColor","#F97D7D");//边框为粉色
            $(".password_success").css("display","none");//隐藏正确图
            $(".password_no_exist").css("display","none");//隐藏您输入的密码错误
            $(".password_format").css("display","none");//隐藏格式密码
        }else{//不为空
            if(_reg.test(_value)){//验证通过
            	pw_flag=true;
                $(".password_success").css("display","block");//显示正确图
                $(".password_text").css("borderColor","#5fca9c");//边框为绿色
                $(".password_void").css("display","none");//隐藏请输入密码
                $(".password_fail").css("display","none");//隐藏错误图
                $(".password_no_exist").css("display","none");//隐藏您输入的密码错误
                $(".password_format").css("display","none");//隐藏格式密码
            }else{//不通过
            	pw_flag=false;
                $(".password_format").css("display","block");//显示格式密码
                $(".password_text").css("borderColor","#F97D7D");//边框为粉色
                $(".password_fail").css("display","block");//显示错误图
                $(".password_success").css("display","none");//隐藏正确图
                $(".password_no_exist").css("display","none");//隐藏您输入的密码错误
                $(".password_void").css("display","none");//隐藏请输入密码
            }
        }
    }
//点击登录，出现登录页面
$("#login .login").click(function(){
    var documentWidth=document.documentElement.clientWidth||document.body.clientWidth;
    var _scrollTop=document.body.scrollTop;
    var documentHeight=document.documentElement.clientHeight||document.body.clientHeight;//可见区域高度
    var _webHeight=document.body.scrollHeight;//网页高度
    //遮罩层出现
    $("#zhegai").css("height",_webHeight+"px").css("display","block");
    // //禁止窗口滚动
    // $(window).scroll(function(){
    //     $(this).scrollTop(0);
    // });
    //登录页面跳出
    $("#loginPage").css({
        display:"block",
        left:Math.floor(documentWidth/2-467/2),
        top:Math.floor(documentHeight/2-456/2+_scrollTop)
    });
    //实现登录页面拖拽
    new Drag("#loginPage .drag").drag();
    //关闭登录页面
    $("#loginPage .drag .close").hover(function(){
        $(this).attr("src","images/close2.png");
    },function(){
        $(this).attr("src","images/close1.png");
    });
    $("#loginPage .drag .close").click(function(){
        $("#loginPage").hide();//隐藏登录页面
        $("#zhegai").hide();//隐藏遮罩层
    });
    //点击短信快捷登录，滚动到短信快捷登录
    $("#loginPage .message .message_login1").click(function(){
        $("#loginPage .move_box").animate({"left":"-395px"});
    });
    //点击返回普通登录。返回到普通登录
    $("#loginPage .message .message_login2").click(function(){
        $("#loginPage .move_box").animate({"left":"36px"});
    });
    //验证左边
    //先去掉所有文本框的外轮廓
    $(".user_text").css("outline","none");
    $(".password_text").css("outline","none");
    //验证邮箱地址/卡号/手机号
    $(".user_text").blur(yan_phone);
    //验证密码
    $(".password_text").blur(yan_pw);

    //验证右边
    //先去掉文本框的外轮廓
    $(".phone_text").css("outline","none");
    $(".ma_text").css("outline","none");
    //验证手机号
    $(".phone_text").blur(function(){
        var _value=$(this).val();
        var _reg=/^1\d{10}$/g;
        if(_value==""){//为空
            $(".phone_num_wrong").css("display","block");//显示错误图
            $(".phone_void").css("display","block");//显示手机号不能为空
            $(this).css("borderColor","#F97D7D");//边框为粉色
            $(".phone_format").css("display","none");//隐藏格式
            $(".phone_num_right").css("display","none");//隐藏正确图
        }else{//不为空
            if(_reg.test(_value)){//验证通过
                $(".phone_num_right").css("display","block");//显示正确图
                $(this).css("borderColor","#5fca9c");//边框为绿色
                $(".phone_num_wrong").css("display","none");//隐藏错误图
                $(".phone_void").css("display","none");//隐藏手机号不能为空
                $(".phone_format").css("display","none");//隐藏格式
            }else{//没有通过
                $(".phone_num_wrong").css("display","block");//显示错误图
                $(this).css("borderColor","#F97D7D");//边框为粉色
                $(".phone_format").css("display","block");//显示格式
                $(".phone_num_right").css("display","none");//隐藏正确图
                $(".phone_void").css("display","none");//隐藏手机号不能为空
            }
        }
    });
    //验证手机验证码
    $(".ma_text").blur(function(){
        var _value=$(this).val();
        if(_value==""){//为空
            $(".phone_yan_wrong").css("display","block");//显示错误图
            $(this).css("borderColor","#F97D7D");//边框为粉色
            $(".phone_ma").css("display","block");//显示请填写短信验证码
            $(".phone_yan_right").css("display","none");//隐藏正确图
            $(".phone_fail").css("display","none");//隐藏验证码错误
        }else{//不为空
            if(_value.length<6){
                $(".phone_yan_wrong").css("display","block");//显示错误图
                $(this).css("borderColor","#F97D7D");//边框为粉色
                $(".phone_ma").css("display","none");//隐藏请填写短信验证码
                $(".phone_yan_right").css("display","none");//隐藏正确图
                $(".phone_fail").css("display","none");//隐藏验证码错误
            }
        }
    });
    //手机验证码是否为6位
    $(".ma_text").focus(function(){
        var _timer=setInterval(function(){
            var _value=$(".ma_text").val();
            if (_value.length == 6) {
                $(".phone_yan_wrong").css("display", "none");//显示正确图
                $(".ma_text").css("borderColor", "#5fca9c");//边框为绿色
                $(".phone_fail").css("display", "none");//隐藏验证码错误
                $(".phone_ma").css("display", "none");//隐藏请填写短信验证码
                $(".phone_yan_wrong").css("display", "none");//隐藏错误图
                clearInterval(_timer);
            }
        },30);
    });
});

//悬浮改变小手机图片
    $(".phone_tuo").hover(function(){
        $(".phone_tuo img").attr("src","images/icon_new2.png");
    },function(){
        $(".phone_tuo img").attr("src","images/icon_new1.png");
    });
    //悬浮出现手机沱沱下面的菜单
    $(".nav_two").hover(function(){
        $(".phone_apple").css("display","block");
    },function(){
        $(".phone_apple").css("display","none");
    });
    //鼠标悬浮我的沱沱出现下拉菜单
    $(".nav_three").hover(function(){
        $(".my_tuotuo").css("display","block");
    },function(){
        $(".my_tuotuo").css("display","none");
    });

    //广告
    //网页打开后，延时向下滑动出现
    $("#gg").delay(2000).slideDown(1000);
    //点击关闭按钮消失
    $("#gg .close").click(function(){
        $("#gg").slideUp(1000);
    });

    $(".search_input").focus(function(){
        $(this).css("outline","none");
    })

//右下固定部分
    $("#fixed .box").hover(function(){
        $(this).find("span").css("color","#80132a");
    },function(){
        $(this).find("span").css("color","");
    });

    $("#fixed .box").eq(0).hover(function(){
        $(this).find("img").attr("src","images/ico_05_h.png");
    },function(){
        $(this).find("img").attr("src","images/ico_05.png");
    });
    //点击购物车
	$("#fixed .box").eq(0).click(function(){
		$(".show_car").css("display","block").load("car.html");
	});
	
    $("#fixed .box").eq(1).hover(function(){
        $(this).find("img").attr("src","images/ico_04_h.png");
    },function(){
        $(this).find("img").attr("src","images/ico_04.png");
    });

    $("#fixed .box").eq(2).hover(function(){
        $(this).find("img").attr("src","images/ico_03_h.png");
    },function(){
        $(this).find("img").attr("src","images/ico_03.png");
    });
    $("#fixed .box").eq(3).hover(function(){
        $(this).find("img").attr("src","images/ico_02_h.png");
    },function(){
        $(this).find("img").attr("src","images/ico_02.png");
    });


    $("#fixed .box").eq(4).hover(function(){
        $(this).find("img").attr("src","images/ico_01_h.png");
    },function(){
        $(this).find("img").attr("src","images/ico_01.png");
    });


    $("#fixed .back").hover(function(){
        $(this).find("img").attr("src","images/top_h.png");
    },function(){
        $(this).find("img").attr("src","images/top.png");
    });


    $("#fixed .back").click(function(){
        var _scrollTop=$(window).scrollTop();
        var _timer=0;
        (function move(){
            clearTimeout(_timer);
            _scrollTop-=100;
            if(_scrollTop>=0){
                $(document).scrollTop(_scrollTop);
                _timer=setTimeout(move,30);
            }
        })();
    });
//当滚动一定高度时，让回到顶部出现
    $(window).scroll(function(){
        //console.log(typeof($("#fixed .back").css("opacity")));//string
        if($(window).scrollTop()>1000){
            //console.log($(window).scrollTop());
            //if($("#fixed .back").css("opacity")==0){//如果不加这句话，会有动画队列不断执行，所有小于1000时如果有动画队列没执行完，会闪动
            $("#fixed .back").animate({"opacity":1},function(){console.log("dd")});//每次滚动都会触发事件，影响性能，可优化
            //}
        }else{
            $("#fixed .back").finish().css("opacity",'0');

//停止所有在指定元素上正在运行的动画。
// 如果队列中有等待执行的动画(并且clearQueue没有设为true)，他们将被马上执行
        }
    });
    
    
    
    //登录
    $(".button").click(function(){
    	yan_phone();
    	yan_pw();
    	if(pw_flag && phone_flag){
    		var _phone=$(".user_text").val();
    		var _pw=$(".password_text").val();
    		$.ajax({
    			type:"post",
    			url:"login.php",
    			async:true,
    			data:"phone="+_phone+"&password="+_pw,
    			success:function(data){
    				if(data==1){
    					alert("登录成功");
    				}else{
    					alert("用户名不存在或密码不正确");
    				}
    			}
    		});
    	}
    });
});












