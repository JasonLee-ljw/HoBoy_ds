$(document).ready(function () {
    var second = $('#second_item');
    var main;//一级菜单
    var menu;//二级菜单
    $('#sub').on('mouseenter',function (e) { 
            second.addClass('none');
        }).on('mouseleave',function (e) {
            second.removeClass('none');
        }).on('mouseover','li',function (e) {
            main =$(e.target);
            main.addClass('active1')
            menu = $('#'+ main.data('id'));
            menu.addClass("active");
            second.on('mouseover','div',function() {
                menu.addClass('active');
            })
        }).on('mouseout','li',function (e) {
            main =$(e.target);
            main.removeClass('active1')
            menu = $('#'+ main.data('id'));
            menu.removeClass("active");
            second.on('mouseout','div',function() {
                menu.removeClass('active');
            })
        });
    
    //按钮绑定事件
    var wrap;
    var pic = $('#photo_wrap');
    var isClick = false ;
    $('#template_control').on("click","a",function(e) {
        isClick = true;
        wrap = $(e.target);
        pic.css('left',-wrap.data('id')*750+'px')
        return isClick;
    });
    
    //热卖榜图片详情显示
    let hotHide;
    let hotShow;
    $('#hot_photo-Wrap').on('mouseenter','img',function(e){
        hotHide = $(e.target);
        hotShow = $('#'+ hotHide.data('id'));
        hotShow.fadeIn("slow");
    });
    $('#hot_photo-Wrap').on('mouseleave','div',function(e) {
        hotHide = $(e.target);
        hotHide.fadeOut('fast');
    });
    

    //上装图片详情显示
    let topHide;
    let topShow;
    $('#tops_set-wrap').on('mouseenter','.mask_layer',function(e){
        topHide = $(e.target).next().children();
        topShow = $('#'+ topHide.data('id'));
        topShow.fadeIn("slow");
        if(topHide.hasClass('collects_pic')){
            topHide.css('width',200 + 'px');
            topHide.css('height',260 + 'px')
        }else{
            topHide.css('width',320 + 'px');
            topHide.css('height',427 + 'px')
        }
    }).on('mouseleave','.mask_layer',function(e) {
            topHide = $(e.target).next().children();
            topShow = $('#'+ topHide.data('id'));
            topShow.fadeOut("fast");
            if(topHide.hasClass('collects_pic')){
                topHide.css('width',180 + 'px');
                topHide.css('height',240 + 'px')
            }else{
                topHide.css('width',300 + 'px');
                topHide.css('height',400 + 'px')
            }
    });

    //下装图片详情显示
    let pantsHide;
    let pantsShow;
    $('#pants_set-wrap').on('mouseenter','img',function(e){
        pantsHide = $(e.target);
        pantsHide.css('width',320 + 'px');
        pantsHide.css('height',427 + 'px')
        pantsShow = $('#'+ pantsHide.data('id'));
        pantsShow.fadeIn("slow");

    }).on('mouseleave','img',function(e) {
            pantsHide = $(e.target);
            pantsHide.css('width',300 + 'px');
            pantsHide.css('height',400 + 'px')
            pantsShow = $('#'+ pantsHide.data('id'));
            pantsShow.fadeOut("fast");
    });

    //鞋子图片详情显示
    let shoesHide;
    let shoesShow;
    $('#shoes_set-wrap').on('mouseenter','img',function(e){
        shoesHide = $(e.target);
        shoesHide.css('width',320 + 'px');
        shoesHide.css('height',427 + 'px')
        shoesShow = $('#'+ shoesHide.data('id'));
        shoesShow.fadeIn("slow");

    }).on('mouseleave','img',function(e) {
            shoesHide = $(e.target);
            shoesHide.css('width',300 + 'px');
            shoesHide.css('height',400 + 'px')
            shoesShow = $('#'+ shoesHide.data('id'));
            shoesShow.fadeOut("fast");
    });

    //装饰图片详情显示
    let decorationsHide;
    let decorationsShow;
    $('#decorations_set-wrap').on('mouseenter','img',function(e){
        decorationsHide = $(e.target);
        decorationsHide.css('width',320 + 'px');
        decorationsHide.css('height',427 + 'px')
        decorationsShow = $('#'+ decorationsHide.data('id'));
        decorationsShow.fadeIn("slow");

    }).on('mouseleave','img',function(e) {
            decorationsHide = $(e.target);
            decorationsHide.css('width',300 + 'px');
            decorationsHide.css('height',400 + 'px')
            decorationsShow = $('#'+ decorationsHide.data('id'));
            decorationsShow.fadeOut("fast");
    });
  
    //页面头部，退出登录按钮
    $('#main_Wrap').on('click','#user_Admin1 #exit_register',function(e) {
        if($(e.target).data('id') == 'selectIsExit'){
            $('#selectIsExit').removeClass('isShow')
        }
    })

    //确认是否退出登录
    $('#selectIsExit').on('click','a',function(e) {
        if($(e.target).data('id') == 'cancelExit'){
            $('#selectIsExit').addClass('isShow')
        }else if($(e.target).data('id') == 'confirmExit'){
            localStorage.removeItem('isRegister')//清除登录信息
            $('.registerOrLogin_entrance').removeClass('isShow')
            $('.userNameOrExit_entrance').addClass('isShow')
            $('#userName_Header').text('')
            alert('退出成功')
            $('#selectIsExit').addClass('isShow')
            window.location.reload()
        }
    })


    
    //页面头部，登录、注册按钮
    $('#main_Wrap').on('click','#user_Admin1 li',function (e) {
        let close = $(e.target);
        let registerWrap = $ ('#' + close.data('id'));
        registerWrap.removeClass('isShow');

    }).on('click','#collect_shopCar a',function(){//页面头部，收藏夹、购物车按钮
        if(localStorage.getItem('isRegister') !== 'true'){
            alert('您尚未登录，请先登录！')
        }
    })

    //弹窗背景大小
    let screenW = document.body.scrollWidth;
    let screenH = document.body.scrollHeight;
    $('.dialog').css('width',screenW + 'px').css('height',screenH + 'px')
    
});