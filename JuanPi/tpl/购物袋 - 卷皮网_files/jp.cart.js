(function($){
    document.cartTimerFuc = function() {
        var locatUrl =window.location.href;
        timestamp=document.expiretime-new Date(document.servtime);
        //计算出相差天数
        days=Math.floor(timestamp/(24*3600));
        //计算出小时数
        leave1=timestamp%(24*3600);    //计算天数后剩余的毫秒数
        hours=Math.floor(leave1/(3600));
        //计算相差分钟数
        leave2=leave1%(3600) ;       //计算小时数后剩余的毫秒数
        minutes=Math.floor(leave2/(60));
        //计算相差秒数
        leave3=leave2%(60);      //计算分钟数后剩余的毫秒数
        seconds=Math.round(leave3);
        days=days<0?0:days;
        hours=hours<0?0:hours;
        minutes=minutes<0?0:minutes;
        seconds=seconds<0?0:seconds;
        if ( minutes < 10 ) {
            minutes = '0'+minutes;
        }
        if ( seconds < 10 ) {
            seconds = '0'+seconds;
        }
        $("#cartm").html(minutes);
        $("#carts").html(seconds);
        $('.carttime').html('<em>'+minutes+'</em>分<em>'+seconds+'</em>秒');
        var CartNoticWarp= JP.JPCartNoticWarp;

        CartNoticWarp.setMinutes(minutes);
        CartNoticWarp.setSeconds(seconds);
        CartNoticWarp.ShowByTime();

        if(minutes == 0 && seconds == 0){
            $('.cartnum').text('0').css("background","#ccc");
            $('.bag-show .bag-a span.fl').addClass('empty');
            //$('.bag-show .bag-a span.fl').html('购物袋<em class="cartnum">0</em>');
            $('.carttime').animate({
                top:-140, opacity: 'hide'
            }, 600);
            //隐藏右侧展开的购物袋列表
            if($("#J-right-bag").hasClass("bag-show")) {
                $("#J-right-bag").removeClass("bag-show");
            }
            //清除定时器
            window.clearInterval(document.cartClockTimer);
            if(locatUrl.indexOf(__URL_CART__) >= 0 && $('.order-list').length >0){
                window.location.href=__URL_CART__+"/index/cartTimeOut";
            }
        }
        document.servtime++;
    }

    //头部mini购物袋
    $('.bag-show .bag-a').hover(function(){
        var $bag_tool = $(this).parent().find('.bag-tool'), _this = $(this);
        $bag_tool.find('#loadingimg').show();
        $bag_tool.show();
		
        if ( XDPROFILE.uid == '' && XDPROFILE.guestswitch != 1 ) {
            //未登录
            $('.bag-show .bag-a span.fl').addClass('empty');
            $('.cartnum').text('0').css("background","#ccc");
            $('.carttime').hide(); 
            $bag_tool.addClass('bag-tool-empty');
            $bag_tool.html('<div id="loadingimg" style="display:none;"></div><p><span class="icon-normal icon-bag-empty"></span>好像还没有<a href="'+__HTTPS_MEMBER__+'/login">登录</a>哦~</p>');
            return false;
        }
        //请求购物车数据
        $.ajax({
            type: 'get',
            url: __URL_CART_NEW__+'/MiniCart/miniCartList',
            dataType: 'jsonp',
            success: function(data) {
                if(data.status == 1){
                    //购物袋列表
                    var carthtml = '<div id="loadingimg" style="display:none;"></div>';
                    carthtml += '<ul class="clear">';
                    $.each(data.data, function(index, val){
                        carthtml += '<li><a target="_blank" class="pic fl" href="'+__URL_SHOP__+'/deal/'+val['productId']+'"><img class="lazy" d-src="'+getResizeImageUrl(val['pic'],60,60)+'" src="'+__HOST_STATIC__+'/common/images/blank_90x90.png"></a>';
                        carthtml += '<div class="detail">';
                        carthtml += '<p class="title"><a target="_blank" href="'+__URL_SHOP__+'/deal/'+val['productId']+'">'+val['title']+'</a></p>';
                        carthtml += '<p class="normal"><span class="price"><em class="u-yen">¥</em>'+val['cprice']+'</span>x '+val['num']+'</p>';
                        carthtml += '</div></li>';
                    });
                    carthtml += "</ul>";
                    carthtml += '<div class="amount"><span class="fl">共<em class="cartnum">'+data.goodsNum+'</em>件商品</span><a class="fr btn" target="_blank" href="'+__URL_CART__+'">去购物袋结算</a></div>'
                    $bag_tool.html(carthtml);
                    $(".bag-show .bag-tool img.lazy").lazyload({threshold:200,failure_limit:30});
                    $('.cartnum').show();
                    $('.cartnum').text(data.goodsNum);
                    if(data.goodsNum==0){
                        $('.cartnum').css("background","#ccc");
                    }else{
                        $('.cartnum').css("background","#ff464e");
                    }
                    $bag_tool.find('ul li:last').addClass('last');
                    $bag_tool.removeClass('bag-tool-empty');
                    _this.find('span.fl em').html(data.goodsNum);
                    var shareCartData = {'shareCartNum':data.goodsNum,'residualTime':data.residualTime};
                    setCartNum('shareCartData',shareCartData);
                    //更新定时器
                    document.servtime = data.servertime, document.expiretime = data.expireTime;
                    if(typeof document.cartClockTimer !== "undefined"){
                        window.clearInterval(document.cartClockTimer);
                    }
                    document.cartTimerFuc();
                    document.cartClockTimer = window.setInterval("document.cartTimerFuc()", 1000);
                }else if(data.status == 2){
                    //未登录
                    $('.bag-show .bag-a span.fl').addClass('empty');
                    $('.cartnum').text('0').css("background","#ccc");
                    $('.carttime').hide(); 
                    $bag_tool.addClass('bag-tool-empty');
                    //购物袋清空，提示关闭
                    JP.JPCartNoticWarp.checkShow();
                    $bag_tool.html('<div id="loadingimg" style="display:none;"></div><p><span class="icon-normal icon-bag-empty"></span>好像还没有<a href="'+__HTTPS_MEMBER__+'/login">登录</a>哦~</p>');
                }else{
                    var shareCartData = {'shareCartNum':0,'residualTime':3600};
                    setCartNum('shareCartData',shareCartData);
					var locatUrl =window.location.href;
                    //购物袋为空
                    $('.bag-show .bag-a span.fl').addClass('empty');
                    $('.cartnum').text('0').css("background","#ccc");
                    $('.carttime').hide(); 
                    $bag_tool.addClass('bag-tool-empty');
                    $bag_tool.html('<div id="loadingimg" style="display:none;"></div><p><span class="icon-normal icon-bag-empty"></span>购物袋还是空荡荡的~</p>');
                    //购物袋清空，提示关闭
                    JP.JPCartNoticWarp.checkShow();
                    if(typeof document.cartClockTimer !== "undefined") {
                        window.clearInterval(document.cartClockTimer);
						if(locatUrl.indexOf(__URL_CART__) >= 0 && $('.order-list').length>0){
							window.location.href=__URL_CART__;
						}
                    }
                }
                $bag_tool.find('#loadingimg').hide();
            },
            error: function () {
                $bag_tool.addClass('bag-tool-empty');
                $bag_tool.html('<div id="loadingimg" style="display:none;"></div><p><span class="icon-normal icon-bag-empty"></span>操作失败，请稍后再试~</p>');
                $bag_tool.find('#loadingimg').hide();
            }
        });
    },function(){
        //var $bag_tool = $(this).parent().find('.bag-tool'), _this = $(this);
        //$bag_tool.hide();
    });

    $('#toolbar .bag-show').hover(function(){
        $('#toolbar .bag-show').addClass("hover");
    },function(){
        $('#toolbar .bag-show').removeClass("hover");
    });


    //显示购物袋图层
    $('.bag-tool ul li .detail .normal .del').live('click',function(){
        $('.bag-tool ul li .tips_alert').hide();
        $(this).parents('li').find('.tips_alert').show();
    });

    //隐藏购物袋删除图层
    $('.bag-tool ul li .tips_alert .btn_all .btn02').live('click',function(){
        $(this).parents('li').find('.tips_alert').hide();
    });

    //删除购物袋里的一个商品
    $('.bag-tool ul li .tips_alert .btn_all .btn01').live('click',function(){
        var skuid = $(this).data('skuid');
        _this = $(this);
        $.ajax({
            type: 'get',
            url: __URL_CART_NEW__+'/MiniCart/delCart',
            dataType: 'jsonp',
            data:{'skuid':skuid},
            success: function(data) {
                if(data.status == 1){
                    _this.parents('li').fadeOut(300);
                    var old_num = $('.cartnum:first').text();
                    if(old_num == 1){
                        //购物袋已为空
                        $('.cartnum').html('');
                        $('.carttime').html('');
                        $('.carttime').hide();
                        $('.bag-show .bag-a span.fl').addClass('empty');
                        $('.bag-show .bag-a span.fl').html('购物袋<em class="cartnum">0</em>');

                        $('.cartnum').css("background","#ccc");

                    }else{
                        $('.cartnum').html(old_num-1);
                        $('.cartnum').css("background","#ff464e");
                    }           
                    location.reload();         

                    return false;
                }else{
                    return false;
                }
            },
            error: function () {
                return false;
            }
        });

		//特卖购物车删除数据埋点
		_paq.push(['trackEvent', 'temai', 'click_del_goods', 'skuid', skuid]);

    });

    //热点百分比项目埋点
    $(document).on('click', "#slide-hot li a", function(){
        var $_this = $(this);
        var str = $_this.attr('data-value');
        if(str !='' && str !=undefined){
            var newStr = str.split('#');
            if( newStr.length==2){
                //alert(newStr[0]+' '+newStr[1]);
                var ValidStr = newStr[1].split('_');
                if(ValidStr.length ==2){
                    if(ValidStr[0] !='' && ValidStr[0] !=undefined){
                        var href = $_this.attr('href');
                        if(href != '' && href != undefined){
                            var sendStr = newStr[1] + '::' +href;
                            //alert(sendStr);
                            _paq.push(['trackEvent','click_pit_position',newStr[0], 'position_num',sendStr]);
                        }
                    }
                }
            }
        }
    });
})(jQuery);

