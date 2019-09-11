requirejs(['jquery','side_Toolbar','PhotoShow','CommodityDetail','allDialog','estimate','domModel','shopCarAndCollects','Products','seachResult'],function ($,toolbar,photo,commodityDetail,dialog,dommodel,shopcar,products,seach) {
    //插入页面头部
    $('#main_Wrap').insertHeader({
    });
    
    //插入尾部
    $('#main_Wrap').insertFooter({

    });

    //网页刷新时，判断用户是否已登录
    if(localStorage.getItem('isRegister') == 'true'){
        $('.registerOrLogin_entrance').addClass('isShow')
        $('.userNameOrExit_entrance').removeClass('isShow')
        let userName = localStorage.getItem('newUser')//如已登录，页面头部加上用户用户名
        $('#userName_Header').text(`${userName}`)
        if(JSON.parse(localStorage.getItem('shopCar')) !== null){
            let commodityCount = JSON.parse(localStorage.getItem('shopCar')).length
            $('#shopCar_counts').text(`${commodityCount}件`)
            
        }
        $('#shopCar_counts').removeClass('isShow')
        if($('#main_Wrap').hasClass('products')){
            $('#gotoShopCar').attr('href','../../shopcarAndCollects/shopcar.html')
            $('#gotoCollect').attr('href','../../shopcarAndCollects/collects.html')
        }else{
            $('#gotoShopCar').attr('href','../shopcarAndCollects/shopcar.html')
            $('#gotoCollect').attr('href','../shopcarAndCollects/collects.html')
        }
        
    }

    //根据localstorage里所存商品数据，动态生成购物车列表
    if(localStorage.getItem('shopCar') !== null){
        let obj = JSON.parse(localStorage.getItem('shopCar'))
        
        for(let i = 0;i<obj.length;i++){//生成购物车商品列表
            $('#commodity_totalAccount').insertShopCar({
                ShopCarcommodities:{
                    picURL:`${obj[i].picURL}`,
                    title:`${obj[i].title}`,
                    color:`${obj[i].color}`,
                    size:`${obj[i].size}`,
                    price:`${obj[i].price}`,
                    count:`${obj[i].count}`,
                }
            })
        }
    }else{
        $('#shopCar_empty').removeClass('isShow')
    }

    //根据localstorage里所存商品数据，动态生成收藏夹列表
    if(localStorage.getItem('collects') !== null){
        let obj_1 = JSON.parse(localStorage.getItem('collects'))
        let pathName = window.location.pathname.substring(24)
        $('#allCollectsCounts').text(obj_1.length)
        for(let j = 0;j<obj_1.length;j++){//生成收藏夹商品列表
            $('#collects_set-wrap').insertCollectOrSeachResult({
                isCollect:true,
                collectsCommodity:{
                    commodityURL:`${obj_1[j].commodityURL}`,
                    picURL:`${obj_1[j].picURL}`,
                    title:`${obj_1[j].title}`,
                    price:`${obj_1[j].price}`,
                    }  
            })
            if(pathName == obj_1[j].commodityURL){
                $('#addToCollect').children('img').attr('src','../../images/collect1.png')
                $('#addToCollect').children('span').text('已收藏')
            }
        }
    }else{
        $('#collect_empty').removeClass('isShow')
    }
    
    
    
    //插入登录、注册组件
    $('#register_openOrClose').addRegisterDialog()
    $('#login_openOrClose').addLoginDialog()

    //加入购物车成功弹窗
    $('#addToShopCar').addSmallDialog({
        picName:'success.png',
        tips:'加入购物车成功！',
        goWhereLeft:'去购物车',
        goWhereLeftURL:'../../shopCarAndCollects/shopcar.html',
        goWhereLeftDataID:'',
        goWhereRight:'继续购物',
        goWhereRightDataID:'addToShopCar'
    })

    //确认注册弹窗
    $('#returnLogin').addSmallDialog({
        picName:'confirm.png',
        tips:'是否确认注册？',
        goWhereLeft:'确认',
        goWhereLeftDataID:'confirmLogin',
        goWhereRight:'返回',
        goWhereRightDataID:'returnLogin'
    })

    //注册成功弹窗
    $("#loginSuccess").addSmallDialog({
        picName:'success.png',
        tips:'注册成功！',
        goWhereLeft:'去登录',
        goWhereLeftDataID:'gotoRegister',
        goWhereRight:'返回',
        goWhereRightDataID:'loginSuccess'
    })

    //退出登录确认弹窗
    $('#selectIsExit').addSmallDialog({
        picName:'confirm.png',
        tips:'是否确认退出？',
        goWhereLeft:'确认',
        goWhereLeftDataID:'confirmExit',
        goWhereRight:'返回',
        goWhereRightDataID:'cancelExit'
    })

    //确认是否删除商品弹窗
    $("#selectDeleteCommodity").addSmallDialog({
        picName:'confirm.png',
        tips:'是否确认删除商品？',
        goWhereLeft:'确认',
        goWhereLeftDataID:'confirmDelete',
        goWhereRight:'返回',
        goWhereRightDataID:'cancelDelete'
    })

    //确认是否清空收藏夹弹窗
    $('#selectClearCollects').addSmallDialog({
        picName:'confirm.png',
        tips:'是否确认清空收藏夹？',
        goWhereLeft:'确认',
        goWhereLeftDataID:'confirmClear',
        goWhereRight:'返回',
        goWhereRightDataID:'cancelClear'
    })

    //侧栏导航条
    $('#backtop').backTop({
        mode:'move',
        pos:200,
    });
    
    //index.html 图片轮播栏
    $('#photo_wrap').photoShow({
        controlDom:'#template_control',
        photoData:[
            {photoName:'photo_show1',alt:'精品套装'},
            {photoName:'photo_show2',alt:'精品套装'},
            {photoName:'photo_show3',alt:'精品套装'},
            {photoName:'photo_show4',alt:'精品套装'},
            {photoName:'photo_show5',alt:'精品套装'},
        ]
    })

    //detail.html 图片轮播栏
    $('#photo_wrap-detail').photoShow({
        controlDom:'#template_control-detail',
        moveDistances:1100,
        photoData:[
            {photoName:'product-1',alt:'精品套装'},
            {photoName:'product-2',alt:'精品套装'},
            {photoName:'product-3',alt:'精品套装'},
            {photoName:'product-4',alt:'精品套装'},
            {photoName:'product-5',alt:'精品套装'},
        ]
    })
    
    
    
})






