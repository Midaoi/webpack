// import $ from './jquery-2.2.3'

function dialog() {
    var self = this;
    var cfg = this.cfg || {};
    this.cfg = {
        content: "我是内容",
        title: "我是标题",
        hasMask: true,
        closeBtn: false,
        cancelBtn: false,
        handler: ""
    };
};

function Box() {
    this.contentBox = null;
}
Box.prototype = {
    render: function(container) {
        this.handlers = {};
        this.renderUI();
        this.bindUI();
        this.synUI();
        $(container || 'body').append(this.contentBox);
    },
    destory: function() {
        this.destructor();
        this.contentBox.remove();
    },
    destructor: function() {
        this.mask && this.mask.remove();
    },
    on: function(type, handler) {
        if (typeof this.handlers[type] == "undefined") {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
        return this;
    },
    fire: function(type) {
        if (this.handlers[type] instanceof Array) {
            var handlers = this.handlers[type];
            for (var i = 0; i < handlers.length; i++) {
                handlers[i]();
            }
        }
    }
}
dialog.prototype = $.extend({}, new Box, {
    renderUI: function() {
        var footer = "";
        switch (this.cfg.type) {
            case 'alert':
                footer = '<div class="warp_dialog_box_foot"><a href="javascript:;" class="confirmBtn">确认</a></div>';
                break;
            case 'confirm':
                footer = '<div class="warp_dialog_box_foot"><a href="javascript:;" class="cancelBtn">取消</a><a href="javascript:;" class="confirmBtn">确认</a></div>';
                break;
        }
        this.contentBox = $("<div class='warp_dialog_box'>" +
            '<div class="warp_dialog_box_head">' + this.cfg.title + '</div>' +
            '<div class="warp_dialog_box_body">' + this.cfg.content + '</div>' + footer + "</div>");
        $(".warp_dialog_box_body").html(this.cfg.content);
        if (this.cfg.closeBtn) {
            var closeBtn = $("<a href='javascript:;' class='closeBtn'>X</a>");
            closeBtn.appendTo(this.contentBox);
        }
        if (this.cfg.hasMask) {
            this.mask = $("<div class='wrap_box'></div>");
            this.mask.appendTo("body");
        }
    },
    bindUI: function() {
        var that = this;
        this.contentBox.on('click', '.confirmBtn', function(event) {
            that.fire("alert");
            that.destory();
        }).on('click', '.closeBtn', function(event) {
            that.fire("close");
            that.destory();
        });;
    },
    synUI: function() {
        this.contentBox.css({
            width: this.cfg.width + 'px' || '430',
            height: this.cfg.height + 'px' || '130',
        });
    },
    alert: function(cfg) {
        var that = this;
        $.extend(this.cfg, cfg);
        this.render();
        return this;
    }
});

export default new dialog();
