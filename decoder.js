/**
 * x1_xor_decoder_plus
 */
'use strict';

let number = 99; // XOR次数
function decode(data) {	
	var res = '';
	var s = atob(data.toString()).split("/")
	for(var i in s){
		if(i == "unique"){
			break;
		}
		res += String.fromCharCode(s[i] ^ number)
	}
	return atob(res);
}

module.exports = {
	asoutput: () => {
		return `
			function asenc($out){
				$number=99;
				$res = '';
				$out = base64_encode($out);
				for ($i=0; $i < strlen($out); $i++) { 
				  $res .= ord($out[$i]) ^ $number;
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
