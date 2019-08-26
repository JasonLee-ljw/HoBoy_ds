define(['jquery'], function($) {
    function ListenEvent (el,options) {
        this.opts = $.extend({},ListenEvent.DEFAULT,options);
        this.$el = $(el);
        this.delegationDom;//事件委托DOM元素
        this.triggerDom;//要触发的DOM元素
    };

    ListenEvent.prototype.init = function () {
            this.MouseEvent();
            this.ClickEvent();
    };

    //鼠标事件
    ListenEvent.prototype.MouseEvent = function () {
        this.$el.on('mouseenter',function (e) { 
                this.opts.childDom.addClass('none');
            }).on('mouseleave',function (e) {
                this.opts.childDom.removeClass('none');
            }).on('mouseover','li',function (e) {
                this.delegationDom =$(e.target);
                this.delegationDom.addClass('active1')
                this.triggerDom = $('#'+ main.data('id'));
                this.triggerDom.addClass("active");
                this.opts.childDom.on('mouseover','div',function() {
                    this.triggerDom.addClass('active');
                })
            }).on('mouseout','li',function (e) {
                this.delegationDom =$(e.target);
                this.delegationDom.removeClass('active1')
                this.triggerDom = $('#'+ main.data('id'));
                this.triggerDom.removeClass("active");
                this.opts.childDom.on('mouseout','div',function() {
                    this.opts.childDom.removeClass('active');
                })
            });
    }
    
    //默认参数
    ListenEvent.DEFAULT = {
        childDom:'',
        eventOne: 'mouseenter',
        eventSecond:'mouseleave',
        eventThree:'mouseover',
        eventForth:'mouseout',
        clickEvent:'click',
    }
    
    let init = function (el,option){
        new ListenEvent(el,option).init();
    }
    return {
        listenEvent:ListenEvent
    }
    
});