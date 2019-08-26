define(['jquery'],function ($) {
    function Backtop (el,opts) {
        this.opts = $.extend({},Backtop.DEFAULT,opts);
        this.$el = $(el);
        this.$body = $('html,body');
        this.checkPosition();
        if(this.opts.mode == 'move'){
            this.$el.on('click',$.proxy(this.move,this));
        }else if(this.opts.mode == 'go'){
            this.$el.on('click',$.proxy(this.go,this));
        }else{
            this.$el.on('click',$.proxy(this.move,this));
        };
        
        $(window).on('scroll',$.proxy(this.checkPosition,this));
  
    };

    //规定速度滚动回指定位置
    Backtop.prototype.move = function () {
        if($(window).scrollTop() != this.opts.pos){
            if(!this.$body.is(':animated')){ 
                this.$body.animate({
                    scrollTop:this.opts.dest 
                },this.opts.speed)
            }
        }
    };

    //直接滚动回指定位置
    Backtop.prototype.go = function () {
        this.$body.scrollTop(this.opts.dest);
    };

    //判断返回按钮是否显示
    Backtop.prototype.checkPosition= function () {
        if($(window).scrollTop() > this.opts.pos){
            this.$el.fadeIn();
        }else{
            this.$el.fadeOut();
        }
    };

    Backtop.DEFAULT={
        mode:'move',
        dest:0,
        pos:$(window).height(),
        speed:800
    }

    //封装为jquery插件
    $.fn.extend({
        backTop:function(opts){
            return this.each(function(){
               new Backtop(this,opts);
            });
        }
    })

    return {
        backTop:Backtop
    }
})