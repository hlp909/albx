//引入mysql
const conn=require('../utils/dataConnect.js')

// 打开连接对象
module.exports={
    login(email,callback){
        let sql=`select * from users where email='${email}' `
        conn.query(sql,(err,results)=>{
            if(err) {
                callback(err)
            }
            else{
                callback(null,results[0])
            }
        })
    },
    //获取用户信息
    users(callback){   
            let sql = 'select * from users;'
            conn.query(sql, (err, results) => {
                if (err) {
                    callback(err)
                } else {
                    callback(null, results)
                }
            })
    },
    // 添加用户
    addUser(obj,callback){
        let sql=`insert into users set ?`
        conn.query(sql,[obj],(err)=>{
            if(err){
                callback(err)
            }
            else{
                callback(null)
            }
        })
    },
    //实现用户的编辑提交
    //obj多了个属性id
    editUser(obj, callback) {
        let sql = 'update users set ? where id=?'
        conn.query(sql, [obj, obj.id], (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    // 根据id删除单个分类数据
    delUserById(id, callback) {
        console.log(id);
        let sql = 'delete from users where id in (?)'
        // let sql =`delete from categories where id in (${id}) `
        // conn.query(sql,  (err) => {

        conn.query(sql, [id] ,(err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    //获取要更改的用户信息
    getUsers(callback){   
        let sql = 'select * from users;'
        conn.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                callback(null, results)
            }
        })
},
    //在个人中心---修改用户密码
    updatepwd(obj,callback){
        let sql = 'update users set ? where id=? '
        conn.query(sql, [obj,obj.id], (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
        console.log(sql);
    },
    //更新用户信息
    updateUserData(obj, callback) {
        let sql = 'update users set ? where id=?'
        conn.query(sql, [obj, obj.id], (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }

}