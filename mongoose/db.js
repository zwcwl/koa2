let mongoose=require("mongoose")
let config=require("./index")
let logger=require("../utils/log4js")

mongoose.connect(config.URL)

let db=mongoose.connection

db.on("error",()=>{
	logger.error("连接数据库失败")
})

db.on("open",()=>{
	logger.info("数据库连接成功")
})