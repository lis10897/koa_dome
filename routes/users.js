const router = require('koa-router')()
const userController = require('../controllers/user');

router.prefix('/api/users') 

//用户登录
router.post('/login',userController.login)

//注册/created
router.post('/create',userController.create)

//修改密码/setPass
router.post('/setPass',userController.setPass)

//用户信息/getUserinfo
router.get('/getUserinfo',userController.getUserinfo)

//用户详细信息/getUserDetail
router.get('/getUserDetail',userController.getUserDetail)

//用户信息修改/setUserDetail
router.post('/setUserDetail',userController.setUserDetail)
 
 //用户信息修改/setUserphoto
 router.post('/setUserphoto',userController.setUserphoto)


 

module.exports = router
