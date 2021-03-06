$(function () {
    //动态渲染导航菜单
    function init() {
        $.ajax({
            type: 'get',
            url: '/getMenuList',
            dataType: 'json',
            success: function (res) {
                $('tbody').html(template('template', res))
            }
        })
    }
    init()
    //添加导航数据
    $('.btnAdd').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/addMenuList',
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

    // 实现全选全不选
    $('.chkAll').on('change', function () {
        // 将全选复选框的checked属性赋值给tbody中的所有复选框 
        // 1.获取当前全选复选框的checked属性值
        var status = $(this).prop('checked')
        // prop：这个才是正确获取复选框checked属性值的方法
        // 2.为tbody中的所有复选框设置checked属性
        $('tbody .chkSingle').prop('checked', status)
        var cnt = $('tbody .chkSingle:checked').length
        // 获取被选中的复选框的数量
        if (cnt > 1) {
            $('.btndels').show()
        } else {
            $('.btndels').hide()
        }

    })

    //事件委托方式为tbody中的复选框绑定单击事件
    $('tbody').on('change .chkSingle', function () {
        var cnt = $('tbody .chkSingle:checked').length
        // 本地单击之后，判断被选中的复选框数量是否大于1，如果大于1，就显示‘批量删除’按钮，否则隐藏
        if (cnt > 1) {
            $('.btndels').show()
        } else {
            $('.btndels').hide()
        }
        // 本地单击之后，判断是否所有的复选框都被选中，如果是则让全选复选框也选中，否则全取消
        if(cnt==$('tbody .chkSingle').length)
        {
            $('.chkAll').prop('checked',true)
        }else{
            $('.chkAll').prop('checked',false)
        }
    })

    // $('tbody').on('click','.btnDel',function(){
    //     if(confirm('请问是否真的要删除')){
    //         let id=$(this).data().id
    //        console.log(id);
            // $.ajax({
            //     type:'get',
            //     url:'/delMenuList',
            //     data:{id},
            //     dataType:'json',
            //     success:function(res){
            //         $('.alert-danger >span').text(res.msg)
            //         $('.alert-danger').fadeIn(200).delay(2000).fadeOut(200)
            //         if (res.code == 200) {
            //             init()
                    // }
            //     }
            // })
        // }
    // })
})