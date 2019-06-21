const ArticleModel = require("../modules/article");

class articleController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客服端
        let req = ctx.request.body;  
        if(req.article_title  && req.article_content ){
			
            try{
                //创建文章模型
                const ret = await ArticleModel.createArticle(req);
                //使用刚刚创建的文章ID查询文章详情，且返回文章详情信息
                //const data = await ArticleModel.getArticleDetail(ret.id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '创建文章成功',
                    //data
                }
            }catch(err){ 
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '创建文章失败',
                    data: err
                }
            }
        }else {
			
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '参数不齐全'
            }
        }
    }

    /**
     * 修改博文 
     */
    static async audit(ctx){
        let params = ctx.request.body;
        if(params.article_id&&params.article_title&&params.article_comment_count){
            try{ 
                let data = await ArticleModel.updateArticlel(params);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '修改成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '参数不齐'
            }
        }
    }
	/**
	* 获取文章列表
	*/
	static async articleList(ctx){
		let param = ctx.query; 
		//let name='lis'
		if(param.user_id){
			try{ 
				let data = await ArticleModel.articleList(param.user_id);
				if(!data||data.length<1){
					ctx.response.status = 200;
					ctx.body = {
						code: 200,
						msg: '查询成功',
						data:[]
					}
				}else{
					ctx.response.status = 200;
					ctx.body = {
						code: 200,
						msg: '查询成功',
						data
					}
				}
				
			}catch(err){
				ctx.response.status = 412;
				ctx.body = {
					code: 412,
					msg: '查询失败',
					err
				}
			}
		}else {
			ctx.response.status = 416;
			ctx.body = {
				code: 416,
				msg: '参数不齐'
			}
		}
	}
	/**
	* 获取文章详情
	*/
	static async articleDetail(ctx){
		let param = ctx.query; 
		
		if(param.article_id){
			 
			try{ 
				let data = await ArticleModel.articleDetail(param.article_id);
				ctx.response.status = 200;
				ctx.body = {
					code: 200,
					msg: '查询成功',
					data
				}
			}catch(err){
				ctx.response.status = 412;
				ctx.body = {
					code: 412,
					msg: '查询失败',
					err
				}
			}
		}else {
			ctx.response.status = 416;
			ctx.body = {
				code: 416,
				msg: '参数不齐'
			}
		}
	}
	/**
	* 删除文章
	*/
	static async articleRemove(ctx){
		let param = ctx.request.body; 
		if(param.article_id&&param.user_id){
			try{ 
				let data = await ArticleModel.articleRemove(param);
				ctx.response.status = 200;
				ctx.body = {
					code: 200,
					msg: '操作成功',
					data
				}
			}catch(err){
				ctx.response.status = 412;
				ctx.body = {
					code: 412,
					msg: '操作失败',
					err
				}
			}
		}else {
			ctx.response.status = 416;
			ctx.body = {
				code: 416,
				msg: '参数不齐'
			}
		}
	}
	 
}

module.exports = articleController;