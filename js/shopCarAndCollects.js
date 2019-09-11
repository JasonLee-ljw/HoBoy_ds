define(['jquery'],function($){
    let number;
    let allDelete = 'false';//是否批量删除
    //确认是否删除商品
    $("#selectDeleteCommodity").on('click','a',function(e){
        if($(e.target).data('id') == 'cancelDelete'){
            $('#selectDeleteCommodity').addClass('isShow')
        
        //判断是单独删除或是批量删除
        }else if($(e.target).data('id') == 'confirmDelete' ){
            $('#selectDeleteCommodity').addClass('isShow')
            alert('删除成功')
            if(allDelete == 'false'){//单独删除
                let oldShopCar = JSON.parse(localStorage.getItem('shopCar'))
                oldShopCar.splice(parseInt(number)-1,1)
                let newShopCar = JSON.stringify(oldShopCar)
                localStorage.setItem('shopCar',`${newShopCar}`)
            }else if(allDelete == 'true'){
                let isCheck = $('.select_commodity')
                let num = 0;
                for(let i=0;i< isCheck.length;i++){
                    if(isCheck.eq(i).prop('checked') == true){
                        let shopCar =  JSON.parse(localStorage.getItem('shopCar'));
                        shopCar.splice(i-num,1);//'num'用于记数，如果当前商品被选中，执行删除后，后面商品在localStorage中索引应往前移一位
                        let newShopCar = JSON.stringify(shopCar);
                        localStorage.setItem('shopCar',`${newShopCar}`)
                        num++;
                    }else{
                        //如果商品未选中，num不作变化
                    } 
                }
            }  

            if(JSON.parse(localStorage.getItem('shopCar')).length == 0){
                localStorage.removeItem('shopCar')
            }
            window.location.reload();
        }
    })

    //判断商品是否已存在收藏夹
    function isAlreadyAdd(num,isOnly,num_2) {//num：商品索引，isOnly:是否单独加入收藏夹,num_2:确保添加成功alert只出现一次
        let shopCarObj =  JSON.parse(localStorage.getItem('shopCar'))[num];
        let collectsObj = JSON.parse(localStorage.getItem('collects'));
        let count_1 = 0;
        let newCollectsObj = [{
             commodityURL:'',
             picURL:'',
             title:'',
             price:''
        }];
         newCollectsObj[0].commodityURL = shopCarObj.commodityURL;
         newCollectsObj[0].picURL = shopCarObj.picURL.replace('02.','01.');
         newCollectsObj[0].title = shopCarObj.title;
         newCollectsObj[0].price = shopCarObj.price;
        
         if( localStorage.getItem('collects') !== null && count_1 !== collectsObj.length){
            for(let i = 0; i<collectsObj.length ; i++){
                if(shopCarObj.commodityURL === collectsObj[i].commodityURL){//判断商品之前是否已加入收藏夹
                    if(isOnly === 'true'){
                        alert('收藏夹已存在该商品！')
                    }else{
                        let num_1 = num + 1;
                        $(`#${num_1}`).removeClass('isShow')//批量加入收藏夹，如商品已存在于收藏夹，则该商品对应警告语出现
                    }
                    return 
                }else{
                    count_1 ++
                    
                }

                if(count_1 === collectsObj.length){
                    let newCollectsObj_1 = collectsObj.concat(newCollectsObj)
                    let newCollectsStr = JSON.stringify(newCollectsObj_1)
                    localStorage.setItem('collects',newCollectsStr)
                    if(num_2 === 0){
                        alert('加入收藏夹成功！')
                    }
                    
                }
            }
        }else{
            let newCollectsStr_1 = JSON.stringify(newCollectsObj)
            localStorage.setItem('collects',newCollectsStr_1)
            alert('加入收藏夹成功！')
       }
    }


    //商品数量增加
    localStorage.setItem('commodities_counts',0)//初始化购物车所选商品总数为0
    localStorage.setItem('commodities_PayMoney',0)//初始化购物车应付总金额为0
    $('#shopCar_detail').on('click','.commodity_contents button',function(e){//'+'/'-'按钮事件
        let price = parseInt($(e.target).parent().prev().text().substring(1))//截取当前商品单价
        let totalprice = $(e.target).parent().next()//截取当前商品价格小计
        let totalCount = $('#already_select').text()//购物车已选择的商品总数
        let totalPayMoney = $('#should_PayMoney').text().substring(1)//购物车已选择商品的总应付金额
        let isChecked = $(e.target).parent().siblings('.commodity_contents-1').children(':first').children('input')//当前商品选择按钮

        if($(e.target).data('id') == 'count-' ){//判断哪个按钮被触发
            let nextCount = parseInt($(e.target).next().attr('placeholder'))//商品数量显示框（位于'-'与'+'之间）
            if(nextCount > 1){   
                $(e.target).next().attr('placeholder',nextCount - 1)
                let newPrice = (nextCount - 1)*price
                totalprice.text(`￥${newPrice}`)
                if(isChecked.prop('checked') == true){//判断当前商品是否被选中
                    let newCount = parseInt(totalCount) - 1
                    $('#already_select').text(`${newCount}`)//购物车选择商品总数量相应减少
                    //更改localStorage中商品数量
                    let newLocalCount = parseInt(localStorage.getItem('commodities_counts')) - 1
                    localStorage.setItem('commodities_counts',`${newLocalCount}`)

                    let newPayMoney = parseInt(totalPayMoney) - price
                    $('#should_PayMoney').text(`￥${newPayMoney}`)//应付总金额相应减少
                     //更改localStorage中应付总金额
                    let newLocalPayMoney = parseInt(localStorage.getItem('commodities_PayMoney')) - price
                    localStorage.setItem('commodities_PayMoney',`${newLocalPayMoney}`)
                }
                
            }else{
                return
            }  

        }else if($(e.target).data('id') == 'count+'){
            let preCount = parseInt($(e.target).prev().attr('placeholder'))//商品数量显示框（位于'-'与'+'之间）
            $(e.target).prev().attr('placeholder',preCount + 1)
            let newPrice = (preCount + 1)*price
            totalprice.text(`￥${newPrice}`)
            if(isChecked.prop('checked') == true){
                let newCount = parseInt(totalCount) + 1
                $('#already_select').text(`${newCount}`)//购物车选择商品总数量相应增加
                //更改localStorage中商品数量
                let newLocalCount = parseInt(localStorage.getItem('commodities_counts')) + 1
                localStorage.setItem('commodities_counts',`${newLocalCount}`)

                let newPayMoney = parseInt(totalPayMoney) + price//应付总金额相应增加
                $('#should_PayMoney').text(`￥${newPayMoney}`)
                //更改localStorage中应付总金额
                let newLocalPayMoney = parseInt(localStorage.getItem('commodities_PayMoney')) + price
                localStorage.setItem('commodities_PayMoney',`${newLocalPayMoney}`)
            }
        }

    }).on('click','.commodity_contents .select_commodity',function(e) {//商品选择按钮事件
        //获取此商品数量
        let count = $(e.target).parents().siblings('.count_controll').children('input').attr('placeholder')
        //获取此商品价格小计(去除价格前面的'￥')
        let total = $(e.target).parents().siblings('.commodity_totalPrice').text().substring(1)
        if($(e.target).prop('checked') == true){
            //所选商品总数量
            let newCount = parseInt(localStorage.getItem('commodities_counts')) + parseInt(count)
            $('#already_select').text(`${newCount}`)//如果商品被选中，购物车选中商品总数相应增加
            localStorage.setItem('commodities_counts',`${newCount}`)
            //应支付总金额
            let newPayMoney = parseInt(localStorage.getItem('commodities_PayMoney')) + parseInt(total)
            $('#should_PayMoney').text(`￥${newPayMoney}`)//如果商品被选中，应付总金额相应增加
            localStorage.setItem('commodities_PayMoney',`${newPayMoney}`)
        }else if($(e.target).prop('checked') == false){
            $('#all_Select').prop('checked',false)
            //所选商品总数量
            let newCount = parseInt(localStorage.getItem('commodities_counts')) - parseInt(count)
            $('#already_select').text(`${newCount}`)//如果商品被取消选中，购物车选中商品总数量相应减少
            localStorage.setItem('commodities_counts',`${newCount}`)
            //应支付总金额
            let newPayMoney = parseInt(localStorage.getItem('commodities_PayMoney')) - parseInt(total)
            $('#should_PayMoney').text(`￥${newPayMoney}`)//如果商品被取消选中，应付总金额相应减少
            localStorage.setItem('commodities_PayMoney',`${newPayMoney}`)
        }

    }).on('click','#commodity_totalAccount input',function(e){//全选按钮事件
        if($(e.target).prop('checked') == true){
            let sum = 0;
            let sumPrice = 0;
            $('.select_commodity').prop('checked',true)
            for(let i = 0;i<$('.count_show').length;i++){//获取所有商品数量
                sum += parseInt($('.count_show').eq(i).attr('placeholder'))
                $('#already_select').text(`${sum}`)
                localStorage.setItem('commodities_counts',`${sum}`)
            }
            for(let j = 0;j<$('.commodity_totalPrice').length;j++){//获取商品总金额
                sumPrice += parseInt($('.commodity_totalPrice').eq(j).text().substring(1))
                $('#should_PayMoney').text(`￥${sumPrice}`)
                localStorage.setItem('commodities_PayMoney',`${sumPrice}`)
            }
            parseInt($('.count_show').attr('placeholder'))
        }else{//取消选择，所有商品恢复为未选状态
            $('.select_commodity').prop('checked',false)
            $('#already_select').text(0)
            localStorage.setItem('commodities_counts',0)
            $('#should_PayMoney').text('￥0')
            localStorage.setItem('commodities_PayMoney',0)
        }

    }).on('click','.AllselectOrDelete a:not(:last-child)',function(e){//将所有选中的商品删除/移入收藏夹
        let isCheck = $('.select_commodity')
        let n = 0
            m = 0;
        for(let i=0;i< isCheck.length;i++){
            if(isCheck.eq(i).prop('checked') == false){
                n ++;
            }else if(isCheck.eq(i).prop('checked') == true && $(e.target).data('id') === 'addToCollects_selectCommodity'){//批量添加商品进收藏夹
                isAlreadyAdd(i,'false',m)
                m ++
            }
        }
        if(n !== isCheck.length && $(e.target).data('id') === 'delete_selectCommodity'){
            $("#selectDeleteCommodity").removeClass('isShow')
            allDelete = 'true';
        }else if(n === isCheck.length){
            alert('未选中商品')
        }
        
    }).on('click','.removeOrCollect span',function(e){//商品删除键，点击出现弹窗
        number = $(e.target).data('id').substr(-1,1)//获取商品索引
        if($(e.target).hasClass('deleteCommodity')){
            $("#selectDeleteCommodity").removeClass('isShow')
            allDelete = 'false';
        }else{
            isAlreadyAdd(number-1,'true',0)
        }    
    }).on('click','.commodity_contents .select_commodity',function(e){
        let warning = $(e.target).parents().siblings('.removeOrCollect').children('span')
        if(!warning.hasClass('isShow')){
            warning.addClass('isShow')
        }
    })


    //收藏夹事件
    $('#collects_wrap').on('click','#clear_Collects a',function(e){
        if($(e.target).data('id') == 'clear_collects' && JSON.parse(localStorage.getItem('collects')) == null){
            alert('收藏夹为空')
        }else{
            $('#selectClearCollects').removeClass('isShow')
        }

    //商品展示效果
    }).on('mouseenter','.collects_commodityBackground img',function(e){
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

    //单独移出收藏夹
    }).on('click','.tops_set-item #delete_current',function(e){
        let index = $(e.target).data('id');
        let collectsObj = JSON.parse(localStorage.getItem('collects'));
        collectsObj.splice(parseInt(index)-1,1);
        if(collectsObj.length === 0){
            localStorage.removeItem('collects')
        }else{
            localStorage.setItem('collects',JSON.stringify(collectsObj))
        }
        alert('移出收藏夹成功')
        window.location.reload()
    });

    //确认是否清空收藏夹弹窗
    $('#selectClearCollects').on('click','a',function(e){
        if($(e.target).data('id') == 'cancelClear'){
            $('#selectClearCollects').addClass('isShow')
        }else if($(e.target).data('id') == 'confirmClear'){
            localStorage.removeItem('collects')
            window.location.reload()
            $('#collect_empty').removeClass('isShow')
        }
    })

})