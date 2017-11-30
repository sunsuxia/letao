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
                })

            }
        })

    }
render();

//点击添加分类按钮让模态框显示



});
