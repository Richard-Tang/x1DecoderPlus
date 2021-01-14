/**
 * x1_xor_decoder_plus
 * Create at: 2020/11/19 17:07:35
 * Modify at: 2021/01/12 20:54:35
 * Author: Xiaopan233
 * Author: RichardTang
 */
'use strict';

let number = 2; // XOR次数
function decode(data) {	
	var res = '';
	var s = data.toString().split("/")
	for(var i in s){
		if(i == "unique"){
			break
		}
		res += String.fromCharCode(s[i] ^ number)
	}
	return atob(res);
}

module.exports = {
	asoutput: () => {
		return `
			function asenc($out){
				$number=2;
				$res = '';
				$out = base64_encode($out);
				for ($i=0; $i < strlen($out); $i++) { 
				  $res .= ord($out[$i])^$number;
				  $res .= '/';
				}
				return rtrim($res,'/'); 
			}
		`.replace(/\n\s+/g, '');
	},
	decode_buff: (data, ext={}) => {
		return decode(data);
	}
}