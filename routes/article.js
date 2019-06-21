const Router = require('koa-router');
const ArtileController = require('../controllers/article');

const router = new Router({
  prefix: '/api/article'
});

/**
 * 文章接口
 */
//创建文章 create
router.post('/create',ArtileController.create);

//修改博文/audit
router.post('/audit',ArtileController.audit);

//查询博文列表/articleList
router.get('/articleList',ArtileController.articleList);

//查询博文详情/articleDetail
router.get('/articleDetail',ArtileController.articleDetail)

//删除博文/articleRemove
router.post('/articleRemove',ArtileController.articleRemove)


module.exports = router