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
            for(let i = 0;i<this.photoCount;i++){
                let main_HTML = mainModel.replace(/{{photoName}}/g,photoData[i].photoName)
                                         .replace(/{{alt}}/g,photoData[i].alt)                     .replace(/newAttr/g,photoData[i].newAttr);
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
                                         .replace(/{{alt}}/g,photoData[i].alt)                     .replace(/newAttr/g,'item-' + photoData[i].newAttr);
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
        let num = 0;
        let interval = setInterval(() => { 
            if(num < 5){
                selt1.css('left',num*-width + 'px');
                $('.control-i').eq(num).addClass('bgc-black').siblings().removeClass('bgc-black')
                num++;
            }else{
                selt1.css('left',0 + 'px');
                num = 0;
            }
        },this.opts.showSpeed)   
    };

    //默认参数
    PhotoShow.DEFAULT = {
        controlDom:'',
        showSpeed:2000,
        moveDistances:750,
        isAutoPlay:true,
        isGrid:false,
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