$(document).ready(function(){
    //弹出的对话框中，点击【去APP下单】按钮
    $(".go-download-app").click(function(){
        _paq.push(['trackEvent', 'app_download', 'click_bag_settleapp', '', '']);
    });
   var _this=JP;
    _this.JPCartNoticWarp=$("#side-empty");     //5分钟提升对象
    _this.JPCartNoticWarp.widget={
        "ShowTag":false,                      //显示标记用来处理关闭提示【系统支持localStorage存储在localStorage否则存储在cookie里】
        "ClientTag":"JPCartNoticWarp",         //localStorage或cookie中键值
        "minutes":0,                           //分钟
        "seconds":0,                            //秒
        "Mlimit":5
    };
    //tab标记操作
    _this.JPCartNoticWarp.setShowTag=function(showTags){this["widget"]["ShowTag"]=showTags;};//设置显示标记
    _this.JPCartNoticWarp.getShowTag=function(){return this["widget"]["ShowTag"];};//获取显示标记

    //分钟操作
    _this.JPCartNoticWarp.setMinutes=function(minutes){this["widget"]["minutes"]=parseInt(minutes);};
    _this.JPCartNoticWarp.getMinutes=function(){return this["widget"]["minutes"];};

    //秒操作
    _this.JPCartNoticWarp.setSeconds=function(seconds){this["widget"]["seconds"]=parseInt(seconds);};
    _this.JPCartNoticWarp.getSeconds=function(){return this["widget"]["seconds"];};

    //显示分钟操作
    _this.JPCartNoticWarp.setMlimit=function(val){this["widget"]["Mlimit"]=val;return val;};
    _this.JPCartNoticWarp.getMlimit=function(){return this["widget"]["Mlimit"];};

    //标记存储操作
    _this.JPCartNoticWarp.setShowTagClientData=function(val){setClientData(this["widget"]["ClientTag"],val);this["widget"]["ShowTag"]=val;};//标记存储到客户端
    _this.JPCartNoticWarp.delShowTagClientData=function(){delClientData(this["widget"]["ClientTag"]);};
    _this.JPCartNoticWarp.getShowTagClientData=function(){
        //从客户端获取标记
        var ClientTag=getClientData(this["widget"]["ClientTag"]);
        this.setShowTag(ClientTag);
        return this.getShowTag();
    };
    //5分钟提示显示方式
    _this.JPCartNoticWarp.ShowByTime=function(){
        //0分0秒清理标记位
        //5分钟以外或清理标记位
        if((this.getMinutes()==0&&this.getSeconds()==0)||this.getMinutes()>this.getMlimit()||(this.getMinutes()==this.getMlimit()&&this.getSeconds()>0)){
            this.delShowTagClientData();
            this.hide();
            return false;
        };
        //读取ClientTag标记位
        if(this.getShowTagClientData()){
            this.hide();
            return false;
        }else{
            $("#side-empty .minutes").html(this.getMinutes());
            $("#side-empty .seconds").html(this.getSeconds());
            this.show();
        };
    };
    //检测购物袋是否被清空,5分钟提醒关闭
    _this.JPCartNoticWarp.checkShow=function(){
        var cartnum=parseInt($(".cartnum").html());
        if(cartnum<1){
            this.setSeconds(0);
            this.setMinutes(0);
            this.delShowTagClientData();
            this.hide();
        };
        cartnum=null;
    };
	 //阻止点击时间冒泡
    $("#side-empty").click(function(e){
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }else {//IE浏览器
            window.event.cancelBubble = true;
        };
	});
    $("#side-empty .close").on('click',function(event){
        event.stopPropagation();
        _this.JPCartNoticWarp.setShowTagClientData(true);
        _this.JPCartNoticWarp.hide();
    });

	//给清空弹出框连接赋值
	$("#side-empty a.go_pay").attr("href",__URL_CART__);
	$("#side-empty a.go_pay").attr("target","_blank");

    //页面初始化设置
    JP.JPCartNoticWarp.setMlimit(JP.JPCartNoticWarp.widget.Mlimit)
    var initCartNum =function(){
        $.ajax({
            type: 'get',
            url: __URL_CART_NEW__+'/MiniCart/miniCartList',
            dataType: 'jsonp',
            success: function(data) {
                if(data.status == 1){
                    if(data.goodsNum > 0){
                        $('.cartnum').show();
                        $('.carttime').show();
                        $('.cartnum').text(data.goodsNum).css("background","#ff464e");
                        document.servtime = data.servertime, document.expiretime = data.expireTime;
                        document.cartClockTimer = window.setInterval("document.cartTimerFuc()", 1000);
                        var shareCartData = {'shareCartNum':data.goodsNum,'residualTime':data.residualTime};
                    }
                }else{
                    var shareCartData = {'shareCartNum':0,'residualTime':3600};
                }
                setCartNum('shareCartData',shareCartData);
            }
        });
    }
    // 初始化购物袋数量
    if ( XDPROFILE.uid != '' || XDPROFILE.guestswitch == 1 ) {
      //  var cartDataString  = getClientData('shareCartData');  //获取购物袋数量
        var cartDataString  = XDTOOL.getCookie('shareCartData'); // console.log(cartDataString);
        if(cartDataString==undefined || cartDataString ==''){   //如果没有储存，就请求服务
             initCartNum();
        }else{
            var s_uid =  XDTOOL.getCookie('s_uid');
            var timestamp = new Date().getTime();
            var clientTime =  timestamp/1000;
            var cartData = eval("(" + cartDataString + ")");
            if(s_uid !=cartData.s_uid){  //切换账号，重新发起请求
                initCartNum();
            }else if(  cartData.expTime  > clientTime){  //如果有储存，使用储存数据
                $('.cartnum').show();
                $('.carttime').show();
                $('.cartnum').text(cartData.shareCartNum);
                if(cartData.shareCartNum==0){
                    $('.cartnum').css("background","#ccc");
                }else{
                    $('.cartnum').css("background","#ff464e");
                }
                window.clearInterval(document.cartTimer);
                if(cartData.shareCartNum >=1){
                    document.servtime = clientTime, document.expiretime = cartData.expTime;
                    document.cartClockTimer = window.setInterval("document.cartTimerFuc()", 1000);
                }
            }else{  //为0，为空的处理
                $('.cartnum').show();
                $('.carttime').show();
                $('.cartnum').text(0).css("background","#ccc");
            }
        }
    }

    //使用优惠券部分
    $(".app-only").hover(function(){
        $(this).siblings(".app-code").css('display','block');
    },function(){
        $(this).siblings(".app-code").css('display','none');
    })

    $(".cv-list .coupon-title div").on("click",function(){
        $(this).addClass('active').siblings('div').removeClass('active');
        var this_index = $(this).index();
        $(".show-coupon").children().addClass('hide').eq(this_index).removeClass('hide');
    });
    
});

