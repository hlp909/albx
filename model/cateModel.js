const conn = require('../utils/dataConnect.js')
module.exports = {
    //获取所有的分类数据

    getCateList(callback) {
        let sql = 'select * from categories;'
        conn.query(sql, (err, results) => {
            if (err) {
                callback(err)
            } else {
                callback(null, results)
            }
        })
    },
    //新增数据分类
    addCate(obj,callback){
        let sql = 'insert into categories set ?'
        conn.query(sql,obj,(err) => {
            if(err){
                callback(err)
            }else{
                callback(null)
            }
        })
    },
    //实现分类编辑提交
    // obj多了个属性id
    editCate(obj, callback) {
        let sql = 'update categories set ? where id=?'
        conn.query(sql, [obj, obj.id], (err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    },
    // 根据id删除单个分类数据
    delCateById(id, callback) {
        console.log(id);
        let sql = 'delete from categories where id in (?)'
        // let sql =`delete from categories where id in (${id}) `
        // conn.query(sql,  (err) => {

        conn.query(sql, [id] ,(err) => {
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }

}