'use strict';

let k = 99;

function decode(data) {
  var res = "";
  var str = Buffer.from(data , 'base64').toString().split("|");
  for(var i in str) {
    res += String.fromCharCode(str[i] ^ k);
  }
  return Buffer.from(res , 'base64');
}

module.exports = {
  decode_buff: (data, ext={}) => {
    return decode(data.toString());
  }
}