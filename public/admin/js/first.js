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
        $("#firstModal").modal("show");



    });

//    表单校验
var $form=$("form");
    $form.bootstrapValidator({
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'一级分类名称不能为空'
                    }
                }
            }
        }
    });



//注册表单校验成功事件
    $form.on('success.form.bv', function (e) {
        //阻止浏览器的默认行为
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$form.serialize(),
        success: function (data) {
            //console.log(data);
            if(data.success){
                //渲染成功关闭模态框
                $('#firstModal').modal('hide');
                page=1;
                render();
                //同时清空表单的样式和值
                $form.data("bootstrapValidator").resetForm();
                //重置表单的值
                $form[0].reset();
            }
        }
        })
    })



});
