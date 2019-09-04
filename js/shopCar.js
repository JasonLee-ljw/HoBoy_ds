define(['jquery'],function($){
    let commodityID;
    let number;
    //确认是否删除商品
    $("#selectDeleteCommodity").on('click','a',function(e){
        if($(e.target).data('id') == 'cancelDelete'){
            $('#selectDeleteCommodity').addClass('isShow')
            
        }else if($(e.target).data('id') == 'confirmDelete'){
            $('#selectDeleteCommodity').addClass('isShow')
            alert('删除成功')
            commodityID.addClass('isShow')
            window.location.reload();
            let oldShopCar = JSON.parse(localStorage.getItem('shopCar'))
            oldShopCar.splice(parseInt(number)-1,1)
            let newShopCar = JSON.stringify(oldShopCar)
            localStorage.setItem('shopCar',`${newShopCar}`)
            
        }
    })
 
    //商品删除键，点击出现弹窗
    $("#shopCar_detail").on('click','.deleteCommodity',function(e){
        $("#selectDeleteCommodity").removeClass('isShow')
        commodityID = $('#' + $(e.target).data('id'))
        number = $(e.target).data('id').substr(-1,1)
    })

    
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
    }).on('click','#commodity_totalAccount input',function(e){
        
        if($(e.target).prop('checked') == true){
            let sum = 0;
            let sumPrice = 0;
            $('.select_commodity').prop('checked',true)
            for(let i = 0;i<$('.count_show').length;i++){
                sum += parseInt($('.count_show').eq(i).attr('placeholder'))
                $('#already_select').text(`${sum}`)
                localStorage.setItem('commodities_counts',`${sum}`)
            }
            for(let j = 0;j<$('.commodity_totalPrice').length;j++){
                sumPrice += parseInt($('.commodity_totalPrice').eq(j).text().substring(1))
                $('#should_PayMoney').text(`￥${sumPrice}`)
                localStorage.setItem('commodities_PayMoney',`${sumPrice}`)
            }
            parseInt($('.count_show').attr('placeholder'))
        }else{
            $('.select_commodity').prop('checked',false)
            $('#already_select').text(0)
            localStorage.setItem('commodities_counts',0)
            $('#should_PayMoney').text('￥0')
            localStorage.setItem('commodities_PayMoney',0)
        }
    })



})