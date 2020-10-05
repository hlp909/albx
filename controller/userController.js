let userModel = require('../model/userModel.js')

module.exports = {
    //实现用户登录
    login(req, res) {
        //接收参数
        let obj = req.body;
        console.log(obj);

        //    调用模块de
        userModel.login(obj.email, (err, data) => {
            if (err) {
                res.json({
                    code: 201,
                    msg: "服务器异常"
                })
            } else {
                if (data) {
                    if(data.status=='activated'){
                         if (data.password === obj.password) {
                        // res.writeHead(200, {
                        //     'Set-Cookie': 'isLogin=true'
                        // })
                        req.session.isLogin='true'
                        // res.json({
                        //     code: 200,
                        //     msg: "登录成功"
                        // })
                        req.session.currentUser=data
                        // console.log(req.session.currentUser);
                        res.end(JSON.stringify({
                            code: 200,
                            msg: "登录成功"
                        }))
                         } else {
                        res.json({
                            code: 201,
                            msg: "密码输入错误，请重新输入"
                        })
                        }
                    }
                    else{
                        res.json({
                            code: 201,
                            msg: "该用户已被禁用"
                        })
                    }
                   
                } else {
                    res.json({
                        code: 201,
                        msg: "邮箱输入错误"
                    })
                }
            }
        })
    },
    // 退出成功
    loginOut(req, res) {
        req.session.isLogin=''
        // res.redirect('/login')
        // res.writeHead(302,{
        //     'Location':'/login'
        // })
        // res.end()
        res.json({
            code:200,
            msg:"退出成功"
        })
    },
    //获取用户信息
    users(req,res){
        userModel.users((err,data)=>{
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
    //添加用户
    addUser(req,res){
        let obj=req.body
        obj.id=null
        obj.status='activated'
        userModel.addUser(obj,(err)=>{          
            if(err) {     
                res.json({
               code:201,
               msg:"新增用户失败"
           })
           }else{
               res.json({
               code:200,
               msg:"新增用户成功",
           })
           }
        })
    },
    //实现用户的编辑提交
    editUser(req,res){
        // 接收参数
        let obj=req.body

        // 调用数据模块
        userModel.editUser(obj,(err)=>{
            if(err) {
                res.json({
                    code:201,
                    msg:"编辑用户失败"
                })
            }
            else{
                res.json({
                    code:200,
                    msg:"编辑用户成功"
                })
            }
        })
    },
    // 根据id删除单个数据
    delUserById(req,res){
        let id=req.query.id
        userModel.delUserById(id,(err)=>{
            if(err) {
                res.json({
                    code:201,
                    msg:"删除用户失败"
                })
            }
            else{
                res.json({
                    code:200,
                    msg:"删除用户成功"
                })
            }
        })
    },

    //在个人中心---修改用户密码
    updatepwd(req,res){
        // 接收参数
        let obj=req.body
        console.log(obj);
        // 调用模块
        userModel.updatepwd(obj,(err,data)=>{
            if(err){
                res.json({
                    code:201,
                    msg:'服务器异常'
                })
            }else{
                if(data){
                    if(data.password===obj.password){
                        req.session.isOpwd='true'
                        res.end(JSON.stringify({
                            code:200,
                            msg:'修改密码成功'
  
                        }))
                    }else{
                        res.json({
                            code:201,
                            msg:'旧密码不正确，请重新输入'
                        })
                    }
                }
            }
        })
    },
    //获取要更改的用户信息
    getUsers(req,res){
        userModel.getUsers((err,data)=>{
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
    //更新用户信息
    updateUserData(req,res){
         // 接收参数
         let obj=req.body

         // 调用数据模块
         userModel.updateUserData(obj,(err)=>{
             if(err) {
                 res.json({
                     code:201,
                     msg:"更新用户失败"
                 })
             }
             else{
                 res.json({
                     code:200,
                     msg:"更新用户成功"
                 })
             }
         })
    }
}