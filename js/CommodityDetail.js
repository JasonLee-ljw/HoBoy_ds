define(['jquery'],function ($) {
    function CommodityDetail (el,opts) {
        this.opts = $.extend({},CommodityDetail.DEFAULT,opts);
        this.$el = $(el);
        this.photoColor;
        this.size;
        this.color;
        this.count = 1;
        this.picURL;
    };
    CommodityDetail.prototype.init = function () {
        this.commodities();
        this.bigGlass();
        this.eventGather();
    }
    
    //深拷贝对象数组
    CommodityDetail.prototype.deepCopy = function () {
        if(this.count == 'black'){
            this.photoColor = JSON.parse(JSON.stringify(this.opts.Blackphoto));
        }else{
            this.photoColor = JSON.parse(JSON.stringify(this.opts.Zongphoto));
        }
        
        
    }


    //商品图片、标题、价格插入
    CommodityDetail.prototype.commodities = function () {
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
                            .replace(/{{title}}/g,this.opts.commodity.title)
                            .replace(/{{price}}/g,this.opts.commodity.price);
        this.$el.html(newHtml)
    }
    
    //图片放大镜
    CommodityDetail.prototype.bigGlass = function () {
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
        let selfColor = this.color;
        let selfPic = this.picURL;

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
        }).on('mouseout','.transparent',function (e){//鼠标移出左侧商品图片区域，大图隐藏
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
        }).on('mouseout','.commodityPhoto_wrap img',function (e) {//鼠标滑过商品缩略图，添加边框效果
            if($(e.target).data('id') == 'middleFront'){
                $(e.target).css('border', 'none')
            }else if($(e.target).data('id') == 'middleBack'){
                $(e.target).css('border', 'none')
            }else{
                return false
            };
        }).on('click','.commodityStyle_color li',function (e) {//选择商品颜色，同时更换展示区商品图
            middleFront = $(e.target).data('id');
            selfColor = $(e.target).data('value');
            selfPic = $("#" + middleFront).children(":first").attr('src');
            $(e.target).siblings().removeClass('focus')
            if(middleFront == 'z01'){
                $('#b01').addClass('isShow')
                $(e.target).addClass('focus')
                $('#' + $(e.target).data('id')).removeClass('isShow');
                $("#middlePhoto").attr('src',`../images/product/cloths/photoDetail/${middleFront}.jpg`)
                middleBack = 'z11';
                bigFront = 'z00';
                bigBack = 'z10';
                $("#bigPhoto").attr('src',`../images/product/cloths/photoDetail/${bigFront}.jpg`)
                
            }else if(middleFront == 'b01'){
                $("#z01").addClass('isShow')
                $(e.target).addClass('focus');
                $('#' + $(e.target).data('id')).removeClass('isShow');
                $("#middlePhoto").attr('src',`../images/product/cloths/photoDetail/${middleFront}.jpg`)
                middleBack = 'b11';
                bigFront = 'b00';
                bigBack = 'b10';
                $("#bigPhoto").attr('src',`../images/product/cloths/photoDetail/${bigFront}.jpg`)
            }
        })
    };

    //商品详情界面，事件汇总
    CommodityDetail.prototype.eventGather = function () {
        let selfCount = this.count; 
        let selfSize = this.size;
        let selfTitle = this.opts.title;
        let selfPrice = this.opts.price;
        let selfPic = this.picURL;
        this.$el.on('click','.commodityStyle_size li',function (e) {//商品尺寸选中状态
            selfSize = $(e.target).data('value');
            if ($('#warning').hasClass('isShow')) {
                $(e.target).siblings().removeClass('focus_1')
                $(e.target).addClass('focus_1')
            }else{
                $('#warning').addClass('isShow')
                $(e.target).siblings().removeClass('focus_1')
                $(e.target).addClass('focus_1')
            }
            
        }).on('click','#count_plusOrMinus button',function (e) {//商品数量选择
            if($(e.target).data('value') == '+'){
                selfCount ++;
                $('#countInput').attr('placeholder',selfCount);
                $('#btn_-').css('color','black');
            }else if(($(e.target).data('value') == '-') && selfCount>1){
                selfCount --;
                $('#countInput').attr('placeholder',selfCount);  
            }else if(selfCount == 1){
                $('#btn_-').css('color','#b5b5b5');
            }else{
                return;
            }
        }).on('click','.commodityShop a',function(e) {//加入收藏/购物车
            if($(e.target).data('id') == 'addToCollect'){
                $(e.target).children().attr('src','../images/collect1.png')
            }else if(selfSize !== undefined && $(e.target).data('id') == 'addToShopCar'){
                selfTitle = $('#commodity_title').text();
                selfPrice = $('#commodity_price').text();
                $('#' + $(e.target).data('id')).removeClass('isShow')
            }else{
                $('#warning').removeClass('isShow')
            }
        }).on('click','#discounts_item a',function (e) {//优惠劵弹窗显示
            $("#close_discounts").removeClass('isShow')
        });
        
        //关闭优惠劵弹窗
        $('#close_discounts').on('click','header span',function () {
              $("#close_discounts").addClass('isShow')
        })

        //关闭添加购物车成功弹窗
        $('#addToShopCar').on('click', 'a',function (e) {
            if ($(e.target).data('id') == 'addToShopCar'){
                $('#addToShopCar').addClass('isShow')
            }
        })
        $('#commodity_evaluate-wrap').on('click','a',function (e) {//商品评论
            $(e.target).siblings().removeClass('isActive')
            $(e.target).addClass('isActive')
        })
    }

    CommodityDetail.DEFAULT={
        commodity:{
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
        new CommodityDetail(el.option).init();
    }
    //封装为jquery插件
    $.fn.extend({
        commodityDetail:function(opts){
            return this.each(function(){
               new CommodityDetail(this,opts).init();
            });
        }
    })

    return {
        commodityDetail:init
    }
})