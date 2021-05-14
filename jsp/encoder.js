'use strict';

let k = 99;

function encode(data) {
  var res = "";
  for (var i = 0; i < data.length; i++) {
    res += ((data[i].charCodeAt() ^ k) + '|');
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