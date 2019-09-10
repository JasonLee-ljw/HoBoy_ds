define(['jquery','domModel'],function ($,commoditiesModel) {
    
    function CommodityDetail (el,opts) {
        this.opts = $.extend({},CommodityDetail.DEFAULT,opts);
        this.$el = $(el);
        this.color;
        this.picURL;
       

    };

    CommodityDetail.prototype.init = function () {
        this.commodities();
        this.bigGlass();
        this.eventGather();
    }


    //商品图片、标题、价格插入
    CommodityDetail.prototype.commodities = function () {
        let photo = this.opts.commodityPhoto;//图片集
        let title = this.opts.commodity.title;
        let price = this.opts.commodity.price;
        let color_0 = this.opts.commodity.color_0;
        let color_1 = this.opts.commodity.color_1;
        let photoFile = this.opts.commodity.photoFile;
        let colorCounts = this.opts.commodity.colorCounts;//商品多少种颜色
        let commodityType = this.opts.commodity.commodityType;//商品类型（不同类型，尺寸类型不同）
        let photoURL01_front = this.opts.commodityDetailAttr.photoURL01_front;
        let photoURL01_back = this.opts.commodityDetailAttr.photoURL01_back;
        let photoURL02_front = this.opts.commodityDetailAttr.photoURL02_front;
        let photoURL02_back = this.opts.commodityDetailAttr.photoURL02_back;
        let commodityModel_type = this.opts.commodityDetailAttr.commodityModel_type;
        
        let commodityHeaderHTML = 
        "<div class='commodityPhoto_wrap' >"+
            "<div class='commodityMiddlePhoto_wrap'  id='middlePhoto_wrap'>"+
                "<div class='commodityMiddlePhoto_wrap-1'>"+
                    "<div class='commodityMiddlePhoto_wrap-2' id='commodityMiddlePhoto_wrap-control'>"+
                        `<img src='${photoFile}${photo[1].photoName}.jpg' alt='{{alt}}' id='middlePhoto'>`+
                    "</div>"+    
                "</div>"+    
            "</div>"+
            "<div id='commodity_smallPhoto'>"+
                `<div class='commoditySmallPhoto_wrap' id='${photo[1].photoName}'>`+
                    `<img src='${photoFile}${photo[2].photoName}.jpg' alt='{{alt}}-small' title='{{alt}}-small' data-id='middleFront' id='default_picURL'>`+
                    `<img src='${photoFile}${photo[6].photoName}.jpg' alt='{{alt}}-small' title='{{alt}}-small' data-id='middleBack'>`+
                "</div>"+
                
            "</div>"+
            
            "<div class='transparent' data-id='bigGlass'>"+"</div>"+
            "<div class='queeze isShow' id='bigGlass'>"+"</div>"+
        "</div>"+

        "<!--商品正面大图-->"+
        "<div class='commodityBigPhoto_wrap isShow' id='bigPhoto_wrap' >"+
            "<div class='commodityBigPhoto_wrap-1'>"+
                "<div class='commodityBigPhoto_item' id='bigPhoto_move'>"+
                    `<img src='${photoFile}${photo[0].photoName}.jpg' id='bigPhoto'>`+
                "</div>"+
            "</div>"+ 
        "</div>"+

        "<!--商品信息-->"+
        "<div class='commodityMessage_wrap'>"+
            "<h2 id='commodity_title' data-id='52159756'>"+`${title}`+"</h2>"+
            "<div class='commodityPrice'>"+
                "<div>"+
                    "<span >"+"促销价："+"<em id='commodity_price'>"+`${price}`+"</em>"+"</span>"+
                "</div>"+
                "<div class='discounts'>"+
                    "<span>"+"领&nbsp;&nbsp;劵："+"</span>"+
                    "<ul id='discounts_item'>"+
                        "<li>"+"<a href='javascript:;'>"+"<span>"+"满￥88减￥8"+"</span>"+"</a>"+"</li>"+
                        "<li>"+"<a href='javascript:;'>"+"<span>"+"满￥188减￥18"+"</span>"+"</a>"+"</li>"+
                        "<li>"+"<a href='javascript:;'>"+"<span>"+"满￥288减￥28"+"</span>"+"</a>"+"</li>"+
                        "<li>"+"<a href='javascript:;' data-id='close_discounts'>"+"更多"+"</a>"+"</li>"+
                    "</ul>"+
                "</div>"+
            "</div>"+
            "<div class='commodityStyle'>"+
                "<div class='commodityStyle_color' id='commodityStyle_color'>"+
                    "<span>"+"颜&nbsp;&nbsp;色:&nbsp;"+"</span>"+
                    "<ul>"+
                        `<li class='black focus' data-id='${photo[1].photoName}' data-value='${color_0}'>`+
                            `<img src='${photoFile}${photo[3].photoName}.jpg' alt='' id='picURL'>`+
                            "<span id='commodity_color'>"+`${color_0}`+"</span>"+
                        "</li>"+
                               
                    "</ul>"+    
                "</div>"+
                "<div class='commodityStyle_size' id='commodityStyle_size'>"+
                    "<span>"+"尺&nbsp;&nbsp;码:&nbsp;"+"</span>"+
                    "<ul>"+
                        
                    "</ul>"+
                    "<span class='warning isShow' id='warning'>"+"请选择尺码"+"</span>"+
                "</div>"+
                "<div id='count_plusOrMinus'>"+
                    "<span>"+"数&nbsp;&nbsp;量:&nbsp;"+"</span>"+
                    "<ul>"+
                        "<li>"+"<button data-value='-' id='btn_-'>"+"-"+"</button>"+"</li>"+
                        "<li>"+"<input type='text' placeholder='1' readonly='readonly' id='countInput'>"+"</li>"+
                        "<li>"+"<button style='color:#000000' data-value='+'>"+"+"+"</button>"+"</li>"+
                    "</ul>"+
                "</div>"+
            "</div>"+
            "<div class='commodityShop'>"+
                "<div class='commodityShopCar'>"+
                    "<a href='javascript:;' title='加入购物车' data-id='addToShopCar' >"+"<img src='../../images/shopCar1.png' alt='' data-id='addToShopCar'>"+"<span data-id='addToShopCar'>"+"加入购物车"+"</span>"+"</a>"+
                    "<a href='javascript:;' title='加入收藏夹' data-id='addToCollect' id='addToCollect'>"+"<img src='../../images/collect.png' alt='' data-id='addToCollect' id='addToCollectIcon'>"+"<span data-id='addToCollect' id='addToCollectText'>"+"收&nbsp;&nbsp;藏"+"</span>"+"</a>"+
                "</div>"+
                "<div>"+
                    "<span>"+"分&nbsp;&nbsp;享："+"</span>"+
                    "<ul>"+
                        "<li>"+"<a href='javscript:;' title='分享至微博' class='commodityShare'>"+"<img src='../../images/weibo.png' alt='微博'>"+"</a>"+"</li>"+
                        "<li>"+"<a href='javscript:;' title='分享至微信' class='commodityShare'>"+"<img src='../../images/weixin.png' alt='微信'>"+"</a>"+"</li>"+
                        "<li>"+"<a href='javscript:;' title='分享至QQ' class='commodityShare'>"+"<img src='../../images/qq.png' alt='QQ'>"+"</a>"+"</li>"+
                    "</ul>"+
                "</div>"+
            "</div>"+
        "</div>"

        

        this.$el.append(commodityHeaderHTML)
        if(colorCounts === 2){
            let commodity_type = 
            `<li class='zong ' data-id='${photo[8].photoName}' data-value='${color_1}'>`+
                `<img src='${photoFile}${photo[10].photoName}.jpg' alt='' >`+
                "<span >"+`${color_1}`+"</span>"+
            "</li>"

            let commodity_small = 
            `<div class='commoditySmallPhoto_wrap isShow' id='${photo[8].photoName}'>`+
                `<img src='${photoFile}${photo[9].photoName}.jpg' alt='{{alt}}-small' title='{{alt}}-small' data-id='middleFront'>`+
                `<img src='${photoFile}${photo[13].photoName}.jpg' alt='{{alt}}-small' title='{{alt}}-small' data-id='middleBack'>`+
            "</div>"

            this.$el.children(':first').children('#commodity_smallPhoto').append(commodity_small)
            this.$el.children(':last').children().children('#commodityStyle_color').children('ul').append(commodity_type)  
        }
        
        if(commodityType === 'cloths' || commodityType === 'trousers'){
            let commodity_size = 
            "<li data-value='M'>"+"<span>"+"M"+"</span>"+"</li>"+
            "<li data-value='L'>"+"<span>"+"L"+"</span>"+"</li>"+
            "<li data-value='XL'>"+"<span>"+"XL"+"</span>"+"</li>"+
            "<li data-value='XXL'>"+"<span>"+"XXL"+"</span>"+"</li>"+
            "<li data-value='XXXL'>"+"<span>"+"XXXL"+"</span>"+"</li>"

            this.$el.children(':last').children().children('#commodityStyle_size').children('ul').append(commodity_size)  
        }else if(commodityType === 'shoes'){
            let commodity_size1 =
            "<li data-value='40'>"+"<span>"+"40"+"</span>"+"</li>"+
            "<li data-value='41'>"+"<span>"+"41"+"</span>"+"</li>"+
            "<li data-value='42'>"+"<span>"+"42"+"</span>"+"</li>"+
            "<li data-value='43'>"+"<span>"+"43"+"</span>"+"</li>"+
            "<li data-value='44'>"+"<span>"+"44"+"</span>"+"</li>"

            this.$el.children(':last').children().children('#commodityStyle_size').children('ul').append(commodity_size1)
        }else{
            let commodity_size2 = 
            "<li data-value='F'>"+"<span>"+"F"+"</span>"+"</li>"

            this.$el.children(':last').children().children('#commodityStyle_size').children('ul').append(commodity_size2)
        }

        let commodityDetailHTML = 
        "<div class='commodity_list'>"+
            "<div class='commodity_information-item item-1'>"+
                "<h3 class='label'>"+"商品信息"+"</h3>"+
                "<ul class='commodity_number'>"+
                    "<li>"+
                        "<span>"+"编&nbsp;&nbsp;&nbsp;&nbsp;号：52159756"+"</span>"+
                    "</li>"+
                    "<li>"+
                        "<span>"+"颜&nbsp;&nbsp;&nbsp;&nbsp;色：标准黑"+"</span>"+
                    "</li>"+
                    "<li>"+
                        "<span>"+"领&nbsp;&nbsp;&nbsp;&nbsp;型：圆领"+"</span>"+
                    "</li>"+
                    "<li>"+
                        "<span>"+"衣&nbsp;&nbsp;&nbsp;&nbsp;长：适中"+"</span>"+
                    "</li>"+
                    "<li>"+
                        "<span>"+"袖&nbsp;&nbsp;&nbsp;&nbsp;长：短袖"+"</span>"+
                    "</li>"+
                    "<li>"+
                        "<span>"+"版&nbsp;&nbsp;&nbsp;&nbsp;型：正常"+"</span>"+
                    "</li>"+
                    "<li>"+
                        "<span>"+"经典款型：LOGO/Slogan tee"+"</span>"+
                    "</li>"+
                    "<li>"+
                        "<span>"+"袖&nbsp;&nbsp;&nbsp;&nbsp;型：正常"+"</span>"+
                    "</li>"+
                    "<li>"+
                        "<span>"+"肩&nbsp;&nbsp;&nbsp;&nbsp;型：正常"+"</span>"+
                    "</li>"+
                    
                "</ul>"+
                "<div class='commodity_other'>"+
                    "<ul>"+
                        "<li>"+
                            "<span>"+"弹&nbsp;&nbsp;性："+"</span>"+
                            "<em>"+"小"+"</em>"+
                            "<i>"+"</i>"+
                            "<i class='focus_1'>"+"</i>"+
                            "<i>"+"</i>"+
                            "<i>"+"</i>"+
                            "<i>"+"</i>"+
                            "<em>"+"大"+"</em>"+
                        "</li>"+
                        "<li>"+
                            "<span>"+"厚&nbsp;&nbsp;度："+"</span>"+
                            "<em>"+"薄"+"</em>"+
                            "<i>"+"</i>"+
                            "<i>"+"</i>"+
                            "<i class='focus_1'>"+"</i>"+
                            "<i>"+"</i>"+
                            "<i>"+"</i>"+
                            "<em>"+"厚"+"</em>"+
                        "</li>"+
                        "<li>"+
                            "<span>"+"柔软度："+"</span>"+
                            "<em>"+"软"+"</em>"+
                            "<i class='focus_1'>"+"</i>"+
                            "<i>"+"</i>"+
                            "<i>"+"</i>"+
                            "<i>"+"</i>"+
                            "<i>"+"</i>"+
                            "<em>"+"硬"+"</em>"+
                        "</li>"+
                        "<li>"+
                            "<span>"+"透气性："+"</span>"+
                            "<em>"+"弱"+"</em>"+
                            "<i>"+"</i>"+
                            "<i>"+"</i>"+
                            "<i>"+"</i>"+
                            "<i class='focus_1'>"+"</i>"+
                            "<i>"+"</i>"+
                            "<em>"+"强"+"</em>"+
                        "</li>"+
                    "</ul>"+
                "</div>"+
            "</div>"+
            "<div class='commodity_information-item item-2'>"+
                "<span>"+"————————————————————&nbsp;"+"<span class='label'>"+"材质洗涤"+"</span>"+"&nbsp;————————————————————"+"</span>"+
                "<div class='commodity_material'>"+
                    "<div>"+
                        "<img src='../../images/cotton.jpg' alt='棉质'>"+
                        "<span>"+"棉"+"<br>"+"cotton"+"</span>"+
                    "</div>"+
                    "<p>"+"用各种洗涤剂，可手洗机洗，但不宜氯漂，宜阴干，避免曝晒，以免深色衣物褪色。浸泡时间不能太长，避免褪色，深色与浅色衣服最好分开洗涤，避免染色。棉质商品一般易皱、易缩水、易变形购买时请注意。"+"</p>"+
                "</div>"+
            "</div>"+
            "<div class='commodity_information-item item-3'>"+
                "<span>"+"————————————————————&nbsp;"+"<span class='label'>"+"尺码信息"+"</span>"+"&nbsp;————————————————————"+"</span>"+
                "<table>"+
                    "<tbody>"+
                        "<tr>"+
                            "<th>"+"吊牌尺寸"+"</th>"+
                            "<th>"+"参考尺码"+"</th>"+
                            "<th>"+"肩宽"+"</th>"+
                            "<th>"+"胸围"+"</th>"+
                            "<th>"+"袖长"+"</th>"+
                            "<th>"+"前衣长"+"</th>"+
                            "<th>"+"后衣长"+"</th>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>"+"S"+"</td>"+
                            "<td>"+"165/88A"+"</td>"+
                            "<td>"+"42"+"</td>"+
                            "<td>"+"98"+"</td>"+
                            "<td>"+"20"+"</td>"+
                            "<td>"+"67"+"</td>"+
                            "<td>"+"67"+"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>"+"M"+"</td>"+
                            "<td>"+"170/92A"+"</td>"+
                            "<td>"+"43"+"</td>"+
                            "<td>"+"102"+"</td>"+
                            "<td>"+"21"+"</td>"+
                            "<td>"+"69"+"</td>"+
                            "<td>"+"69"+"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>"+"L"+"</td>"+
                            "<td>"+"175/96A"+"</td>"+
                            "<td>"+"45"+"</td>"+
                            "<td>"+"106"+"</td>"+
                            "<td>"+"21"+"</td>"+
                            "<td>"+"70"+"</td>"+
                            "<td>"+"70"+"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>"+"XL"+"</td>"+
                            "<td>"+"180/100A"+"</td>"+
                            "<td>"+"46"+"</td>"+
                            "<td>"+"110"+"</td>"+
                            "<td>"+"22"+"</td>"+
                            "<td>"+"73"+"</td>"+
                            "<td>"+"73"+"</td>"+
                        "</tr>"+
                        "<tr>"+
                            "<td>"+"XXL"+"</td>"+
                            "<td>"+"185/104A"+"</td>"+
                            "<td>"+"47"+"</td>"+
                            "<td>"+"114"+"</td>"+
                            "<td>"+"23"+"</td>"+
                            "<td>"+"75"+"</td>"+
                            "<td>"+"75"+"</td>"+
                        "</tr>"+
                    "</tbody>"+
                "</table>"+
                "<P>"+"※ 以上尺寸为实物人工测量，因测量方式不同会有1-2CM误差，相关数据仅作参考，以收到实物为准。 单位：CM"+ 
                    "※ 参考尺码因衣服版型、剪裁不同会有误差，仅供参考"+"</P>"+
                "<div>"+
                    `<img src='../../images/${commodityModel_type}.jpg' alt=''>`+
                "</div>"+
            "</div>"+
            "<div class='commodity_information-item item-4'>"+
                "<span>"+"————————————————————&nbsp;"+"<span class='label'>"+"商品详情"+"</span>"+"&nbsp;————————————————————"+"</span>"+
                "<p>"+"BADFIVE长安少年系列短袖文化衫，运用简洁的色彩搭配，简洁时尚。采用棉涤材质，亲肤舒适，提升穿着体验。左下摆处“长安少年”别注织唛。衣服结合当地文化与我们BADFIVE街头特性，古文化与现代结合的联名单品。"+"</p>"+
                `<img src='${photoURL01_front}' alt='标准黑正面图'>`+
                `<img src='${photoURL01_back}' alt='标准黑背面图'>`+
                "<p>"+"衣面“BADFIVE”街头印花结合长安元素，将传统文化融入现代街头潮流，不同配色，多种花样，趣味满载，不失格调宽松自在版式设计，无惧束缚，放肆而动"+"<br>"+
                "衣服上整齐的车缝线，细密缝制，凸显品质感"+"<br>"+
                "甄选质感棉料打造，手感细腻而舒适挺括，随心去动"+"</p>"+
                `<img src='${photoURL02_front}' alt='琥珀棕正面图'>`+
                `<img src='${photoURL02_back}' alt='琥珀棕背面图'>`+
            "</div>"+
            "<div class='commodity_information-item item-5' id='commodity_evaluate-wrap'>"+
                "<span>"+"————————————————————&nbsp;"+"<span class='label'>"+"商品评价"+"</span>"+"&nbsp;————————————————————"+"</span>"+
                "<div class='commodity_evaluate-title'>"+
                    "<a href='javascript:;' class='isActive'>"+"<span>"+"全部（88）"+"</span>"+"</a>"+
                    "<a href='javascript:;'>"+"<span>"+"有图（58）"+"</span>"+"</a>"+
                    
                "</div>"+
                "<div class='commodity_evaluate-contents'>"+
                    "<div class='start'>"+"</div>"+
                    "<div>"+
                        "<div>"+
                            "<span>"+"</span>"+
                            "<img src='' alt=''>"+
                            "<span>"+"</span>"+
                        "</div>"+
                        "<div>"+
                            "<ul>"+
                                "<li>"+"</li>"+
                                "<li>"+"</li>"+
                                "<li>"+"</li>"+
                                "<li>"+"</li>"+
                                "<li>"+"</li>"+
                            "</ul>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
            "</div>"+
        "</div>"

        this.$el.after(commodityDetailHTML)
    }
    
    //图片放大镜
    CommodityDetail.prototype.bigGlass = function () {
        let middleFront = this.opts.commodityPhoto[1].photoName;//中号图片正面
        let bigFront = this.opts.commodityPhoto[0].photoName;//大号图片正面
        let bigBack = this.opts.commodityPhoto[4].photoName;//大号图片背面
        let middleBack = this.opts.commodityPhoto[5].photoName;//中号图片背面
        let photoArray = this.opts.commodityPhoto;
        let photoFile = this.opts.commodity.photoFile;//图片路径
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
        let selfPicURL = this.picURL;

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
                $("#middlePhoto").attr('src',`${photoFile}${middleFront}.jpg`)
                $("#bigPhoto").attr('src',`${photoFile}${bigFront}.jpg`)
            }else if(($(e.target).data('id') == 'middleBack') ){
                $(e.target).css('border','2px solid')
                $("#middlePhoto").attr('src',`${photoFile}${middleBack}.jpg`)
                $("#bigPhoto").attr('src',`${photoFile}${bigBack}.jpg`)
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
            let commodityDataID = $(e.target).data('id');
            selfColor = $(e.target).data('value');
            selfPicURL = $("#" + commodityDataID).children(":first").attr('src');
            $(e.target).siblings().removeClass('focus')
            $(e.target).addClass('focus')
            $('#' + $(e.target).data('id')).siblings().addClass('isShow')
            $('#' + $(e.target).data('id')).removeClass('isShow');
            
            if(commodityDataID == photoArray[8].photoName){
                middleFront = photoArray[8].photoName;
                $("#middlePhoto").attr('src',`${photoFile}${middleFront}.jpg`)
                middleBack = photoArray[12].photoName;
                bigFront = photoArray[7].photoName;
                bigBack = photoArray[11].photoName;
                $("#bigPhoto").attr('src',`${photoFile}${bigFront}.jpg`)
                
            }else if(commodityDataID == photoArray[1].photoName){
                middleFront = photoArray[1].photoName;
                $("#middlePhoto").attr('src',`${photoFile}${middleFront}.jpg`)
                middleBack = photoArray[5].photoName;
                bigFront = photoArray[0].photoName;
                bigBack = photoArray[4].photoName;
                $("#bigPhoto").attr('src',`${photoFile}${bigFront}.jpg`)
            }
        })
    };
    
    //商品详情界面，事件汇总
    CommodityDetail.prototype.eventGather = function () {
        let selfPicURL = $('#default_picURL').attr('src').substring(3); //默认图片URL
        let selfTitle = $('#commodity_title').text();
        let selfColor = $('#commodity_color').text();
        let selfSize = '';
        let selfPrice = $('#commodity_price').text();
        let selfCount = 1;  
        let selfTotal = selfPrice * selfCount;
        let commodityURL = window.location.pathname.substring(24)
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
        }).on('click','.commodityStyle_color li',function(e){
            selfColor = $(e.target).data('value');
            selfPicURL = $("#" + $(e.target).data('id')).children(":first").attr('src').substring(3);

        }).on('click','.commodityShop a',function(e) {//加入收藏/购物车
    
            if(localStorage.getItem('isRegister') !== 'true' ){//判断是否已登录账户
                alert('您尚未登录，请先登录！')
            }else if($(e.target).data('id') == 'addToCollect'){
                let collectIcon = $("#addToCollectIcon")
                let collectText = $("#addToCollectText")
                let picURL_1 = $('#middlePhoto').attr('src').substring(3)
                let newObj = [{
                    commodityURL:`${commodityURL}`,
                    picURL:`${picURL_1}`,
                    title:`${selfTitle}`,
                    price:`${selfPrice}`,
                    }]
                    
                if(localStorage.getItem('collects') !== null){
                    let obj = JSON.parse(localStorage.getItem('collects'))
                    for(let i = 0; i<obj.length ; i++){
                        if(newObj[0].commodityURL == obj[i].commodityURL){//判断商品之前是否已加入收藏夹，如是，再次点击将移出收藏夹
                            collectIcon.attr('src','../../images/collect.png')
                            collectText.text('收  藏')
                            obj.splice(i,1)
                            if(obj.length == 0){//移出收藏夹后，判断收藏夹是否为空
                                localStorage.removeItem('collects')
                            }else{
                                let newObj_1 = JSON.stringify(obj)
                                localStorage.setItem('collects',newObj_1)
                            }
                            
                        }else{
                            collectIcon.attr('src','../../images/collect1.png')
                            collectText.text('已收藏')
                            let newObj_2 = obj.concat(newObj)
                            let str_1 = JSON.stringify(newObj_2)
                            localStorage.setItem('collects',str_1)
                        }
                    }
                }else{
                    collectIcon.attr('src','../../images/collect1.png')
                    collectText.text('已收藏')
                    let str = JSON.stringify(newObj)
                    localStorage.setItem('collects',str)
                }
            }else if(selfSize !== '' && $(e.target).data('id') == 'addToShopCar'){
                selfTitle = $('#commodity_title').text();
                selfPrice = $('#commodity_price').text();
                $('#' + $(e.target).data('id')).removeClass('isShow')
                let newObj = [{
                    picURL:`${selfPicURL}`,
                    title:`${selfTitle}`,
                    color:`${selfColor}`,
                    size:`${selfSize}`,
                    price:`${selfPrice}`,
                    count:`${selfCount}`,
                    }]
               
                if(localStorage.getItem('shopCar') !== null){
                    let obj = JSON.parse(localStorage.getItem('shopCar'))
                    let num = 0;
                    for(let i = 0;i<obj.length;i++){//判断购物车里是否已存在商品（商品名、颜色、尺寸均相同）
                        if(obj[i].title == newObj[0].title && obj[i].color == newObj[0].color && obj[i].size == newObj[0].size){
                            //如果已存在相同商品，更改该商品在localStorage中对应数量，购物车里对应商品数量增加即可，不再作为新商品插入
                            obj[i].count = parseInt(newObj[0].count) + parseInt(obj[i].count)
                            let review =  JSON.stringify(obj)   
                            localStorage.setItem('shopCar',`${review}`)
                            num ++;
                        }
                    }
                    if(num == 0){//如果购物车中不存在相同商品，则作为新商品插入到购物车
                        let nowObj = JSON.parse(localStorage.getItem('shopCar')).concat(newObj)
                        localStorage.setItem('shopCar',JSON.stringify(nowObj)) 
                    }

                    let commodityCount = JSON.parse(localStorage.getItem('shopCar')).length
                    $('#shopCar_counts').text(`${commodityCount}件`)
            
                }else{
                    let str = JSON.stringify(newObj)
                    localStorage.setItem('shopCar',str)
                }

            }else{
                $('#warning').removeClass('isShow')
            }



        //优惠劵弹窗显示    
        }).on('click','#discounts_item a',function (e) {
            $("#close_discounts").removeClass('isShow')
        });
        
        //关闭优惠劵弹窗
        $('#close_discounts').on('click','header span',function () {
              $("#close_discounts").addClass('isShow')
        })

        //关闭添加购物车成功弹窗
        $('#addToShopCar').on('click', 'a',function (e) {
            if ($(e.target).data('id') == 'addToShopCar' ){
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
            price:'',
            photoFile:'',
            color_0:'',
            color_1:'',
            colorCounts:1,
            commodityType:'cloths'
        },
        commodityPhoto:[
            {photoName:'',alt:''}
        ],
        commodityDetailAttr:{
            photoURL01_front:'',
            photoURL01_back:'',
            photoURL02_front:'',
            photoURL02_back:'',
            commodityModel_type:'tops'
        }    
        
    }
    
    let init = function (el,option) {
        new CommodityDetail(el,option).init();
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