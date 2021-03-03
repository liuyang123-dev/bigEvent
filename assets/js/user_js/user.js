$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须1-6个字符之间'
            }
        }
    })
    initUserinfo()
    function initUserinfo() {
        $.ajax({
            method: "get",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取数据失败')
                }
                //快速渲染表单

                form.val('formUserInfo', res.data);

            }
        });
    }

    $('#btuReset').on('click', function (e) {
        e.preventDefault()
        initUserinfo()
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新数据失败')
                }
                layui.layer.msg('更新数据成功');

                window.parent.getUserInfo()
            }
        });
    })
})


