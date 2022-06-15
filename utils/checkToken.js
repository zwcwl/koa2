const jwt = require("jsonwebtoken");

const logger =require("../utils/log4js")

const checkToken = async (ctx, next) => {
    let url = ctx.url.split('?')[0]
    logger.info(url);

    if (url === "/login" || url === "/") {
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
        }else{
            logger.error("没有找到token")
        }
    }
}

module.exports = checkToken