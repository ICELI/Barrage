/**
 * Created by iceli on 2015/3/11.
 */
(function($){
    var Barrage = function(options) {
        // 默认参数
        this.default = {
            colors: ['#3689c3', '#b96121', '#a8506b', '#e73357'], // 字体颜色
            rows: 2, // 行数
            maxRow: 0, // 最大宽度
            wrap: '.barrage-wrap',
            top: 0,
            multi: false
        };

        this.options = $.extend(true, {}, this.default, options);
        // 初始化方法
        this.init();
        return this;
    };

    Barrage.prototype = {
        constructor: Barrage,

        init: function(){
            this.rows = Array.apply(null, Array(this.options.rows)).map(function(item, i) {
                return 0;
            });
            this.render();

            return this;
        },
        render: function(){
            var that = this,
                o = that.options;

            if(o.multi) {
                this.multiTrack();
            } else {
                this.singleTrack();
            }
        },
        // single track
        singleTrack: function() {
            this.multiTrack();
            this.run();
        },
        multiTrack: function(){
            var that = this,
                o = that.options;

            that.ul = $('<ul/>');
            $(o.wrap).append(that.ul);

            $(o.data).each(function(i, item){
                var me = $('<li>' + this + '</li>');
                me.appendTo(that.ul);

                var index = i % that.rows.length,
                    left = that.rows[index] + Math.floor(Math.random() * 150);

                me.css({
                    'color': o.colors[Math.floor(Math.random() * o.colors.length)],
                    'top': index * 36,
                    'left': left
                });

                that.rows[index] = left + me.width() + 20;
                // 是否多轨
                that.options.multi && that.run(me)
            });


            // 取最宽的一行
            that.maxRow = Math.max.apply(null, that.rows);
            // 设置为外部容器的宽度
            that.ul.css({
                'width': that.maxRow
            });
        },
        run: function(selector){
            var that = this;
            var wrapPx = $(that.options.wrap).width();
            var movePx = 0;
            var selector = selector || that.ul;
            var limitWidth = wrapPx + (150 * (that.options.data.length / that.options.rows));
            // 重置弹幕 TODO: transition 实现
            clearInterval(selector[0].timer);
            selector[0].timer = setInterval(function(){
                if(movePx <= - limitWidth - that.maxRow) {
                    clearInterval(selector[0].timer);
                }
                selector.css('-webkit-transform',  'translate3d('+ (movePx -= 1) + 'px, 0, 0px)');
            }, that.options.speed + (Math.random() * that.options.rows));
        }
    };

    window.Barrage = Barrage;

    $.fn = $.extend($.fn,{
        barrage: function(opt){
            $(this).each(function(){
               this.Barrage = new Barrage($.extend(opt,{wrap: $(this)}));
            });

            return this;
        }
    });
})(Zepto);