$(function(){
    //1.h获取当期url中的路由名称
    let str=location.href
    let routerName=''    // 路由名称
    
    // 1.1判断是否有参数
    index=str.indexOf('?')
    if(index!=-1){// 有参数
        routerName=str.substring(str.lastIndexOf('/')+1,index)
    }else{
        routerName=str.substring(str.lastIndexOf('/')+1)
    }
    // alert(routerName)

    // 2.为对应的导航项设置属性和样式
    if(routerName=='posts' ||routerName=='categories'||routerName=='post-add'){
        $('#menu-posts').addClass('in')
        $('#menu-posts').attr('aria-expanded',true) 
    }
    else if(routerName=='nav-menus'||routerName=='slides'||routerName=='settings'){
        $('#menu-settings').addClass('in')
        $('#menu-settings').attr('aria-expanded',true)
    }    
    $('#'+routerName).addClass('active')
    $('#'+routerName).parent().siblings('a').removeClass('collapsed')
})