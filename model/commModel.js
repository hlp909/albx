const conn = require('../utils/dataConnect.js')

module.exports={
    comments(query,callback){
        let sql=`select * from comments`
        conn.query(sql,(err,results)=>{
            if(err) {
                callback(err)
            }else{
                callback(null,results)
            }
        })
    }
}