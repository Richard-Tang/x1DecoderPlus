'use strict';

let k = 99;

function decode(data) {	
	var res = '';
	var s = atob(data.toString()).split("/")
	for(var i in s){
		if(i == "unique"){
			break;
		}
		res += String.fromCharCode(s[i] ^ k)
	}
	return atob(res);
}

module.exports = {
	asoutput: () => {
		return `
			function asenc($out){
				$k=99;
				$res = '';
				$out = base64_encode($out);
				for ($i=0; $i < strlen($out); $i++) { 
				  $res .= ord($out[$i]) ^ $k;
				  $res .= '/';
				}
				$res = base64_encode(rtrim($res,'/'));
				return $res; 
			}
		`.replace(/\n\s+/g, '');
	},
	decode_buff: (data, ext={}) => {
		return decode(data);
	}
}
