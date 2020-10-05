const express = require('express')
const querystring = require('querystring')

let app = express()
app.listen(3008, () => {
    console.log('http://127.0.0.1:3008');
})
app.get('/', (req, res) => {
            console.log(req.headers.cookie);
            var obj = querystring.parse(req.headers.cookie)
            console.log(obj);
            if (obj.isLogin && obj.isLogin == 'true') {
                res.end('welcome back!!!!!!')
            } 
            else {
                res.writeHead(200, {
                    'Set-Cookie':'isLogin=true'
                })
                // res.writeHead(200,{
                //     'Set-Cookie':'isLogin=true'
                   
                // })
                res.end('first11')
            }
 })



// 1.引入express
// const express = require('express')
// const querystring = require('querystring')

// const app = express()


// app.listen('3008',() => {
//     console.log('http://127.0.0.1:3008')
// })


// app.get('/',(req,res)=>{
//     // 如何读取cookie数据：req.headers.cookie
//     // 如何写入cookie数据:res.writeHead(200,{Set-Cookie:''})

//     console.log(req.headers.cookie)
//     var obj = querystring.parse(req.headers.cookie)
//     console.log(obj)
//     // 如果是第一次登陆就显示：first
//     if(obj.isLogin && obj.isLogin == 'true'){
//         res.end('welcome back')
//     }else{
//         // 如果是第二次及以后的登陆，就显示welcome back
//         res.writeHead(200,{
//             'Set-Cookie':'isLogin=true'
//             // 'Set-Cookie':['isLogin=true;expires='+UTCString]
//         })
//         res.end('first')
//     }

    
// })