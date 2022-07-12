const router = require('koa-router')()
const jwt = require("jsonwebtoken")
const logger = require("../utils/log4js")
const util = require("../utils/util")
const User = require("../models/users")
const Counters = require("../models/counters")

router.prefix('/users')

//用户登入
router.post('/login', async (ctx, next) => {
  let { userName, userPwd } = ctx.request.body
  try {
    //查询数据库用户密码是否正确
    let result = await User.findOne({ userName, userPwd })
    if (result) {
      const token = jwt.sign({ data: result }, "test", { expiresIn: "1day" })
      result.token = token
      ctx.body = util.succeed(result)
    } else {
      ctx.body = util.fail("账号或密码错误", 20001)
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
    let query = User.find(params, { _id: 0, userPwd: 0 })
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
    ctx.body = util.fail(error)
  }
})

//用户删除（更新）
router.delete("/", async (ctx) => {
  const { userIds } = ctx.request.body
  let res = await User.updateMany({ userId: { $in: userIds } }, { userState: 2 })
  ctx.body = util.succeed(res, `删除了${res.modifiedCount}条数据`)
})

//用户更新
router.put("/", async (ctx) => {
  let data = ctx.request.body
  try {
    let res = await User.findOneAndUpdate({ userId: data.userId }, data)
    ctx.body = util.succeed(res, "用户更新成功")
  } catch (error) {
    ctx.body = util.fail(error)
  }
})

//用户新增
router.post("/", async (ctx) => {
  let data = ctx.request.body
  try {
    let isExist = await User.findOne({ $or: [{ userName: data.userName }, { userEmail: data.userEmail }] }, "_id userEmail userName")
    if (isExist) {
      ctx.body = util.fail(`${isExist.userName} => ${isExist.userEmail} 用户已经存在,请更改用户名、邮箱`)
    } else {
      let ID = await Counters.findOneAndUpdate({}, { $inc: { sequence_value: 1 } },{new:true})
      data.userId=ID.sequence_value
      data.userPwd="123456"
      let res = await User.create(data)
      ctx.body = util.succeed(res, "用户创建成功成功")
    }
  } catch (error) {
    ctx.body = util.fail(error)
  }
})

module.exports = router