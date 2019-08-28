define(['jquery'],function ($) {
    function PhotoGlass (el,opts) {
        this.opts = $.extend({},PhotoGlass.DEFAULT,opts);
        this.$el = $(el);
        this.photoColor;
        
        
    };
    PhotoGlass.prototype.init = function () {
        
        this.commodities();
        this.bigGlass();
    }
    
    //深拷贝对象数组
    PhotoGlass.prototype.deepCopy = function () {
        if(this.count == 'black'){
            this.photoColor = JSON.parse(JSON.stringify(this.opts.Blackphoto));
        }else{
            this.photoColor = JSON.parse(JSON.stringify(this.opts.Zongphoto));
        }
        
        
    }


    //商品图片、标题、价格插入
    PhotoGlass.prototype.commodities = function () {
        let temp = this.$el.html().replace(/^\s*/,"").replace(/\s*$/,"");
        let newHtml = temp.replace(/{{b01}}/g,this.opts.Blackphoto[1].photoName)
                            .replace(/{{alt}}/g,this.opts.Blackphoto.alt)
                            .replace(/{{b02}}/g,this.opts.Blackphoto[2].photoName)
                            .replace(/{{b12}}/g,this.opts.Blackphoto[6].photoName)
                            .replace(/{{z02}}/g,this.opts.Blackphoto[9].photoName)
                            .replace(/{{z12}}/g,this.opts.Blackphoto[13].photoName)
                            .replace(/{{b00}}/g,this.opts.Blackphoto[0].photoName) 
                            .replace(/{{b03}}/g,this.opts.Blackphoto[3].photoName)
                            .replace(/{{z03}}/g,this.opts.Blackphoto[10].photoName)
                            .replace(/{{title}}/g,this.opts.commodityDetail.title)
                            .replace(/{{price}}/g,this.opts.commodityDetail.price);
        this.$el.html(newHtml)
    }
    
    //图片放大镜
    PhotoGlass.prototype.bigGlass = function () {
        let middleFront = this.opts.Blackphoto[1].photoName;//中号图片正面
        let bigFront = this.opts.Blackphoto[0].photoName;//大号图片正面
        let bigBack = this.opts.Blackphoto[4].photoName;//大号图片背面
        let middleBack = this.opts.Blackphoto[5].photoName;//中号图片背面
        let bigPic = $('#bigPhoto_move');//大号图片直接父元素
        let middlePic;//中号图片上层透明层（与中号图片直接父元素同宽高）
        let glassPanel;//鼠标在中号图片上滑动时底部阴影板
        let glassPanelWidth;
        let glassPanelHeight;
        let middlePicWidth;
        let middlePicheight;
        let moveLeft;
        let moveTop;
        let count = 0;
        this.$el.on('mousemove','.transparent',function (e) {
            middlePic = $(e.target);
            glassPanel = $('#' + middlePic.data('id'));
            glassPanelWidth = glassPanel.width();
            glassPanelHeight = glassPanel.height();
            middlePicWidth = middlePic.width();
            middlePicheight = middlePic.height();
            moveLeft = e.offsetX-glassPanelWidth/2;
            moveTop = e.offsetY- glassPanelHeight/2;
            glassPanel.removeClass('isShow');
            $('#bigPhoto_wrap').removeClass('isShow');
            
            //判断鼠标是否超出中号图片容器（竖直方向）
            if(e.offsetY < glassPanelHeight/2){
                glassPanel.css('top',0) 
                bigPic.css('top', 0)
            }
            else if(e.offsetY > (middlePicheight - glassPanelHeight/2)){
                glassPanel.css('top',middlePicheight - glassPanelHeight + 'px');
                bigPic.css('bottom',0 + 'px')
            }else{
                glassPanel.css('top',moveTop + 'px')
                bigPic.css('top',-moveTop*2.7 + 'px')
            };

            //判断鼠标是否超出中号图片容器（水平方向）
            if(e.offsetX < glassPanelWidth/2){
                glassPanel.css('left',138 +'px')
                bigPic.css('left',0)
            }else if(e.offsetX > (middlePicWidth - glassPanelWidth/2)){
                glassPanel.css('left',middlePicWidth - glassPanelWidth + 138 +'px')
                bigPic.css('right',0 + 'px')
            }else{
                glassPanel.css('left',moveLeft + 138 + 'px')
                bigPic.css('left',-moveLeft*2.7 + 'px')
            }; 
        }).on('mouseout','.transparent',function (e){
            middlePic = $(e.target);
            glassPanel = $('#' + middlePic.data('id'));
            glassPanel.addClass('isShow');
            $('#bigPhoto_wrap').addClass('isShow');
        }).on('mousemove','.commodityPhoto_wrap img',function (e) {//判断鼠标滑过哪张小号图，更改对应中号图片及大号图片
            if($(e.target).data('id') == 'middleFront'){
                
                $(e.target).css('border','2px solid')
                $("#middlePhoto").attr('src',`../images/product/cloths/photoDetail/${middleFront}.jpg`)
                $("#bigPhoto").attr('src',`../images/product/cloths/photoDetail/${bigFront}.jpg`)
            }else if(($(e.target).data('id') == 'middleBack') ){
                
                $(e.target).css('border','2px solid')
                $("#middlePhoto").attr('src',`../images/product/cloths/photoDetail/${middleBack}.jpg`)
                $("#bigPhoto").attr('src',`../images/product/cloths/photoDetail/${bigBack}.jpg`)
            }else{
                return false;
            };
        }).on('mouseout','.commodityPhoto_wrap img',function (e) {
            
            if($(e.target).data('id') == 'middleFront'){
                $(e.target).css('border', 'none')
            }else if($(e.target).data('id') == 'middleBack'){
                $(e.target).css('border', 'none')
            }else{
                return false
            };
        }).on('click','.commodityStyle_color li',function (e) {
            middleFront = $(e.target).data('id');
            $(e.target).siblings().removeClass('focus')
            if(middleFront == 'z01'){
                $('#b01').addClass('isShow')
                $(e.target).addClass('focus')
                $('#' + $(e.target).data('id')).removeClass('isShow');
                $("#middlePhoto").attr('src',`../images/product/cloths/photoDetail/${middleFront}.jpg`)
                middleBack = 'z11';
                bigFront = 'z00';
                bigBack = 'z10';
            }else if(middleFront == 'b01'){
                $("#z01").addClass('isShow')
                $(e.target).addClass('focus');
                $('#' + $(e.target).data('id')).removeClass('isShow');
                $("#middlePhoto").attr('src',`../images/product/cloths/photoDetail/${middleFront}.jpg`)
                middleBack = 'b11';
                bigFront = 'b00';
                bigBack = 'b10';

            }
        }).on('click','.commodityStyle_size li',function (e) {
            
            $(e.target).siblings().removeClass('focus_1')
            $(e.target).addClass('focus_1')
        }).on('click','#count_plusOrMinus button',function (e) {
            
            if($(e.target).data('value') == '+'){
                count ++;
                $('#countInput').attr('placeholder',count);
            }else if(($(e.target).data('value') == '-') && count>0){
                count --;
                $('#countInput').attr('placeholder',count);
            }
        }).on('click','.commodityShop a',function(e) {
            if($(e.target).data('id') == 'addToCollect'){
                $(e.target).children().attr('src','../images/collect1.png')
            }
        })
    };


    PhotoGlass.DEFAULT={
        commodityDetail:{
            title:'',
            price:''
        },
        Blackphoto:[
            {photoName:'',alt:''}
        ],
        Zongphoto:[
            {photoName:'',alt:''}
        ],
        Whitephoto:[
            {photoName:'',alt:''}
        ]
            
        
    }
    
    let init = function (el,option) {
        new PhotoGlass(el.option).init();
    }
    //封装为jquery插件
    $.fn.extend({
        photoGlass:function(opts){
            return this.each(function(){
               new PhotoGlass(this,opts).init();
            });
        }
    })

    return {
        photoGlass:init
    }
})