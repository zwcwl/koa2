const router = require('koa-router')()

const { log } = require('debug/src/browser')
const jwt=require("jsonwebtoken")

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.post('/login', async (ctx, next) => {
  let data = ctx.request.body

  try {
    //查询数据库用户密码是否正确
    let [result] = await ctx.mongo.db("user").collection("userinfo").find(data).toArray()
    console.log(result)
    if(result){
      delete result.userpwd
      const Token=jwt.sign(result,"test",{ expiresIn: "1day" })
      ctx.body={
        code:200,
        msg:"登入成功",
        data,
        Token
      }
    }else{
      ctx.body = 'koa2 string'
    }
    
  } catch (error) {
    console.log(error)
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
