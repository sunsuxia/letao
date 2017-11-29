$(function () {
    var $form=$('form');
$form.bootstrapValidator({
    //配置校验的小图标
    feedbackIcons:{
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    //配置校验规则,需要校验的字段,对应表单中的name属性
    fields:{
        username:{
            //配置username所有的校验规则
            validators:{
              //非空校验
              notEmpty:{
                  message:"用户名不能为空"
              },
                callback:{
                    message:"用户名不存在"
                }
            }
        },
        password:{
            validators:{
                notEmpty:{
                    message:'密码不能为空'
                },
                stringLength:{
                    min:6,
                    max:12,
                    message:'密码长度在6-12位'
                },
                callback:{
                    message:'密码错误'
                }
            }
        }
    }
});

//给表单注册校验成功事件   success.form.bv
    $form.on("success.form.bv", function (e) {
        //阻止浏览器默认行为
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$form.serialize(),//拼接字符串
            success: function (data) {
                if(data.success){
                    //跳转到首页
                    location.href = "index.html";
                }
                if(data.error==1000){
                    //第一个参数：想要修改的字段
                    //第二个参数：改成什么状态  INVALID  VALID
                    //第三个参数： 指定显示的错误信息
                    $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }
                if(data.error == 1001){
                    $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }
            }
        });

    });

//重置样式
    $("[type='reset']").on("click", function(){
        //需要重置表单的样式,需要获取到插件对象
        $form.data("bootstrapValidator").resetForm();
    });

});