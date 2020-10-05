const cateModel=require('../model/cateModel.js')

module.exports={
    //获取所有的分类数据
    getCateList(req,res){
        cateModel.getCateList((err,data)=>{
            if(err) {
                res.json({
               code:201,
               msg:"获取数据失败"
           })
           }else{
               res.json({
               code:200,
               msg:"获取数据成功",
               data
           })
           }
        })
    },
    //新增数据分类
    addCate(req,res){
        // 接收参数
        let obj=req.body
        obj.id=null
        // 调用数据模块
        cateModel.addCate(obj,(err)=>{
            if(err) {
                console.log(err);
                res.json({
                    code:201,
                    msg:"新增分类失败"
                })
            }else{
                res.json({
                code:200,
                msg:"新增分类成功"
            })
            }
            
        })
    },
     //实现分类编辑提交
     editCate(req,res){
        // 接收参数
        let obj=req.body
        // 调用数据模块
        cateModel.editCate(obj,(err)=>{
            if(err) {
                res.json({
                    code:201,
                    msg:"编辑分类失败"
                })
            }
            else{
                res.json({
                    code:200,
                    msg:"编辑分类成功"
                })
            }
        })
    },
    // 根据id删除单个分类数据
    delCateById(req,res){
        // 接收参数     
        let id=req.query.id 
        console.log(id);
        // 调用数据模块
        cateModel.delCateById(id,(err)=>{
            if(err) {
                res.json({
                    code:201,
                    msg:"删除分类失败"
                })
            }
            else{
                res.json({
                    code:200,
                    msg:"删除分类成功"
                })
            }
        })
    }
}