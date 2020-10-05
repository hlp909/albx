$(function(){
    function init (){
        $.ajax({
            type:'get',
            url:'/getSlider',
            dataType:'json',
            success:function(res){
                var html = template('template',res)
                $('tbody').html(html)
            }
        })
    }
    init()
    //实现图片的上传
    $('#image').on('change',function(){
        // 1.获取图片数据
     // 获取文件对象，files是dom的属性，所以将$('#feature')转换为dom元素，files是文件列表，[0]是只上传一张图片
        let myfile=$('#image')[0].files[0]
        // 2.创建formdata对象
        // 收集图片数据：FormData
        let formdata=new FormData()
        //追加参数，所以参数都是键值对的格式    
        formdata.append('myimg',myfile)
    // 3.ajax发送请求
        $.ajax({
            type:'post',
            url:'/uploadFile' ,
            data:formdata,
            processData:false,
            contentType:false,
            dataType:'json',
            success:function(res){
                if(res.code==200){
                    // 实现预览
                    $('.thumbnail').attr('src','/uploads/'+res.img).show()
                    // 将图片名称存储到隐藏域，方便后期的数据获取
                    $('[name="image"]').val('/uploads/'+res.img)

                }
            }
        })

    })
    
    // 添加轮播图
    $('.btnAdd').on('click',function(){
        $.ajax({
            type:'post',
            url:'/addSlider',
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
