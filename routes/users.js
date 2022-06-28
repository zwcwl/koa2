const router = require('koa-router')()
const jwt = require("jsonwebtoken")
const logger = require("../utils/log4js")
const util = require("../utils/util")
const User = require("../models/users")

router.prefix('/users')

//用户登入
router.post('/login', async (ctx, next) => {
  let { userName, userPwd } = ctx.request.body
  try {
    //查询数据库用户密码是否正确
    let { _doc } = await User.findOne({ userName, userPwd })
    if (_doc) {
      const token = jwt.sign({ data: _doc }, "test", { expiresIn: "1day" })
      _doc.token = token
      ctx.body = util.succeed(_doc)
    } else {
      ctx.body = util.fail("账号或密码错误",20001)
    }

  } catch (error) {
    ctx.body = util.fail(error)
  }
})

//用户查询
router.get("/", async (ctx) => {
  const { userName, userId, userState } = ctx.request.query
  Number(userState);
  const { page, skipIndex } = util.pager(ctx.request.query)
  let params = {}
  if (userName) params.userName = userName
  if (userId) params.userId = userId
  if (userState && userState != 0) params.userState = userState
  try {
    let query = User.find(params,{_id:0,userPwd:0})
    let list = await query.skip(skipIndex).limit(page.pageSize)
    let total = await User.countDocuments(params)

    ctx.body = util.succeed({
      page: {
        ...page,
        total
      },
      list
    })
  } catch (error) {
    ctx.body=util.fail(error)
  }
})

module.exports = router