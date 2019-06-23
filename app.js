const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors')
const koaBody = require('koa-body')
const koaSession = require('koa-session')
const sessionConfig = require('./config/session')

const index = require('./routes/index')
const users = require('./routes/users')
const article = require('./routes/article')

//session 
app.keys = ['some secret hurr'];
app.use(koaSession(sessionConfig, app));
//


// error handler
onerror(app)
//*获取请求中文件
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024  // 设置上传文件大小最大限制，默认2M
    }
}));
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
//cors
app.use(cors())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  //console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(article.routes(), article.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

//默认为3000 端口
//app.listen(3007); 
//console.log('server run at http://localhost:3008/')

module.exports = app
