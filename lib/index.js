(function (global, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(factory);
    } else {
        global.NuDialog = factory();
    }
}(this, function () {
    var _default = {
        // [string] dom 对象选择器，内部选择器为 document.querySelector
        sel: null,  
        // [string] 用于控制弹窗的显示隐藏
        openClass: '_open', 
        // [string] 弹窗内部有这个clas，点击会触发弹窗关闭逻辑
        closeClass: 'j_close',
        // [boolean] 初始化的时候是否显示弹窗
        defaultShow: true,
        // 是否控制 body 滚动条
        isLockScroll: true,
        // [function] 当弹窗显示时触发，
        onShow: function (_api, done) {
            // _api 是整个弹窗对象，可以获取所有方法和事件
            // done() 表示显示弹窗，一些异步的状况的时候可以用到

            // 这里返回 true 才会显示，等价于done()，其它状况弹窗不会显示
            return true;
        },
        // 弹窗显示之后执行的事
        onAfterShow: function (_api) {
            // _api 是整个弹窗对象，可以获取所有方法和事件
        },
        // 关闭弹窗，如果用户设置了这个属性，需要手动触发弹窗关闭逻辑
        onClose: function (_api, done) {
            // _api 是整个弹窗对象，可以获取所有方法和事件

            // done() 表示关闭弹窗，一些异步的状况的时候可以用到

            // 这里返回 true 才会关闭，等价于done()，其它状况弹窗不会关闭
            return true;
        }
    };
    function Obj(opt) {
        for (var name in _default) {
            this[name] = opt[name] || _default[name];
        }
        this.el = document.querySelector(this.sel);
        this.el && this.init();
    }

    // 初始化
    Obj.prototype.init = function () {
        this.defaultShow && this.doShow();
        // 如果没有绑定事件那么绑定一下
        !this.el.dataset.dialogEvent && this.bindEvent();
    };

    // 绑定关闭事件
    Obj.prototype.bindEvent = function () {
        var _it = this;

        _it.el.addEventListener('click', function (e) {
            var target = e.target || e.srcElement;
            !!target && target.classList.contains(_it.closeClass) && _it.doClose();
        }, false);

        // 设置初始化
        _it.el.dataset.dialogEvent = true;
    };

    // 触发弹窗显示
    Obj.prototype.doShow = function () {
        this.onShow(this, this.show) === true && this.show();
    };

    // 触发弹窗关闭
    Obj.prototype.doClose = function () {
        this.onClose(this, this.close) === true && this.close();
    };

    // 显示弹窗
    Obj.prototype.show = function () {
        this.el.classList.add(this.openClass);
        this.lockScroll();
        this.onAfterShow(this);
    };
    // 关闭弹窗
    Obj.prototype.close = function () {
        this.unlockScroll();
        this.el.classList.remove(this.openClass);
    };

    // 锁定滚动条
    Obj.prototype.lockScroll = function () {
        var _it = this;
        var scrollEle = document.scrollingElement ? document.scrollingElement : document.documentElement;
        // 滚动元素滚动条宽度
        var scrollWidth = window.innerWidth - scrollEle.clientWidth;
        var window$getComputedSt = window.getComputedStyle(scrollEle),
            overflow = window$getComputedSt.overflow,
            borderRight = window$getComputedSt.borderRight;
        scrollEle.style.overflow = 'hidden';
        scrollEle.style.borderRight = scrollWidth + ' solid transparent';
        this.styleOrigin = { overflow: overflow, borderRight: borderRight };
        this.scrollEle = scrollEle;
    };

    // 解锁滚动条滚动
    Obj.prototype.unlockScroll = function () {
        var _it = this;
        var scrollEle = _it.scrollEle;
        var styleOrigin = _it.styleOrigin;
        scrollEle.style.overflow = styleOrigin.overflow;
        scrollEle.style.borderRight = styleOrigin.borderRight;
    };

    return Obj;
}));
