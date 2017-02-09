(function($){
    function shouFunction(ele,time){
    time = time == undefined?100:time;
    var timer=null;
    clearInterval(timer);
    ele.hover(function(){
                clearTimeout(timer);
                timer=setTimeout(function(){
                    ele.addClass("hover");
                },time);
            },
            function(){
                clearTimeout(timer);
                timer=setTimeout(function(){
                    ele.removeClass("hover");
                },time);
            }
        )

    }
    shouFunction($("#toolbar .phone-code"));
    var loginStatus_toolbar = function(){
        var _URL_CURRENT;
        //获取当前URL
        var local_url = document.domain;
        if(local_url=="www.jiukuaiyou.com"){
            _URL_CURRENT=__URL_JKY__;
        }else{
            _URL_CURRENT=__HTTPS_MEMBER__;
        }


        var curyear=new Date().getFullYear();


        if (__XD_USER__.uid == "" || __XD_USER__.uid == "101010"){
            var fl = '<div class="right-show fr">'+
                // '<div class="union-login"> <a href="'+_URL_CURRENT+'/login/connect/type/qq" rel="nofollow">QQ登录</a><a href="'+_URL_CURRENT+'/login/connect/type/sina" rel="nofollow">微博登录</a>&#12288;| </div>'+
                '<div class="login-show"><a href="'+__HTTPS_MEMBER__+'/login" rel="nofollow">登录</a><a href="'+__HTTPS_MEMBER__+'/register" rel="nofollow" id="nav-reg">免费注册</a>&#12288;|<a href="'+__URL_MEMBER__+'/order" rel="nofollow">我的订单</a>&#12288;|</div>'+
                '<div class="bag-show"><a href="'+__URL_CART__+'" target="_blank" class="bag-a"><span class="icon-normal icon-bag fl"></span><span class="empty fl"><span class="fl">购物袋</span><em class="num cartnum">0</em></span></a><div class="bag-tool" style="display:none;"><div id="loadingimg" style="display:none"></div></div>　|</div>';


            fl+='<div class="other-show other-show01">'+
                '<a>商家中心</a>'+
                '<div class="normal-box01">'+
                    '<ul>'+
                        '<li><a class="normal-box01-a" href="'+__URL_SELLER__+'/guide" target="_blank" rel="nofollow">供应商平台</a></li>'+
                        '<li><a href="'+__URL_HEZUO__+'" target="_blank" rel="nofollow">导购平台</a></li>'+
                    '</ul>'+
                '</div>'+
                '</div>';

            fl+= '<div class="other-show other-show01">'+
                '<a>客户服务</a>'+
                '<div class="normal-box01">'+
                '<ul>'+
                '<li><a href="'+__URL_JUANPI__+'/help" target="_blank" rel="nofollow" rel="nofollow">帮助中心</a></li>'+
                '<li><a href="'+__URL_JUANPI__+'/about/service" target="_blank" rel="nofollow" rel="nofollow">联系客服</a></li>'+
                '</ul>'+
                '</div>'+
                '</div>'+

                '</div>';







            //购物车优化，单独处理
            if ($('#cart_only_id').size()) {
                fl = '<div class="right-show fr">'+
                    '<div class="union-login"> <a href="'+_URL_CURRENT+'/login/connect/type/qq" rel="nofollow">QQ登录</a><a href="'+_URL_CURRENT+'/login/connect/type/sina" rel="nofollow">微博登录</a>&#12288;| </div>'+
                    '<div class="login-show"><a href="'+__HTTPS_MEMBER__+'/login" rel="nofollow">登录</a><a href="'+__HTTPS_MEMBER__+'/register" rel="nofollow" id="nav-reg">免费注册</a>&#12288;|</div>'+
					
					'<div class="other-show other-show01">'+
						'<a>客户服务</a>'+
						'<div class="normal-box01">'+
							'<ul>'+
								'<li><a href="'+__URL_JUANPI__+'/help" target="_blank" rel="nofollow" rel="nofollow">帮助中心</a></li>'+
								'<li><a href="'+__URL_JUANPI__+'/about/service" target="_blank" rel="nofollow" rel="nofollow">联系客服</a></li>'+
							'</ul>'+
						'</div>'+
					'</div>'+
					
                    '</div>';
            }
            $('#toolbar .right-show').replaceWith(fl);
        }else {
            var fpic= XDTOOL.empty(__XD_USER__.pic)?"/face/default.jpg" : __XD_USER__.pic;
            var nick = __XD_USER__.nick;
            if(nick.length > 10){
                nick = nick.substr(0, 10)+"…";
            }
            var fl = '<div class="right-show fr">'+
                '<div class="logined-show"><a href="'+__URL_MEMBER__+'" class="normal-a"><img src="'+getResizeImageUrl(fpic,20,20)+'"><span class="user">'+nick+'</span><em class="cur"></em></a>'+
                '<div class="normal-box login-box">'+
                '<ul>'+
                '<li><a href="'+__URL_MEMBER__+'/order"><span>我的订单</span></a></li>'+
                '<li><a href="'+__URL_MEMBER__+'/favorite"><span>我的收藏</span></a></li>'+
                '<li><a href="'+__URL_MEMBER__+'/beans"><span>我的积分</span></a></li>'+
                '<li><a href="'+__URL_MEMBER__+'/coupon"><span>我的优惠券</span></a></li>'+
                '<li><a href="'+__URL_MEMBER__+'/setting"><span>账号设置</span></a></li>'+
                '<li><a href="'+__URL_MEMBER__+'/login/logout"><span>退出</span></a></li>'+
                '</ul>'+
                '</div>'+
                '</div>'+
                '<div class="personal-show"><a href="'+__URL_MEMBER__+'/order"><span>我的订单</span></a><a href="'+__URL_JUANPI__+'/jifen"><span>积分商城</span></a><a href="'+__URL_MEMBER__+'/message"><span>我的消息</span><em class="count" style="display: none;">0</em></a>　|</div>'+
                '<div class="bag-show"><a href="'+__URL_CART__+'" target="_blank" class="bag-a"><span class="icon-normal icon-bag fl"></span><span class="empty fl"><span class="fl">购物袋</span><em class="num cartnum">0</em></span></a><div class="bag-tool" style="display:none;"><div id="loadingimg" style="display:none;"></div></div>　|</div>';

            fl+='<div class="other-show">';
            fl+='<div class="other-show other-show01">'+
                '<a>商家中心</a>'+
                '<div class="normal-box01">'+
                    '<ul>'+
                        '<li><a class="normal-box01-a" href="'+__URL_JUANPI__+'/index/seller_redirect" target="_blank" rel="nofollow">供应商平台</a></li>'+
                        '<li><a href="'+__URL_HEZUO__+'" target="_blank" rel="nofollow">导购平台</a></li>'+
                    '</ul>'+
                '</div>'+
                '</div>';

            fl+='<div class="other-show other-show01">'+
                '<a>客户服务</a>'+
                '<div class="normal-box01">'+
                    '<ul>'+
                        '<li><a href="'+__URL_JUANPI__+'/help" target="_blank" rel="nofollow" rel="nofollow">帮助中心</a></li>'+
                        '<li><a href="'+__URL_JUANPI__+'/about/service" target="_blank" rel="nofollow" rel="nofollow">联系客服</a></li>'+
                    '</ul>'+
                '</div>'+
            '</div>'+
            '</div>';

            //购物车优化，单独处理
            if ($('#cart_only_id').size()) {
                fl = '<div class="right-show fr">'+
                '<div class="logined-show"><a href="'+__URL_MEMBER__+'" class="normal-a" target="_blank"><img src="'+getResizeImageUrl(fpic,20,20)+'"><span class="user">'+nick+'</span><em class="cur"></em></a>'+
                '<div class="normal-box login-box">'+
                '<ul>'+
                '<li><a href="'+__URL_MEMBER__+'/order" target="_blank"><span>我的订单</span></a></li>'+
                '<li><a href="'+__URL_MEMBER__+'/favorite" target="_blank"><span>我的收藏</span></a></li>'+
                '<li><a href="'+__URL_MEMBER__+'/message" target="_blank"><span>我的消息</span></a></li>'+
                '<li><a href="'+__URL_MEMBER__+'/beans" target="_blank"><span>我的积分</span></a></li>'+
                '<li><a href="'+__URL_MEMBER__+'/coupon" target="_blank"><span>我的优惠券</span></a></li>'+
                '<li><a href="'+__URL_MEMBER__+'/setting" target="_blank"><span>账号设置</span></a></li>'+
                '<li><a href="'+__URL_MEMBER__+'/login/logout" target="_blank"><span>退出</span></a></li>'+
                '</ul>'+
                '</div>'+
                '</div>'+
				'<div class="other-show other-show01">'+
					'<a>客户服务</a>'+
					'<div class="normal-box01">'+
						'<ul>'+
							'<li><a href="'+__URL_JUANPI__+'/help" target="_blank" rel="nofollow" rel="nofollow">帮助中心</a></li>'+
							'<li><a href="'+__URL_JUANPI__+'/about/service" target="_blank" rel="nofollow" rel="nofollow">联系客服</a></li>'+
						'</ul>'+
					'</div>'+
				'</div>'+
                '</div>';
            }
            $('#toolbar .right-show').replaceWith(fl);
            shouFunction($(".logined-show"));
        }
    }
    loginStatus_toolbar();

    /**
     * 不同屏幕
     * @author mumian@juanpi.com
     * @date   2014-12-05
     */
    var FunAdapt=function(){
        if($(window).width()>1024 && location.hash != "#narrow"){
            $(".jp-pc").addClass("w1200");
        }else{
            $(".jp-pc").removeClass("w1200");
        }
        if(location.hash == "#narrow"){
        	$("body,.header").css("min-width","980px");
        }

    }
    FunAdapt();


    /**ake 关于兼容mac retina屏 首页当为mac系统logo换成两倍的图片
     *@time 2014-09-09
     */
     if(document.domain == "www.jiukuaiyou.com"){

        if(navigator.platform.indexOf('Mac') > -1){
            $("div.logo").addClass("jiu-logo01 ")
            $(".protection").addClass("protection01")
        }else{
            $("div.logo").removeClass("jiu-logo01 ")
            $(".protection").removeClass("protection01")

             }

     }else{

        if(navigator.platform.indexOf('Mac') > -1){
            $("div.logo1").addClass("juan-logo01 ")
            $(".juan-user").addClass("juan-user01")
            $(".juan-jf").addClass("juan-jf01")
            $(".juan-fanli").addClass("juan-fanli01")
            $(".juan-iphone").addClass("juan-iphone01")
            $(".juan-brand").addClass("juan-brand01")
            $(".juan-temai").addClass("juan-temai01")
            $(".juan-jkj").addClass("juan-jkj01")
            $(".protection").addClass("protection01")
        }else{
            $("div.logo1").removeClass("juan-logo01 ")
            $(".juan-user").removeClass("juan-user01")
            $(".juan-jifen").removeClass("juan-jifen01")
            $(".juan-fanli").removeClass("juan-fanli01")
            $(".juan-iphone").removeClass("juan-iphone01")
            $(".juan-brand").removeClass("juan-brand01")
            $(".juan-temai").removeClass("juan-temai01")
            $(".juan-jkj").removeClass("juan-jkj01")
            $(".protection").removeClass("protection01")
     } 
 }

})(jQuery);

