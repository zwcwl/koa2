const jwt = require("jsonwebtoken");

const logger = require("./log4js")
const util = require("./util")

const verifyToken = async (ctx, next) => {
    let url = ctx.url.split('?')[0]
    // 以下接口不校验token
    let url_config = [
        '/users/login',
    ]

    // 判断路径是否需要检查
    let changer = url_config.some((item) => {
        return item == url
    })

    //当接口不需要检查时，则直接跳过
    if (changer) {
        await next()
    } else {
        let token = ctx.request.header.authorization
        if (token) {
            try {
                const decoded = jwt.verify(token, "test")
                if (decoded) {
                    await next()
                }
            } catch (error) {
                logger.error(error.name)
                if (error.name == "SyntaxError") {
                    ctx.body = util.fail("TOKEN被篡改", 50001)
                } else if (error.name == "TokenExpiredError") {
                    ctx.body = util.fail("TOKEN已过期过期", 50001)
                } else if (error.name == "JsonWebTokenError") {
                    ctx.body = util.fail("无效的TOKEN", 50001)
                }
            }
        } else {
            ctx.body = util.fail("用户未登入，请登入后重试", 30001)
        }
    }
}

module.exports = verifyToken