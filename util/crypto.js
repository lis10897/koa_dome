var crypto=require("crypto"); 

class cryptoModule {
	static digest(req){
		let shasum=crypto.createHash('sha1');
		shasum.update(req) 
		return shasum.digest('hex')
	} 
}

module.exports = cryptoModule;
//数据加密模块 ,暂未进行加盐处理