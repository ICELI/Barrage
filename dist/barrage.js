/**
 * Created by iceli on 2015/3/11.
 */
(function($){
    var Barrage = function(options) {
        // 默认参数
        var opts = {
            colors: ['#3689c3', '#b96121', '#a8506b', '#e73357'], // 字体颜色
            rows: 2, // 行数
            maxRow: 0, // 最大宽度
            elements: {
                wrap: $('.barrage-wrap ul'),
                item: $('.barrage-wrap li')
            }
        };

        this.options = $.extend(true, {}, opts, options);
        // 初始化方法
        this.init(this.options);
    };

    Barrage.prototype = {
        constructor: 'Brrage',

        init: function(options){
            this.rows = Array.apply(null, Array(options.rows)).map(function(item, i) {
                return 0;
            });
            this.render();
            this.run();
        },
        render: function(){
            var that = this,
                o = that.options;

            o.elements.item.each(function(){
                var me = $(this),
                    index = me.index() % that.rows.length,
                    left = that.rows[index] + Math.floor(Math.random() * 150);

                me.css({
                    'color': o.colors[Math.floor(Math.random() * o.colors.length)],
                    'top': index * 36,
                    'left': left
                });

                that.rows[index] = left + me.width() + 20;
            });
            // 取最宽的一行
            that.maxRow = Math.max.apply(null, that.rows);
            // 设置为外部容器的宽度
            o.elements.wrap.css({
                'width': that.maxRow
            });
        },
        run: function(){
            var that = this;
            var movePx = $(window).width();
            var timer = setInterval(function(){
                if(movePx <= -that.options.elements.wrap.width()) {
                    clearInterval(timer);
                }
                that.options.elements.wrap.css('-webkit-transform',  'translate3d('+ (movePx -= 1.6) + 'px, 0, 0px)');
            },10);
        }
    };

    window.Barrage = Barrage;
})(Zepto);