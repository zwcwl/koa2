const router = require('koa-router')()
const util = require("../utils/util")



router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/test', async (ctx, next) => {
  ctx.body = util.succeed(200, "成功", { data: "123" })
})

module.exports = router
