$(function() {
	var a=0,b=0,c=0;
	verify()
	//register
	register();
});

//验证
function verify() {
	var _reg={
        "account":/^\w{6,12}$/g,//验证用户账号的长度够不够，并且限制只能字母数字下横线
        "mobile":/^1[345678]\d{9}$/g,//验证手机号
        "mail":/^\w+@([a-z0-9-]+\.)+[a-z]+$/gi,//验证邮箱
        "secret":/^.{6,20}$/g //验证密码
    }
	//blur时
	$("#mobile").on("blur",function() {
		if ($(this).val()=="") {
			$(this).css("border","1px solid red");
			$(this).parents().children().children(".error").css("display","block");
			$(this).parents().children().children(".msg_error").html("请输入手机号");
			$(this).parents().children().children(".msg_error").css({"color":"red","display":"block"});
		} else {
			_reg.mobile.lastIndex=0;
			if(_reg.mobile.test($(this).val())) {
				var _self=this;
				$.post("../api/checkUser.php",{"condition": "user='" + this.value + "'"}, function (data,textStatus) {
					if (textStatus=="success" && parseInt(data) > 0) {
						//已经存在此用户
						$(_self).css("border","1px solid #c6c6c6");
						$(_self).parents().children().children(".error").css({"background-position-x":"-20px","display":"block"});
						$(_self).parents().children().children(".msg_error").css({"color":"#00f","display":"block"});
						$(_self).parents().children().children(".msg_error").html("此手机号已注册，请直接登录。");
						a=0;
					}else{
						//手机号可用
						$(_self).css("border","1px solid #c6c6c6");
						$(_self).parents().children().children(".error").css({"background-position-x":"-40px","display":"block"});
						$(_self).parents().children().children(".msg_error").css("display","none");
						a=1;
					}
				});
			}else{
				$(this).css("border","1px solid red");
				$(this).parents().children().children(".error").css("display","block");
				$(this).parents().children().children(".msg_error").html("请输入正确的手机号");
				$(this).parents().children().children(".msg_error").css({"color":"red","display":"block"});
			}
		}
	});
	$("#password").on("blur",function() {
		if ($(this).val()=="") {
			$(this).css("border","1px solid red");
			$(this).parents().children().children(".error").css("display","block");
			$(this).parents().children().children(".msg_error").html("请输入密码");
			$(this).parents().children().children(".msg_error").css({"color":"red","display":"block"});
		} else {
			_reg.secret.lastIndex=0;
			if(_reg.secret.test($(this).val())) {
				var _self=this;
				//密码可用
				$(_self).css("border","1px solid #c6c6c6");
				$(_self).parents().children().children(".error").css({"background-position-x":"-40px","display":"block"});
				$(_self).parents().children().children(".msg_error").css("display","none");
				b=1;
			}else{
				$(this).css("border","1px solid red");
				$(this).parents().children().children(".error").css("display","block");
				$(this).parents().children().children(".msg_error").html("密码格式不合规范");
				$(this).parents().children().children(".msg_error").css({"color":"red","display":"block"});
				b=0;
			}
		}
	});
	$("#confirm_password").on("blur",function() {
		if ($(this).val()=="") {
			$(this).css("border","1px solid red");
			$(this).parents().children().children(".error").css("display","block");
			$(this).parents().children().children(".msg_error").html("请输入确认密码");
			$(this).parents().children().children(".msg_error").css({"color":"red","display":"block"});
		} else {
			if($("#password").val()===$(this).val()) {
				var _self=this;
				//密码可用
				$(_self).css("border","1px solid #c6c6c6");
				$(_self).parents().children().children(".error").css({"background-position-x":"-40px","display":"block"});
				$(_self).parents().children().children(".msg_error").css("display","none");
				c=1;
			}else{
				$(this).css("border","1px solid red");
				$(this).parents().children().children(".error").css("display","block");
				$(this).parents().children().children(".msg_error").html("两次输入密码不一致");
				$(this).parents().children().children(".msg_error").css({"color":"red","display":"block"});
				c=0;
			}
		}
	});
	//获得焦点
	$("#mobile").on("focus",function() {
		$(this).css("border","1px solid #333");
		$(this).parents().children().children(".msg_error").html("请输入11位手机号");
		$(this).parents().children().children(".msg_error").css({"color":"#666","display":"block"});
	});
	$("#password").on("focus",function() {
		$(this).css("border","1px solid #333");
		$(this).parents().children().children(".msg_error").html("6-16个数字、字母或符号，字母区分大小写");
		$(this).parents().children().children(".msg_error").css({"color":"#666","display":"block"});
	});
	$("#confirm_password").on("focus",function() {
		$(this).css("border","1px solid #333");
		$(this).parents().children().children(".msg_error").html("请再次输入密码");
		$(this).parents().children().children(".msg_error").css({"color":"#666","display":"block"});
	});
}
//登录
function register() {
	$("#sub").click(function () {
		var _params={
			"user":$("#mobile").val(),
			"mobile":$("#mobile").val(),
			"mail":"874968552@qq.com",
			"secret":$("#password").val(),
			"name":"茹孟凯"
		};
		if (a==1&&b==1&c==1) {
			$.post("../api/registerUser.php", _params, function (data,textStatus) {
				if (textStatus=="success" && parseInt(data) > 0) {
					alert("恭喜您，您已顺利成为会员！！！");
					window.location.href="index.html";
				} else {
					alert("尊敬的用户您好，您注册会员操作失败，请重试，或者联系管理员！！！");
				}
			});
		}
	});
}