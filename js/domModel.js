define(['jquery'],function($){
    localStorage.setItem('commodity_id',0)
    localStorage.setItem('collects_id',0)
    localStorage.setItem('seachResult_id',0)
    function domModel(el,options) {
        this.opts = $.extend({},domModel.DEFAULT,options)
        this.$el = $(el)
        if(this.$el.hasClass('products')){
            this.opts.headerPicURL = '../../images/'
            this.opts.footerCode = '../../images/'
            this.opts.seachURL = '../'
        }else if(this.$el.hasClass('shopCarAndCollects')){
            this.opts.seachURL = '../product/'
            this.opts.footerCode = '../images/'
        }else{
            this.opts.headerPicURL = '../images/'
            this.opts.footerCode = '../images/'
            this.opts.seachURL = './'
        }
    }

    //头部HTML模板
    domModel.prototype.insertHeader = function () {
        let picURL = this.opts.headerPicURL;
        let seachURL = this.opts.seachURL;
        let header = 
            "<header class='head_Bar'>"+
            "<!-- 顶部条 -->"+
            "<div class='top_Bar'>"+
                "<span class='welcome'>"+"hi~ 欢迎来到HoBoy"+"</span>"+
                "<div class='user_Admin' id='user_Admin1'>"+
                    "<ul class='user_Item' >"+
                        "<li>"+"<a href='javascript:;' class='registerOrLogin_entrance ' data-id='register_openOrClose'>"+"登录"+"</a>"+"</li>"+
                        "<li>"+"<a href='javascript:;' class='registerOrLogin_entrance ' data-id='login_openOrClose'>"+"注册"+"</a>"+"</li>"+
                        "<li>"+"<a href='javascript:;' class='userNameOrExit_entrance userName_Header isShow' id='userName_Header'>"+""+"</a>"+"</li>"+
                        "<li>"+"<a href='javascript:;' class='userNameOrExit_entrance isShow' id='exit_register' data-id='selectIsExit'>"+"退出"+"</a>"+"</li>"+
                    "</ul>"+
                    "<div class='collect_shopCar' id='collect_shopCar'>"+
                        "<a href='javascript:;' class='collect' id='gotoCollect'>"+"收藏夹"+"</a>"+
                        "<a href='javascript:;' class='shopCar' id='gotoShopCar'>"+"购物车"+"<span class='isShow' id='shopCar_counts'>"+"0件"+"</span>"+"</a>"+
                    "</div>"+
                "</div>"+
            "</div>"+
            
            "<!--搜索栏-->"+
            "<div class='seach_Bar' id='seach_Bar'>"+
                "<div class='logo'>"+
                    `<img src='${picURL}logo.png' alt='HoBoy'>`+
                    `<img src='${picURL}font_logo.png' alt='HoBoy' class='font_logo' title='HoBoy--专注潮流男装'>`+
                "</div>"+
                "<div class='seach'>"+
                    "<div class='realTime_result isShow' id='realTime_result'>"+
                    "</div>"+
                    "<a href='javascript:;' class='resule_none isShow' id='result_none'>"+"无符合的商品"+"</a>"+
                    "<input type='text'  placeholder='请输入你要搜索的内容...' class='seach_box' id='seach_input'/>"+
                    `<a href='${seachURL}seachResult.html' title='搜索' class='seach_button' id='seach_btn'>`+
                    
                "</div>"+
            "</div>"+   
        "</header>"

        this.$el.prepend(header)
    }

    //尾部HTML模板
    domModel.prototype.insertFooter = function () {
        let code = this.opts.footerCode;
        let footerHTML = 
        "<footer class='commu' id='index_footer'>"+
            "<div class='about_We'>"+
                "<span>"+"关于我们"+"</span>"+
                "<p>"+"&nbsp;&nbsp;&nbsp;&nbsp;"+"<em>"+"HoBoy"+"</em>"+"——年轻人潮流购物中心，同样秉承YOHO!“年轻是种态度”的口号，HoBoy有货专注于潮流趋势和受众的需要，凭借专业的买手团队和对潮流趋势敏锐的嗅觉，积极开拓符合年轻人喜爱的品牌和商品。销售包括国际知名、日韩港台流行、明星设计师、内地原创等等超过1400 个潮流品牌商品，满足18-35岁年轻群体的时尚个性化述求，主营男服装、鞋帽、配件及创意生活用品等。"+"</p>"+
            "</div>"+
            "<div class='call_we'>"+
                "<span>"+"联系我们"+"</span>"+
                "<em>"+"&nbsp;&nbsp;&nbsp;&nbsp;8888-88888888"+"</em>"+
                "<em>"+"广东省深圳市福田区江东街文化创意园HoBoy888"+"</em>"+
                "<div class='weixin_code'>"+
                    `<img src='${code}weixin_code.JPG' alt='HoBoy'>`+
                    "<span>"+"扫描关注HoBoy官方微信公众号"+"</span>"+
                "</div>"+ 
            "</div>"+
        "</footer>"

        this.$el.append(footerHTML)
    }

    //购物车商品模板
    domModel.prototype.insertShopCarCommodity = function() {
        let picURL = this.opts.ShopCarcommodities.picURL;
        let title = this.opts.ShopCarcommodities.title;
        let color = this.opts.ShopCarcommodities.color;
        let size = this.opts.ShopCarcommodities.size;
        let price = this.opts.ShopCarcommodities.price;
        let count = this.opts.ShopCarcommodities.count;
        let total = '￥' + price.substring(1)*count
        let newNum = parseInt(localStorage.getItem('commodity_id')) + 1
        localStorage.setItem('commodity_id',`${newNum}`)
        let commodityDom = 
        `<div class='commodity_contents' id='commodity_contents-${newNum}'>`+
            "<ul>"+
                "<li class='commodity_contents-1'>"+
                    "<div>"+
                        "<input type='checkbox' style='margin-left:10px' class='select_commodity'>"+
                        `<img src='${picURL}' alt='' style='margin:0 20px'>`+
                    "</div>"+
                    "<div class='text_detail'>"+
                        "<a href='javascript:;' style='color: #000000'>"+`${title}`+"</a>"+"<br>"+
                        "<span>"+"颜色："+`${color}`+"&nbsp;&nbsp;"+"</span>"+
                        "<span>"+"尺寸："+`${size}`+"</span>"+
                    "</div>"+
                "</li>"+
                "<li style='text-indent: -40px' >"+
                    "<span>"+`${price}`+"</span>"+
                "</li>"+
                "<li style='text-indent: -20px' class='count_controll'>"+
                    "<button style='width: 20px' data-id='count-'>"+"-"+"</button>"+
                    `<input type='text' placeholder='${count}' readonly='readonly' style='width: 50px;text-align: center' class='count_show'>`+
                    "<button style='width: 20px' data-id='count+'>"+"+"+"</button>"+
                "</li>"+
                "<li style='text-indent: -40px;' class='commodity_totalPrice'>"+
                    "<span>"+`${total}`+"</span>"+
                "</li>"+
                "<li class='removeOrCollect'>"+
                    "<a href='javascript:;' >"+`<span class='deleteCommodity' data-id='commodity_contents-${newNum}'>`+"删除"+"</span>"+"</a>"+
                    "<a href='javascript:;'>"+`<span class='addToCollects' data-id='commodity_contents1-${newNum}'>`+"移入收藏夹"+"</span>"+"</a>"+
                    `<span class='warningOf isShow' id='${newNum}'>收藏夹已存在该商品</span>`
                "</li>"+
            "</ul>"+
        "</div>"
        
        this.$el.before(commodityDom)
    }

    //收藏夹/搜索结果商品模板
    domModel.prototype.insertCollectOrSeachResult = function() {
        let commodityURL = this.opts.collectsCommodity.commodityURL;
        let picURL = this.opts.collectsCommodity.picURL;
        let title = this.opts.collectsCommodity.title;
        let price = this.opts.collectsCommodity.price;
        let isCollect = this.opts.isCollect;

        let newNum = 0;
        if(!isCollect){
            newNum = parseInt(localStorage.getItem('seachResult_id')) + 1;
            localStorage.setItem('seachResult_id',`${newNum}`)
        }else{
            newNum = parseInt(localStorage.getItem('collects_id')) + 1;
            localStorage.setItem('collects_id',`${newNum}`)
            
        }
        
        let CollectOrSeachResultDom = 
        "<li class='tops_set-item' >"+
            "<div class='collects_commodityBackground'>"+
                "<a href='javascript:;' class='tops_set-itemPic' id='pic_wrap'>"+`<img src='${picURL}' alt='{{alt}}' data-id='newAttr-${newNum}' class='collects_pic'>`+"</a>"+
                `<div id='newAttr-${newNum}' class='detail_describe' style='display:none'>`+
                    "<h5 >"+`${title}`+"</h5>"+
                    "<span style='pointer-events: none'>"+"&nbsp;&nbsp;"+`${price}`+"</span>"+
                    `<a href='../product/${commodityURL}' class='details'>`+"查看详情"+"</a>"+
                "</div>"+
            "</div>"+
        "</li>"
        this.$el.append(CollectOrSeachResultDom)

        if(isCollect){
            let collectDom = 
            `<a href='javascript:;' id='delete_current' class='removeCollect' data-id='${newNum}'>`+"移出收藏夹"+"</a>"
            this.$el.find(`#newAttr-${newNum}`).append(collectDom);
            
            
     
        }
    }

    //商品属性选择
    domModel.prototype.insertCommodityAttr = function () {
        
        let title = this.opts.commodityDetail.title
        let price = this.opts.commodityDetail.price
        let color01 = this.opts.commodityDetail.commodity_01.color01
        let color02 = this.opts.commodityDetail.commodity_02.color02
        let bigPhotoURL_Front01 = this.opts.commodityDetail.commodity_01.bigPhotoURL_Front01
        let middlePhotoURL_Front01 = this.opts.commodityDetail.commodity_01.middlePhotoURL_Front01
        let smallPhotoURL_Front01 = this.opts.commodityDetail.commodity_01.smallPhotoURL_Front01
        let smallPhotoURL_Back01 = this.opts.commodityDetail.commodity_01.smallPhotoURL_Back01
        let smallPhotoURL_Front02 = this.opts.commodityDetail.commodity_02.smallPhotoURL_Front02
        let smallPhotoURL_Back02 = this.opts.commodityDetail.commodity_02.smallPhotoURL_Back02
        let mostSmallPhotoURL_Front01 = this.opts.commodityDetail.commodity_01.mostSmallPhotoURL_Front01
        let mostSmallPhotoURL_Front02 = this.opts.commodityDetail.commodity_02.mostSmallPhotoURL_Front02
        let commodityAttr = 
        "<div class='commodityPhoto_wrap' >"+
            "<div class='commodityMiddlePhoto_wrap'  id='middlePhoto_wrap'>"+
                "<div class='commodityMiddlePhoto_wrap-1'>"+
                    "<div class='commodityMiddlePhoto_wrap-2' id='commodityMiddlePhoto_wrap-control'>"+
                        `<img src='${middlePhotoURL_Front01}' alt='${title}' id='middlePhoto'>`+
                    "</div>"+    
                "</div>"+    
            "</div>"+
            "<div class='commoditySmallPhoto_wrap' id='b01'>"+
                `<img src='${smallPhotoURL_Front01}' alt='${title}' title='{{alt}}-small' data-id='middleFront'>`+
                `<img src='${smallPhotoURL_Back01}' alt='${title}' title='{{alt}}-small' data-id='middleBack'>`+
            "</div>"+
            "<div class='commoditySmallPhoto_wrap isShow' id='z01'>"+
                `<img src='${smallPhotoURL_Front02}' alt='${title}' title='{{alt}}-small' data-id='middleFront'>`+
                `<img src='${smallPhotoURL_Back02}' alt='${title}' title='{{alt}}-small' data-id='middleBack'>`+
            "</div>"+
            
            "<div class='transparent' data-id='bigGlass'>"+"</div>"+
            "<div class='queeze isShow' id='bigGlass'>"+"</div>"+
        "</div>"+

        "<!--商品正面大图-->"+
        "<div class='commodityBigPhoto_wrap isShow' id='bigPhoto_wrap' >"+
            "<div class='commodityBigPhoto_wrap-1'>"+
                "<div class='commodityBigPhoto_item' id='bigPhoto_move'>"+
                    `<img src='${bigPhotoURL_Front01}' id='bigPhoto'>`+
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
                "<div class='commodityStyle_color'>"+
                    "<span>"+"颜&nbsp;&nbsp;色:&nbsp;"+"</span>"+
                    "<ul>"+
                        `<li class='black focus' data-id='b01' data-value='${color01}'>`+
                            `<img src='${mostSmallPhotoURL_Front01}' alt='' id='picURL'>`+
                            "<span id='commodity_color'>"+`${color01}`+"</span>"+
                        "</li>"+
                        `<li class='zong' data-id='z01' data-value='${color02}'>`+
                            `<img src='${mostSmallPhotoURL_Front02}' alt='' >`+
                            "<span >"+`${color02}`+"</span>"+
                        "</li>"+       
                    "</ul>"+    
                "</div>"+
                "<div class='commodityStyle_size'>"+
                    "<span>"+"尺&nbsp;&nbsp;码:&nbsp;"+"</span>"+
                    "<ul>"+
                        "<li data-value='M'>"+"<span>"+"M"+"</span>"+"</li>"+
                        "<li data-value='L'>"+"<span>"+"L"+"</span>"+"</li>"+
                        "<li data-value='XL'>"+"<span>"+"XL"+"</span>"+"</li>"+
                        "<li data-value='XXL'>"+"<span>"+"XXL"+"</span>"+"</li>"+
                        "<li data-value='XXXL'>"+"<span>"+"XXXL"+"</span>"+"</li>"+
                    "</ul>"+
                    "<span class='warning isShow' id='warning'>"+"请选择尺寸"+"</span>"+
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
                    "<a href='javascript:;' title='加入购物车' data-id='addToShopCar'>"+"<img src='../../images/shopCar1.png' alt='' data-id='addToShopCar'>"+"<span data-id='addToShopCar'>"+"加入购物车"+"</span>"+"</a>"+
                    "<a href='javascript:;' title='加入收藏夹' data-id='addToCollect'>"+"<img src='../../images/collect.png' alt='' data-id='addToCollect'>"+"<span data-id='addToCollect'>"+"收&nbsp;&nbsp;藏"+"</span>"+"</a>"+
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
        this.$el.append(commodityAttr)
        
    }

    domModel.DEFAULT = {
        headerPicURL:'../images/',
        footerCode:'../imgages/',
        seachURL:'./',
        isCollect:false,
        ShopCarcommodities:{
           picURL:'',
           title:'',
           color:'标准黑',
           size:'',
           price:'',
           count:'1',
        },
        collectsCommodity:{
           commodityURL:'',
           picURL:'',
           title:'',
           price:'',
        },
        commodityDetail:{
            title:'',
            price:'',
            commodity_01:{
                color01:'',
                bigPhotoURL_Front01:'',
                bigPhotoURL_Back01:'',
                middlePhotoURL_Front01:'',
                middlePhotoURL_Bcak01:'',
                smallPhotoURL_Front01:'',
                smallPhotoURL_Back01:'',
                mostSmallPhotoURL_01:'',
            },
            commodity_02:{
                color02:'',
                bigPhotoURL_Front02:'',
                bigPhotoURL_Back02:'',
                middlePhotoURL_Front02:'',
                middlePhotoURL_Bcak02:'',
                smallPhotoURL_Front02:'',
                smallPhotoURL_Back02:'',
                mostSmallPhotoURL_02:'',
            }

        }
    }

    $.fn.extend({
        insertHeader:function(opts){
            new domModel(this,opts).insertHeader()
        },
        insertFooter:function(opts){
            new domModel(this,opts).insertFooter()
        },
        insertShopCar:function(opts){
            new domModel(this,opts).insertShopCarCommodity()
        },
        insertCommodityDetail:function(opts){
            new domModel(this,opts).insertCommodityAttr()
        },
        insertCollectOrSeachResult:function(opts){
            new domModel(this,opts).insertCollectOrSeachResult()
        }
    })
    
    var insertShopCar = function (el,options){
        new domModel(el,options).insertShopCarCommodity()
    }

    return {
        insertDom:domModel(),
        insertShopCarDom:insertShopCar
    }



})