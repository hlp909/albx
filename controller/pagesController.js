// 这个控制器专门用于响应用户页面请求--返回页面

module.exports = {
    // 返回前台页面
    // 约定，前台页/做为根路由，通过/可以访问到前台页面的index.ejs
    getIndexPage:(req,res)=>{
        res.render('index.ejs')
    },
    getListPage:(req,res)=>{
        res.render('list.ejs')
    },
    getDetailPage:(req,res)=>{
        res.render('detail.ejs')
    },

    // 返回登陆页面
    getLoginPage:(req,res)=>{
        res.render('admin/login.ejs')
    },

    // 返回后台管理页面
    // 约定：后台管理页面以/admin做根路由,通过/admin可以访问到rg 台页面的index.ejs
    getAdminIndexPage:(req,res)=>{
        // var obj=querystring.parse(req.headers.cookie)
        // if(obj.isLogin&&obj.isLogin=='true'){
            res.render('admin/index.ejs')
        // }
        // else{
        //     //重定向
        //     res.redirect('/login')
        // }
            
    },
    getAdminCategoriesPage:(req,res)=>{
        res.render('admin/categories.ejs')
    },
    getAdminCommentsPage:(req,res)=>{
        res.render('admin/comments.ejs')
    },
    getAdminPostsPage:(req,res)=>{
        res.render('admin/posts.ejs')
    },

    
    getNavMenusPage : (req, res) => {
        res.render('admin/nav-menus.ejs')
    },
    getAdminPasswordResetPage : (req, res) => {
        res.render('admin/password-reset.ejs')
    },
    getAdminPostAddPage: (req, res) => {
        res.render('admin/post-add.ejs')
    },
    getAdminProfilePage : (req, res) => {
        res.render('admin/profile.ejs')
    },
    getAdminSettingsPage : (req, res) => {
        res.render('admin/settings.ejs')
    },
    getAdminSlidesPage : (req, res) => {
        res.render('admin/slides.ejs')
    },
    getAdminUsersPage : (req, res) => {
        res.render('admin/users.ejs')
    },
    getAdminNavMenusPage : (req, res) => {
        res.render('admin/nav-menus.ejs')
    }
}