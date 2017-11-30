$(function () {
    var currentPage = 1;
    var pageSize = 5;
    //渲染页面
    var render= function () {
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success: function (data) {
                //console.log(data);
                //将数据渲染到页面上
                var html = template("tpl", data);
                $("tbody").html(html);

                //渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total/pageSize),
                    onPageClicked:function (a,b,c,page) {
                        currentPage = page;
                        render();
                    }
                });

            }
        });
    }

render();

 //启用禁用功能
    //1. 需要给表格中所有的按钮，注册点击事件（委托事件）
    $("tbody").on('click','.btn', function () {
        //显示模态框
        $("#userModal").modal("show");

        //同时获取对应的id
        //获取到对应的id
        var id = $(this).parent().data("id");
        var isDelete = $(this).hasClass("btn-danger")?0:1;
//给确定按钮注册事件
        $(".btn_confirm").off().on('click', function () {
            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success: function (data) {
                    //console.log(data);
                    if(data.success){
                        //关闭模态框
                        $("#userModal").modal("hide");

                        //重新渲染表格
                        render();
                    }
                }
            });

        });

        
    });






});
