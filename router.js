const express=require('express')
const path=require('path')
const router=express.Router()

const pagesController=require('./controller/pagesController.js')
const userController=require('./controller/userController.js')
const postsController=require('./controller/postsController.js')
const cateController=require('./controller/cateController.js')
const uploadController=require('./controller/uploadController.js')
const conmentsController=require('./controller/commentsController.js')
const usersController=require('./controller/userController.js')
const optionsContoller=require('./controller/optionsContoller.js')
const SliderContoller=require('./controller/SliderContoller.js')





 //返回前台页面（以/作为根路由）
 router.get('/', pagesController.getIndexPage)
 .get('/list', pagesController.getListPage)
 .get('/detail', pagesController.getDetailPage)

 // 登陆页面
 .get('/login', pagesController.getLoginPage)

 // 约定：后台管理页面以/admin做根路由,通过/admin可以访问到rg 台页面的index.ejs
 .get('/admin', pagesController.getAdminIndexPage)
 .get('/admin/categories', pagesController.getAdminCategoriesPage)
 .get('/admin/comments', pagesController.getAdminCommentsPage)
 .get('/admin/posts', pagesController.getAdminPostsPage)
 .get('/admin/nav-menus', pagesController.getAdminNavMenusPage)
 .get('/admin/password-reset', pagesController.getAdminPasswordResetPage)
 .get('/admin/post-add', pagesController.getAdminPostAddPage)
 .get('/admin/profile', pagesController.getAdminProfilePage)
 .get('/admin/slides', pagesController.getAdminSlidesPage)
 .get('/admin/settings', pagesController.getAdminSettingsPage)
 .get('/admin/users', pagesController.getAdminUsersPage)


// 业务处理
.post('/login',userController.login)
//退出
.get('/loginOut',userController.loginOut)
// 文章部分
.get('/getAllPosts',postsController.getAllPosts)
// 文章的新增
.post('/addPost',postsController.addPost)
// 文章的删除
.get('/delPostById',postsController.delPostById)
 //根据id获取文章数据
.get('/getPostById',postsController.getPostById)
//文章的编辑
.post('/editPost',postsController.editPost)

// 实现所有分类数据
.get('/getCateList',cateController.getCateList)
//新增数据分类
.post('/addCate',cateController.addCate)
// 实现分类数据的编辑提交
.post('/editCate',cateController.editCate)
// 根据id删除单个数据
.get('/delCateById',cateController.delCateById)

//所有评论
.get('/comments',conmentsController.comments)

// 批量操作用户
.get('/users',usersController.users)
// 添加用户
.post('/addUser',usersController.addUser)
// 实现用户数据的编辑提交
.post('/editUser',usersController.editUser)
// 根据id删除单个数据
.get('/delUserById',usersController.delUserById)
//在个人中心---修改用户密码
.post('/updatepwd',usersController.updatepwd)
//获取要更改的用户信息
.get('/getUsers',usersController.getUsers)
    //修改用户信息
.post('/updateUserData',usersController.updateUserData)

//获取导航菜单数据
.get('/getMenuList',optionsContoller.getMenuList)
//添加导航数据
.post('/addMenuList',optionsContoller.addMenuList)
//删除导航数据
// .get('delMenuList',optionsContoller.delMenuList)
//获取网站设置
.get('/getOptions',optionsContoller.getOptions)
// 网站设置的编辑提交
.post('/editOptions',optionsContoller.editOptions)
//获取轮播图数据
.get('/getSlider',optionsContoller.getSlider)
//添加轮播图
.post('/addSlider',SliderContoller.addSlider)


// 文件上传
.post('/uploadFile',uploadController.uploadFile)


//向外暴露
module.exports=router