$(function () {
    //渲染页面
    var page=1;
    var pageSize=2;
    var imgs=[];
var render= function () {
    $.ajax({
        type: "get",
        url: "/product/queryProductDetailList",
        data: {
            page: page,
            pageSize: pageSize
        },
        success: function (data) {
            //console.log(data);
            $("tbody").html(template("tpl", data));
            //分页功能
            $("#paginator").bootstrapPaginator({
                bootstrapMajorVersion:3,
                currentPage:page,
                totalPages:Math.ceil(data.total/data.size),
                itemTexts: function ( type, page, current) {
                    //console.log((type, page, current));
                    switch (type){
                        case "first":
                            return "首页";
                        case "prev":
                            return "上一页";
                        case "next":
                            return "下一页";
                        case "last":
                            return "最后一页";
                        default :
                            return page;

                    }

                },
                tooltipTitles: function (type,page,current) {
                    switch (type) {
                        case "first":
                            return "首页";
                        case "prev":
                            return "上一页";
                        case "next":
                            return "下一页";
                        case "last":
                            return "尾页";
                        default:
                            return "跳转到" + page;
                    }
                },
                useBootstrapTooltip:true,
                onPageClicked: function (a,b,c,p) {
                    page=p;
                    render();
                }

            });
        }
    });
}
render();

//显示模态框
    $('.btn_add').on('click', function () {
        $('#addModal').modal('show');
        //通过ajax渲染活的数据
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (data) {
                //console.log(data);
                //将下拉表单中的数据渲染到文本中
                $('.dropdown-menu').html(template('tpl2',data));

            }

        });
    });
    $('.dropdown-menu').on('click','a', function () {
        //将点击的文本渲染上去
        $('.dropdown-text').text($(this).text());
        //记录brandId的值
        $("[name='brandId']").val($(this).data('id'));
        $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
    });
    var $form=$('form');
    $form.bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId: {
                validators:{
                    notEmpty:{
                        message:"请选择二级分类"
                    }
                }
            },
            proName: {
                validators:{
                    notEmpty:{
                        message:"请输入商品的名称"
                    }
                }
            },
            proDesc: {
                validators:{
                    notEmpty:{
                        message:"请输入商品的描述"
                    }
                }
            },
            num: {
                validators:{
                    notEmpty:{
                        message:"请输入商品的库存"
                    },
                    //正则校验
                    regexp: {
                        //不能是0开头，必须是数字
                        regexp:/^[1-9]\d*$/,
                        message:"请输入合法的库存"
                    }
                }
            },
            size: {
                validators:{
                    notEmpty:{
                        message:"请输入商品的尺码"
                    },
                    //正则校验
                    regexp: {
                        //不能是0开头，必须是数字
                        regexp:/^\d{2}-\d{2}$/,
                        message:"请输入合法的尺码,例如(32-46)"
                    }
                }
            },
            oldPrice: {
                validators:{
                    notEmpty:{
                        message:"请输入商品的原价"
                    }
                }
            },
            price: {
                validators:{
                    notEmpty:{
                        message:"请输入商品的价格"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传3张图片"
                    }
                }
            }

        }

    });
//添加图片，动态添加
    $("#fileupload").fileupload({
        dataType:"json",
        done: function (e,data) {
            //图片不能超过3张
            if(imgs.length >= 3){
                return false;
            }
        //动态改图片添加的地址
      $('.img_box').append('<img src="'+data.result.picAddr+'" width="100" height="100" alt="">');
      imgs.push(data.result);
            //判断数组的长度
            if(imgs.length === 3){
                $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
            }else {
                $form.data("bootstrapValidator").updateStatus("brandLogo", "INVALID");
            }
        }
    });

//给表单注册表单校验成功事件
    $form.on("success.form.bv", function (e) {
        //阻止浏览器默认行为
        e.preventDefault();
        //发送ajax
        var param = $form.serialize();
        param += "&picName1="+imgs[0].picName + "&picAddr1=" + imgs[0].picAddr;
        param += "&picName2="+imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
        param += "&picName3="+imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;

        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:param,
            success: function (data) {
                //console.log(data);
            if(data.success){
                $('#addModal').modal('hide');
            //    渲染第一页
                currentPage = 1;
                render();

                //3. 重置表单的内容和样式
                $form[0].reset();
                $form.data("bootstrapValidator").resetForm();

                //下拉菜单重置
                $(".dropdown-text").text("请选择二级分类");
                $("[name='brandId']").val('');

                //重置图片
                $(".img_box img").remove();
                imgs = [];

            }

            }
        })


    })

})