/**
 * @user:dingli
 * @Todo:写入cookies
 * @parame name{string}     //cookis存入键名
 * @parame value{string}   //cookis存入键值
 * @time：2015-05-21 18:01
 * */
function SetCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date(); //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
};

/**
 * @user:dingli
 * @Todo:读取cookies
 * @parame name{string}     //cookis存入键名
 * @time：2015-05-21 18:01
 * */
function getCookie(objName){//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for(var i = 0;i < arrStr.length;i ++){
        var temp = arrStr[i].split("=");
        if(temp[0] == objName) return unescape(temp[1]);
    };
};

/**
 * @user:dingli
 * @Todo:读取本地缓存或cookies
 * @parame name{string}     //本地缓存或cookies键名
 * @time：2015-05-21 18:01
 * */

function getClientData(name){
    var val = '';
    if(window.localStorage){
        val = localStorage[name];
    }else{
        var reg = new RegExp("(^|(;\\s))"+name+"=([^;]*)");
        var matchCookie = document.cookie.match(reg);
        if(matchCookie && matchCookie.length >= 2){
            val =  matchCookie[3];
        };
    };
    return val;
};

/**
 * @user:dingli
 * @Todo:写入本地缓存或cookies
 * @parame name{string}     //本地缓存或cookies键名
 * @parame value{string}   //本地缓存或cookies键值
 * @time：2015-05-21 18:01
 * */
