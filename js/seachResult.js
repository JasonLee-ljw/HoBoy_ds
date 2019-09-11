define(['jquery','domModel'], function($,domModel) {
    //防抖
    function debounce(fn,delay) {
        let delays = delay || 500;
        let timer;
        return function () {
            let arg = arguments;
            if(timer){
                clearTimeout(timer)
                timer = null
            }
            timer = setTimeout(() => {
                fn.apply(this,arg)
            }, delays);
        }
    }


    $('#main_Wrap').on('click','#seach_Bar #seach_btn',function(e){//搜索按钮事件
        let seachContent = $(e.target).prev().val();
        if(seachContent === ''){//判断搜索框内容是否为空
            alert('请输入要搜索的内容')
            $('#seach_btn').attr('href','javascript:;')
        }else{
            if($("#main_Wrap").hasClass('products')){
                $('#seach_btn').attr('href','../seachResult.html')
            }else if($("#main_Wrap").hasClass('shopCarAndCollects')){
                $('#seach_btn').attr('href','../product/seachResult.html')
            }else{
                $('#seach_btn').attr('href','./seachResult.html')
            }
            localStorage.setItem('seachResultIndex','[]');//用于存放搜索结果的商品对应索引
            localStorage.setItem('seachContents','');//用于存放搜索内容
            let allCommodity = JSON.parse(localStorage.getItem('allCommodity'));
            let seachResultIndex = JSON.parse(localStorage.getItem('seachResultIndex'));
            for(let i = 0;i<allCommodity.length;i++){//遍历所有商品，如标题含有搜索关键字，则保存该商品索引
                if(allCommodity[i].newCommodityTitle.indexOf(seachContent) >= 0  && seachContent !== ''){
                    seachResultIndex.push(i)
                }
            }
            localStorage.setItem('seachContents',seachContent)
            localStorage.setItem('seachResultIndex',JSON.stringify(seachResultIndex))
        }
    
    //实时监测输入框内容，展示结果（防抖）
    }).on('input ','#seach_Bar #seach_input',debounce(function(e){
        let seachContent = $(e.target).val();
        let allCommodity = JSON.parse(localStorage.getItem('allCommodity'));
        $("#realTime_result").removeClass('isShow')
        let num_1 = 0;
        if(seachContent !== ''){
            $("#result_none").addClass('isShow')
            for(let i = 0;i<allCommodity.length;i++){//遍历所有商品，如标题含有搜索关键字，则保存该商品索引
                if(allCommodity[i].newCommodityTitle.indexOf(seachContent) >= 0  && seachContent !== ''){
                    let realTime_Text = allCommodity[i].newCommodityTitle;
                    let realTime_URL = '';
                    //判断基于哪个页面进行搜索
                    if($('#main_Wrap').hasClass('products')){
                        realTime_URL = '../' + allCommodity[i].newCommodityURL;
                    }else if($('#main_Wrap').hasClass('shopCarAndCollects')){
                        realTime_URL = '../product/' + allCommodity[i].newCommodityURL;
                    }else{
                        realTime_URL = allCommodity[i].newCommodityURL;
                    }
                    
                    $('#realTime_result').removeClass('isShow');
                    let result = $('#realTime_result').children();
                    let num = 0;
                    if(result.length > 0){
                        if(result.length > 3){
                            $("#realTime_result").css('overflow','scroll')
                        }
                        for(let j = 0;j<result.length;j++){
                            if(!result.eq(j).hasClass(`title-${i}`)){//判断显示框是否已存在结果，防止重复显示
                                num ++
                            }
                            
                            if(num === result.length){
                                $("#realTime_result").append(`<a href='${realTime_URL}' class='title-${i}'>${realTime_Text}</a>`)
                            }
                        }
                    }else{
                        $("#realTime_result").append(`<a href='${realTime_URL}' class='title-${i}'>${realTime_Text}</a>`)
                    }
         
                }else if(allCommodity[i].newCommodityTitle.indexOf(seachContent) < 0 ){
                    num_1 ++
                }
            } 
        }
        if(num_1 === allCommodity.length || seachContent == ''){//无符合搜索关键字的商品
            $("#realTime_result").empty()
            $("#result_none").removeClass('isShow')
        }

    //鼠标移出搜索框，结果预览隐藏
    })).on('blur','#seach_Bar #seach_input',function(e){
        if($(e.target).val() == ''){
            $("#realTime_result").empty()
            $("#realTime_result").addClass('isShow')
            $("#result_none").addClass('isShow')
        }
        
    })

    //根据localStorage数据，生成与搜索关键词相匹配的商品
    let seachContents = localStorage.getItem('seachContents')
    if(localStorage.getItem('allCommodity') !== null && localStorage.getItem('seachResultIndex') !== '[]'){
        let seachResult = JSON.parse(localStorage.getItem('seachResultIndex'))
        let allCommodity = JSON.parse(localStorage.getItem('allCommodity'))
        $('#seach_KeyWord').text(`${seachContents}`)
        $("#seach_counts").text(`${seachResult.length}`)
        $("#seachResult_null").addClass('isShow')
        for(let i = 0;i<seachResult.length;i++){
            $('#seachResult_wrap').insertCollectOrSeachResult({
                collectsCommodity:{
                    commodityURL:`${allCommodity[seachResult[i]].newCommodityURL}`,
                    picURL:`${allCommodity[seachResult[i]].newComoddityPicURL}`,
                    title:`${allCommodity[seachResult[i]].newCommodityTitle}`,
                    price:`${allCommodity[seachResult[i]].newCommodityPrice}`,
                }
            })
        }
    }else{
        $('#seach_KeyWord').text(`${seachContents}`)
        $("#seach_counts").text(0)
        $("#seachResult_null").removeClass('isShow')
    }
    

    //搜索结果，商品鼠标滑动效果
    let topHide = '';
    let topShow = '';
    $("#seachResult_review").on('mouseenter','#seachResult_wrap img',function(e){
        topHide = $(e.target);
        topShow = $('#'+ topHide.data('id'));
        topHide.css('width',200 + 'px');
        topHide.css('height',260 + 'px');
        topShow.fadeIn('slow')
    }).on('mouseleave','.collects_commodityBackground div',function(e){
        topHide = $(e.target).prev().children('img');
        topShow = $(e.target);
        topHide.css('width',180 + 'px');
        topHide.css('height',240 + 'px');
        topShow.fadeOut('fast')
    })
    
});