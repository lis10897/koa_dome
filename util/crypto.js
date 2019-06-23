var crypto=require("crypto"); 

class cryptoModule {
	static digest(req){
		let shasum=crypto.createHash('sha1');
		shasum.update(req) 
		return shasum.digest('hex')
	} 
}

module.exports = cryptoModule;