'use strict';

let k = 99;

function encode(str) {
	var res = "";
	str = btoa(str);
	for (var i = 0; i < str.length; i++) {
		res += ((str[i].charCodeAt() ^ k) + '/')
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
