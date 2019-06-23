const userModel = require("../modules/user"); //用户数据操作层 ，应该通过服务层调用，此处穿透了
const userService = require("../service/user"); //用户服务层
const operFile = require("../util/operFile");  //文件工具类 ，如需进行较多校验或是数据处理，应在service层进行数据处理后调用



class articleController {
    
	/**
	* 用户登录
	*/
	static async login(ctx){
		let userPost = ctx.request.body; 
		if(userPost.username){ 
			let data = await userService.login(userPost); 
			ctx.response.status = 200;
			ctx.body = {
				code:data.code,
				msg:data.msg,
				data:data.data
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
     * 用户注册
     */
    static async create(ctx){
        //接收客服端
        let req = ctx.request.body; 
        if(req.username && req.password){//符合条件调用service进行注册
			let logindata = await userService.create(req); 
			ctx.response.status = 200;
			ctx.body = logindata;
        }else { 
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            }
        }
    }
	/**
     * 修改密码
     */
    static async setPass(ctx){
        //接收客服端
        let req = ctx.request.body; 
        if(req.user_id&&req.user_name && req.user_password&& req.new_password){
			let logindata = await userService.setPass(req); 
			ctx.response.status = 200;
			ctx.body = logindata;
        }else { 
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            }
        }
    }

    
	/**
	* 获取用户简介
	*/
	static async getUserinfo(ctx){
	 	let userPost = ctx.query;//get接口中需要使用query对象 ，request获取post接口中的参数
		//console.log(userPost)
	 	if(userPost.user_id){
	 		try{ 
	 			let data = await userModel.getUser(userPost.user_id);
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
	* 获取用户详情
	*/
	static async getUserDetail(ctx){
		let userPost = ctx.query; 
		if(userPost.user_id){
			try{ 
				let data = await userModel.UserDetail(userPost.user_id);
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
	 * 修改用户信息
	 */
	 static async setUserDetail(ctx){
	 	let userPost = ctx.request.body; 
	 	if(userPost.user_id){
	 		try{ 
	 			let data = await userModel.setUser(userPost);
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
	* 修改用户头像
	*/
	static  setUserphoto(ctx){
		//let userPost = ctx.request.body; 
		const file = ctx.request.files.file; // 获取上传文件
		/*
		let json= operFile.uploadFile(file,'upload');
		ctx.body=json 
		*/
	   operFile.uploadFile(file,'upload').then(res=>{
		   ctx.body={
			   code:200,
			   msg:'上传成功',
			   data:res
		   }
	   }).catch(err=>{
		   ctx.body={
			   code:412,
				msg:'上传失败'
			 }
	   })
		 
	}
}

module.exports = articleController;