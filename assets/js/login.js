$(function () {
  $('#zhuce-a').on('click', function () {
    console.log(1223);
    $('#denglu').hide()
    $('#zhuce').show()
  })
  $('#denglu-a').on('click', function () {
    $('#denglu').show()
    $('#zhuce').hide()
  })
  var form = layui.form
  var layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6-12位且不能出现空格'],
    repwd: function (value) {
      if ($('#zhuce [name=password]').val() !== value) {
        return '兩次密碼不一致'
      }

    }
  })
  $('#zhuce').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: "post",
      url: "/api/reguser",
      data: {
        username: $('#zhuce [name=username]').val(),
        password: $('#zhuce [name=password]').val()
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功,请登录')
        $('#denglu-a').click()

      }
    });
  })
  $('#denglu').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: "post",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登陆失败')
        }
        
        layer.msg(res.message)
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    });
  })



})


