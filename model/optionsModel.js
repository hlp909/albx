const conn=require('../utils/dataConnect.js')
module.exports={
    //获取导航数据
    getMenuList(callback){
        let sql='select value from `options` where id=9'
        conn.query(sql,(err,results)=>{
            if(err){
                callback(err)
            }else{
                console.log(results);
                // callback(null,results[0].value)
                callback(null,JSON.parse(results[0].value))
            }
        })
    },
    //获取轮播图数据
    getSlider(callback){
        let sql='select value from `options` where id=10'
        conn.query(sql,(err,results)=>{
            if(err){
                callback(err)
            }else{
                // console.log(results);
                callback(null,JSON.parse(results[0].value))
            }
        })
    },
    //添加导航数据
    addMenuList(obj,callback){
        // 1.获取所有的导航数据--json格式字符串--select
        let sql='select value from `options` where id=9'
        conn.query(sql,obj,(err,results)=>{
        // 2.将json格式字符串转换为数组
        let arr=JSON.parse(results[0].value)
        // 3.添加新数据到数组
        arr.push(obj)
        // 4.将数组重新转换为json格式字符串
        let str=JSON.stringify(arr)
        // 5.更新--update
        let sql=`update options set value='${str}' where id=9`
        conn.query(sql,(err1)=>{
            if(err1){
                callback(err1)
            }
            else{
                callback(null)
            }
        })
        })
       
    },
    //删除导航数据
    // delMenuList(id,callback){  
    // }

    //获取网站设置
    getOptions(callback){
        let sql='select value from `options` where id<9'
        conn.query(sql,(err,results)=>{
            if(err){
                callback(err)
            }else{
                console.log(results);
                // callback(null,results[0].value)
                callback(null,results)
            }
        })
    },
    //编辑提交网站
    
    editOptions(obj,callback){
        // 遍历obj生成sql语句执行
        let cnt=0;
        for(key in obj){
            let sql='update `options` set value=? where `key`=? '
            conn.query(sql,[obj[key],key],(err)=>{
                if(err){
                    callback(err)
                }else{
                    cnt++
                   if(cnt==6){
                    callback(null)
                   }
                }
            })
        }
    },
}