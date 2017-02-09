//网站流量统计，大数据分析流量数据来源 2014-11-19
function getRegCookie(cookieName) {
    var cookiePattern = new RegExp('(^|;)[ ]*' + cookieName + '(.*)=([^;]*)(;)'),
        cookieMatch = cookiePattern.exec(document.cookie);
    return cookieMatch ? cookieMatch[2] : '';
}
//百分百埋点
var bfdStatis={
    bfdFun:function(bfd_page_id){
        var user_cookie=getRegCookie('_pk_id');//.1.2ae0
        if(user_cookie!=''){
            if(user_cookie!=''){
                if(user_cookie.indexOf('=')>-1){
                    var start=user_cookie.indexOf('=')+1;
                    user_cookie=user_cookie.substring(start);
                    user_cookie=user_cookie.substr(0,user_cookie.indexOf('.'));
                }
            }
        }
        var user_id=getCookie('s_uid');
        window["_BFD"] = window["_BFD"] || {};
        _BFD.client_id = "Cjuanpi";
        _BFD.BFD_USER = {
            "user_id" : user_id, //网站当前用户id，如果未登录就为0或空字符串
            "user_cookie" : user_cookie, //网站当前用户的cookie，不管是否登录都需要传
            "p_id" : bfd_page_id    //页面id
        };
        _BFD.script = document.createElement("script");
        _BFD.script.type = "text/javascript";
        _BFD.script.async = true;
        _BFD.script.charset = "utf-8";
        _BFD.script.src = (('https:' == document.location.protocol?'https://ssl-static1':'http://static1')+'.bfdcdn.com/service/juanpiwang/juanpiwang.js');
        document.getElementsByTagName("head")[0].appendChild(_BFD.script);
    },
    setBfdInfoFun:function(bfdObj){
        window["_BFD"] = window["_BFD"] || {};
        var user_id = getCookie('s_uid');
        if(user_id ==undefined) user_id = '';
        bfdObj.user_id = user_id;
        _BFD.BFD_INFO = bfdObj;
    },
    isBiOrBfdFun:function(num,ulid,type,isEmpty){
        window["_BFD"] = window["_BFD"] || {};
        if (isEmpty=='scRecVAV') {
             _BFD.scRecVAV = function(data,bid,req_id){
                bfdStatis.selectGoodAjax(data,num,ulid,bid,req_id,isEmpty,type);
            }
        }else if (isEmpty=='sc_noRecVAV') {
             _BFD.sc_noRecVAV = function(data,bid,req_id){
                bfdStatis.selectGoodAjax(data,num,ulid,bid,req_id,isEmpty,type);
            }
        }
    },
    selectGoodAjax:function(bfdData,num,ulid,bid,req_id,isEmpty,type){
         //请求接口 是否用BI的推荐数据
        var good_ids='';
        if(typeof(goodIds) != 'undefined'){
            good_ids=goodIds;
        }
        $.ajax({
            type: "get",
            async: false,
            url: '//shop.juanpi.com/deal/getBIGuessLike',
            data: 'type='+type+'&goodIds='+good_ids,
            dataType: "jsonp",
            jsonp: "callback", 
            success: function (data) {
                if(data.code==1000&&data.type==1&&data.data!=''){
                    bfdStatis.setGoodHtml(data.data,ulid);
                }else{
                      bfdStatis.initGoodsListFun(bfdData,num,ulid,bid,req_id,isEmpty,type);
                }
            },
            error: function (e) {
               console.log(e);
               return;
            }
        });
    },
    initGoodsListFun:function(data,num,ulid,bid,req_id,cart_type,type){       
        var postData = null;
        if(data[0].iid==undefined){
            postData = data;
        }else{
            postData = new Array();
            for(var i=0;i<data.length;i++){
                if(i >num) break;
                postData.push(data[i].iid);
            }
        }
        $.ajax({
            type: "get",
            async: false,
            url: '//shop.juanpi.com/deal/getGoodsInfoByIds',
            data: {goods_id_arr : postData,type:type},
            dataType: "jsonp",
            jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            success: function (d) {
                if(d.code==1000){
                    var  goodData= d.data;
                    if(goodData.length<12){
                        ajaxGetHotPopSgoods();
                        return;
                    }
                    bfdStatis.setGoodHtml(goodData,ulid);
                }else {
                    ajaxGetHotPopSgoods();
                }
            },
            error: function (e) {
                e;
            }
        });
        if(cart_type!=''){
            _BFD.showBind(data,cart_type,bid,req_id);
        }
    },
    setGoodHtml:function(goodData,ulid){
        var _html='';
        var _isoverHtml='';
        //var _isoverClass='buy';
        for(var i=0;i<goodData.length;i++){
            var index=i+1;
            var lastLiClass='';
            var page = Math.ceil(index/4);
            var num = (index % 4) ?(index % 4) :4;
            if(goodData[i].status=='gone'){
                _isoverHtml='<div class="box-hd" style="display:block;"><div class="mask-bg"></div><em class="buy-over">抢光了</em></div>';
                //_isoverClass='gone';
            }
            _html+='<li id="'+goodData[i].iid+'" re="" g_type="3" gtype="3">'+
                '<div class="list-good '+goodData[i].status+'">'+
                '<div class="good-pic">'+
                '<a href="'+goodData[i].url+'" target="_blank" data-value="recommend_goods_bfd#'+page+'_'+num+'" class="pic-img">'+
                '<img alt="'+goodData[i].name+'" style="display: inline;" src="'+__HOST_STATIC__+'/juanpi/images/blank.png" class="lazy good-pic" d-src="'+goodData[i].img+'"></a>'+
                '</div>'+
                '<h3 class="good-title">'+
                '【包邮】<a data-value="recommend_goods_bfd#'+ page+'_'+num+'" href="'+goodData[i].url+'" target="_blank">'+goodData[i].name+'</a>'+
                '<span class="sold">新品上架</span>'+
                '</h3>'+
                '<div class="good-price">'+
                '<span class="price-current"><em>￥</em>'+goodData[i].price+'</span>'+
                '<span class="des-other">'+
                '<strong></strong>'+
                '<span class="price-old"><em>￥</em>'+goodData[i].mktp+'</span>'+
                '<span class="discount">(<em>'+goodData[i].dis+'</em>折)</span>'+
                '</span>'+
                '<div class="btn buy j-buy">'+
                '<a href="'+goodData[i].url+'" target="_blank" data-value="recommend_goods_bfd#'+page+'_'+num+'"><em class="j-icon"></em><span>特卖</span></a>'+
                '</div>'+
                '</div>'+_isoverHtml+
                '</div>'+
                '</li>';
            _isoverHtml = '';
        }
        // $('ul.'+ulid).html(_html);
        var allHtml = '<div class="hot_goods">'
            + '<h3><div class="line"></div><div class="line-txt">猜你喜欢</div></h3>'
            + '<div class="hot-list" id="slide-hot">'
            + '<div class="box clear"><div class="warp-list"><ul class='+ulid+' clear>'
            + _html
            + '</ul></div></div>'
            + '<div class="round"><div class="adType"></div></div>'
            + '</div>'
            + '</div>';
        $('.main').append(allHtml);
        carousel_goods();
        $("img.lazy").lazyload({threshold:200,failure_limit:30,paq:true});
    }
}
