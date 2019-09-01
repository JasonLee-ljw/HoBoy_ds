define(['jquery'],function($) {
    //判断手机号
    function isPhoneNumber(number) {
        let phone = /^1[3|5|7|8|9]\d{9}$/;
        return phone.test(number)
    }

    //判断邮箱
    function isEmail(Email) {
        let email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
        return email.test(Email)
    }

    //倒计时
    function countDown() {
        let count = 59;
        let interval = setInterval(() => {
                if(count<0){
                    clearInterval(interval);
                    $('#sendAgain').removeClass('isShow')
                    $('#sendAgain_register').removeClass('isShow')
                    $('#countDown').text('60')
                    $("#countDown_register").text('60');
                }else{
                    $('#countDown').text(count) ;
                    $("#countDown_register").text(count);
                }
                count--;
            },1000)
     
    }
    

    //登录点击事件
    $('#register_openOrClose').on('click','#clickForRegister',function() {
        let phoneInput = $('#userName_text').val();//手机号码输入框
        let passageInput = $('#userPassage_text').val();//密码输入框
        let vertifyInput = $('#vertifyCode_text').val();//验证码输入框
        let registerInput = $(".register_input")//所有登录页面输入框


        //遍历所有输入框，判断是否为空
        for(let i = 0;i<registerInput.length;i++){
            if($.trim(registerInput.eq(i).val()).length == 0){
                $('#' + registerInput.eq(i).data('id') + '-1').removeClass('isShow')
            }
        }

        if($('#userPassage_text').hasClass('isShow') && !$('#warningOfPassage-1').hasClass('isShow')){
            $('#warningOfPassage-1').addClass('isShow')
        }



       //点击输入框，警示信息消失 
    }).on('click','#userName_text',function() {
        if(!$('#warningOfPhone-1').hasClass('isShow')){
            $('#warningOfPhone-1').addClass('isShow')
        }else if(!$('#warningOfPhone-2').hasClass('isShow')){
            $('#warningOfPhone-2').addClass('isShow')
        }else{
            return
        }
    }).on('click','#userPassage_text',function() {
        if(!$('#warningOfPassage-1').hasClass('isShow')){
            $('#warningOfPassage-1').addClass('isShow')
        }
    }).on('click','#vertifyCode_text',function() {
        if(!$('#warningOfCode-1').hasClass('isShow')){
            $('#warningOfCode-1').addClass('isShow')
        }else if(!$('#warningOfCode-2').hasClass('isShow')){
            $('#warningOfCode-2').addClass('isShow')
        }else{
            return
        }
    }).on('click','#phoneCode_text',function () {
        if(!$('#warningOfPhoneCode-2').hasClass('isShow')){
            $('#warningOfPhoneCode-2').addClass('isShow')
        }else if(!$('#warningOfPhoneCode-1').hasClass('isShow')){
            $("#warningOfPhoneCode-1").addClass('isShow')
        }
    
    //获取短信验证码
    }).on('click','.acquireVertifyCode_register',function () {
        if($.trim($('#userName_text').val()).length == 0) {
            $('#warningOfPhone-1').removeClass('isShow')
        }else if(isPhoneNumber($.trim($('#userName_text').val())) == true){
            $("#sendAgain_register").addClass('isShow')
            $("#alreadySend_register").removeClass('isShow')
            countDown();
        }
    })
    


    let firstStorage = [];
    
    //注册页面事件
    $('#login_openOrClose').on('click','#confirm_sumbit',function () {
        let loginInput = $('.login_input')//注册页面所有input框
        let wraning = $('.loginWarning')//注册页面所有警告
        let num = 0;
        

        //遍历所有input框是否空缺
        for(let i = 0;i<loginInput.length;i++){
            if($.trim(loginInput.eq(i).val()).length == 0){
                $('#' + loginInput.eq(i).data('id') + '-1').removeClass('isShow')
            }      
        }
        
        //判断条约是否勾选
        if(!$('#acceptItem').is(':checked')){
            $('#loginWarningOfItem-1').removeClass('isShow')
        }
         
        //判断所有警告是否处于隐藏状态，是，则跳转到确认注册页面
        for(let j = 0;j<wraning.length; j++){
            if(wraning.eq(j).hasClass('isShow')){
                num ++;
            }else{
                
            }

            if(num == 15 && !wraning.eq(6).hasClass('isShow') && !wraning.eq(7).hasClass('isShow')){
                $("#returnLogin").removeClass('isShow')
                for(let k = 0;k<loginInput.length;k++){
                    firstStorage.push(loginInput.eq(k).val())
                }
                
            }
        }
        

        //点击输入框，如存在警告语，关闭相对应警告语
    }).on('click','.login_input',function(e) {
            if(!$('#' + $(e.target).data('id') + '-1').hasClass('isShow')){
                $('#' + $(e.target).data('id') + '-1').addClass('isShow')
                
            }else if(!$('#' + $(e.target).data('id') + '-2').hasClass('isShow')){
                $('#' + $(e.target).data('id') + '-2').addClass('isShow')

            }else if($('#' + $(e.target).data('id') + '-3').addClass('isShow')){
                $('#' + $(e.target).data('id') + '-3').addClass('isShow')

            }else{
                return
            }
        
    //控制密码是否可见
    }).on('click','.user_password .loginEye',function(e) {
        $(e.target).addClass('isShow')
        $('#' + $(e.target).data('id')).removeClass('isShow')
        if( $(e.target).data('id') == 'loginOpenEye'){
            $('#loginUserPassage_text').attr('type','text')

        }else if($(e.target).data('id') == 'loginCloseEye'){
            $('#loginUserPassage_text').attr('type','password')
            
        }else if($(e.target).data('id') == 'loginOpenEye-1'){
            $('#loginUserPassageAgain_text').attr('type','text')

        }else{
            $('#loginUserPassageAgain_text').attr('type','password')
        }

        //点击获取短信验证码时，判断是否有输入手机号
    }).on('click','.acquireVertifyCode',function() {
        if($.trim($('#loginUserPhone_text').val()).length == 0) {
            $('#loginWarningOfUserPhone-1').removeClass('isShow')
        }else if(isPhoneNumber($.trim($('#loginUserPhone_text').val())) == true){
            $("#sendAgain").addClass('isShow')
            $("#alreadySend").removeClass('isShow')
            countDown();//发送成功，显示倒计时
        }

    })
    
    //判断密码强度
    $(function(){
           
          $('#loginUserPassage_text').on('input propertychange', function() {
            let loginPassage = $('#loginUserPassage_text').val()//密码输入框字符串
            
            if($.trim(loginPassage).length < 6){//提示密码强度信息显示
                $('.loginPassageStrength').addClass('isShow')
        
            }else if($.trim(loginPassage).length>=6 && $.trim(loginPassage).length < 8) {
                $('.loginPassageStrength').removeClass('isShow')
                $('.loginPassageStrength-1').css('backgroundPosition','0'+'-16'+'px' )

            }else if($.trim(loginPassage).length >=8 && $.trim(loginPassage).length < 10){
                $('.loginPassageStrength').removeClass('isShow')
                $('.loginPassageStrength-1').css('backgroundPosition','0'+'-34'+'px' )
                $('.loginPassageStrength-1').text('中等')

            }else if($.trim(loginPassage).length >=10 && $.trim(loginPassage).length < 14){
                $('.loginPassageStrength').removeClass('isShow')
                $('.loginPassageStrength-1').css('backgroundPosition','0'+'-52'+'px' )
                $('.loginPassageStrength-1').text('强')

            }else if($.trim(loginPassage).length >=14){
                $('.loginPassageStrength').removeClass('isShow')
                $('.loginPassageStrength-1').css('backgroundPosition','0'+'-70'+'px' )
                $('.loginPassageStrength-1').text('较强')

            }else{
                return
            }
             
             
             
          });

        //光标移出输入框事件
        let currentPassword = ''
             
        $('#loginData_Gather').on('blur','#loginUserPassage_text',function () {
               currentPassword = $('#loginUserPassage_text').val();
               if($.trim($('#loginUserPassage_text').val()).length > 0 && $.trim($('#loginUserPassage_text').val()).length < 6){
                    $('#loginWarningOfUserPassage-2').removeClass('isShow')
               }
         
       //判断两次密码输入是否一致
        }).on('blur','#loginUserPassageAgain_text',function() {
               if($('#loginUserPassageAgain_text').val() !== currentPassword){
                   $('#loginWarningOfUserPassageAgain-2').removeClass('isShow')
               }else{
                   return
               }

        //判断注册界面手机号格式是否正确  
        }).on('blur','#loginUserPhone_text',function () {
            if($.trim($('#loginUserPhone_text').val()).length !== 0 && isPhoneNumber($.trim($('#loginUserPhone_text').val())) == false){
                $('#loginWarningOfUserPhone-2').removeClass('isShow')
            }

        //判断验证码是否正确
        }).on('blur','#loginVertifyCode_text',function() {
            if($.trim($('#loginVertifyCode_text').val()).length !== 0 && $.trim($('#loginVertifyCode_text').val()) !== 'DWSE'){
              
                $('#loginWarningOfVertifyCode-2').removeClass('isShow')
            }

        //判断邮箱格式是否正确
        }).on('blur','#loginUserEmail_text',function() {
            if($.trim($('#loginUserEmail_text').val()).length !== 0 && isEmail($.trim($('#loginUserEmail_text').val())) == false){
                $('#loginWarningOfUserEmail-2').removeClass('isShow')
            }

        //判断短信验证码是否正确
        }).on('blur','#loginPhoneCode_text',function() {
            if($.trim($('#loginPhoneCode_text').val()).length !== 0 && $.trim($('#loginPhoneCode_text').val())!== '8888' ){
                $('#loginWarningOfPhoneCode-2').removeClass('isShow')
            }
        
        //判断用户名是否已使用
        }).on('blur','#loginUserName_text',function(){
            if($.trim($('#loginUserName_text').val()) == localStorage.getItem('user_Name')){
                $("#loginWarningOfUserName-2").removeClass('isShow')
            }
        });
        


        //登录界面光标移出事件
        //判断手机号格式是否正确
        $("#registerData_Gather").on('blur','#userName_text',function () {
            if($.trim($('#userName_text').val()).length !== 0 && isPhoneNumber($.trim($('#userName_text').val())) == false){
                $('#warningOfPhone-2').removeClass('isShow')
            }

        //判断验证码是否正确
        }).on('blur','#vertifyCode_text',function() {
            if($.trim($('#vertifyCode_text').val()).length !== 0 && $.trim($('#vertifyCode_text').val()) !== 'DWSE'){
                $('#warningOfCode-2').removeClass('isShow')
            }

        //判断短信验证码是否正确
        }).on('blur','#phoneCode_text',function() {
            if($.trim($('#phoneCode_text').val()).length !== 0 && $.trim($('#phoneCode_text').val())!== '8888' ){
                $('#warningOfPhoneCode-2').removeClass('isShow')
            }
        });   
    });
        
    //确认是否注册
    $('#returnLogin').on('click','.goWhere a',function(e){
        if($(e.target).data('id') == 'returnLogin'){//取消注册，当前弹窗关闭
            $('#returnLogin').addClass('isShow')

        }else if($(e.target).data('id') == 'confirmLogin'){//确认注册
            $('#returnLogin').addClass('isShow')
            $('#login_openOrClose').addClass('isShow')
            $("#loginSuccess").removeClass('isShow')//注册成功弹窗出现
            
            
        }
    
    
    })

    //注册成功，确认是否去登录
    $("#loginSuccess").on('click','.goWhere a',function(e){
        if($(e.target).data('id') == 'loginSuccess'){
            $('#loginSuccess').addClass('isShow')

        }else if($(e.target).data('id') == 'gotoRegister'){
            $('#loginSuccess').addClass('isShow')
            $("#register_openOrClose").removeClass('isShow')
        }
    })
        
        
        
    










})