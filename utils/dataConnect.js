//引入mysql
const mysql = require('mysql')
//创建连接对象
let conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'baixiu',
    dateStrings: true // 不要将数据库中读取出来的时间进行转换
})
module.exports=conn