$(document).ready(function(){
    //用户访问统计Cookie共享
    if(document.domain == "www.jiukuaiyou.com" || document.domain == "ju.jiukuaiyou.com"){
        if(!XDTOOL.empty(XDTOOL.getCookie("_Qt")) && XDTOOL.empty(XDTOOL.getCookie("_QM")) ){
            var _Qt = XDTOOL.getCookie('_Qt');
            $.getJSON(__U_JUANPI_NEW__+"/landcookie.php?callback=?",
                {qt:_Qt},
                function(data){
                    if(data.code==1001){
                        var cookieobj = {expires:365,path:'/',domain:".jiukuaiyou.com"};
                        XDTOOL.setCookie("_QM",1,cookieobj);
                    }
                });
        }
        if(!XDTOOL.empty(__XD_USER__.uid)&&(XDTOOL.empty(XDTOOL.getCookie("c_login"))||XDTOOL.getCookie("c_login")=='0')){
            var uid = XDPROFILE.uid;
            $.getJSON(__U_JUANPI_NEW__+"/logincookie?callback=?",
                {uid:__XD_USER__.uid,pic:__XD_USER__.pic,nick:__XD_USER__.nick,sign:__XD_USER__.sign,exp:XDTOOL.getCookie("s_exp")},function(data){
                    if(data.code==1001){
                        var cookieobj = {expires:0,path:'/',domain:".jiukuaiyou.com"};
                        XDTOOL.setCookie("c_login",1,cookieobj);
                    }
                });
        }
    }else{
        if(!XDTOOL.empty(XDTOOL.getCookie("_Qt")) && XDTOOL.empty(XDTOOL.getCookie("_QM")) ){
            var _Qt = XDTOOL.getCookie('_Qt');
            $.getJSON(__URL_JKY_NEW__+"/landcookie.php?callback=?",
                {qt:_Qt},
                function(data){
                    if(data.code==1001){
                        var cookieobj = {expires:365,path:'/',domain:".juanpi.com"};
                        XDTOOL.setCookie("_QM",1,cookieobj);
                    }
                });
        }
        if(!XDTOOL.empty(__XD_USER__.uid)&&(XDTOOL.empty(XDTOOL.getCookie("c_login"))||XDTOOL.getCookie("c_login")=='0')){
            var uid = XDPROFILE.uid;
            $.getJSON(__URL_JKY_NEW__+"/logincookie?callback=?",
                {uid:__XD_USER__.uid,pic:__XD_USER__.pic,nick:__XD_USER__.nick,sign:__XD_USER__.sign,exp:XDTOOL.getCookie("s_exp")},function(data){
                    if(data.code==1001){
                        var cookieobj = {expires:0,path:'/',domain:".juanpi.com"};
                        XDTOOL.setCookie("c_login",1,cookieobj);
                    }
                });
        }
    }

});

var d=new Date();d.setTime(d.getTime()+10*1000);document.cookie=[(navigator.userAgent).match(/[a-zA-Z]/g).join("").substr(-20),"_user=1;expires=",d.toUTCString(),";path=/;domain=.juanpi.com"].join("");