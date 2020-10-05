const itcast={
    //将参数字符串转换为对象，如将：key=value&key=value  >>{key:value}
    getParams(str){  //?id=9&name=zcn
        var obj={}
        // 去除？
        str=str.substring(1)  //id=9&name=zcn
        // 第一次拆分
        let temp=str.split('&') //['id=9','name=zcn']
        temp.forEach(value=>{
        //循环遍历 拆分第2次
            var arr=value.split('=')
            obj[arr[0]]=arr[1]
        })
        return obj
    }
}

