const commModel=require('../model/commModel.js')
module.exports={
    comments(req,res){
        let query=req.query
        commModel.comments(query,(err,data)=>{
            if(err){
                res.json({
                    code: 201,
                    msg: "获取评论失败"
                })
            } else {
                res.json({
                    code: 200,
                    msg: "获取评论成功",
                    data
                })
            }
            }
        )
    }
}