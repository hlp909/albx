$(function(){
    //创建一个 实例覆盖指定的textarea
    CKEDITOR.replace('content')

    // 实现文章的操作
    // 1，新增操作
    // 2.编辑操作
    var params=itcast.getParams(location.search)
   $('.btnAdd').on('click',function(){
        //实现数据同步
    CKEDITOR.instances.content.updateElement()
    // console.log($('form').serialize());
    if(params.id){
        opt('/editPost')
    }else{
        opt('/addPost')
    }
    
   })
   function opt(url){
       $.ajax({
        type:'post',
        url:url,
        data:$('form').serialize(),
        dataType:'json',
        success:function(res){
            $('.alert-danger > span').text(res.msg)
            $('.alert-danger').fadeIn(200).delay(2000).fadeOut(200)
            if(res.code==200){
                setTimeout(() => {
                    location.href='/admin/posts'
                }, 2400);
            }
        }
    })
   }

   //实现文件上传
   $('#feature').on('change',function(){
               // ajax支持的数据格式常见的有三种：
        // 1.key=value&key=value:$('form').serialize()
        // 2.对象：{}
        // 3.formData对象
        // 获取文件对象，files是dom的属性，所以将$('#feature')转换为dom元素，files是文件列表，[0]是只上传一张图片
        let myfile=$('#feature')[0].files[0]
        console.log(myfile);
        //如何收集图片数据：FormData
        let formdata=new FormData()
        //追加参数，所以参数都是键值对的格式    
        formdata.append('myimg',myfile)
        formdata.append('zcn','999999999999999999')
        // 如何发起请求：ajax
        $.ajax({
            type:'post',
            url:'/uploadFile',
            data:formdata,
            processData:false, //formdata默认会对数据进行处理，告诉ajax不用进行数据的任何处理
            contentType:false,//formdata会对数据进行编码，告诉ajax不要多数据进行任何的编码处理
            dataType:'json',
            success:function(res){
                // console.log(res);
                if(res.code==200){
                    // 1.实现预览
                    $('.thumbnail').attr('src','/uploads/'+res.img).show()
                    // 2.将图片名称存储到隐藏域，方便后期的数据获取
                    $('[name="feature"]').val('/uploads/'+res.img)
                }else{

                }
                
            }
        })
   })

     //文章分类
     $.ajax({
        type:'get',
        url:'/getCateList',
        dataType:'json',
        success:function(res){
            // console.log(res);
            
            var html='<option value="all">所有分类</option>'
            res.data.forEach(function(value){
            html+=`<option value="${value.id}">${value.name}</option>`
            })
        
            $('#category').html(html)
        }
    })

    //接收可能拥有的参数
    var params=itcast.getParams(location.search)
    // console.log(location.search);
    if(params.id){
        //根据id获取详细的文章数据
        $.ajax({
            type:'get',
            url:'/getPostById',
            data:{
                id:params.id
            },
            dataType:'json',
            success:function(res){
                
                $('#title').val(res.data.title)
                $('#content').val(res.data.content)
                $('#slug').val(res.data.slug)
                //图片：如果用户没有修改图片，就应该保留原始的图片数据
                // 所以：我们应该实现图片的预览的时候，还要将图片数据存储到隐藏域中
                $('.thumbnail').attr('src','/uploads/'+res.data.feature).show()
                $('[ name="feature"]').val(res.data.feature)
                $('#category').val(res.data.category_id)
                $('#status').val(res.data.status)
                // datatime-local需要的日期格式为YYYY-MM-DDTHH:mm:ss
                $('#created').val(res.data.created)
                $('[name="id"]').val(res.data.id)

            }
        })
    }
})