define(['jquery'],function($) {
    function AllDialog(el,options) {
        this.opts = $.extend({},AllDialog.DEFAULT,options);
        this.$el = $(el);
        this.registerModel;
        this.loginModel;
        this.addSuccessModel;
    }
    
    //登录弹窗
    AllDialog.prototype.registerDialog = function () {
        let registerPic1 = this.opts.registerPic1;
        let registerPic2 = this.opts.registerPic2;
        let registerPic3 = this.opts.registerPic3;
        let registerPic4 = this.opts.registerPic4;
        this.registerModel = 
            "<div class='registerAndLogin_panel register_panel'>"+
                "<header id='register_panelHead'>"+
                    "<h2>用户登录</h2>"+
                    "<span id='register_Close' ></span>"+
                "</header>"+
                "<section class='registerAndLogin_data register_data' id='registerData_Gather'>"+
                    "<!--用户登录信息-->"+
                    "<div class='registerAndLogin_input users_input'>"+
                        "<div class='users_message' id='userInput'>"+
                            "<input type='text' placeholder='请输入用户名/手机号登录' id='userName_text' data-id='warningOfPhone' class='register_input'>"+
                            "<span class='warningOf isShow' id='warningOfPhone-1'>"+"请输入用户名/手机号"+"</span>"+
                            "<span class='warningOf isShow' id='warningOfPhone-2'>"+"请输入正确的手机号"+"</span>"+
                            "<span class='warningOf isShow' id='warningOfPhone-3'>"+"手机号未注册，请先注册"+"</span>"+
                            "<span class='warningOf isShow' id='warningOfPhone-4'>"+"用户名不存在，请先注册"+"</span>"+
                            "<input type='password' placeholder='请输入密码...'  id='userPassage_text' data-id='warningOfPassage' class='password register_input'>"+
                            "<span class='registerEye registerCloseEye ' data-id='registerOpenEye' id='registerCloseEye'>"+"</span>"+
                            "<span class='registerEye registerOpenEye isShow' data-id='registerCloseEye' id='registerOpenEye'>"+"</span>"+
                            "<span class='warningOf warningOfPassage isShow' id='warningOfPassage-1' >"+"请输入密码"+"</span>"+
                            "<span class='warningOf warningOfPassage isShow' id='warningOfPassage-2' >"+"密码错误"+"</span>"+
                            "<div class='phone_code-wrap isShow' id='isShow-item' >"+
                                "<input type='text' placeholder='请输入手机动态验证码'      class='phone_code-input register_input' id='phoneCode_text' data-id='warningOfPhoneCode'>"+
                                "<a href='javascript:;'  class='phone_btn acquireVertifyCode_register'>" +"获取短信验证码"+"</a>" +
                                "<a href='javascript:;' id='alreadySend_register' class='alreadySend isShow'>" +"已发送("+"<em id='countDown_register'>"+"60"+"</em>"+")"+"</a>" +
                                "<a href='javascript:;' id='sendAgain_register' class='sendAgain acquireVertifyCode_register isShow' >" +"重新发送"+"</a>" +
                                "<span class='warningOf  isShow' id='warningOfPhoneCode-1' >"+"请输入短信验证码"+"</span>"+
                                "<span class='warningOf  isShow' id='warningOfPhoneCode-2' >"+"短信验证码错误"+"</span>"+
                            "</div>"+
                            
                        "</div>"+
                        "<div class='vertify_code'>"+
                            "<input type='text' placeholder='请输入右侧验证码...'  id='vertifyCode_text' data-id='warningOfCode' class='code-input register_input'>"+
                            "<div class='vertify_code-wrap'>"+
                                "<ul class='vertify_code-item'>"+
                                    "<li>"+"<a href='javascript:;'>"+`<img src='${registerPic1}' alt='请刷新页面' />`+"</a>"+"</li>"+
                                "</ul>"+  
                            "</div>"+
                            "<span title='刷新'>" + "</span>"+
                            "<span class='warningOf warningOfCode isShow' id='warningOfCode-1'>"+"请输入验证码"+"</span>"+
                            "<span class='warningOf warningOfCode isShow' id='warningOfCode-2'>"+"验证码错误"+"</span>"+
                        "</div>"+
                        "<div class='password-operation phoneOrPassword_control' id='phoneOrPassword_control'>"+
                            "<input type='checkbox'>"+"记住密码"+
                            "<a href='javascript:;'>"+"忘记密码？"+"</a>"+"&nbsp"+
                            "<a href='javascript:;' class='selectForPhone phoneOrPassword' data-id='isShow-item'>"+'手机验证码登录'+"</a>"+
                            "<a href='javascript:;' class='selectForPassword phoneOrPassword isShow 'data-id='isShow-item'>"+"密码登录"+"</a>"+
                        "</div>"+
                        "<div class='btn-wrap'>"+
                            "<a href='javascript:;' class='btn-register' id='clickForRegister' data-id='login_openOrClose'>"+"登&nbsp;录"+"</a>"+
                            "<a href='javascript:;' class='btn_login' data-id='login_openOrClose'>"+"注&nbsp;册"+"</a>"+
                        "</div>"+
                    "</div>"+
                    "<div class='other_register'>"+
                        "<a href='javascript:;' title='微信登录'>"+`<img src='${registerPic2}' alt='微信'>`+"</a>"+
                        "<a href='javascript:;' title='微博登录'>"+`<img src='${registerPic3}' alt='微博'>`+"</a>"+
                        "<a href='javascript:;' title='QQ登录'>"+`<img src='${registerPic4}' alt='QQ'>`+"</a>"+
                        "<h6>"+"---&nbsp;第三方平台登录&nbsp;---"+"</h6>"+
                    "</div>"+
                "</section>"+
            "</div>"
        this.$el.append(this.registerModel) 
    }

    //注册弹窗
    AllDialog.prototype.loginDialog = function() {
        let registerPic1 = this.opts.registerPic1;
        
        this.loginModel =
            "<div class='registerAndLogin_panel login_panel'>"+
                "<header id='login_panelHead'>"+
                    "<h2>" +"新用户注册"+"</h2>" +
                    "<span id='login_Close'>" +"</span>" +
                "</header>" +
                "<section class='registerAndLogin_data login_data' id='loginData_Gather'>" +
                    "<!--注册用户信息填写-->" +
                    "<h3>" +"用户信息填写(带'*'为必填项)"+"</h3>" +
                    "<div class='user_common user_name'>" +
                        "<span>" +"用户名*"+"</span>" +
                        "<input type='text' placeholder='请输入用户名' class='login_input' id='loginUserName_text' data-id='loginWarningOfUserName'>" +
                        "<span class='loginWarning isShow' id='loginWarningOfUserName-1'>"+"请输入用户名"+"</span>"+
                        "<span class='loginWarning isShow' id='loginWarningOfUserName-2'>"+"用户名已存在"+"</span>"+
                    "</div>" +
                    "<div class='user_common user_email'>" +
                        "<span>" +"邮箱*"+"</span>" +
                        "<input type='text' placeholder='请输入邮箱' class='login_input' id='loginUserEmail_text' data-id='loginWarningOfUserEmail'>" +
                        "<span class='loginWarning isShow' id='loginWarningOfUserEmail-1'>"+"请输入邮箱"+"</span>"+
                        "<span class='loginWarning isShow' id='loginWarningOfUserEmail-2'>"+"请输入正确的邮箱"+"</span>"+
                        "<span class='loginWarning isShow' id='loginWarningOfUserEmail-3'>"+"该邮箱已注册"+"</span>"+
                    "</div>" +
                    "<div class='user_common user_password'>" +
                        "<span>" +"密码*"+"</span>" +
                        "<input type='password' placeholder='请输入6位及以上长度密码' class='login_input' id='loginUserPassage_text' data-id='loginWarningOfUserPassage'>" +
                        "<span class='loginEye loginCloseEye ' data-id='loginOpenEye' id='loginCloseEye'>"+"</span>"+
                        "<span class='loginEye loginOpenEye isShow' data-id='loginCloseEye' id='loginOpenEye'>"+"</span>"+
                        "<span class='loginWarning isShow' id='loginWarningOfUserPassage-1'>"+"请输入密码"+"</span>"+
                        "<span class='loginWarning isShow' id='loginWarningOfUserPassage-2'>"+"密码至少为6位数"+"</span>"+
                        "<span class='loginWarning loginPassageStrength isShow'>"+"密码强度:"+"</span>"+
                        "<span class='loginWarning loginPassageStrength loginPassageStrength-1 isShow' id=''>"+"弱"+"</span>"+

                    "</div>" +
                    "<div class='user_common user_password'>" +
                        "<span>" +"确认密码*"+"</span>" +
                        "<input type='password' placeholder='请再输入一次密码' class='login_input' id='loginUserPassageAgain_text' data-id='loginWarningOfUserPassageAgain'>" +
                        "<span class='loginEye loginCloseEye ' data-id='loginOpenEye-1' id='loginCloseEye-1'>"+"</span>"+
                        "<span class='loginEye loginOpenEye isShow' data-id='loginCloseEye-1' id='loginOpenEye-1'>"+"</span>"+
                        "<span class='loginWarning isShow' id='loginWarningOfUserPassageAgain-1'>"+"请再次输入密码"+"</span>"+
                        "<span class='loginWarning isShow' id='loginWarningOfUserPassageAgain-2'>"+"密码输入不一致"+"</span>"+
                    "</div>" +
                    "<div class='user_common user_number'>" +
                        "<span>" +"手机号*"+"</span>" +
                        "<input type='text' placeholder='请输入手机号' class='login_input' id='loginUserPhone_text' data-id='loginWarningOfUserPhone'>" +
                        "<span class='loginWarning isShow' id='loginWarningOfUserPhone-1'>"+"请输入手机号"+"</span>"+
                        "<span class='loginWarning isShow' id='loginWarningOfUserPhone-2'>"+"请输入正确的手机号"+"</span>"+
                        "<span class='loginWarning isShow' id='loginWarningOfUserPhone-3'>"+"手机号已存在"+"</span>"+
                    "</div>" +
                    "<div class='user_common user_taxCode'>" +
                        "<span>" +"短信验证码*"+"</span>" +
                        "<input type='text' placeholder='请输入短信验证码' class='login_input' id='loginPhoneCode_text' data-id='loginWarningOfPhoneCode'>" +
                        "<a href='javascript:;' id='acquireVertifyCode' class='acquireVertifyCode'>" +"获取短信验证码"+"</a>" +
                        "<a href='javascript:;' id='alreadySend' class='alreadySend isShow'>" +"已发送("+"<em id='countDown'>"+"60"+"</em>"+")"+"</a>" +
                        "<a href='javascript:;' id='sendAgain' class='sendAgain acquireVertifyCode isShow' >" +"重新发送"+"</a>" +
                        "<span class='loginWarning loginLast_input isShow' id='loginWarningOfPhoneCode-1'>"+"请输入短信验证码"+"</span>"+
                        "<span class='loginWarning loginLast_input isShow' id='loginWarningOfPhoneCode-2'>"+"短信验证码错误"+"</span>"+
                    "</div>" +
                    "<div class='user_common vertify_code'>" +
                        "<span>" +"图形验证码*"+"</span>" +
                        "<input type='text' placeholder='请输入右侧验证码...' class='code-input login_input' id='loginVertifyCode_text' data-id='loginWarningOfVertifyCode'>" +
                        "<div class='vertify_code-wrap'>" +
                            "<ul class='vertify_code-item'>" +
                                "<li>" +"<a href='javascript:;'>" +`<img src='${registerPic1}' alt='请刷新页面' />` +"</a>" +"</li>" +
                            "</ul>" +  
                        "</div>" +
                        "<span class='login_code' title='刷新'>" +"</span>" +
                        "<span class='loginWarning loginLast_input isShow' id='loginWarningOfVertifyCode-1'>"+"请输入验证码"+"</span>"+
                        "<span class='loginWarning loginLast_input isShow' id='loginWarningOfVertifyCode-2'>"+"验证码错误"+"</span>"+
                    "</div>" +
                    "<div class='clause'>" +
                        "<input type='checkbox' id='acceptItem' data-id='loginWarningOfItem' class='login_input'>" +"阅读完毕，接受公约条款*"+
                        "<span class='loginWarning isShow ' id='loginWarningOfItem-1'>"+"请勾选条约"+"</span>"+
                    "</div>" +
                    "<div class='login_submit' id='phoneOrPassword_control'>" +
                        "<a href='javascript:;' id='confirm_sumbit'>" +"提交"+"</a>" +
                    "</div>" +
                "</section>" +
            "</div>"
        this.$el.append(this.loginModel)
    }
    
    //小号弹窗
    AllDialog.prototype.smallDialog = function (options) {
        let picName = this.opts.picName;
        let tips = this.opts.tips;
        let goWhereLeft = this.opts.goWhereLeft;
        let goWhereLeftURL = this.opts.goWhereLeftURL;
        let goWhereLeftDataID = this.opts.goWhereLeftDataID;
        let goWhereRight = this.opts.goWhereRight;
        let goWhereRightDataID = this.opts.goWhereRightDataID;
        this.addSuccessModel = 
            "<div class='smallDialog_panel'>"+
                "<div class='tips_title'>"+
                    `<img src='../images/${picName}.png' alt='成功'>`+
                    "<h2>"+`${tips}`+"</h2>"+
                "</div>"+
                "<div class='goWhere'>"+
                    `<a href='${goWhereLeftURL}' data-id='${goWhereLeftDataID}'>`+`${goWhereLeft}`+"</a>"+
                    `<a href='javascript:;' data-id='${goWhereRightDataID}'>`+`${goWhereRight}`+"</a>"+
                "</div>"+
            "</div>"
        this.$el.append(this.addSuccessModel)
    }
    
    AllDialog.DEFAULT = {
        picName:'',
        tips:'',
        goWhereLeft:'',
        goWhereLeftURL:'javascript:;',
        goWhereLeftDataID:'',
        goWhereRight:'',
        goWhereRightDataID:'',
        registerPic1:'../images/ValidateCode.jpg',
        registerPic2:'../images/weixin.png',
        registerPic3:'../images/weibo.png',
        registerPic4:'../images/qq.png',
        
    }

    $.fn.extend({
        addRegisterDialog:function(opts) {
            return new AllDialog(this,opts).registerDialog()
        },
        addLoginDialog:function(opts) {
            return new AllDialog(this,opts).loginDialog()
        },
        addSmallDialog:function (opts) {
            return new AllDialog(this,opts).smallDialog()
        }
    })

    return {
        registerAndLogin:AllDialog()
    }

})