const router = require('koa-router')()
const jwt = require("jsonwebtoken")
const logger = require("../utils/log4js")
const response = require("../utils/responseData")

router.prefix('/user')

router.post('/login', async (ctx, next) => {
	let userInfo = ctx.request.body
	try {
		//查询数据库用户密码是否正确
		let [result] = await ctx.mongo.db("user").collection("userinfo").find(userInfo).toArray()
		logger.info(result)
		if (result) {
			const token = jwt.sign(result, "test", { expiresIn: "1day" })

			let data = {...result, token }

			ctx.body = response.succeed(200, "登入成功", data)
		} else {
			ctx.body = response.fail(30001, "账号或密码错误")
		}

	} catch (error) {
		ctx.body = response.fail(300, error)
	}
})

module.exports = router