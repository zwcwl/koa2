const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const koalogger = require('koa-logger')
const logger =require("./utils/log4js")

const index = require('./routes/index')
const users = require('./routes/users')
const login = require('./routes/login')

//连接mogodb数据库
const mongo=require("koa-mongo")
app.use(mongo({
  host: 'localhost',
  port: 27017
}))

//验证token
const checkToken=require("./utils/checkToken")
app.use(checkToken)

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(koalogger())
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
app.use(users.routes(), users.allowedMethods())
app.use(login.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx)
});

module.exports = app
