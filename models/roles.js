const mongoose=require("mongoose")
const roleSchema=mongoose.Schema({
	roleName:String,
	permissionList:{
		checkedKeys:[],
		halfCheckedKeys:[]
	},
	remark:String,
	createTime:{
		type:Date,
		default:Date.now()
	}
})

module.exports=mongoose.model("role",roleSchema)