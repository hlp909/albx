$(function(){

    //初始化数据
    function init(){
        $.ajax({
            type:'get',
            url:'/comments',
            dataType:'json',
            success: function (res) {
                $('tbody').html(template('template', res))
            }
        })
       
    }
     init()

    //  实现全选全不选
    $('.allCom').on('change',function(){
        // 获取当前全选复选框的checked属性值
        var status=$(this).prop('checked')
        // 为tbody中的所有被选中的复选框设置checked属性
        $('tbody .comSingle').prop('checked',status)
        // 获取被选中的复选框的数量
        var cnt=$('tbody .comSingle:checked').length
        if(cnt>1){
            $('.btn-batch').show()
        }else{
            $('.btn-batch').hide()

        }
    })

    //事件委托方式为tbody中的复选框绑定单击事件
    $('tbody').on('change','.comSingle',function(){
        var cnt =$('tbody .comSingle:checked').length
        // 本地单击之后，判断被选中的复选框数量是否大于1，如果大于1，就显示‘批量删除’按钮，否则隐藏
        if(cnt>1){
            $('.btn-batch').show()
        }else{
            $('.btn-batch').hide()
        }
        // 本地单击之后，判断是否所有的复选框都被选中，如果是则让全选复选框也选中，否则全取消
        if(cnt==$('tbody .comSingle').length){
            $('.allCom').prop('checked',true)
        }else{
            $('.allCom').prop('checked',false)

        }
    })
})