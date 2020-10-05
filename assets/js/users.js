$(function () {
    //数据初始化
    function init() {
        $.ajax({
            type: 'get',
            url: '/users',
            dataType: 'json',
            success: function (res) {
                $('tbody').html(template('template', res))
            }
        })
    }
    init()

    // 实现全选全不选
    $('.allSel').on('change', function () {
        var status = $(this).prop('checked')
        $('tbody .userSingle').prop('checked', status)
        var cnt = $('tbody .userSingle:checked').length
        if (cnt > 1) {
            $('.btndels').show()
        } else {
            $('.btndels').hide()
        }
    })

    //事件委托方式为tbody中的复选框绑定单击事件
    $('tbody').on('change .userSingle', function () {
        var cnt = $('tbody .userSingle:checked').length
        //本地单击之后，判断被选中的复选框的数量是否大于1，如果大于1，就显示‘批量删除’。否则隐藏
        if (cnt > 1) {
            $('.btndels').show()
        } else {
            $('.btndels').hide()
        }
        // 本地单击之后，判断是否所有的复选框都被选中，如果是则让全选复选框也选中，否则全取消

        if (cnt == $('tbody .userSingle').length) {
            $('.allSel').prop('checked', true)
        } else {
            $('.allSel').prop('checked', false)
        }
    })

    //实现新增用户
    $('.btnAdd').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/addUser',
            data:$('form').serialize(),
            dataType:'json',
            success:function(res){
                $('.alert-danger >span').text(res.msg)
                $('.alert-danger').fadeIn(200).delay(2000).fadeOut(200)
                if(res.code==200){
                    init()
                }
                console.log(res);
            }
        })

    })

    // 事件委托的方式实现用户编辑数据的默认展示
    $('tbody').on('click','.btnEditshow',function(){ 
        let data=$(this).data()
        console.log(data);
        $('#email').val(data.email)
        $('#slug').val(data.slug)
        $('#nickname').val(data.nickname)
        $('#password').val(data.password)
        $('[name="id"]').val(data.id)
        $('.btnAdd').hide()
        $('.btnedit').show() 
        $('.addUser').text('编辑新用户')
    })

    //实现分类编辑提交
    $('.btnedit').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/editUser',
            data: $('form').serialize(),
            dataType: 'json',
            success: function (res) {
                $('.alert-danger >span').text(res.msg)
                $('.alert-danger').fadeIn(200).delay(2000).fadeOut(200)
                if (res.code == 200) {
                    init()
                }
            }
        })
    })

    // 根据id删除用户单个数据
    $('tbody').on('click','.btndel',function(){
       if(confirm('请问是否真的要删除')){
           let id=$(this).data().id
        $.ajax({
            type:'get',
            url:'/delUserById',
            data:{
                id
            },
            dataTypel:'json',
            success:function(res){
                $('.alert-danger >span').text(res.msg)
                    $('.alert-danger').fadeIn(200).delay(2000).fadeOut(200)
                    if (res.code == 200) {
                        init()
                    }
            }
        })
       }
    })
    //批量删除用户数据
    $('.btndels').on('click',function(){
        // 1.获取所有被选中的复选框--数组
        let allChks=$('tbody .userSingle:checked')
         console.log(allChks);
        // 2.遍历数组，获取每个复选框的自定义属性id，添加到数组
        let arr=[]
        for(var i=0;i<allChks.length;i++){
            arr.push($(allChks[i]).data().id)
        }
        // console.log(arr);

        $.ajax({
            type:'get',
            url:'/delUserById',
            // data:{id:arr.join(',')},
            data:{id:arr},
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

})