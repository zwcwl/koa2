const mongoose=require("mongoose")

let userSchema=mongoose.Schema({
	userId:Number,
	userName:String,
	userPwd:String,
	userEmail:String,
	mobile:String,
	sex:Number,
	deptList:Array,
	job:String,
	userState:{				//用户状态
		type:Number,
		default:1
	},
	userRole:{				//用户角色
		type:Number,
		default:1
	},
	systemRole:Array,	//系统角色
	createTime:{
		type:Date,
		default:Date.now()
	},
	lastLoginTime:{
		type:Date,
		default:Date.now()
	},
	remark:String
})

module.exports=mongoose.model("users",userSchema,"users")