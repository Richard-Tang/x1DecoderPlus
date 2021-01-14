/**
 * x1_xor_encoder_plus
 * Create at: 2020/11/19 17:07:35
 * Modify at: 2021/01/12 20:54:35
 * Author: Xiaopan233
 * Author: RichardTang
 */
'use strict';

let number = 2; // XOR次数
function encode(str) {
	var res = "";
	str = btoa(str);
	for (var i = 0; i < str.length; i++) {
		res += ((str[i].charCodeAt() ^ number) + '/')
	}
	return res;
}

module.exports = (pwd, data, ext={}) => {
	for(let i in data) {
		data[i] = encode(data[i]);
	}
	data[pwd] = data['_'];
	delete data['_'];
	return data;
}