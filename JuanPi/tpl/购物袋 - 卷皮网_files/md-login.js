;
(function(a) {
    var f = {};
    /**
     * fangfang id为'alert_login'的已经更改为'alert_landing',此函数的功能应为当用户名存在时，
     用户名输入框显示其用户名
     * @param {}
     * @time 2014-02-10
     */
    XD.autoGetUsername = function() {
        var un = "s_name";
        var user = XDTOOL.getCookie(un);
        user = decodeURIComponent(user);
        obj = $("#alert_landing input[name='username']");
        if (user) {
            if (obj.val() == "注册时用户名/邮箱" || obj.val() == "") {
                obj.val(user);
            }
            $("#alert_landing input[name='password']").focus();
        }
    };
    /**
     * fangfang 用户未登录时，点击签到，弹出登录框
     * @param {}
     * @time 2014-02-10
     */
    XD.user_handsome_login_init = function(b) {
        if(typeof b == 'undefined'){
            b = '';
        }
        a(".alert_bg").remove();
        var acturl = __HTTPS_MEMBER__ + '/login/index';
        var quickurl= __HTTPS_MEMBER__+'/quicklogin';
        var returnurl=document.URL;
        f = new XDLightBox({
            title: "",
            lightBoxId: "alert_landing",
            isBgClickClose:false,
            //ifream登录方式
            contentHtml: '<iframe style="width:502px;height:416px;" name="login-frame-container" frameborder="0" scrolling="no"  class="content-landing" src="' + acturl + '?style=2&returnurl='+returnurl+'&reg='+b+'"></iframe>'
                    + '<div class="direct-go" style="display: none;"><a href="">暂不登录，继续前往&gt;&gt;</a></div>',
            scroll: true
        });
        f.init();
        $.getJSON(__URL_MEMBER__ + "/Login/checkAllwaysVerify?callback=?", function(data) {
            if (typeof (data) != "undefined " && data != 0) {
            }
        });
        a("#alert_landing .alert_top span").addClass("jp-alert-logo");
        a("#alert_landing input[name='username']").focus();
        a("#alert_landing input[name='username']").parents(".user").addClass("input-active");
        a("#alert_landing input[name='username']").val("");
        a('a.more').on("click", function() {
            $(this).find('em').toggleClass("login-cur-top");
            $('div.tao-tx').slideToggle();
        });
        XD.autoGetUsername();
    };
    /**
     * 检测简单登录提交
     * @param {obj}
     * @time 2014-02-10
     */
    chkSLogin = function(obj) {
        obj.find('.smt').val('登录中..');
        obj.find('.smt').attr('disabled', true);
    };
    /**
     * fangfang 弹出登录框，添加/移除focus样式，并提交填写数据
     * @param {}
     * @time 2014-02-10
     */
    XD.user_handsome_login = function() {
        var name = a("#alert_landing input[name='username']");
        var password = a("#alert_landing input[name='password']");
        var code = a("#alert_landing input[name='code']");
        name.focus(function() {
            name.parents(".user").addClass("input-active");
        });
        name.blur(function() {
            name.parents(".user").removeClass("input-active");
        });
        password.focus(function() {
            password.parents(".user").addClass("input-active");
        });
        password.blur(function() {
            password.parents(".user").removeClass("input-active");
        });
        //快速登录切换
        a("#alert_landing dl dd").click(function() {
            a("#alert_landing dl dd").removeClass("active");
            a(this).addClass("active");
            a("#alert_landing ul").hide();
            a("#alert_landing ul:eq(" + a(this).index() + ")").show();
        });
        a("#alert_landing .verification-code").click(function() {
            a(this).attr("src", __URL_MEMBER__ + '/public/verify?' + (new Date()).getTime());
        });
        a("#alert_landing form").submit(function() {
            if (name.val() == "" || name.val() == "用户名/邮箱" || password.val() == "" || password.val() == "请输入密码") {
                window.location.href = __HTTPS_MEMBER__ + "/login";
                return false;
            } else {
                
            }
        });
    };
    
$("#subchecklogin").on("click",function(event){
    var aboutstatus = $("#subcheckloginsnone").val();
    if(aboutstatus != 2){
        event.preventDefault();
        checkservice();
    }
});
$("#subchecklogins").on("click",function(event){
    var aboutstatus = $("#subcheckloginsnone").val();
    if(aboutstatus != 2){
        event.preventDefault();
        checkservice();
    }
});

function checkservice(){
    var url = 'http://www.juanpi.com/About/getuser';
    $.getJSON(url,function(data){
        if(data.code == 'error'){
            XD.user_handsome_login_init();
        }else{
            $("#subchecklogins").attr("href",data.url);
            $("#subchecklogin").attr("href",data.url);
            $("#subcheckloginsnone").val('2');
        }
    });
}

})(jQuery);
