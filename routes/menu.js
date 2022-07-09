const router = require("koa-router")()
const util = require("../utils/util")
const Menu = require("../models/menus")

router.prefix("/menu")

router.get("/", async ctx => {

})

router.post("/", async ctx => {
	let {params} = ctx.request.body
	Menu.create(params)
	ctx.body = util.succeed()
})

router.put("/", async ctx => {
	let { _id, ...params } = ctx.request.body
	console.log(params);
	ctx.body = util.succeed()
})

router.delete("/", async ctx => {

})

module.exports = router