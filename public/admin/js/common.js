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

});
//退出功能
$(".icon_logout").on("click", function () {
    $('#logoutModal').modal('show');
    //off解绑所有事件
$(".btn_logout").off().on('click', function () {
    $.ajax({
        type:'get',
        url:"/employee/employeeLogout",
        success: function (data) {
            if(data.success){
                //退出成功，才跳转到登录页面
                location.href = "login.html";
            }
        }
    })

})
});
