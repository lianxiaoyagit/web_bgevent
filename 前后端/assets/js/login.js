$(function () {
  // 点击显示注册账号的内容
  $('#link_reg').on('click', function () {
    // 隐藏登录界面
    $('.login-box').hide()
    //  显示注册界面
    $('.register-box').show()
  })
  // 点击显示登账号的内容
  $('#link_login').on('click', function () {
    // 显示登录界面
    $('.login-box').show()
    // 隐藏注册界面
    $('.register-box').hide()
  })
  /* 自定义校验规则 */
  // 从layui中获取form对象
  var form = layui.form
  var layer = layui.layer
  // 自定义pwd校验规则
  form.verify({
    // 校验密码
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
    // 校验确认密码
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 进行一次等于的判断
      //判断失败，return一个提示消息
      var pwd = $('.passw').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    },
  })
  /* 监听注册表单的提交事件 */
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val(),
    }
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return console.log(res.message)
      }
      layer.msg('注册成功')
      // 模拟点击行为
      $('#link_login').click()
    })
  })
  /* 监听登录表单的提交事件 */
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // serialize快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败')
        }
        layer.msg('登录成功')
        // console.log(res.token)
        localStorage.setItem('token', res.token)
        // 跳转
        location.href = '/index.html'
      },
    })
  })
})
