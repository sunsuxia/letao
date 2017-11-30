$(function () {
    //去后台获取一级分类的数据
    var currentPage = 1;
    var pageSize = 2;
function render(){
    $.ajax({
        ype:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        success: function (data) {
            //console.log(data);
            $("tbody").html( template("tpl", data) );
            //渲染分页
            $("#paginator").bootstrapPaginator({
                bootstrapMajorVersion:3,
                currentPage:currentPage,
                totalPages:Math.ceil(data.total/pageSize),
                onPageClicked:function (a,b,c,page) {
                    currentPage = page;
                    render();
                }
            });
        }
    });


}
render();



 //一级分类的添加功能
    $(".btn_add").on("click", function () {

        //显示添加模态框
        $("#addModal").modal("show");

    });

//    表单校验



});
