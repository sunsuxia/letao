$(function () {
    //渲染页面
    var page=1;
    var pageSize=5;
    var render= function () {
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize: pageSize
            },
            success: function (data) {
                //console.log(data);
                $('tbody').html(template('tpl',data));

                //数据渲染结束后应渲染分页样式
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(data.total/data.size),
                    onPageClicked: function (a,b,c,p) {
                        page=p;
                        render()
                    }
                });

            }
        });

    }
render();

//点击添加分类按钮让模态框显示

    $('.btn_add').on('click', function () {
        $('#secondModal').modal('show');
        //将一级分类渲染到二级分类上面
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (data) {
                //console.log(data);
                $(".dropdown-menu").html(template("tpl2", data));
            }
        });
    })
//将li标签下面所有的a注册点击事件
    $('.dropdown-menu').on('click','a', function () {
        //将a标签上面的文本渲染到按钮上面
        $('.dropdown-text').text($(this).text());

        //获取id值，并记录下来
        $("[name='categoryId']").val($(this).data('id'));

        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");

    });

    //图片上传.插件提供的方法
    $("#fileupload").fileupload({
        dataType: "json",
        done: function (e, data) {
            //console.log(data.result.picAddr);
            $(".img_box img").attr("src",data.result.picAddr);

        //    将图片地址复制给brandLogo
            $("[name='brandLogo']").val(data.result.picAddr);
            $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }

    });

    //表单校验
    var $form=$('form');
    $form.bootstrapValidator({
        //对隐藏域进行校验
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //校验规则
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类的名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
        }
    });


    //表单注册成功事件
    $form.on('success.form.bv', function (e){
        //阻止浏览器默认行为
        e.preventDefault();

        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$form.serialize(),
            success: function (data) {
                //console.log(data);
                if(data.success){
                //    关闭模态框
                    $("#secondModal").modal('hide');
                    page=1;
                    render();


        //将模态框里的所有所有样式重置
              $form.data("bootstrapValidator").resetForm();
                $form[0].reset();
                $(".dropdown-text").text('请选择一级分类');
                    $(".img_box img").attr("src", "images/none.png");
                    $("[type='hidden']").val('');




                }

            }
        });
    })


});

