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
    $('#tops_set-wrap').on('mouseenter','img',function(e){
        topHide = $(e.target);
        topHide.css('width',320 + 'px');
        topHide.css('height',427 + 'px')
        topShow = $('#'+ topHide.data('id'));
        topShow.fadeIn("slow");
    }).on('mouseleave','img',function(e) {
            topHide = $(e.target);
            topHide.css('width',300 + 'px');
            topHide.css('height',400 + 'px')
            topShow = $('#'+ topHide.data('id'));
            topShow.fadeOut("fast");
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
  
   
    
    //登录方式切换
    var registerWay_btn;
    var registerBox;
    var userName_text = $('#userName_text');
    $('#register_openOrClose').on('click','.phoneOrPassword',function (e) {
        registerWay_btn = $(e.target);
        registerBox = $('#' + registerWay_btn.data('id'));
        if(registerWay_btn.text() !== '密码登录'){
            registerWay_btn.text('密码登录');
            registerBox.removeClass('isShow');
            $('#userPassage_text').addClass('isShow');
            $('#warningOfPassage-1').addClass('isShow')
            userName_text.attr('placeholder' ,'请输入手机号')
        }else{
            registerWay_btn.text('手机验证码登录');
            registerBox.addClass('isShow');
            $('#userPassage_text').removeClass('isShow');
            userName_text.attr('placeholder','请输入会员号/用户名/手机号登录')
        }  
    });

    var close;
    var registerWrap;
    $('#register_openOrClose').on('click','span', function(e) {
        close = $(e.target);
        registerWrap = $('#' + close.data("id"));
        registerWrap.addClass('isShow');
    }).on('click','.btn_login',function () {
        $('#register_openOrClose').addClass('isShow')
        $('#login_openOrClose').removeClass('isShow')
    });
    $('#login_openOrClose').on('click','span', function(e) {
        close = $(e.target);
        registerWrap = $('#' + close.data("id"));
        registerWrap.addClass('isShow');
    });
    $('#user_Admin1').on('click','li',function (e) {
        close = $(e.target);
        registerWrap = $ ('#' + close.data('id'));
        registerWrap.removeClass('isShow');
    })
    
    
});