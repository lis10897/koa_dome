// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const Article = Sequelize.import('../schema/article'); 
//Article.sync({force: false}); //自动创建表

class ArticleModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    static async createArticle(data){
        return await Article.create({
            article_title: data.article_title, //标题
            user_id: data.user_id,  //作者
						author:data.author,
            article_content: data.article_content,  //文章内容 
        });
    }
    /**
     * 修改文章模型
     * @param data
     * @returns {Promise<*>}
     */
    static async updateArticlel(data){
        return await Article.update({
            article_title: data.article_title, //标题
            author: data.author,  //作者
            article_comment_count: data.article_comment_count,  //文章内容
        },{
					where:{ 
						'artcile_id':data.artcile_id
					},
				}
				
				);
    } 
	/**
	* 查询文章列表
	* @param  user_id
	* @returns {Promise<Model>}
	*/
	static async articleList(user_id){ 
		return await Article.findAll({
			attributes: ['article_id','user_id', 'article_title','author','article_content','article_updated'],
			where:{ 
				user_id
			},  
		}) ;
	} 
	/**
	 * 查询文章的详情
	 * @param article_id
	 * @returns {Promise<Model>}
	 */
	static async articleDetail(article_id){
		return await Article.findAll({
			where:{
					article_id
			}
		});
	}
	/**
	* 删除文章
	* @param article_id
	* @returns {Promise<Model>}
	*/
	static async articleRemove(data){
			return await Article.destroy({
					where:{
							'article_id':data.article_id
					}
			});
	}
	
}

module.exports = ArticleModel;