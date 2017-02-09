/* 热门特卖轮播实现 */
var carousel_goods = function() {
    var timer = null;
    var idx = 0;
    var iLiNum = $('.warp-list li').length;
    if(iLiNum <=0) return;
    var iLiWidth = $('.warp-list li').get(0).offsetWidth+18;
    if($(".jp-pc").hasClass("w1200")){//宽屏一排显示4个商品
        var iRunNum = 4;
    } else {
        var iRunNum = 3;
    }
    $('.warp-list ul.goods-list').css({
        'width': iLiNum*iLiWidth
    });
    var iLen = iLiNum/iRunNum;
    for ( var i = 0; i < iLen; i++ ) {
        $(".adType").append('<a></a>');
    }

    //嚗光埋点数组
    var exposure_arr=[];

    var timerFn = function() {
        clearInterval(timer);
        var index = idx;
        timer = setInterval(function() {
            if ( index >= iLen ) {
                index = 0;
            }
            var obj = $(".adType a").eq(index);
            $(obj).siblings().removeClass("current");
            $(obj).addClass("current");
            $('.warp-list ul.goods-list').stop(true).animate({
                'margin-left': -index*iLiWidth*iRunNum
            }, "slow");

            //添加嚗光埋点
            if($.inArray(index,exposure_arr)==-1){
                exposure_arr.push(index);
                var temp_arr=[];

                var startindex=index*iRunNum;
                for(var i=0;i<iRunNum;i++){
                    var id1=$('.warp-list li:eq('+(startindex+i)+')').attr("id");
                    temp_arr.push(id1);
                }

                _paq.push(['trackEvent', 'explore', 'explore_goods_list', 'goods_list',temp_arr.join(",")]);
            }


            index += 1;
            $('.warp-list ul li img.lazy').lazyload({threshold:1000,failure_limit:30});
        }, 4000);
    }
    timerFn();

    $(".adType a").eq(0).addClass("current");
    $(".adType a").on('mouseover', function() {
        clearInterval(timer);
        idx = $(this).index();
        $(this).siblings().removeClass("current");
        $(this).addClass("current");
        $('.warp-list ul.goods-list').stop(true).animate({
            'margin-left': -idx*iLiWidth*iRunNum
        }, "slow");
        $('.warp-list ul li img.lazy').lazyload({threshold:1000,failure_limit:30});



    });
    $(".adType a").on('mouseout', function() {
        idx = $(this).index();
        timerFn();
    });
    $('.warp-list li').on('mouseover', function() {
        clearInterval(timer);
    });
    $('.warp-list li').on('mouseout', function() {
        timerFn();
    });
};
/**获取hot热卖商品的*/
function ajaxGetHotPopSgoods() {
    $.ajax({
        type: 'get',
        dataType: 'jsonp',
        url: __URL_CART__ + '/index/getHotPopSgoods',
        success: function (data) {
            $('.main').append(data.html);
            carousel_goods();
        }
    });
}