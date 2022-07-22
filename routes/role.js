const router = require("koa-router")()
const util = require("../utils/util")
const Role = require("../models/roles")

router.prefix("/role")

router.get("/gain", async ctx => {
	try {
		let res = await Role.find({}, "_id,roleName")
		ctx.body = util.succeed(res)
	} catch (error) {
		ctx.body = util.fail(error)
	}
})

router.get("/", async ctx => {
	try {
		let { roleName } = await ctx.request.query
		const { page, skipIndex } = util.pager(ctx.request.query)
		let params = {}
		if (roleName) params.roleName = roleName

		let query = Role.find(params)
		let list = await query.skip(skipIndex).limit(page.pageSize)
		let total = await Role.countDocuments(params)

		ctx.body = util.succeed({
			page: {
				...page,
				total
			},
			list
		})
	} catch (error) {

	}
})

router.post("/", async ctx => {
	let params = ctx.request.body
	try {
		let res = await Role.create(params)
		ctx.body = util.succeed()
	} catch (error) {

	}
})

router.put("/", async ctx => {
	let { roleName, remark, _id } = ctx.request.body
	await Role.findByIdAndUpdate(_id, { roleName, remark })
	ctx.body = util.succeed()
})

router.delete("/", async ctx => {
	let id = ctx.request.body
	await Role.findByIdAndDelete(id)
	ctx.body = util.succeed()
})

module.exports = router