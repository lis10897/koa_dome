var captchapng = require('captchapng');
class captchaClass {
	static get(){
		var code = parseInt(Math.random() * 9000 + 1000);
		 
		var p = new captchapng(120, 42, code);
		p.color(0, 0, 0, 0);
		p.color(80, 80, 80, 255);
		var img = p.getBase64();
		var imgbase64 = new Buffer(img, 'base64');
		return  [imgbase64,code]
	}
}

module.exports = captchaClass;