const express = require('express')
var session = require('express-session');

let app = express()

// Use the session middleware 
app.use(session({
    ////这里的name值得是cookie的name，默认cookie的name是：connect.sid
    //name: 'hhw',
    secret: 'keyboard cat',
    //强制保存未被修改的session数据
    resave: true,
    //强制“未初始化”的会话保存到存储。 
    saveUninitialized: true,
}))

app.listen(3008, () => {
    console.log('http://127.0.0.1:3008');
})

app.get('/', (req, res) => {
    console.log(req.session); 2
    if(req.session.isLogin&&req.session.isLogin=='true'){
        res.end('welcome back 999 !!!!')
    }
    else{
        req.session.isLogin='true'
        req.session.anyData={
            name:"张常宁",
            age:24
        }
        res.end('first!')
       
    }
})