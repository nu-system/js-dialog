## js-dialog

[![npm package][npm-badge]][npm]

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/@_nu/js-dialog

NU 「 no-ui 」 组件库系统 nu-system，弹窗组件 原生 JS 实现。

## 做了什么？

`@_nu/js-dialog` 只做了以下两件事情。

1. 弹窗显示和隐藏的时候切换了一个，控制状态的 class `_open`;
2. 弹窗显示和隐藏的时候切换了 `body` 的滚动状态;

`@_nu/js-dialog` 本身不会输出任何样式，对应的 Dom 结构和相应的 class 均来自于 [vanilla-dialog](https://nu-system.github.io/css/dialog/)。

## 怎么用？

```
$ npm i @_nu/js-dialog @_nu/css-dialog
```

1. @_nu/js-dialog 为逻辑组件
2. @_nu/css-dialog 为样式组件

```HTML
<!doctype html>
<html lang="en">
    <head>
        <link rel="stylesheet" href="node_modules/@_nu/css-dialog/css/core.css">
        <!-- 弹窗居中显示 -->
        <link rel="stylesheet" href="node_modules/@_nu/css-dialog/css/position/middle.css">
        <!-- 
            <link rel="stylesheet" href="node_modules/@_nu/css-dialog/css/position/top.css">
            <link rel="stylesheet" href="node_modules/@_nu/css-dialog/css/position/right.css">
            <link rel="stylesheet" href="node_modules/@_nu/css-dialog/css/position/bottom.css">
            <link rel="stylesheet" href="node_modules/@_nu/css-dialog/css/position/left.css"> 
        -->
    </head>
    <body>

        <button class="j_dialog_trigger button" type="button">显示弹窗</button>

        <!-- 弹窗主体 start -->

        <!-- _middle 对应上面顶部的位置的CSS -->
        <div id="dialogHello" class="nu_dialog_wrap _middle">
            <label class="nu_dialog_mask j_close" title="mask"></label>
            <div class="nu_dialog">
                <label class="nu_dialog_close j_close" title="close">&times;</label>
                <div class="dialog-body">
                    <!-- 弹窗内容 -->
                </div>
            </div>
        </div>
        <!-- 弹窗主体 end -->

       <script src="./dialog/index.js"></script>
        <script>
            (function () {
                const $btn = document.querySelector('.j_dialog_trigger');

                // 点击按钮显示弹窗
                $btn.addEventListener("click", function (e) {
                    e.preventDefault();
                    new NuDialog({
                        sel: '#dialogHello'
                    });
                });
            })();
        </script>
    </body>
</html>
```

## Api

```JS
var _api= new NuDialog({
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
});

```
