$(function () {
    $('.btnLogin').on('click', function () {
        // 1.获取email
        let email = $('#email').val()
        if (!/\w+[@]\w+[.]\w+/.test(email)) {
            $('.alert-danger >span').text('请输入合法的邮箱')
            $('.alert-danger').fadeIn(200).delay(3000).fadeOut(200)
            return
        }

        let pass = $('#password').val().trim()
        if (pass.length < 6 || pass.length > 16) {
            $('.alert-danger >span').text('请输入密码，长度6~16')
            $('.alert-danger').fadeIn(200).delay(3000).fadeOut(200)
        }

        //2.获取密码
        $.ajax({
            type: 'post',
            url: '/login',
            // serialize可以获取当前指定表单中拥有name属性的表单元素value的值
            data: $('form').serialize(),
            dataType: 'json',
            success: function (res) {
                // console.log(res);
                if (res.code == 200) {
                    location.href = '/admin'
                } else {
                    $('.alert-danger >span').text(res.msg)
                    $('.alert-danger').fadeIn(200).delay(3000).fadeOut(200)
                }
            }
        })
    })
})