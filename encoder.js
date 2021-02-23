/**
 * x1_xor_encoder_plus
 */
'use strict';

let number = 99; // XOR次数
function encode(str) {
	var res = "";
	str = btoa(str);
	for (var i = 0; i < str.length; i++) {
		res += ((str[i].charCodeAt() ^ number) + '/')
	}
	return btoa(res);
}

module.exports = (pwd, data, ext={}) => {
	for(let i in data) {
		data[i] = encode(data[i]);
	}
	data[pwd] = data['_'];
	delete data['_'];
	return data;
}
