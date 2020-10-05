const conn=require('../utils/dataConnect')

module.exports={
    addSlider(obj,callback){
        let sql="select value from `options` where `key`='home_slides'"
        conn.query(sql,(err,results)=>{
            if(err){
                console.log(err);
                callback(err)
            }
            else{
                // 读取指定的数据--json格式  转换为数组
                 let arr=JSON.parse(results[0].value)
                //  添加数据到数组
                arr.push(obj)
                // 数组转换为字符串
                let str=JSON.stringify(arr)
                // 更新--update
                let sql="update `options` set `value`=? where `key`='home_slides'"
                conn.query(sql,str,(err1)=>{
                    if(err1){
                        callback(err1)
                    }else{
                        callback(null)
                    }
                })
            }
        })
        
    }
}