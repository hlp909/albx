$(function () {
    //数据初始化
    function init() {
        $.ajax({
            type: 'get',
            url: '/getCateList',
            dataType: 'json',
            success: function (res) {
                $('tbody').html(template('template', res))
            }
        })
    }
    init()

    //实现全选和全不选
    $('.chkAll').on('change', function () {
        // 将全选复选框的checked属性赋值给tbody中的所有复选框
        // 1.获取当前全选复选框的checked属性值
        var status = $(this).prop('checked')
        // prop：这个才是正确获取复选框checked属性值的方法
        // 2.为tbody中的所有复选框设置checked属性
        $('tbody .chkSingle').prop('checked', status)
        // 获取被选中的复选框的数量
        var cnt = $('tbody .chkSingle:checked').length
        if (cnt > 1) {
            $('.btndels').show()
        } else {
            $('.btndels').hide()
        }
    })

    //事件委托方式为tbody中的复选框绑定单击事件
    $('tbody').on('change', '.chkSingle', function () {
        var cnt = $('tbody .chkSingle:checked').length
        //本地单击之后，判断被选中的复选框数量是否大于1，如果大于1，就显示‘批量删除’按钮，否则隐藏
        if (cnt > 1) {
            $('.btndels').show()
        } else {1
            $('.btndels').hide()
        }
        // 本地单击之后，判断是否所有的复选框都被选中，如果是则让全选复选框也选中，否则全取消
        if (cnt == $('tbody .chkSingle').length) {
            $('.chkAll').prop('checked', true)
        } else {
            $('.chkAll').prop('checked', false)
        }
    })

    //新增数据分类
    $('.btnAdd').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/addCate',
            data: $('form').serialize(),
            dataType: 'json',
            success: function (res) {
                // console.log(res); 
                $('.alert-danger >span').text(res.msg)
                $('.alert-danger').fadeIn(200).delay(2000).fadeOut(200)
                if (res.code == 200) {
                    init()
                }
            }
        })
    })

    // 事件委托的方式实现编辑数据的默认展示
    $('tbody').on('click', '.btnEditshow', function () {
        let data = $(this).data()
        // console.log(data);
        $('#slug').val(data.slug)
        $('#name').val(data.name)
        $('[name="id"]').val(data.id)
        $('.btnEdit').show()
        $('.btnAdd').hide()
        $('.optInfo').text('编辑分类目录')
    })

    //实现分类编辑提交
    $('.btnEdit').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/editCate',
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

    //删除单个分类数据--委托事件
    $('tbody').on('click', '.btnDel', function () {
        if (confirm('请问是否真的要删除')) {
            let id = $(this).data().id
            console.log($(this).data());
            //    alert(id)
            $.ajax({
                type: 'get',
                url: '/delCateById',
                data: {
                    id
                },
                dataType: 'json',
                success: function (res) {
                    $('.alert-danger >span').text(res.msg)
                    $('.alert-danger').fadeIn(200).delay(2000).fadeOut(200)
                    if (res.code == 200) {
                        init()
                    }
                }
            })

        }
    })

    //批量删除分类数据
    $('.btndels').on('click',function(){
        // 1.获取所有被选中的复选框--数组
        let allChks=$('tbody .chkSingle:checked')
      
        // 2.遍历数组，获取每个复选框的自定义属性id，添加到数组
        let arr=[]
        for(var i=0;i<allChks.length;i++){
            arr.push($(allChks[i]).data().id)
        }
        // console.log(arr);

        $.ajax({
            type:'get',
            url:'/delCateById',
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