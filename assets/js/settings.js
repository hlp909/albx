$(function(){
    function init(){
        $.ajax({
        type:'get',
        url:'/getOptions',
        dataType:'json',
        success:function(res){
            console.log(res)
            var html = template('template',res)
            $('form').html(html)
        }
    })
 }
    init()
    

    //保存网站设置
    $('form').on('click','.btnSave',function(){
        $.ajax({
            type:'post',
            url:'/editOptions',
            data:$('form').serialize(),
            dataType:'json',
            success:function(res){
                $('.alert-danger >span').text(res.msg)
                $('.alert-danger').fadeIn(200).delay(2000).fadeOut(200)
                if(res.code==200){
                    init()
                }
            }
        })
    })
})