/**
 * Created by Administrator on 2017/1/12.
 */
$(function(){
	var phone_flag=true;
	var pw_flag=true;
	var re_pw_flag=true;
    //点击切换个人用户和企业用户
    //点击企业用户
    $(".main_box .main .title .company_user").click(function(){
        $(".main_box .main .section").css("display","none");//隐藏个人用户
        $(".main_box .main .company").css("display","block");//显示企业用户
        $(this).css("color","#ff3300");//企业用户变颜色
        $(".main_box .main .title .personal_user").css("color","#999");//个人用户变颜色
        $(".main_box .main .title .move").css("left","160px");//下面的红条移动
    });
    //点击个人用户
    $(".main_box .main .title .personal_user").click(function(){
        $(".main_box .main .section").css("display","block");//显示个人用户
        $(".main_box .main .company").css("display","none");//隐藏企业用户
        $(this).css("color","#ff3300");//个人用户变颜色
        $(".main_box .main .title .company_user").css("color","#999");//企业用户变颜色
        $(".main_box .main .title .move").css("left","0px");//下面的红条移动
    });
    //点击按钮切换显示 您必须同意沱沱工社用户协议才能注册
    $(".main_box .main .section .left p input").change(function(){
        if($(".main_box .main .section .left span.regular").css("display")=="none"){
            $(".main_box .main .section .left span.regular").css("display","block");
        }else{
            $(".main_box .main .section .left span.regular").css("display","none");
        }
    });
    //验证表单
    //所有的文本框获得焦点时，去掉轮廓边框
    //手机号
    $(".phone_num").focus(function(){
        $(this).css("outline","none");
    });
    //密码框
    $(".password_num").focus(function(){
        $(this).css("outline","none");
    });
    //确认密码框
    $(".repeat_password").focus(function(){
        $(this).css("outline","none");
    });
    //图片验证码
    $(".img_ma").focus(function(){
        $(this).css("outline","none");
    });
    //手机验证码
    $(".phone_ma").focus(function(){
        $(this).css("outline","none");
    });
    //1 验证手机号
    $(".phone_num").blur(yan_phone);
    //验证手机号函数
    function yan_phone(){
        var _value=$(".phone_num").val();
        var _reg=/^1\d{10}$/g;
        if(_value==""){//手机号为空
        	phone_flag=false;
            $(".phone_void").css("display","block");//显示空字
            $(".phone_format").css("display","none");//隐藏格式字
            $(".phone_fail").css("display","block");//显示错误图片
            $(".phone_success").css("display","none");//隐藏正确图片
            $(this).css("borderColor","#F97D7D");//验证失败边框为红色
        }else{
            if(_reg.test(_value)){//验证成功
            	phone_flag=true;
                $(".phone_format").css("display","none");//隐藏格式字
                $(".phone_void").css("display","none");//隐藏空字
                $(".phone_fail").css("display","none");//隐藏错误图片
                $(".phone_success").css("display","block");//显示正确图片
                $(this).css("borderColor","#5fca9c");//验证成功边框为绿色
                //执行显示验证码函数
                show_ma();
            }else{//没有验证成功
            	phone_flag=false;
                $(".phone_format").css("display","block");//显示格式字
                $(".phone_fail").css("display","block");//显示错误图片
                $(".phone_void").css("display","none");//隐藏空字
                $(".phone_success").css("display","none");//隐藏正确图片
                $(this).css("borderColor","#F97D7D");//验证失败边框为红色
            }
        }
    }
    //显示验证码函数
    function show_ma(){
        $(".phone_big").slideDown();
        $(".img_ma").blur(function(){
            var _value=$(this).val();
            if(_value==""){//验证码为空
                $(".yan_fail").css("display","block");//显示错误图片
                $(".yan_success").css("display","none");//隐藏正确图片
                $(".yan_font_void").css("display","block");//显示不能为空字
                $(".yan_font_fail").css("display","none");//隐藏正确格式
                $(".yan_font_reg").css("display","none");//隐藏校验失败
                $(this).css("borderColor","#F97D7D");//验证失败边框为红色
            }else{
                if(_value.length<4){//失去焦点，长度小于4时
                    $(".yan_fail").css("display","block");//显示错误图片
                    $(".yan_font_reg").css("display","none");//隐藏校验失败
                    $(".yan_success").css("display","none");//隐藏正确图片
                    $(".yan_font_fail").css("display","block");//显示正确格式
                    $(".yan_font_void").css("display","none");//隐藏不能为空字
                    $(this).css("borderColor","#F97D7D");//验证失败边框为红色
                }
            }
        });
        //当输入4位时，会自动判断，change事件失效，用定时器，或得焦点时不断循环函数，验证成功时关闭定时器
        //解决change无效的方式
        $(".img_ma").on("focus",function(){
            console.log("dsd");
            var _timer=0;
            function start(){
                var _value=$(".img_ma").val();
                var _reg=/t4p6/gi;
                if(_value.length==4){
                    if(_reg.test(_value)){//验证通过
                        $(".yan_success").css("display","block");//显示正确图片
                        $(".yan_fail").css("display","none");//隐藏错误图片
                        $(".yan_font_fail").css("display","none");//隐藏正确格式
                        $(".yan_font_void").css("display","none");//隐藏不能为空字
                        $(".yan_font_reg").css("display","none");//隐藏校验失败
                        $(".img_ma").css("borderColor","#5fca9c");//验证成功边框为绿色
                        clearInterval(_timer);//验证通过关闭定时器
                        //验证通过执行切换函数，切换到手机验证码
                        phoneMa();
                    }else{
                        $(".yan_fail").css("display","block");//显示错误图片
                        $(".yan_success").css("display","none");//隐藏正确图片
                        $(".yan_font_void").css("display","none");//隐藏不能为空字
                        $(".yan_font_fail").css("display","none");//隐藏正确格式
                        $(".yan_font_reg").css("display","block");//显示校验失败
                        $(".img_ma").css("borderColor","#F97D7D");//验证失败边框为红色
                    }
                }
            }
            _timer=setInterval(start,30);
        });
    }
    //切换到手机验证码
    //注意：1用animate给元素添加绝对定位属性才有效
    // 2 input里面的东西和下面的提示字要以当前input所属的父元素为基准定位
    function phoneMa(){
        //隐藏未收到短信?切换语音验证码
        $(".song").css("display","none");
        //移动图形验证码，和手机验证码
        $(".yan_box_left").animate({
            "left":"-380px"
        });
        $(".yan_box_right").animate({
            "left":"-5px"
        });
        //显示验证码发送成功
        $(".yan_send").css("display","block");
        //把手机验证码的内容置为空
        $(".phone_ma").val("");
        //隐藏所有提示内容
        $(".phone_ma_void").css("display","none");//隐藏不能为空
        $(".phone_ma_fail").css("display","none");//隐藏错误图片
        $(".phone_ma_false").css("display","none");//隐藏错误提示
        $(".phone_ma").css("borderColor","#999");//边框改为原来颜色
        //设置为计时文本
        $(".time_yan").html("<i class='time_font'style='font-style: normal;background: #dcdcdc;color: #000;'>60秒重新发送</i>").css("background","#dcdcdc");
        //开始计时
        var _setTime=60;
        var _timer=0;
        _timer=setInterval(function(){
            $(".time_font").html(function(){
                _setTime--;
                if(_setTime>0){
                    return _setTime+"秒重新发送";
                }else{
                    clearInterval(_timer);
                    //显示未收到短信?切换语音验证码
                    $(".song").css("display","block");
                    //改变自身样式
                    $(".time_yan").html("发送验证码").css({
                        "backgroundColor":"#5FCA9C",
                        "color":"#fff",
                        "cursor":"pointer"
                    }).hover(function(){
                        $(this).css("backgroundColor","#128c57");
                    },function(){
                        $(this).css("backgroundColor","#5FCA9C");
                    }).click(function(){
                        $(".yan_box_left").animate({
                            "left":"0px"
                        });
                        $(".yan_box_right").animate({
                            "left":"380px"
                        });
                        $(".img_ma").val("");//value值置为空
                        $(".yan_success").css("display","none");//隐藏正确图片
                        $(".img_ma").css("borderColor","#999");//边框改为原来颜色
                        show_ma();
                    });
                }
            });
        },1000);
        //验证手机验证码
        $(".phone_ma").blur(function(){
            var _value=$(this).val();
            if(_value==""){//为空
                $(".phone_ma_void").css("display","block");//显示不能为空
                $(".phone_ma_fail").css("display","block");//显示错误图片
                $(".phone_ma_success").css("display","none");//隐藏正确图片
                $(".yan_send").css("display","none");//隐藏验证码发送成功
                $(".phone_ma_false").css("display","none");//隐藏错误提示
                $(this).css("borderColor","#F97D7D");//验证失败边框为红色
            }else{
                if(_value=="123456"){//验证成功
                    $(".phone_ma_success").css("display","block");//显示正确图片
                    $(this).css("borderColor","#5fca9c");//验证成功边框为绿色
                    $(".phone_ma_false").css("display","none");//隐藏错误提示
                    $(".yan_send").css("display","none");//隐藏验证码发送成功
                    $(".phone_ma_fail").css("display","none");//隐藏错误图片
                    $(".phone_ma_void").css("display","none");//隐藏不能为空
                }else{//验证失败
                    $(".phone_ma_fail").css("display","block");//显示错误图片
                    $(".phone_ma_false").css("display","block");//显示错误提示
                    $(".phone_ma_success").css("display","none");//隐藏正确图片
                    $(this).css("borderColor","#F97D7D");//验证失败边框为红色
                    $(".yan_send").css("display","none");//隐藏验证码发送成功
                    $(".phone_ma_void").css("display","none");//隐藏不能为空
                }
            }
        });
    }
   // phoneMa();
    //验证密码
    $(".password_num").blur(yan_pw);
    //验证密码函数
    function yan_pw(){
        var _value=$(".password_num").val();
        var _reg=/.{6,12}/g;
        if(_value==""){//密码为空
        	pw_flag=false;
            $(".password_void").css("display","block");//显示空字
            $(".password_fail").css("display","block");//显示错误图片
            $(".password_success").css("display","none");//隐藏正确图片
            $(".password_format").css("display","none");//隐藏格式字
            $(this).css("borderColor","#F97D7D");//验证失败边框为红色
        }else{
            if(_reg.test(_value)){//验证通过
            	pw_flag=true;
                $(".password_success").css("display","block");//显示正确图片
                $(".password_format").css("display","none");//隐藏格式字
                $(".password_void").css("display","none");//隐藏空字
                $(".password_fail").css("display","none");//隐藏错误图片
                $(this).css("borderColor","#5fca9c");//验证成功边框为绿色
            }else{//验证失败
            	pw_flag=false;
                $(".password_format").css("display","block");//显示格式字
                $(".password_fail").css("display","block");//显示错误图片
                $(".password_void").css("display","none");//隐藏空字
                $(".password_success").css("display","none");//隐藏正确图片
                $(this).css("borderColor","#F97D7D");//验证失败边框为红色
            }
        }
    }
    //确认密码
    $(".repeat_password").blur(re_pw);
	//确认密码函数
	function re_pw(){
        var _valueSelf=$(".repeat_password").val();//自己的值
        var _valuePre=$(".password_num").val();
        if(_valueSelf==""){//确认密码为空
        	re_pw_flag=false;
            $(".confirm").css("display","block");//显示确认密码
            $(".repeat_fail").css("display","block");//显示错误图片
            $(".repeat_success").css("display","none");//隐藏正确图片
            $(".judge").css("display","none");//隐藏格式字
            $(this).css("borderColor","#F97D7D");//验证失败边框为红色
        }else{
            if(_valueSelf==_valuePre){//两次输入密码一致
            	re_pw_flag=true;
                $(".repeat_success").css("display","block");//显示正确图片
                $(".judge").css("display","none");//隐藏格式字
                $(".confirm").css("display","none");//隐藏确认密码
                $(".repeat_fail").css("display","none");//隐藏错误图片
                $(this).css("borderColor","#5fca9c");//验证成功边框为绿色
            }else{//两次输入密码不一致
            	re_pw_flag=false;
                $(".judge").css("display","block");//显示格式字
                $(".repeat_fail").css("display","block");//显示错误图片
                $(".repeat_success").css("display","none");//隐藏正确图片
                $(".confirm").css("display","none");//隐藏确认密码
                $(this).css("borderColor","#F97D7D");//验证失败边框为红色
            }
        }
    }
	//点击注册把数据保存到数据库
	$(".button").click(function(){
		//验证手机号
		yan_phone();
		//验证密码
		yan_pw();
		//确认密码
		re_pw();
		if(phone_flag && pw_flag && re_pw_flag){
			//把值添加到数据库
			var _phone=$(".phone_num").val();//手机号
			var _pw=$(".password_num").val();//密码
			$.ajax({
				type:"post",
				url:"register.php",
				async:true,
				data:"phone="+_phone+"&password="+_pw,
				success:function(msg){	
					if(msg==0){
						alert("此用户名已存在");
					}else if(msg==1){
						alert("注册成功");
					}
				}
			});
		}
	});


})






//17185383702