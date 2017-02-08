/**
 * Created by Administrator on 2017/1/9.
 */
$(function(){
    //轮播
    (function(){
        var _index=0;
        var _timer=0;
        //鼠标悬浮中间左右按钮出现，移除隐藏按钮
        $(".player_center").hover(function(){
            $(".tab_left").css("display","block");
            $(".tab_right").css("display","block");
        },function(){
            $(".tab_left").css("display","none");
            $(".tab_right").css("display","none");
        });
        //鼠标悬浮左右按钮背景图片变
        $(".tab_left").hover(function(){
            $(this).css("backgroundPosition","0 -107px");
        },function(){
            $(this).css("backgroundPosition","0 -35px");
        });
        $(".tab_right").hover(function(){
            $(this).css("backgroundPosition","4px -342px");
        },function(){
            $(this).css("backgroundPosition","4px -270px");
        });
        //点击左边按钮
        $(".tab_left").click(function(){
            _index--;
            if(_index<0){
                _index=9;
            }
            effect(_index);
        });
        //点击右边按钮
        $(".tab_right").click(function(){
            _index++;
            if(_index>9){
                _index=0;
            }
            effect(_index);
        });
        //鼠标悬浮分页器上变换图片
        //先给所有的分页器加个index属性
        $.each($(".tab_page span"),function(n,value){
            value.num=n;//注意这里给dom元素加的属性
        });
        $(".tab_page span").mouseenter(function(){
            _index=$(this)[0].num;//所以这里要把jQuery元素转换成dom元素
            effect(_index);
        });
        //自动变换
        function auto(){
            clearTimeout(_timer);
            _index++;
            if(_index>9){
                _index=0;
            }
            effect(_index);
            _timer=setTimeout(auto,2000);
        }
        auto();
        //鼠标悬浮停止定时器
        $(".player_center").mouseenter(function(){
            clearTimeout(_timer);
        });
        //鼠标离开开启定时器
        $(".player_center").mouseleave(function(){
            _timer=setTimeout(auto,2000);
        });
        //效果函数
        function effect(index){
            //隐藏所有图片
            //用$.each()方法
            $.each($(".player .slide"),function(i,value){
                $(value).css("display","none").css("opacity",0.2);
            });
            //显示当前元素
            $(".player .slide")[index].style.display="block";
            //透明度累加
            var _timer=0;
            var _opacity=0.2;
            (function opacity() {
                clearTimeout(_timer);
                _opacity+=0.05;
                if(_opacity<1){
                    $(".player .slide")[index].style.opacity=_opacity;
                    _timer=setTimeout(opacity,30);
                }else{
                    _opacity=0.2;
                }
            })();
            //让分页器变化
            //先让所有背景变为原来的颜色
            $.each($(".tab_page span"),function(i,value){
                value.style.backgroundColor="#999";
            });
            //让当前背景变
            $(".tab_page span")[index].style.backgroundColor="#9f1431";
        }
    })();
    //轮播左侧列表菜单
    (function(){
        //每个li悬浮时
        $(".player_left ul li").hover(function(){
            $(this).css({"background":"#f9f6f6"});
            $(this).find(".li").css("margin-left","10px");
            $(this).find(".small_jiao").css("display","block");
        },function(){
            $(this).css({"background":"none"});
            $(this).find(".li").css("margin-left","6px");
            $(this).find(".small_jiao").css("display","none");
        });
        //给列表详情下面a标签加鼠标移入移除样式
        $(".show_list a").hover(function(){
            $(this).css({
                "color":"#9f1431",
                "text-decoration":"underline"
            });
        },function(){
            $(this).css({
                "color":"",
                "text-decoration":"none"
            });
        })
        //悬浮出现详情页
        $.each($(".player_left ul li"),function(index,value){
            $(value).hover(function(){
                //让父元素出现
                $(".left_detail").css("display","block");
                //移动父元素

                $(".left_detail").animate({
                    "top":$(this).position().top+"px"
                },400,function(){//先移动再设置css
                    $(".left_detail").css("top",$(this).position().top+"px");
                });

                //$(".left_detail").finish();
                //出现子元素
                $($(".left_detail").children()[index]).css("display","block");
                $($(".left_detail").children()[index]).hover(function(){
                    $(this).css("display","block");//子元素出现
                    $(this).parent().css("display","block");//父元素出现
                },function(){
                    $(this).css("display","none");
                    $(".left_detail").css("display","none");//父元素消失
                })
            },function(){
                $(".left_detail").css("display","none");//父元素消失
                $($(".left_detail").children()[index]).css("display","none");//子元素消失
                $(".left_detail").stop();//鼠标离开时停止动画
                //$(".left_detail").finish();//鼠标离开时停止动画
            });
        });
    })();
    //滚动
    (function(){
    //鼠标悬浮在按钮上改变背景
        $("#roll .left_button").hover(function(){
            //注意用js控制相当于内联样式，所以路径要以html为基准
            $(this).css("background","#efefef url(images/s_pre_h.png) no-repeat center");
        },function(){
            $(this).css("background"," url(images/s_pre.png) no-repeat center");
        });
        $("#roll .right_button").hover(function(){
            $(this).css("background","#efefef url(images/s_next_h.png) no-repeat center");
        },function(){
            $(this).css("background"," url(images/s_next.png) no-repeat center");
        });
    //鼠标悬浮移动图片
        $(".img_roll").hover(function(){
            $(this).find("img").animate({"left":"-8px"});
        },function(){
            $(this).find("img").animate({"left":"0px"});
        });
    //点击左侧按钮
        $(".left_button").click(function(){
            loop();
        });
    //点击右侧按钮
        $(".right_button").click(function(){
            loop();
        });
    //循环函数
        var _timer=0;
        function loop(){
            var _left=$(".roll_center .content").css("left");
            if(_left=="auto"||_left=="0px"){
                $(".roll_center .content").animate({
                    "left":"-1128px"
                });
            }else{
                $(".roll_center .content").animate({
                    "left":"0px"
                });
            }
        }
        _timer=setInterval(loop,6000);
    })();
    //悬浮切换部分
    (function(){
        //标题

        $("#change .title span").mouseenter(function(){
            //先让所有的span置为初始状态
            $("#change .title span").css({
                "height":"30px",
                "margin-top":"5px",
                "background":"#f2f2f2",
                "color":"#000",
                "font-size":"12px",
                "line-height":"30px"
            });
            //再改变当前这个
            //console.log($(this));//$(this)指当前这个
            $(this).css({
                "height":"35px",
                "margin-top":"0",
                "background":"#d1a26c",
                "color":"#fff",
                "font-size":"16px",
                "line-height":"35px"
            });
            //先隐藏所有切换页
            $(".main_content").find(".content").css("display","none");
            //再让对应的显示
            $($(".main_content").find(".content")[$(this).attr("index")]).css("display","block");
        });
    })();

//楼层1 蔬菜水果
    (function(){
        initial($(".floor1_fruit .initial"),"#1db66f");
        tab_change($(".floor1_fruit .tab span"),"#1db66f",$(".floor1_fruit .tab_change"));
        Tab_img($(".floor1_fruit .font"),$(".floor1_fruit .font"),$(".floor1_fruit .top_img"));
    })();

//楼层2 肉类禽蛋
    (function(){
        initial($(".floor2_meat .initial"),"#e74f6e");
        tab_change($(".floor2_meat .tab span"),"#e74f6e",$(".floor2_meat .tab_change"));
        Tab_img($(".floor2_meat .font"),$(".floor2_meat .font"),$(".floor2_meat .top_img"));
    })();

//楼层3 海鲜水产
    (function(){
        initial($(".floor3_seafood .initial"),"#4ccdde");
        tab_change($(".floor3_seafood .tab span"),"#4ccdde",$(".floor3_seafood .tab_change"));
        Tab_img($(".floor3_seafood .font"),$(".floor3_seafood .font"),$(".floor3_seafood .top_img"));
    })();

//楼层4 奶类烘焙
    (function(){
        initial($(".floor4_milk .initial"),"#dcbe95");
        tab_change($(".floor4_milk .tab span"),"#dcbe95",$(".floor4_milk .tab_change"));
        Tab_img($(".floor4_milk .font"),$(".floor4_milk .font"),$(".floor4_milk .top_img"));
    })();

//楼层5 粮油副食
    (function(){
        initial($(".floor5_oil .initial"),"#feb033");
        tab_change($(".floor5_oil .tab span"),"#feb033",$(".floor5_oil .tab_change"));
        Tab_img($(".floor5_oil .font"),$(".floor5_oil .font"),$(".floor5_oil .top_img"));
    })();

//楼层6 休食冲饮
    (function(){
        initial($(".floor6_drink .initial"),"#ffd923");
        tab_change($(".floor6_drink .tab span"),"#ffd923",$(".floor6_drink .tab_change"));
        Tab_img($(".floor6_drink .font"),$(".floor6_drink .font"),$(".floor6_drink .top_img"));
    })();
//楼层7 生态日用
    (function(){
        initial($(".floor7_day .initial"),"#977ec2");
        tab_change($(".floor7_day .tab span"),"#977ec2",$(".floor7_day .tab_change"));
        Tab_img($(".floor7_day .font"),$(".floor7_day .font"),$(".floor7_day .top_img"));
    })();
//右面动画函数
    function Tab_img(enter,showfont,showimg){
        enter.mouseenter(function(){
            //先显示所有的
            showfont.css("display","block");
            //自己消失
            $(this).css("display","none");
            //先隐藏所有的图片
            showimg.css("display","none");
            //对应的图片出现
            $(this).next().css("display","block");
        });
    }
//选项卡切换函数
    function tab_change(enter,bgcolor,hideimg){
        enter.mouseenter(function(){
            //先让所有的span置为初始状态
            enter.css({
                "height":"30px",
                "margin-top":"12px",
                "background":"#f2f2f2",
                "color":"#000",
                "font-size":"12px",
                "line-height":"30px"
            });
            //再改变当前这个
            $(this).css({
                "height":"35px",
                "margin-top":"0",
                "background":bgcolor,
                "color":"#fff",
                "font-size":"16px",
                "line-height":"35px"
            });
            //先隐藏所有切换页
            hideimg.css("display","none");
            //再让对应的显示
            $(hideimg[$(this).attr("index")]).css("display","block");
        });
    }
//选项卡初始化
    function initial(ele,bgcolor){
        ele.css({
            "height":"35px",
            "margin-top":"0",
            "background":bgcolor,
            "color":"#fff",
            "font-size":"16px",
            "line-height":"35px"
        })
    }



















});














