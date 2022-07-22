const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger =require("./utils/log4js")

const index = require('./routes/index')
const user = require('./routes/user')
const menu = require('./routes/menu')
const role = require('./routes/role')
const dept = require('./routes/dept')

//连接mogodb数据库
require("./mongoose/db")

// 验证token
const verifyToken=require("./utils/verifyToken")
app.use(verifyToken)

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger 计算时间
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(menu.routes(), menu.allowedMethods())
app.use(role.routes(), role.allowedMethods())
app.use(dept.routes(), dept.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx)
});

module.exports = app
