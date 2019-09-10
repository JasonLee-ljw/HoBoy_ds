define(['jquery','PhotoShow','CommodityDetail'], function($,photoShow,commodityDetail) {
    //hots.html 热门服饰栏目
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

    //cloths.html 上装服饰栏目
    $('#tops_set-list').insertDom({
        isGrid:false,
        photoFile:'cloths/photoDetail',
        photoModel:'model',
        photoData:[
            {alt:'长安少年',title:'BADFIVE长安少年系列男子短袖文化衫',price:'￥288'},
            {alt:'少不入川',title:'BADFIVE少不入川系列男子宽松短袖T恤',price:'￥188'},
            {alt:'嘿帕',title:'HEIPAR/嘿帕 字母印花短袖T恤',price:'￥288'},
            {alt:'Dickies',title:'Dickies 前置口袋印花半开襟连帽卫衣',price:'￥488'},
            {alt:'Converse',title:'Converse男子连帽套头卫衣',price:'￥388'},
            {alt:'卫衣',title:'Dickies 经典logo印花连帽卫衣',price:'￥399'},
            {alt:'卫衣',title:'VANS RILEY休闲夹克',price:'￥788'},
            {alt:'卫衣',title:'李宁 运动时尚复古系列休闲外套',price:'￥588'},
            {alt:'卫衣',title:'CAT 简约纯色多袋工装外套',price:'￥1388'}
        ]
    })

    //pants.html 下装服饰栏目
    $('#pants_set-list').insertDom({
        isGrid:false,
        photoFile:'trousers/photoDetail',
        photoModel:'model',
        photoData:[
            {alt:'哈伦',title:'MADNESS PANELED MILITARY SHORTS',price:'￥699'},
            {alt:'哈伦001',title:'MADNESS CONTRAST POCKET SHORTS',price:'￥699'},
            {alt:'短裤',title:'FREAKCUTE LOGO印花机能工装短裤',price:'￥399'},
            {alt:'牛仔',title:'gxg.jeans 简约阔腿休闲裤',price:'￥329'},
            {alt:'牛仔001',title:'DUSTY 2019 秋季新品 纯色工装裤',price:'￥159'},
            {alt:'短裤001',title:'itsclimax 束口纯色休闲裤',price:'￥288'},
            {alt:'牛仔',title:'viishow 简易式贴布口袋纯色廓形牛仔长裤',price:'￥188'},
            {alt:'运动裤001',title:'Life·After Life 组合腰包运动九分裤',price:'￥399'},
            {alt:'短裤002',title:'DC WEPMA PANT M OTLR KVJ0 休闲运动裤',price:'￥188'},
        ]
    })
    
    //shoes.html 鞋子栏目
    $('#shoes_set-list').insertDom({
        isGrid:false,
        photoFile:'shoes/photoDetail',
        photoModel:'model',
        photoData:[
            {alt:'哈伦',title:'CAT RESISTOR 个性撞色拼接老爹鞋',price:'￥1699'},
            {alt:'哈伦001',title:'MADNESS CONTRAST POCKET SHORTS',price:'￥699'},
            {alt:'短裤',title:'Converse Lucky Star 高帮休闲鞋',price:'￥599'},
            {alt:'牛仔',title:'DC LEGACY98 SLM  休闲运动鞋',price:'￥788'},
            {alt:'牛仔001',title:'速写CROQUIS 系带休闲皮鞋',price:'￥988'},
            {alt:'短裤001',title:'Originals SUPERSTAR 低帮休闲鞋',price:'￥688'},
            {alt:'牛仔',title:'TRENDIANO 撞色拼接运动鞋',price:'￥888'},
            {alt:'运动裤001',title:'CAT OVERTAKE 男士皮质低帮休闲鞋',price:'￥988'},
            {alt:'短裤002',title:'Converse 男子低帮休闲鞋',price:'￥588'},
        ]
    })

    //dcorations.html 装饰栏目
    $('#decorations_set-list').insertDom({
        isGrid:false,
        photoFile:'decorations/photoDetail',
        photoModel:'model',
        photoData:[
            {alt:'哈伦',title:'VANS WN1 JOCKEY logo刺绣棒球帽',price:'￥699'},
            {alt:'哈伦001',title:'MLB WATCH 夜光防水全自动机械男士手表',price:'￥1699'},
            {alt:'短裤',title:'Flavours Don’t Lie 复古格条款头带',price:'￥99'},
            {alt:'牛仔',title:'Emerica SECT鸭舌帽',price:'￥199'},
            {alt:'牛仔001',title:'AVI-8 猎人战斗机系列 自动机械表',price:'￥2690'},
            {alt:'短裤001',title:'AVI-8 复古手工编织情侣手绳',price:'￥188'},
            {alt:'牛仔',title:'SIT ON TROUBLE 字母印花弯檐帽',price:'￥188'},
            {alt:'运动裤001',title:'gxg.jeans 轻商务简约风牛皮带',price:'￥388'},
            {alt:'短裤002',title:'RASEN 狮子古银星海守护黑玛瑙手链',price:'￥99'},
        ]
    })
    
    //商品详情页面
    $('#commodities_wrap').commodityDetail({
        commodity:{
            title:'BADFIVE长安少年系列男子短袖文化衫',
            price:'￥288',
            photoFile:'../images/product/cloths/photoDetail0/'
        },
        commodityPhoto:[
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
    })

    //上装商品详情页
    $('#commodities_wrap_cloths0').commodityDetail({
        commodity:{
            title:'BADFIVE长安少年系列男子短袖文化衫',
            price:'￥288',
            color_0:'标准黑',
            color_1:'琥珀棕',
            photoFile:'../../images/product/cloths/photoDetail0/',
            colorCounts:2,
            commodityType:'cloths'
        },
        commodityPhoto:[
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
        commodityDetailAttr:{
            photoURL01_front:'../../images/product/cloths/photoDetail0/b00.jpg',
            photoURL01_back:'../../images/product/cloths/photoDetail0/b10.jpg',
            photoURL02_front:'../../images/product/cloths/photoDetail0/z00.jpg',
            photoURL02_back:'../../images/product/cloths/photoDetail0/z10.jpg',
            commodityModel_type:'tops'
        } 
    })

    $('#commodities_wrap_cloths1').commodityDetail({
        commodity:{
            title:'BADFIVE少不入川系列男子宽松短袖T恤',
            price:'￥188',
            color_0:'天鹅白',
            color_1:'标准黑',
            photoFile:'../../images/product/cloths/photoDetail1/',
            colorCounts:2,
            commodityType:'cloths'
        },
        commodityPhoto:[
            {photoName:'w00',alt:''},
            {photoName:'w01',alt:''},
            {photoName:'w02',alt:''},
            {photoName:'w03',alt:''},
            {photoName:'w10',alt:''},
            {photoName:'w11',alt:''},
            {photoName:'w12',alt:''},
            {photoName:'b00',alt:''},
            {photoName:'b01',alt:''},
            {photoName:'b02',alt:''},
            {photoName:'b03',alt:''},
            {photoName:'b10',alt:''},
            {photoName:'b11',alt:''},
            {photoName:'b12',alt:''},
        ],  
        commodityDetailAttr:{
            photoURL01_front:'../../images/product/cloths/photoDetail1/w00.jpg',
            photoURL01_back:'../../images/product/cloths/photoDetail1/w10.jpg',
            photoURL02_front:'../../images/product/cloths/photoDetail1/b00.jpg',
            photoURL02_back:'../../images/product/cloths/photoDetail1/b10.jpg',
            commodityModel_type:'tops'
        } 
    })

    $('#commodities_wrap_cloths2').commodityDetail({
        commodity:{
            title:'HEIPAR/嘿帕 字母印花短袖T恤',
            price:'￥288',
            color_0:'黄色',
            photoFile:'../../images/product/cloths/photoDetail2/',
            commodityType:'cloths'
        },
        commodityPhoto:[
            {photoName:'h00',alt:''},
            {photoName:'h01',alt:''},
            {photoName:'h02',alt:''},
            {photoName:'h03',alt:''},
            {photoName:'h10',alt:''},
            {photoName:'h11',alt:''},
            {photoName:'h12',alt:''},
           
        ],  
        commodityDetailAttr:{
            photoURL01_front:'../../images/product/cloths/photoDetail2/h00.jpg',
            photoURL01_back:'../../images/product/cloths/photoDetail2/h10.jpg',
            commodityModel_type:'tops'
        } 
    })


    //下装商品详情页
    $("#commodities_wrap_pants0").commodityDetail({
        commodity:{
            title:'MADNESS PANELED MILITARY SHORTS',
            price:'￥699',
            color_0:'杏色',
            color_1:'军绿色',
            photoFile:'../../images/product/trousers/photoDetail0/',
            colorCounts:2,
            commodityType:'trousers'
        },
        commodityPhoto:[
            {photoName:'z00',alt:''},
            {photoName:'z01',alt:''},
            {photoName:'z02',alt:''},
            {photoName:'z03',alt:''},
            {photoName:'z10',alt:''},
            {photoName:'z11',alt:''},
            {photoName:'z12',alt:''},
            {photoName:'g00',alt:''},
            {photoName:'g01',alt:''},
            {photoName:'g02',alt:''},
            {photoName:'g03',alt:''},
            {photoName:'g10',alt:''},
            {photoName:'g11',alt:''},
            {photoName:'g12',alt:''},
        ], 
        commodityDetailAttr:{
            photoURL01_front:'../../images/product/trousers/photoDetail0/z00.jpg',
            photoURL01_back:'../../images/product/trousers/photoDetail0/z10.jpg',
            photoURL02_front:'../../images/product/trousers/photoDetail0/g00.jpg',
            photoURL02_back:'../../images/product/trousers/photoDetail0/g10.jpg',
            commodityModel_type:'trousers',
        } 
    })

    $("#commodities_wrap_pants1").commodityDetail({
        commodity:{
            title:'MADNESS CONTRAST POCKET SHORTS',
            price:'￥699',
            color_0:'标准黑',
            photoFile:'../../images/product/trousers/photoDetail1/',
            commodityType:'trousers'
        },
        commodityPhoto:[
            {photoName:'b00',alt:''},
            {photoName:'b01',alt:''},
            {photoName:'b02',alt:''},
            {photoName:'b03',alt:''},
            {photoName:'b10',alt:''},
            {photoName:'b11',alt:''},
            {photoName:'b12',alt:''},
            
        ], 
        commodityDetailAttr:{
            photoURL01_front:'../../images/product/trousers/photoDetail1/b00.jpg',
            photoURL01_back:'../../images/product/trousers/photoDetail1/b10.jpg',
            commodityModel_type:'trousers',
        } 
    })

    $("#commodities_wrap_pants2").commodityDetail({
        commodity:{
            title:'FREAKCUTE LOGO印花机能工装短裤',
            price:'￥399',
            color_0:'军绿色',
            photoFile:'../../images/product/trousers/photoDetail2/',
            commodityType:'trousers'
        },
        commodityPhoto:[
            {photoName:'g00',alt:''},
            {photoName:'g01',alt:''},
            {photoName:'g02',alt:''},
            {photoName:'g03',alt:''},
            {photoName:'g10',alt:''},
            {photoName:'g11',alt:''},
            {photoName:'g12',alt:''},
            
        ], 
        commodityDetailAttr:{
            photoURL01_front:'../../images/product/trousers/photoDetail2/g00.jpg',
            photoURL01_back:'../../images/product/trousers/photoDetail2/g10.jpg',
            commodityModel_type:'trousers',
        } 
    })
    
    //鞋子商品详情页
    $("#commodities_wrap_shoes0").commodityDetail({
        commodity:{
            title:'CAT RESISTOR 个性撞色拼接老爹鞋',
            price:'￥1699',
            color_0:'黑白',
            photoFile:'../../images/product/shoes/photoDetail0/',
            commodityType:'shoes'
        },
        commodityPhoto:[
            {photoName:'w00',alt:''},
            {photoName:'w01',alt:''},
            {photoName:'w02',alt:''},
            {photoName:'w03',alt:''},
            {photoName:'w10',alt:''},
            {photoName:'w11',alt:''},
            {photoName:'w12',alt:''},
            
        ], 
        commodityDetailAttr:{
            photoURL01_front:'../../images/product/shoes/photoDetail0/w00.jpg',
            photoURL01_back:'../../images/product/shoes/photoDetail0/w10.jpg',
            commodityModel_type:'shoes',
        } 
    })

    $("#commodities_wrap_shoes1").commodityDetail({
        commodity:{
            title:'MADNESS CONTRAST POCKET SHORTS',
            price:'￥699',
            color_0:'标准黑',
            photoFile:'../../images/product/shoes/photoDetail1/',
            commodityType:'shoes'
        },
        commodityPhoto:[
            {photoName:'b00',alt:''},
            {photoName:'b01',alt:''},
            {photoName:'b02',alt:''},
            {photoName:'b03',alt:''},
            {photoName:'b10',alt:''},
            {photoName:'b11',alt:''},
            {photoName:'b12',alt:''},
            
        ], 
        commodityDetailAttr:{
            photoURL01_front:'../../images/product/shoes/photoDetail1/b00.jpg',
            photoURL01_back:'../../images/product/shoes/photoDetail1/b10.jpg',
            commodityModel_type:'shoes',
        } 
    })

    $("#commodities_wrap_shoes2").commodityDetail({
        commodity:{
            title:'Converse Lucky Star 高帮休闲鞋',
            price:'￥599',
            color_0:'棕色',
            color_1:'标准黑',
            photoFile:'../../images/product/shoes/photoDetail2/',
            colorCounts:2,
            commodityType:'shoes'
        },
        commodityPhoto:[
            {photoName:'z00',alt:''},
            {photoName:'z01',alt:''},
            {photoName:'z02',alt:''},
            {photoName:'z03',alt:''},
            {photoName:'z10',alt:''},
            {photoName:'z11',alt:''},
            {photoName:'z12',alt:''},
            {photoName:'b00',alt:''},
            {photoName:'b01',alt:''},
            {photoName:'b02',alt:''},
            {photoName:'b03',alt:''},
            {photoName:'b10',alt:''},
            {photoName:'b11',alt:''},
            {photoName:'b12',alt:''},
            
        ], 
        commodityDetailAttr:{
            photoURL01_front:'../../images/product/shoes/photoDetail2/z00.jpg',
            photoURL01_back:'../../images/product/shoes/photoDetail2/z10.jpg',
            photoURL02_front:'../../images/product/shoes/photoDetail2/b00.jpg',
            photoURL02_back:'../../images/product/shoes/photoDetail2/b10.jpg',
            commodityModel_type:'shoes',
        } 
    })

    //装饰商品详情页
    $("#commodities_wrap_decorations0").commodityDetail({
        commodity:{
            title:'VANS WN1 JOCKEY logo刺绣棒球帽',
            price:'￥699',
            color_0:'标准黑',
            color_1:'黄色',
            photoFile:'../../images/product/decorations/photoDetail0/',
            colorCounts:2,
            
        },
        commodityPhoto:[
            {photoName:'b00',alt:''},
            {photoName:'b01',alt:''},
            {photoName:'b02',alt:''},
            {photoName:'b03',alt:''},
            {photoName:'b10',alt:''},
            {photoName:'b11',alt:''},
            {photoName:'b12',alt:''},
            {photoName:'h00',alt:''},
            {photoName:'h01',alt:''},
            {photoName:'h02',alt:''},
            {photoName:'h03',alt:''},
            {photoName:'h10',alt:''},
            {photoName:'h11',alt:''},
            {photoName:'h12',alt:''},
            
        ], 
        commodityDetailAttr:{
            photoURL01_front:'../../images/product/decorations/photoDetail0/b00.jpg',
            photoURL01_back:'../../images/product/decorations/photoDetail0/b10.jpg',
            photoURL02_front:'../../images/product/decorations/photoDetail0/h00.jpg',
            photoURL02_back:'../../images/product/decorations/photoDetail0/h10.jpg',
            commodityModel_type:'hats',
        } 
    })

    $("#commodities_wrap_decorations1").commodityDetail({
        commodity:{
            title:'MLB WATCH 夜光防水全自动机械男士手表',
            price:'￥699',
            color_0:'黑金色',
            color_1:'橙色',
            photoFile:'../../images/product/decorations/photoDetail1/',
            colorCounts:2,
            
        },
        commodityPhoto:[
            {photoName:'b00',alt:''},
            {photoName:'b01',alt:''},
            {photoName:'b02',alt:''},
            {photoName:'b03',alt:''},
            {photoName:'b10',alt:''},
            {photoName:'b11',alt:''},
            {photoName:'b12',alt:''},
            {photoName:'c00',alt:''},
            {photoName:'c01',alt:''},
            {photoName:'c02',alt:''},
            {photoName:'c03',alt:''},
            {photoName:'c10',alt:''},
            {photoName:'c11',alt:''},
            {photoName:'c12',alt:''},
            
        ], 
        commodityDetailAttr:{
            photoURL01_front:'../../images/product/decorations/photoDetail1/b00.jpg',
            photoURL01_back:'../../images/product/decorations/photoDetail1/b10.jpg',
            photoURL02_front:'../../images/product/decorations/photoDetail1/c00.jpg',
            photoURL02_back:'../../images/product/decorations/photoDetail1/c10.jpg',
            commodityModel_type:'',
        } 
    })
    $("#commodities_wrap_decorations2").commodityDetail({
        commodity:{
            title:'Flavours Don’t Lie 复古格条款头带',
            price:'￥99',
            color_0:'标准黑',
            color_1:'蓝色',
            photoFile:'../../images/product/decorations/photoDetail2/',
            colorCounts:2,
            
        },
        commodityPhoto:[
            {photoName:'b00',alt:''},
            {photoName:'b01',alt:''},
            {photoName:'b02',alt:''},
            {photoName:'b03',alt:''},
            {photoName:'b10',alt:''},
            {photoName:'b11',alt:''},
            {photoName:'b12',alt:''},
            {photoName:'l00',alt:''},
            {photoName:'l01',alt:''},
            {photoName:'l02',alt:''},
            {photoName:'l03',alt:''},
            {photoName:'l10',alt:''},
            {photoName:'l11',alt:''},
            {photoName:'l12',alt:''},
            
        ], 
        commodityDetailAttr:{
            photoURL01_front:'../../images/product/decorations/photoDetail2/b00.jpg',
            photoURL01_back:'../../images/product/decorations/photoDetail2/b10.jpg',
            photoURL02_front:'../../images/product/decorations/photoDetail2/l00.jpg',
            photoURL02_back:'../../images/product/decorations/photoDetail2/l10.jpg',
            commodityModel_type:'',
        } 
    })


});