//进度条功能
//首先关闭进度环
NProgress.configure({
    showSpinner: false
});
//全局ajax事件之开启进度条
$(document).ajaxStart(function () {
    //开始进度条
    NProgress.start();
});
//全局ajax事件之关闭进度条
$(document).ajaxStop(function () {
    //结束进度条
    setTimeout(function () {
        NProgress.done();
    }, 500);
});
