'use strict';

let k = 99;

function decode(data) {
  var res = "";
  var str = Buffer.from(data , 'base64').toString().split("/");
  
  if(str[str.length - 1] === "") {
	  str.pop();
  }
  
  for(var i in str) {
    res += String.fromCharCode(str[i] ^ k);
  }
  return Buffer.from(res , 'base64');
}

module.exports = {
  asoutput: () => {
	return ``.replace(/\n\s+/g, '');
  },
  decode_buff: (buff) => {
	var result = "";
	var strBuff = buff.toString().replace(/[\r\n]/g,"");
	if(strBuff.indexOf("@") != -1) {
		var strArr = strBuff.split("@");
		strArr.pop();
		for(var i = 0; i < strArr.length; i++) {
			result += (decode(strArr[i]) + "\r\n");
		}
	} else {
		result = decode(buff.toString());
	}
	return result;
  }
}