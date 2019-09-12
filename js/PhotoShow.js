define(['jquery'], function($) {
    function PhotoShow(el,options) {
        this.opts = $.extend({},PhotoShow.DEFAULT,options);
        this.$el = $(el);
        this.$el1 = $(this.opts.controlDom);
        this.photoCount = this.opts.photoData.length; 
        //添加图片数组对象属性
        let count = 0;
        for(let i = 0;i<this.photoCount;i++){
            this.opts.photoData[i].newAttr = count;
            count ++;
        }
    };
    
    PhotoShow.prototype.init = function () {
        this.insertPhoto();
        if(this.opts.isAutoPlay){
            this.AutoPlay();
        }
        if(this.opts.isAutoPlay && this.opts.controlDom !== ''){
            this.insertControl();
        }
    };

    //插入html模板
    PhotoShow.prototype.insertPhoto = function () {
        if(!this.opts.isGrid){
            //图片HTML模板
            let mainModel = this.$el.html().replace(/^\s*/,'').replace(/\s*$/,'');
            //定义输出最终HTML的变量
            let out_main = [];
            let photoData = this.opts.photoData;
            let photoFile = this.opts.photoFile;
            let photoModel = this.opts.photoModel;
            for(let i = 0;i<this.photoCount;i++){
                let main_HTML = mainModel.replace(/{{photoFile}}/g,photoFile)
                                         .replace(/{{photoName}}/g,photoModel)
                                         .replace(/{{photoShowName}}/g,photoData[i].photoName)
                                         .replace(/{{alt}}/g,photoData[i].alt)                     
                                         .replace(/{{No}}/g,i)
                                         .replace(/{{commodityNo.}}/g,i)
                                         .replace(/{{photoFileNo.}}/g,i)
                                         .replace(/{{title}}/g,photoData[i].title)
                                         .replace(/{{price}}/g,photoData[i].price);
                out_main.push(main_HTML);
            }
            this.$el.html(out_main);
           
        }else{
            let number = ['first','second','three','forth','five','six','seven','eight','nine'];
            let k = 0;
            for(let j = 0;j<this.photoCount;j++){
                this.opts.photoData[j].newClass = number[k];
                k++; 
            }
            //HTML模板
            let mainModel = this.$el.html().replace(/^\s*/,'').replace(/\s*$/,'');
            //定义输出最终HTML的变量
            let out_main = [];
            let photoData = this.opts.photoData;
            for(let i = 0;i<this.photoCount;i++){
                let main_HTML = mainModel.replace(/{{newClass}}/g,photoData[i].newClass)
                                         .replace(/{{photoName}}/g,photoData[i].photoName)
                                         .replace(/{{alt}}/g,photoData[i].alt)                     
                                         .replace(/newAttr/g,'item-' + photoData[i].newAttr);
                out_main.push(main_HTML);
            }
            this.$el.html(out_main);
        }
        
    };

    //插入图片控制按钮
    PhotoShow.prototype.insertControl = function () {
        //HTML模板
        let childModel = this.$el1.html().replace(/^\s*/,'').replace(/\s*$/,'');
        //定义输出最终HTML的变量
        let out_child =[];
        let photoData = this.opts.photoData;
        for(let i = 0;i<this.photoCount;i++){
            let child_HTML = childModel.replace(/newAttr/g,photoData[i].newAttr);
            out_child.push(child_HTML);
        }
        this.$el1.html(out_child);    
    };

    

    //自动播放
    PhotoShow.prototype.AutoPlay = function () {
        let selt1 = this.$el;
        let width = this.opts.moveDistances
        let speed = this.opts.showSpeed;
        let num = 0;
        let interval = null;
        let autoPlay = function () {
            interval = setInterval(() => {
                if(num < 5){
                    selt1.css('left',num*-width + 'px');
                    $('.control-i').eq(num).addClass('bgc-black').siblings().removeClass('bgc-black')
                    num++;
                }else{
                    selt1.css('left',0 + 'px');
                    num = 0;
                }
                
            },speed)
        }
        autoPlay()
     
        //鼠标移到图片上，两侧控制条出现
        $('#photoAndControl').on('mouseenter',' #photo-item',function() {
            $('.direction_control').fadeIn('slow')
        }).on('mouseleave','#photo-item',function() {
            $('.direction_control').fadeOut('slow')
            if(interval === null){
                autoPlay()
            }
        }).on('click','span',function(e) {
            clearInterval(interval)
            interval = null;
            let control = function (arg) {
                $('.control-i').eq(arg).addClass('bgc-black').siblings().removeClass('bgc-black')
            }
            control(num)

            //两侧控制条手动控制图片播放
            if($(e.target).data('id') === 'direction_Control-Left'){
                if(num !== 0){
                    selt1.css('left', (num-1)* -width + 'px');
                    control(num - 1)
                    num --;  
                }else{
                    num = 5;
                    selt1.css('left',-(num - 1) * width +'px')
                    control(num - 1)
                    num --;
                }
                
            }else if($(e.target).data('id') === 'direction_Control-Right'){
                if(num !== 5){
                     selt1.css('left',-num * width + 'px')
                    control(num)
                     num++
                }else{
                    num = 0;
                    selt1.css('left',-num * width +'px')
                }
            }
        })
    };

    //默认参数
    PhotoShow.DEFAULT = {
        controlDom:'',
        showSpeed:2000,
        moveDistances:950,
        isAutoPlay:true,
        isGrid:false,
        photoFile:'',
        photoModel:'',
        photoData:[
            {photoName:'#',alt:'#'},
            {photoName:'#',alt:'#'},
            {photoName:'#',alt:'#'},
            {photoName:'#',alt:'#'},
            {photoName:'#',alt:'#'}
        ]
    };
    
    let init = function (el,option){
        new PhotoShow(el,option).init();
    }
    
    let InsertDom = function (el,option) {
        new PhotoShow(el,options).insertPhoto();
    }
    
    //jquery插件
    $.fn.extend({
        photoShow:function (opts) {
            return this.each(function () {
                new PhotoShow(this,opts).init();
            });
        },
        insertDom:function (opts) {
            return this.each(function () {
                new PhotoShow(this,opts).insertPhoto();
            })
        }
    })
    
    return {
        photoShow:init,
        insertDom:InsertDom
    }
    
});