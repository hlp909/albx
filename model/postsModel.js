//这个是获取文章相关数据处理业务的页面
/*要求用户一定要传递两个参数，以query对象作为参数格式，
pageSize:每页显示的数量
pageNum：当前页码
cate：分类id
status:文章转态
*/

//引入mysql
const conn = require('../utils/dataConnect.js')

module.exports = {
    // 获取所有文章数据

    getAllPosts(query, callback) {
        // var pages = (query.pageNum - 1) * query.pageSize
        console.log(query);
        var sql = `select posts.*,users.nickname,categories.name
                    from posts
                    join users on posts.user_id = users.id
                    join categories on posts.category_id = categories.id
                    where 1=1 ` // 添加恒成立
        // 拼接where
        if (query.cate && query.cate != 'all') { //说明用户进行了分类的选择，那么久应该拼接分类条件
            sql += ` and posts.category_id = '${query.cate}'`
        }
        if (query.status && query.status != 'all') {
            sql += ` and posts.status = '${query.status}'`
        }

        sql += ` order by id DESC
                    limit ${(query.pageNum - 1) * query.pageSize},${query.pageSize}`
        conn.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                // callback(null,results) 之前的返回数据的代码
                
                // 当我们获取到发当前页数据之后，我们需要再进行查询获取当前表的总记录数
                sql = 'select count(*) total from posts where 1 = 1'
                // 拼接where
                if (query.cate && query.cate != 'all') { //说明用户进行了分类的选择，那么久应该拼接分类条件
                    sql += ` and posts.category_id = '${query.cate}'`
                }
                if (query.status && query.status != 'all') {
                    sql += ` and posts.status = '${query.status}'`
                }
                conn.query(sql, (err1, results1) => {
                    if (err1) {
                        callback(err1)
                    } else {
                        // 我们要返回之前查询的时候，同时还要返回本次查询到的总的记录数
                        // 所以，返回的数据格式有一个重大的变化，后台返回数据的变化直接决定前台使用返回值的方式
                        callback(null, {
                            data: results,
                            cnt: results1[0].total
                        })
                    }
                })
            }
        })
    },
    //实现文章的新增
    addPost(obj,callback){
        let sql='insert into posts set ?'
        conn.query(sql,obj,(err)=>{
            if(err){
                callback(err)
            }
            else{
                callback(null)
            }
        })
    },
    //实现文章的删除
    delPostById(id,callback){
        var sql = 'delete from posts where id = ' + id
        conn.query(sql,(err) => {
            if(err){
                callback(err)
            }else{
                callback(null)
            }
        })
    },
    //根据id获取文章数据
    getPostById(id,callback){
        let sql='select * from posts where id='+id
        conn.query(sql,(err,results)=>{
            if(err) {
                callback(err)
            }else{
                callback(null,results[0])
            }
        })
       
    },
    //编辑文章
    editPost(obj,callback){
        let sql='update posts set ? where id = ? '
        conn.query(sql,[obj,obj.id],(err)=>{
            if(err){
                callback(err)
            }else{
                callback(null)
            }
        })
    }
}