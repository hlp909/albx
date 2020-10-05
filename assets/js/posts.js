$(function () {
    var pageNum = 1;
    var pageSize = 4;
    // var total = 0

    $('#size').val(pageSize)

    // 获取文章列表数据
    function init(search) {
        $.ajax({
            type: 'get',
            url: '/getAllPosts',
            data: {
                pageSize,
                pageNum,
                ...search
            },
            dataType: 'json',
            success: function (res) {
                // total = res.data.cnt

                // console.log(res)
                // 生成文章列表数据：一定要注意返回的数据的格式
                var html = template('template', res.data)
                $('tbody').html(html)
                // 生成分页结构,计算出总页数
                setPage(Math.ceil(res.data.cnt / pageSize))
            }
        })
    }
    init()

    // 动态生成分页结构，同时实现分页功能
    function setPage(totalPages) {
        $(".pagination").bootstrapPaginator({
            bootstrapMajorVersion: 3,
            currentPage: pageNum,
            totalPages: totalPages,
            onPageClicked: function (event, originalEvent, type, page) {
                console.log(page)
                // page就是你所需要的当前页码，我们只需要将全局的页码值进行修改，再次发起ajax请求获取数据进行动态生成
                pageNum = page
                var search = {}
                search.cate = $('.cateSelector').val()
                search.status = $('.statusSelector').val()
                // console.log(search);
                init(search)
            }
        })
    }

    //每页显示页数
    $('#size').on('change', function () {
        console.log($(this).val())
        pageSize = $(this).val()
        pageNum = 1
        // console.log(pageNum);
        init()
    })

    //文章分类
    // 页面加载，自动的获取分类数据生成下拉列表
    $.ajax({
        type: 'get',
        url: '/getCateList',
        dataType: 'json',
        success: function (res) {
            // console.log(res);

            var html = '<option value="all">所有分类</option>'
            res.data.forEach(function (value) {
                html += `<option value="${value.id}">${value.name}</option>`
            })

            $('.cateSelector').html(html)
        }
    })

    //实现筛选功能
    $('.btn-search').on('click', function () {
        // 获取参数
        var search = {}
        search.cate = $('.cateSelector').val()
        search.status = $('.statusSelector').val()
        // console.log(search);
        init(search)

    })

    // 通过事件委托方式删除文章
    $('tbody').on('click', '.btndel', function () {
        // alert($(this).data('id'))
        if (window.confirm('请问是否要删除？')) {
            $.ajax({
                type: 'get',
                url: '/delPostById?id='+$(this).data('id'),
                dataType: 'json',
                success: function (res) {
                    if(res.code==200){
                       pageNum= $('tbody >tr').length==1?--pageNum:pageNum
                       init()  //刷新
                    }
                    // if(Math.ceil((total - 1) / pageSize) < pageNum){
                    //     pageNum -- 
                    // }
                    // init()
                        
                }
            })

        }
    })

})