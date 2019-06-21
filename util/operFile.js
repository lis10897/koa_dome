const fs = require('fs');

class operFile{
    
	/**
	* 上传文件
	*/
	static async uploadFile(file,url){
		//let userPost = ctx.request.body;  
		
		
		return new Promise((resolve, reject) => {
			const reader = fs.createReadStream(file.path);  // 创建可读流
			const ext = file.name.split('.').pop(); // 获取上传文件扩展名
			let Fpath=`static/${url}/${Math.random().toString()}.${ext}`//文件写入目录 随机文件名
			const upStream = fs.createWriteStream(Fpath); // 创建可写流
			reader.pipe(upStream);  // 可读流通过管道写入可写流
			resolve(Fpath)
		})
		/*
		try{ 
			json.code=200
			json.msg='上传成功'
			json.data={usrl:Fpath} 
			return json
		}catch(err){
			json.code=412
			json.msg='上传失败'
			return json 
		}*/
		
		 
	}
}

module.exports = operFile;