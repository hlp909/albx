// 引入模板
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const querystring = require('querystring')
const session=require('express-session')

//引入路由模块
const router = require('./router.js')
// const ejs=require('ejs')

// 创建实例对象
let app = express()

//引入session中间件
app.use(session({
    secret:'zcnwhxnodnhjl',
    resave:'false',
    saveUninitialized:'false'
}))

// 监听
app.listen(3004, () => {
    console.log('http://127.0.0.1:3004');
})
//托管静态资源
app.use('/assets', express.static('assets'))
app.use('/uploads', express.static('uploads'))

//配置body-parser 接收post方式请求的参数
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json()) //如果传过来的是json对象，可以转换成字符串


// 添加ejs模板引擎的配置
app.set('view engine', 'ejs')
// 指定ejs模板文件的存储路径
app.set('views', __dirname + '/views')

app.use(function (req,res,next) {
    // 设置允许进行跨域请求的源，*代表所有域
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    // 允许传递证书---允许传递cookie
    res.header("Access-Control-Allow-Credentials","true");
    next();
});


app.use(function (req, res, next) {
    
    // var obj = querystring.parse(req.headers.cookie)
    
    //如果已经登录了，或者请求登录页，或者请求前台页面，都不需要登录，直接next
    if (req.session.isLogin && req.session.isLogin=='true' || req.url == '/login' || req.url.indexOf('/admin') == -1) {
        next()
    } else {
        //重定向
        res.redirect('/login')
    }
})


// 添加路由配置
app.use(router)