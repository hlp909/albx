//这个是处理跟文章有关业务处理的页面
const postsModel = require('../model/postsModel')
const moment=require('moment')
module.exports = {
    // 获取所有文章数据
    getAllPosts(req, res) {
        var query = req.query;
        console.log(query);
        // 调用数据模块进行文章数据的获取
        postsModel.getAllPosts(query, (err, data) => {
            if (err) {
                res.json({
                    code: 201,
                    msg: "获取数据失败"
                })
            } else {
                res.json({
                    code: 200,
                    msg: "获取数据成功",
                    data
                })
            }

        })
    },
    //实现文章的新增
    addPost(req, res) {
        //接收数据
        var obj = req.body
        console.log(obj);
        // 对参数进行处理：加几个默认值，取一个session
        obj.id = null
        obj.views = 0
        obj.likes = 0
        obj.user_id = req.session.currentUser.id
        // console.log(obj);
        // 调用数据模块
        postsModel.addPost(obj, (err) => {
            if (err) {              
                res.json({
                    code: 201,
                    msg: "新增文章失败"
                })
            } else {               
                res.json({
                    code: 200,
                    msg: "新增文章成功",
                })
            }
        })
    },
    // 实现文章的删除
    delPostById(req, res) {
        // 接收参数

        let id = req.query.id
        console.log(req.query.id);
        // 调用数据模块
        postsModel.delPostById(id, (err) => {
            // 返回操作结果
            if (err) {
                res.json({
                    code: 201,
                    msg: '删除文章失败'
                })
            } else {
                res.json({
                    code: 200,
                    msg: '删除文章成功'
                })
            }
        })

    },

    //根据id获取文章数据
    getPostById(req, res) {
        var id = req.query.id;
        // 调用数据模块进行文章数据的获取
        postsModel.getPostById(id, (err, data) => {
            if (err) {
                res.json({
                    code: 201,
                    msg: "获取数据失败"
                })
            } else {
                data.created=moment(data.created).format('YYYY-MM-DDTHH:mm:ss')
                res.json({
                    code: 200,
                    msg: "获取数据成功",
                    data
                })
            }

        })
    },

    //编辑文章
    editPost(req, res) {
        let obj = req.body
        postsModel.editPost(obj, (err) => {            
            if (err) {
                res.json({
                    code: 201,
                    msg: "编辑文章失败"
                })
            } else {               
                
                res.json({
                    code: 200,
                    msg: "编辑文章成功"
                })
            }
        })
    }
}