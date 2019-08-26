define(['jquery'],function ($) {
    function PhotoGlass (el,opts) {
        this.opts = $.extend({},PhotoGlass.DEFAULT,opts);
        this.$el = $(el);
        this.photoColor = this.opts.Blackphoto;
        
        
    };
    PhotoGlass.prototype.init = function () {
        this.commodities();
        this.bigGlass();
    }

    //商品图片、标题、价格插入
    PhotoGlass.prototype.commodities = function () {
        let temp = this.$el.html().replace(/^\s*/,"").replace(/\s*$/,"");
        let newHtml = temp.replace(/{{photoName-middle}}/g,this.photoColor[2].photoName)
                .replace(/{{alt}}/g,this.photoColor.alt)
                .replace(/{{photoName-small}}/g,this.photoColor[4].photoName)
                .replace(/{{photoName-small1}}/g,this.photoColor[5].photoName)
                .replace(/{{photoName-big}}/g,this.photoColor[0].photoName) 
                .replace(/{{photoName-mostsmall}}/g,this.photoColor[6].photoName)
                .replace(/{{photoName-mostsmall_zong}}/g,this.photoColor[7].photoName)
                .replace(/{{title}}/g,this.opts.commodityDetail.title)
                .replace(/{{price}}/g,this.opts.commodityDetail.price);
        this.$el.html(newHtml)
        console.log(this.$el.html())
    }
    
    //图片放大镜
    PhotoGlass.prototype.bigGlass = function () {
        let color = this.photoColor;
        let newBlack = this.opts.Blackphoto;
        let newZong = this.opts.Zongphoto;
        let arginInit = this.init();
        let middleFront = this.photoColor[2].photoName;//中号图片正面
        let bigFront = this.photoColor[0].photoName;//大号图片正面
        let bigBack = this.photoColor[1].photoName;//大号图片背面
        let middleBack = this.photoColor[3].photoName;//中号图片背面
        let bigPic = $('#bigPhoto_move');//大号图片直接父元素
        let middlePic;//中号图片上层透明层（与中号图片直接父元素同宽高）
        let glassPanel;//鼠标在中号图片上滑动时底部阴影板
        let glassPanelWidth;
        let glassPanelHeight;
        let middlePicWidth;
        let middlePicheight;
        let moveLeft;
        let moveTop;
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
        }).on('mousemove','img',function (e) {//判断鼠标滑过哪张小号图，更改对应中号图片及大号图片
            if($(e.target).data('id') == 'middleFront'){
                $(e.target).css('border','2px solid')
                $("#middlePhoto").attr('src',`../images/product/cloths/photoDetail/${middleFront}.jpg`)
                $("#bigPhoto").attr('src',`../images/product/cloths/photoDetail/${bigFront}.jpg`)
            }else if(($(e.target).data('id') == 'middleBack') ){
                $(e.target).css('border','2px solid')
                $("#middlePhoto").attr('src',`../images/product/cloths/photoDetail/${middleBack}.jpg`)
                $("#bigPhoto").attr('src',`../images/product/cloths/photoDetail/${bigBack}.jpg`)
            }else{
                $("#middlePhoto").attr('src',`../images/product/cloths/photoDetail/${middleFront}.jpg`)
                $("#bigPhoto").attr('src',`../images/product/cloths/photoDetail/${bigFront}.jpg`)
            };
        }).on('mouseout','img',function (e) {
            if($(e.target).data('id') == 'middleFront'){
                $(e.target).css('border', 'none')
            }else if($(e.target).data('id') == 'middleBack'){
                $(e.target).css('border', 'none')
            }else{
                return false
            }
        }).on('click','#commodityColorSelect a',function (e) {
            $(e.target).css('border','2px solid #000000')
            if($(e.target).data('id') == 'commodityColor-black'){
                color = newBlack;
                arginInit();
            }else if($(e.target).data('id') == 'commodityColor-zong'){
                color = newZong;
                arginInit();
            }else{

            };
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