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
//二级菜单显示与隐藏效果
$('.child').prev().on('click', function () {
    //slideToggle点击切换
  $(this).next().slideToggle();
});
//侧边栏显示与隐藏
$(".icon_menu").on("click", function () {
    //console.log("hehhe");
    //判断是否有这个类，有就删，没有就加
    $('.lt_aside').toggleClass('now');
    $('.lt_main').toggleClass('now');

})
