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

	let resultList = menuTree(res, null, [])
	ctx.body = util.succeed(resultList)
})

function menuTree (menuList, id, arr) {
	for (let index = 0; index < menuList.length; index++) {  					  
		const item = menuList[index];
		if (String(item.parentId.slice().pop()) == String(id)) {
			arr.push(item._doc)
		}
	}
	arr.map((item) => {																								
		item.children = []
		menuTree(menuList, item._id, item.children)
	});
	return arr
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