const userModel = require("../modules/user");

const crypto=require("../util/crypto"); 

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
			if(data&&data.length==1&&crypto.digest(req.password)==data[0].user_password){ //判断用户的存在 密码
				let user={
					"user_name": data[0].user_name,
					//"user_id":data[0].user_id,
					"user_nickname":data[0].user_nickname,
					"token":token.getToken({user_id:data[0].user_id})//写入新token
				}
				json.code=200,
				json.msg='登录成功'
				json.data=user
				
				//json.
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
	static async setPass(req,userToken){
		//接收客服端  
		let json = {}
		let tokenPram=token.verifyToken(userToken)
		if(tokenPram.status!==1){
			json.code=411
			json.msg='登录状态异常' 
			return json
		}
		try{ 
			let data = await userModel.selectUser(req.user_name); 
			let old_password=crypto.digest(req.user_password)
			if(data&&data.length==1&&old_password==data[0].user_password&&tokenPram.data.user_id==data[0].user_id){

				let info={
					user_id:tokenPram.data.user_id,
					user_password:crypto.digest(req.new_password)
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