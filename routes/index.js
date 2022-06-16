const router = require('koa-router')()
const response = require("../utils/responseData")

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/test', async (ctx, next) => {
  ctx.body = response.succeed(200, "成功", { data: "123" })
})

module.exports = router
