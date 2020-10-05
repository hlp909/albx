$(function(){
    function init() {
        $.ajax({
            type: 'get',
            url: '/getUsers',
            dataType: 'json',
            success: function (res) {
                $('tbody').html(template('template', res))
            }
        })
    }
    init()
    //修改用户信息
    $('form').on('click','.update',function(){
        $.ajax({
            type:'post',
            url:'/updateUserData',
            data:$('form').serialize(),
            dataType:'json',
            success:function(res){
                $('.alert-danger >span').text(res.msg)
                $('.alert-danger').fadeIn(200).delay(2000).fadeOut(200)
                if (res.code == 200) {
                       init()         
                }
            }
        })
    })
      //修改用户密码
      $('.btnupdate').on('click',function(){
        $.ajax({
            type:'post',
            url:'/updatepwd',
            data:$('form').serialize(),
            dataType:'json',
            success:function(res){
                $('.alert-danger >span').text(res.msg)
                $('.alert-danger').fadeIn(200).delay(2000).fadeOut(200)
                if(res.code==200){
                    location.href='/login'
                }
            }
        })
    })
})