function setClientData(name, value){
   // console.log(value);
    if(window.localStorage){
        localStorage[name] = value;
    }else{
        var now = new Date();
        now = now.setDate(now.getDate() + 1);
        document.cookie = name + '=' + value + ';expires=' + new Date(now).toGMTString();
    };
};

/**
 * @user:dingli
 * @Todo:删除本地缓存或cookies
 * @parame name{string}     //本地缓存或cookies键名
 * @time：2015-05-21 18:01
 * */
function delClientData(name){
    if(window.localStorage){
        localStorage.removeItem(name);
    }else{
        var now = new Date();
        now = now.setDate(now.getDate() - 1);
        document.cookie = name + '=' + getClientData(name) + ';expires=' + new Date(now).toGMTString();
    };
};
/**
 * 设置购物袋数量
 * */
function setCartNum(key,value){
    var timestamp = new Date().getTime();
    var clientTime =  timestamp/1000;
    var expTime = value.residualTime + clientTime ;
    value.expTime = expTime;
    value.s_uid = XDTOOL.getCookie('s_uid');
    var realVal  =JSON.stringify(value);
    XDTOOL.setCookie(key, realVal, {
        expires: value.residualTime/86400,
        path: "/"
    });
    var currentUrl = window.location.host;
    if(currentUrl !== 'www.jiukuaiyou.com'){
        var sendVal =encodeURIComponent(realVal);
        /** 通知九块邮*/
        $.ajax({
            'url': __URL_JKY_NEW__+'/public/ajaxSetCookie',
            'data': {"key":key,'value':sendVal,'time': value.residualTime},
            'dataType': 'jsonp'
        });
    }
}