const moment = require("moment");
module.exports = function(sequelize,DataTypes){
    return sequelize.define('zj_articles',{
        article_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            //allowNull: true,
            autoIncrement: true
        },
		//文章所属用户ID
		user_id:{
            type: DataTypes.STRING,
            //allowNull: false,
            field: 'user_id'
        },
        //文章标题
        article_title:{
            type: DataTypes.STRING,
            //allowNull: false,
            field: 'article_title'
        },
        //文章内容
        article_content:{
            type: DataTypes.STRING,
            //allowNull: false,
            field: 'article_content'
        },
        //作者
        author:{
            type: DataTypes.STRING,
            //allowNull: false,
            field: 'author'
        },
        //评论总数
        article_comment_count:{
            type: DataTypes.INTEGER,
			defaultValue:'0',
            //allowNull: false,
            field:'article_comment_count'
        },
        //文章分类
        article_views:{
            type: DataTypes.STRING,
            //allowNull: false,
            field: 'article_views'
        },
        //文章点赞
        article_like_count:{
            type: DataTypes.INTEGER,
			defaultValue:'0',
            //allowNull: false,
            field: 'article_like_count'
        },
        // 创建时间
        article_date:{
			defaultValue:new Date(),
            type: DataTypes.DATE
        },
        // 更新时间
        article_updated:{
			defaultValue:new Date(),
            type: DataTypes.DATE
        }
    },{
        /**
         * 如果为true，则表示名称和model相同，即user
         * 如果为fasle，mysql创建的表名称会是复数，即users
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: true,
		
		timestamps: false
    });
}