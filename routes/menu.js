const router = require("koa-router")()
const util = require("../utils/util")
const Menu = require("../models/menus")

router.prefix("/menu")

router.get("/", async ctx => {
	let { menuName, menuState } = ctx.request.query
	let params = {}
	if (menuName) params.menuName = menuName
	if (menuState) params.menuState = menuState

	let res = await Menu.find(params)
	recursion(res)
	ctx.body = util.succeed(res)
})
let arr=[]
function recursion(res){
	res.forEach(element => {
		if(element.parentId[0]==null){
			arr.push(element)
			console.log(arr);
		}
	});
}

router.post("/", async ctx => {
	let params = ctx.request.body
	Menu.create(params)
	ctx.body = util.succeed()
})

router.put("/", async ctx => {
	let params = ctx.request.body
	await Menu.findByIdAndUpdate(params._id, params)
	ctx.body = util.succeed()
})

router.delete("/", async ctx => {
	console.log(ctx.request.body);
	let id = ctx.request.body
	await Menu.deleteMany({ parentId: { $all: [id] } })
	await Menu.findByIdAndDelete(id)
	ctx.body = util.succeed()
})

module.exports = router