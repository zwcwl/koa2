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
	
	let resultList=menuTree(res,null,[])
	console.log(resultList);
	ctx.body = util.succeed(resultList)
})

function menuTree(menuList,id,arr){
	// menuList.forEach(item => {
	// 	if(item.parentId[0] === null){
	// 		console.log(item);
	// 		arr.push(item)
	// 	}
	// });

	for (let index = 0; index < menuList.length; index++) {
		const item = menuList[index];
		console.log(String(item.parentId.slice().shift()) == String(id))

		// console.log(menuList.length);
		// console.log(item)
		if(String(item.parentId.slice().shift()) == String(id)){
			// delete menuList[index]
			// menuList
			arr.push(item)
		}
	}

	console.log(arr);
	arr.forEach((item,index) => {
		arr[index].children=[]
		menuTree(menuList,item._id,arr[index].children)
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