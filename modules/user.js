// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型 
const user = Sequelize.import('../schema/user');
//user.sync({force: false}); //自动创建表
 
class userModel {
    /**
     * 用户登录模型
     * @param data
     * @returns {Promise<*>}
     */
    static async selectUser(user_name){
				
        return await user.findAll({
					attributes: ['user_name', 'user_password','user_id',"user_nickname"],
					
					where:{ 
						user_name //用户登录名 
					}
        })
    }
	/**
	* 创建用户模型
	* @param data
	* @returns {Promise<*>}
	*/
	static async createUser(data){
			return await user.create({
					user_name: data.username, //用户登录名
					user_password: data.password,  //用户登录密码 
			});
	}
  /**
     * 用户查询模型
     * @param data
     * @returns {Promise<*>}
     */
    static async getUser(user_id){
		
			return await user.findAll({
				attributes:['user_nickname','user_text','user_profile_photo'],
			where:{ 
				user_id //用户登录名 
			}
        })
    }
	/**
	* 用户查询模型
	* @param data
	* @returns {Promise<*>}
	*/
	static async UserDetail(user_id){
		
		return await user.findAll({
			where:{ 
				user_id //用户登录名 
			}
		})
	}
	/**
	* 用户查询模型
	* @param data
	* @returns {Promise<*>}
	*/
	static async setUser(data){ 
		return await user.update(
			data,
			{ 
				'where':{'user_id':data.user_id}
			}
		)
	}

    
	
}

module.exports = userModel;