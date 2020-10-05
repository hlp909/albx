// 这个模块专门用于处理文件的上传业务
const formidable = require('formidable')
const path = require('path')

module.exports = {
    // 实现文件的上传操作
    uploadFile(req,res){
        // console.log(__dirname)
        // 使用formidable实现文件上传
        // 说明：formidable不仅仅可以实现文件上传，而且还能传递普通的post方式的参数
        // 1.创建formidable对象
        var form = new formidable.IncomingForm()
        // 2.配置编码格式
        form.encoding = 'utf-8'
        // 3.配置上传存储目录
        form.uploadDir = __dirname + '/../uploads'
        // 4.是否保留扩展名
        form.keepExtensions = true
        // 5.调用parse方法实现文件的上传
        // req:请求报文 ，用户传递的数据就在请求报文中
        // 当上传操作结束后，会执行回调函数
        // err:如果操作失败，返回的错误信息对象
        // fields：字段，传递的普通键值对
        // files：文件成功上传之后的相关信息
        form.parse(req,(err,fields,files)=>{
            if(err){
                res.json({
                    code:400,
                    msg:'上传失败'
                })
            }else{
                // console.log(fields)
                // console.log(files)
                // console.log(files.myimg.path)
                // console.log(path.basename(files.myimg.path))
                // res.json({})
                res.json({
                    code:200,
                    msg:'上传成功',
                    img:path.basename(files.myimg.path)
                })
            }
        })
    }
}