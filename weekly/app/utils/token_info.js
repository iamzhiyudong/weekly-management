'use strict';
const jwt = require('jsonwebtoken');
/**
 * 解析get请求头部的token
 * @param {this} that 调用环境的this
 * @param {object} header 请求头信息
 */
async function getUserInfoGet(that, header) {
  // 获取token
  const token = header.authorization.split(' ')[1];
  // 解码token
  const decode_token = await jwt.verify(token, that.config.jwt.secret);
  return decode_token;
}

module.exports = {
  getUserInfoGet,
};
