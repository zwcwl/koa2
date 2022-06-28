const jwt = require("jsonwebtoken");

const logger = require("../utils/log4js")
const util = require("./util")

const checkToken = async (ctx, next) => {
    let url = ctx.url.split('?')[0]
    logger.info(url);

    //判断路径是否为静态路径
    let str=url.includes("/favicon.ico") || url.includes("/stylesheets")
    if (url === "/" || url === "/users/login" || str) {
        await next()
    } else {
        let token = ctx.request.header.authorization
        if (token) {
            try {
                jwt.verify(token, "test")
                await next()
            } catch (error) {
                logger.error(error)
                ctx.body = util.fail("TOKEN认证失败或过期",50001)
            }
        } else {
            ctx.body = util.fail("用户未登入",30001)
        }
    }
}

module.exports = checkToken