const router = require("koa-router")()
const util = require("../utils/util")
const Dept = require("../models/depts")

router.prefix("/dept")

router.get("/", async ctx => {
    let { deptName } = ctx.request.query
    let params = {}
    if (deptName) params.deptName = deptName
    let res = await Dept.find(params)
    ctx.body = util.succeed(res)
})

router.post("/", async ctx => {
    let params = ctx.request.body
    await Dept.create(params)
    ctx.body = util.succeed()
})

router.put("/", async ctx => {
    let { deptName, preatedId, userName, userEmail, _id } = ctx.request.body
    await Dept.findByIdAndUpdate(_id, { deptName, preatedId, userName, userEmail })
    ctx.body = util.succeed()
})

router.delete("/", async ctx => {
    let id = ctx.request.body
    await Dept.findByIdAndDelete(id)
    await Dept.deleteMany({ parentId: { $all: [id] } })
    ctx.body = util.succeed()
})

module.exports = router