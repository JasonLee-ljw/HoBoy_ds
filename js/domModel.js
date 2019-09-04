define(['jquery'],function($){
    localStorage.setItem('commodity_id',0)
    function domModel(el,options) {
        this.opts = $.extend({},domModel.DEFAULT,options)
        this.$el = $(el)
        
    }

    //头部HTML模板
    domModel.prototype.insertHeader = function () {
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
                        "<li>"+"<a href='javascript:;' class='userNameOrExit_entrance isShow' id='exit_register' data-id='selectIsExit'>"+"退出登录"+"</a>"+"</li>"+
                    "</ul>"+
                    "<div class='collect_shopCar'>"+
                        "<a href='javascript:;' class='collect'>"+"收藏夹"+"</a>"+
                        "<a href='javascript:; class='shopCar'>"+"购物车"+"</a>"+
                    "</div>"+
                "</div>"+
            "</div>"+
            
            "<!--搜索栏-->"+
            "<div class='seach_Bar'>"+
                "<div class='logo'>"+
                    "<img src='../images/logo.png' alt='HoBoy'>"+
                "</div>"+
                "<div class='seach'>"+
                    "<input type='text'  placeholder='请输入你要搜索的内容...' class='seach_box' />"+
                    "<input type='button'  class='seach_button'>"+
                "</div>"+
            "</div>"+   
        "</header>"

        this.$el.prepend(header)
    }

    //购物车商品模板
    domModel.prototype.insertShopCarCommodity = function() {
        let picURL = this.opts.commodities.picURL;
        let title = this.opts.commodities.title;
        let color = this.opts.commodities.color;
        let size = this.opts.commodities.size;
        let price = this.opts.commodities.price;
        let count = this.opts.commodities.count;
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
                    "<a href='javascript:;'>"+"<span>"+"移入收藏夹"+"</span>"+"</a>"+
                "</li>"+
            "</ul>"+
        "</div>"
        
        this.$el.before(commodityDom)

    }



    domModel.DEFAULT = {
        commodities:{
           picURL:'',
           title:'',
           color:'标准黑',
           size:'',
           price:'',
           count:'1',
        }
    }

    $.fn.extend({
        insertHeader:function(opts){
            new domModel(this,opts).insertHeader()
        },
        insertShopCar:function(opts){
            new domModel(this,opts).insertShopCarCommodity()
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