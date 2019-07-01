const jwt = require('jsonwebtoken'); 
const secretKey='lee'; //秘钥
class  jwtModule{
	static  getToken(data){//生成token 
		//let cert = fs.readFileSync(path.join(__dirname, '../config/rsa_private_key.pem'));//私钥
		let token = jwt.sign(
			data, 
			secretKey,
			{  
				expiresIn: 60*60*1  // 1小时过期
			}
		); 
		return token;
	}
	 
	//验证token,最后的res。
	 
	static verifyToken(token){//验证token
		//console.log('进入验证');
		//let cert = fs.readFileSync(path.join(__dirname, '../config/rsa_public_key.pem'));//公钥
		//console.log(secretKey);
		let res={'status':0}
		if(!token){return res}
		try{
			jwt.verify(token, secretKey, function (err, decode,a,b) {
								 
                if (err) {  //  时间失效的时候/ 伪造的token          
                   // res.status=0      默认为0；不需要做赋值
                } else {
                    res.status=1
										res.data=decode
                }
            }) 
		}catch(e){
			console.log(e);
		}
		return res;
	}
}
module.exports =jwtModule;

//token模块  包含token的加密和解密、校验