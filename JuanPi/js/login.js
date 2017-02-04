$(function() {
	$("#account").on("blur",function() {
		if ($(this).val()=="") {
			$(this).parents(".box_border").css("border","1px solid red");
			$("#account_warn").css("display","block");
		} else {
			$(this).parents(".box_border").css("border","1px solid #c6c6c6");
			$("#account_warn").css("display","none");
		}
	});
	$("#account").on("focus",function() {
		$(this).parents(".box_border").css("border","1px solid #333");
	});
	$("#inter_code").on("blur",function() {
		if ($(this).val()=="") {
			$("#password_warn .msg_error").html("密码不能为空");
			$(this).parents().children(".box_border").css("border","1px solid red");
			$("#password_warn").css("display","block");
		} else {
			$(this).parents(".box_border").css("border","1px solid #c6c6c6");
			$("#password_warn").css("display","none");
		}
	});
	$("#inter_code").on("focus",function() {
		$(this).parents(".box_border").css("border","1px solid #333");
	});

	sign();
});

//登录
function sign() {
	$("#sign").click(function () {
		var user=$("#account").val();
		var pwd_f = $("#inter_code").val();
		var _params = {
			"user": user,
			"password": pwd_f
		};
		$.post("../api/login.php", _params, function (data,textStatus) {
			data=JSON.parse(data);
			try{
				if(data=="0"){
					$(".box_border").css("border","1px solid red");
					$("#password_warn .msg_error").html("用户名或密码不正确");
					$("#password_warn").css("display","block");
				}else{
					alert("欢迎:"+data["name"]+" 光顾!!");
					// console.log(data);
					window.location.href="index.html";
				}
			}catch (e){
				alert("非法操作");
			}
		});
	});
}