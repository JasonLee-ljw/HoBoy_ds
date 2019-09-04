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

    //判断是否存在（用户名/邮箱/密码/手机号）
    function judgeKey(num= 4,e = 'name',el,el1,el2,ele = 'true'){//输入需截取的字符串数量及判断的名字
        let keyName = [];
        let n = 0;
        let isRegister = ele;
            for(let key in localStorage){
                if(key.substr(-num,num) == e){
                 keyName.push(key)
                }
            }
        if(isRegister == 'true'){
            for(let i = 0; i< keyName.length; i++){
                if($.trim($(el).val()) == localStorage.getItem(keyName[i])){
                    $(el1).removeClass('isShow')//如果存在，警告语显示（用于注册页面，判断用户名等信息是否已被使用）   
                }else{
                    n ++
                }
            }

            if(n == keyName.length){//如果不存在，提示语显示（用于登录页面，判断手机号/用户名是否已注册）
                $(el2).removeClass('isShow')
            }
        }else if(isRegister == 'flase'){
            for(let i = 0; i< keyName.length; i++){
                if($.trim($(el).val()) == localStorage.getItem(keyName[i])){
                    //如果存在，如是使用手机号登录，根据手机号，找到对应用户名、用户密码，对比密码是否与用户输入一致，以此判断登录密码是否正确
                    
                    let userName = keyName[i].substring(0,keyName[i].length - num)
                    if($.trim($('#userPassage_text').val()) == localStorage.getItem(userName+'password')){
                        alert(`登录成功！欢迎你~${userName}`)
                        localStorage.setItem('newUser',`${userName}`)
                        window.location.reload()
                        $('#register_openOrClose').addClass('isShow')
                        $('.registerOrLogin_entrance').addClass('isShow')
                        $('.userNameOrExit_entrance').removeClass('isShow')
                        $('#userName_Header').text(`${userName}`)
                        localStorage.setItem('isRegister','true')
                    }else{//密码错误警示
                        $(el1).removeClass('isShow')
                    }
                    
                }else{
                    
                }
            }
        }
            
    }

    
    
    //登录点击事件
    $('#register_openOrClose').on('click','#clickForRegister',function() {
        
        let registerInput = $(".register_input")//所有登录页面输入框
        let registerWarning = $('.warningOf')//所有登录页面警告框
        let num = 0;
        //遍历所有输入框，判断是否为空
        for(let i = 0;i<registerInput.length;i++){
            if($.trim(registerInput.eq(i).val()).length == 0){
                $('#' + registerInput.eq(i).data('id') + '-1').removeClass('isShow')
            }
        }

        if($('#userPassage_text').hasClass('isShow') && !$('#warningOfPassage-1').hasClass('isShow')){
            $('#warningOfPassage-1').addClass('isShow')
        }
         
        //登录前判断所有信息是否填写完成
        for(let j = 0; j< registerWarning.length;j++){
            if(registerWarning.eq(j).hasClass('isShow')){
                num++
            }else{
                
            }
            
            if(num == 9 && $("#isShow-item").hasClass('isShow')){//用户使用密码登录
                if($.trim($('#userName_text').val()).length == 11){//使用手机号+密码登录
                    judgeKey(5,'phone','#userName_text','#warningOfPassage-2','','flase')
                }else{//使用用户名登录
                    judgeKey(4,'name','#userName_text','#warningOfPassage-2','','flase')
                }
            }
        }



       //点击输入框，警示信息消失 
    }).on('click','#userName_text',function() {
        if(!$('#warningOfPhone-1').hasClass('isShow')){
            $('#warningOfPhone-1').addClass('isShow')
        }else if(!$('#warningOfPhone-2').hasClass('isShow')){
            $('#warningOfPhone-2').addClass('isShow')
        }else if(!$('#warningOfPhone-3').hasClass('isShow')){
            $('#warningOfPhone-3').addClass('isShow')
        }else if(!$('#warningOfPhone-4').hasClass('isShow')){
            $('#warningOfPhone-4').addClass('isShow')
        }else{
            return
        }
    }).on('click','#userPassage_text',function() {
        if(!$('#warningOfPassage-1').hasClass('isShow')){
            $('#warningOfPassage-1').addClass('isShow')
        }else if(!$('#warningOfPassage-2').hasClass('isShow')){
            $('#warningOfPassage-2').addClass('isShow')
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
        }else if(isPhoneNumber($.trim($('#userName_text').val())) == true ){
            $("#sendAgain_register").addClass('isShow')
            $("#alreadySend_register").removeClass('isShow')
            countDown();
        }
    //登录方式切换
    }).on('click','.phoneOrPassword',function (e) {
        let registerWay_btn = $(e.target);
        let registerBox = $('#' + registerWay_btn.data('id'));
        if(registerWay_btn.text() !== '密码登录'){
            registerWay_btn.text('密码登录');
            registerBox.removeClass('isShow');
            $('#userPassage_text').addClass('isShow');
            $('#warningOfPassage-1').addClass('isShow')
            $("#userName_text").attr('placeholder' ,'请输入手机号')
        }else{
            registerWay_btn.text('手机验证码登录');
            registerBox.addClass('isShow');
            $('#userPassage_text').removeClass('isShow');
            $("#userName_text").attr('placeholder','请输入用户名/手机号登录')
        } 
    
    //登录页面右上角关闭按钮
    }).on('click','#register_Close', function(e) {
        $('#register_openOrClose').addClass('isShow');
    
    //切换到注册页面
    }).on('click','.btn_login',function () {
        $('#register_openOrClose').addClass('isShow')
        $('#login_openOrClose').removeClass('isShow')

    //密码显示/隐藏
    }).on('click','.users_input .registerEye',function(e) {
        $(e.target).addClass('isShow')
        $('#' + $(e.target).data('id')).removeClass('isShow')
        if( $(e.target).data('id') == 'registerOpenEye'){
            $('#userPassage_text').attr('type','text')

        }else if($(e.target).data('id') == 'registerCloseEye'){
            $('#userPassage_text').attr('type','password')
            
        }else{
            
        }
    });
    



    
    //注册页面事件
    let firstStorage = [];
    let userName = '';
    let userEmail = '';
    let userPassword = '';
    let userPhone = '';
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
           
            if(num == 17 && !wraning.eq(7).hasClass('isShow') && !wraning.eq(8).hasClass('isShow')){
                $("#returnLogin").removeClass('isShow')
                for(let k = 0;k<loginInput.length;k++){
                    firstStorage.push(loginInput.eq(k).val())
                }
                userName = firstStorage[0];
                userEmail = firstStorage[1];
                userPassword = firstStorage[2];
                userPhone = firstStorage[4];
                
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
        }else if(isPhoneNumber($.trim($('#loginUserPhone_text').val())) == true && $('#loginWarningOfUserPhone-3').hasClass('isShow')){
            $("#sendAgain").addClass('isShow')
            $("#alreadySend").removeClass('isShow')
            countDown();//发送成功，显示倒计时
        }

    //注册页面右上角关闭按钮
    }).on('click','#login_Close', function(e) {
        $('#login_openOrClose').addClass('isShow');
    });
    
    
    $(function(){
           //判断密码强度
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
            judgeKey(4,'name',"#loginUserName_text","#loginWarningOfUserName-2")
       
        //判断邮箱是否已存在
        }).on('blur','#loginUserEmail_text',function(){
            judgeKey(5,'email',"#loginUserEmail_text","#loginWarningOfUserEmail-3")

        //判断手机号是否已存在
        }).on('blur','#loginUserPhone_text',function(){
            judgeKey(5,'phone',"#loginUserPhone_text","#loginWarningOfUserPhone-3")

        });
        


        //登录界面光标移出事件
        //判断手机号格式是否正确/手机号是否已注册/用户名是否已存在
        $("#registerData_Gather").on('blur','#userName_text',function () {
            if($.trim($('#userName_text').val()).length == 11 && isPhoneNumber($.trim($('#userName_text').val())) == false){//判断手机格式
                $('#warningOfPhone-2').removeClass('isShow')
            }else if($.trim($('#userName_text').val()).length == 11 &&  isPhoneNumber($.trim($('#userName_text').val())) == true){//判断手机号是否已注册
                judgeKey(5,'phone','#userName_text','','#warningOfPhone-3',)
            }else if($.trim($('#userName_text').val()).length !== 0 && $.trim($('#userName_text').val()).length !== 11){//归类为用户名，判断用户名是否已注册
                judgeKey(4,'name','#userName_text','','#warningOfPhone-4')
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
            localStorage.setItem(`${userName}name`,userName);
            localStorage.setItem(`${userName}email`,userEmail);
            localStorage.setItem(`${userName}password`,userPassword);
            localStorage.setItem(`${userName}phone`,userPhone);
            
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