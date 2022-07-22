const mongoose = require("mongoose")

const deptSchema = mongoose.Schema({
    deptName: String,
    remark: String,
    createTime: {
        type: Date,
        default: Date.now()
    },
    userEmail:String,
    parentId:[mongoose.Types.ObjectId],
    updateTime: {
        type: Date,
        default: Date.now()
    }
})

module.exports=mongoose.model("dept",deptSchema)