const userModel = require("../modules/user");

const consoleFun=require("../util/crypto");

const consoleFun=require("../util/crypto");

const token = require("../util/token");  //token工具类

class userService {
	/**
	* 用户登录
	*/
	static async login(req){
		//接收客服端 
		let json = {}
		try{ 
			let data = await userModel.selectUser(req.username);
			if(data&&data.length==1&&consoleFun.digest(req.password)==data[0].user_password){ 
				data[0].token=token.getToken({user_id:data[0].user.id})
				json.code=200,
				json.msg='登录成功'
				json.data=data
			}else if(data&&data.length>1){
				json.code=411
				json.msg='账号数据异常'
			}else{ 
				json.code=411
				json.msg='用户名或密码不正确'
			}
		}catch(err){
				json.code= 412
				json.msg='查询失败'
				json.data=err 
		}
		return json
		
	}
	/**
     * 用户注册
     */
    static async create(req){
        //接收客服端 
		let json = {}
		try{ 
			let logindata = await userModel.selectUser(req.username); 
			if(!logindata||logindata.length>0){
				json.code=412
				json.msg='注册失败，用户名已存在'
			}else{
				//创建模型
				let res = await userModel.createUser(req);
				//使用刚刚创建的文章ID查询文章详情，且返回文章详情信息
				let data = await userModel.getUser(res.user_id); 
				json.code=200,
				json.msg='注册成功'
				json.data=data
				 
			} 
		}catch(err){ 
			json.code= 500,
			json.msg= '注册失败'
		   // json.data=err
		}
		return json 
    }
	
	/**
	* 用户注册
	*/
	static async setPass(req){
		//接收客服端  
		let json = {}
		
		try{ 
			let data = await userModel.selectUser(req.user_name); 
			if(data&&data.length==1&&req.user_password==data[0].user_password&&req.user_id==data[0].user_id){
				let new_password=consoleFun.digest(req.new_password)
				
				let info={
					user_id:data[0].user_id,
					user_password:new_password
				}
				let setData = await userModel.setUser(info); 
				if(setData){
					
					json.code=200
					json.msg='修改成功'
				}else{ 
					json.code=411
					json.msg='修改失败' 
				}
				
			}else{ 
				json.code=412,
				json.msg='操作失败,账号数据不匹配' 
				
			} 
		}catch(err){ 
			json.code= 500,
			json.msg= '操作失败'
			json.data=err
		}
		return json 
	}
}

module.exports = userService;