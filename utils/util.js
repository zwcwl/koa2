let logger = require("../utils/log4js")

let CODE = {
	SUCCESS: 200,
	PARAM_ERROR: 10001,						//参数错误
	USER_ACCOUNT_ERROR: 20001,		//账号或密码错误
	USER_LOGIN_ERROR: 30001,			//用户未登入
	BUSINESS_ERROR: 40001,				//业务请求失败
	AUTH_ERROR: 50001,						//TOKEN认证失败或过期
	NETWORK_ERROR: 60001					//"网络请求异常，请稍后重试"
}

module.exports = {
	pager ({ pageNum = 1, pageSize = 10 }) {
		pageNum *= 1
		pageSize *= 1
		let skipIndex = (pageNum - 1) * pageSize
		return {
			page: {
				pageNum,
				pageSize
			},
			skipIndex
		}
	},

	//成功
	succeed (data = {}, code = CODE.SUCCESS, msg = "成功") {
		return {
			data,
			code,
			msg,
		}
	},

	//失败
	fail ( msg = "失败",code = CODE.BUSINESS_ERROR,data = "") {
		logger.debug(msg)
		return {
			msg,
			code,
			data,
		}
	}
}

