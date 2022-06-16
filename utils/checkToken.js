const jwt = require("jsonwebtoken");

const logger = require("../utils/log4js")
const response = require("./responseData")

const checkToken = async (ctx, next) => {
    let url = ctx.url.split('?')[0]
    logger.info(url);

    //判断路径是否为静态路径
    let str=url.includes("/favicon.ico") || url.includes("/stylesheets")
    if (url === "/" || url === "/login" || str) {
        await next()
    } else {
        let token = ctx.request.header.authorization

        if (token) {
            try {
                let result = jwt.verify(token, "test")
                logger.info(result)
                await next()
            } catch (error) {
                logger.error(error)
            }
        } else {
            logger.error("请登入用户名和密码")
            response.fail(300, "请登入用户名和密码")
        }
    }
}

module.exports = checkToken