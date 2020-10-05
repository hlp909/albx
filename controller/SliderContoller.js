const addSliderModel=require('../model/addSliderModel.js')
module.exports.addSlider=(req,res)=>{
    let obj=req.body
    addSliderModel.addSlider(obj,(err)=>{
        if(err){            
            res.json({
               code:201,
               msg:'添加轮播图失败' 
            })
        }
        else{
            res.json({
                code:200,
                msg:'添加轮播图成功' 
             })
        }
    })
}