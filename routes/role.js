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

module.exports = router