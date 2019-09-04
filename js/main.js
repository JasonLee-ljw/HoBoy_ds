requirejs(['jquery','side_Toolbar','PhotoShow','CommodityDetail','allDialog','estimate','domModel','shopCar'],function ($,toolbar,photo,commodityDetail,dialog,dommodel,shopcar) {
    //插入页面头部
    $('#main_Wrap').insertHeader({
    });

    //网页刷新时，判断用户是否已登录
    if(localStorage.getItem('isRegister') == 'true'){
        $('.registerOrLogin_entrance').addClass('isShow')
        $('.userNameOrExit_entrance').removeClass('isShow')
        let userName = localStorage.getItem('newUser')//如已登录，页面头部加上用户用户名
        $('#userName_Header').text(`${userName}`)
    }

    //根据localstorage里所存商品数据，动态生成购物车列表
    if(localStorage.getItem('shopCar') !== null){
        let obj = JSON.parse(localStorage.getItem('shopCar'))
        for(let i = 0;i<obj.length;i++){
            $('#commodity_totalAccount').insertShopCar({
                commodities:{
                    picURL:`${obj[i].picURL}`,
                    title:`${obj[i].title}`,
                    color:`${obj[i].color}`,
                    size:`${obj[i].size}`,
                    price:`${obj[i].price}`,
                    count:`${obj[i].count}`,
                }
            })
        }
    }
    
    
    //插入登录、注册组件
    $('#register_openOrClose').addRegisterDialog()
    $('#login_openOrClose').addLoginDialog()

    //加入购物车成功弹窗
    $('#addToShopCar').addSmallDialog({
        picName:'success',
        tips:'加入购物车成功！',
        goWhereLeft:'去购物车',
        goWhereLeftURL:'../shopCar/shopcar.html',
        goWhereLeftDataID:'',
        goWhereRight:'继续购物',
        goWhereRightDataID:'addToShopCar'
    })

    //确认注册弹窗
    $('#returnLogin').addSmallDialog({
        picName:'confirm',
        tips:'是否确认注册？',
        goWhereLeft:'确认',
        goWhereLeftURL:'javascript:;',
        goWhereLeftDataID:'confirmLogin',
        goWhereRight:'返回',
        goWhereRightDataID:'returnLogin'
    })

    //注册成功弹窗
    $("#loginSuccess").addSmallDialog({
        picName:'success',
        tips:'注册成功！',
        goWhereLeft:'去登录',
        goWhereLeftURL:'javascript:;',
        goWhereLeftDataID:'gotoRegister',
        goWhereRight:'返回',
        goWhereRightDataID:'loginSuccess'
    })

    //退出登录确认弹窗
    $('#selectIsExit').addSmallDialog({
        picName:'confirm',
        tips:'是否确认退出？',
        goWhereLeft:'确认',
        goWhereLeftURL:'javascript:;',
        goWhereLeftDataID:'confirmExit',
        goWhereRight:'返回',
        goWhereRightDataID:'cancelExit'
    })

    //确认是否删除商品弹窗
    $("#selectDeleteCommodity").addSmallDialog({
        picName:'confirm',
        tips:'是否确认删除商品？',
        goWhereLeft:'确认',
        goWhereLeftURL:'javascript:;',
        goWhereLeftDataID:'confirmDelete',
        goWhereRight:'返回',
        goWhereRightDataID:'cancelDelete'
    })

    

    //侧栏导航条
    $('#backtop').backTop({
        mode:'move',
        pos:200,
    });
    
    //index.html
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
    
    //detail.html 热门服饰栏目
    $('#hot_photo-Wrap').insertDom({
        isGrid:true,
        photoData:[
            {photoName:'show',alt:'hot'},
            {photoName:'show1',alt:'hot'},
            {photoName:'show',alt:'hot'},
            {photoName:'show',alt:'hot'},
            {photoName:'show',alt:'hot'},
            {photoName:'show',alt:'hot'},
            {photoName:'show',alt:'hot'},
            {photoName:'show',alt:'hot'},
            {photoName:'show',alt:'hot'},
        ]
    })

    //detail.html 上装服饰栏目
    $('#tops_set-wrap').insertDom({
        isGrid:false,
        photoData:[
            {photoName:"T-shilt(white)",alt:'卫衣'},
            {photoName:"T-shilt(black)",alt:'卫衣'},
            {photoName:"T-shilt(white1)",alt:'卫衣'},
            {photoName:"fleece",alt:'卫衣'},
            {photoName:"fleece(yellow)",alt:'卫衣'},
            {photoName:"fleece(black)",alt:'卫衣'},
            {photoName:"jacket(black-white)",alt:'卫衣'},
            {photoName:"jacket(black)",alt:'卫衣'},
            {photoName:"jacket(yellow)",alt:'卫衣'}
        ]
    })

    //pants.html 下装服饰栏目
    $('#pants_set-wrap').insertDom({
        photoData:[
            {photoName:'halun',alt:'哈伦'},
            {photoName:'halun1',alt:'哈伦001'},
            {photoName:'duanku',alt:'短裤'},
            {photoName:'niuzai1',alt:'牛仔'},
            {photoName:'niuzai',alt:'牛仔001'},
            {photoName:'duanku1',alt:'短裤001'},
            {photoName:'yundongku',alt:'牛仔'},
            {photoName:'yundongku1',alt:'运动裤001'},
            {photoName:'duanku3',alt:'短裤002'},
        ]
    })
    
    //shoes.html 鞋子栏目
    $('#shoes_set-wrap').insertDom({
        photoData:[
            {photoName:'yundong',alt:'运动鞋'},
            {photoName:'yundong1',alt:'运动鞋01'},
            {photoName:'yundong2',alt:'运动鞋02'},
            {photoName:'buxie',alt:'布鞋'},
            {photoName:'buxie1',alt:'布鞋01'},
            {photoName:'buxie2',alt:'布鞋01'},
            {photoName:'pixie',alt:'皮鞋'},
            {photoName:'pixie1',alt:'皮鞋01'},
            {photoName:'pixie2',alt:'皮鞋01'},
        ]
    })

    //dcorations.html 装饰栏目
    $('#decorations_set-wrap').insertDom({
        photoData:[
            {photoName:'bangqiu',alt:'棒球帽'},
            {photoName:'bangqiu1',alt:'棒球帽01'},
            {photoName:'bangqiu2',alt:'棒球帽02'},
            {photoName:'shoubiao',alt:'手表'},
            {photoName:'toudai',alt:'头带'},
            {photoName:'shoubiao1',alt:'手表01'},
            {photoName:'pidai',alt:'皮带'},
            {photoName:'shouhaun1',alt:'手环01'},
            {photoName:'shouhaun',alt:'手环'},
        ]
    })
    
    //商品详情页面
    $('#commodities_wrap').commodityDetail({
        commodity:{
            title:'BADFIVE长安少年系列男子短袖文化衫',
            price:'￥288',
        },
        Blackphoto:[
            {photoName:'b00',alt:''},
            {photoName:'b01',alt:''},
            {photoName:'b02',alt:''},
            {photoName:'b03',alt:''},
            {photoName:'b10',alt:''},
            {photoName:'b11',alt:''},
            {photoName:'b12',alt:''},
            {photoName:'z00',alt:''},
            {photoName:'z01',alt:''},
            {photoName:'z02',alt:''},
            {photoName:'z03',alt:''},
            {photoName:'z10',alt:''},
            {photoName:'z11',alt:''},
            {photoName:'z12',alt:''},
        ],
        // Zongphoto:[
        //     {photoName:'zongT_big',alt:''},
        //     {photoName:'zongT_big1',alt:''},
        //     {photoName:'zongT_middle',alt:''},
        //     {photoName:'zongT_middle1',alt:''},
        //     {photoName:'zongT_small',alt:''},
        //     {photoName:'zongT_small1',alt:''},
        //     {photoName:'blackT_mostsmall',alt:''},
        //     {photoName:'zongT_mostsmall',alt:''},
        // ]
            
        
    })

    
})






