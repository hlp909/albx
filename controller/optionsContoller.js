const optionsModel = require('../model/optionsModel.js')

module.exports = {
    //获取导航数据
    getMenuList(req, res) {
        optionsModel.getMenuList((err, data) => {
            if (err) {
                res.json({
                    code: 201,
                    msg: "获取导航菜单数据失败"
                })
            } else {
                res.json({
                    code: 200,
                    msg: "获取导航菜单数据成功",
                    data
                })
            }
        })
    },
    //获取轮播图数据
    getSlider(req, res) {
        optionsModel.getSlider((err, data) => {
            if (err) {
                res.json({
                    code: 201,
                    msg: "获取轮播图数据失败"
                })
            } else {
                res.json({
                    code: 200,
                    msg: "获取轮播图数据成功",
                    data
                })
            }
        })
    },
    //添加导航数据
    addMenuList(req, res) {
        let obj = req.body
        obj.icon = 'fa fa-glass'
        optionsModel.addMenuList(obj, (err, data) => {
            if (err) {
                res.json({
                    code: 201,
                    msg: "添加导航菜单数据失败"
                })
            } else {
                res.json({
                    code: 200,
                    msg: "添加导航菜单数据成功",
                    data
                })
            }
        })
    },
    //删除导航数据
    // delMenuList(req, res) {
    //     // 接收参数
    //     let id = req.query.id
    //     console.log(req.query.id);
    //     // 调用数据模块
    //     optionsModel.delMenuList(id, (err) => {
    //         // 返回操作结果
    //         if (err) {
    //             res.json({
    //                 code: 201,
    //                 msg: '删除导航失败'
    //             })
    //         } else {
    //             res.json({
    //                 code: 200,
    //                 msg: '删除导航成功'
    //             })
    //         }
    //     })
    // },

    //获取网站设置
    getOptions(req, res) {
        optionsModel.getOptions((err, data) => {
                if (err) {
                    res.json({
                        code: 201,
                        msg: "添加获取网站数据失败"
                    })
                } else {
                    res.json({
                        code: 200,
                        msg: "添加获取网站数据成功",
                        data
                    })
                }
            }
        )
    },
    //编辑提交网站
    editOptions(req,res){
        let obj=req.body
        obj.comment_status=obj.comment_status?1:0
        obj.comment_reviewed=obj.comment_reviewed?1:0
        // console.log(obj);
        
        optionsModel.editOptions(obj,(err)=>{
            if (err) {
                res.json({
                    code: 201,
                    msg: "编辑网站失败"
                })
            }
             else {
                res.json({
                    code: 200,
                    msg: "编辑网站成功",
                })
            }
        })
    },
    
}