const router = require('koa-router')()
const jwt = require("jsonwebtoken")
const logger =require("../utils/log4js")

const utilRequest = require("../utils/utilResponse")

router.post('/login', async (ctx, next) => {
	let data = ctx.request.body
	try {
		//查询数据库用户密码是否正确
		let [result] = await ctx.mongo.db("user").collection("userinfo").find(data).toArray()
		logger.info(result)
		if (result) {
			delete result.userpwd
			const token = jwt.sign(result, "test", { expiresIn: "1day" })

			let data = { _id: result._id, username: result.username, token }

			ctx.body = utilRequest.succeed(200, "登入成功", data)
		} else {
			ctx.body = 'koa2 string'
		}

	} catch (error) {
		logger.error(error)
	}
})

module.exports = router