'use strict';
const jwt = require('jsonwebtoken');
// eslint-disable-next-line no-unused-vars
module.exports = opt => {
  // 要注意方法的名字
  return async function checkToken(ctx, next) {
    // 获取请求体  从请求头中获取
    const header = ctx.request.headers;
    // 如果请求头中有token
    // eslint-disable-next-line dot-notation
    if (header['authorization']) {
      // 获取token值
      const token = header.authorization.split(' ')[1];
      // 用于接收token解码后的值
      try {
        // 如果token正常
        await jwt.verify(token, opt.secret); // 秘钥在opt中
        await next();
      } catch (error) {
        console.log(error)
        // 如果token过期
        ctx.status = 401;
        if (error.name === 'TokenExpiredError') {
          ctx.body = {
            code: 1,
            msg: 'token过期，请重新登录',
          };
        } else {
          // 如果token无效
          ctx.body = {
            code: 2,
            msg: 'token无效，请重新登录',
          };
        }
      }
    } else {
      // 如果没有token
      ctx.status = 401;
      ctx.body = {
        code: 3,
        msg: '未获取到token,请登录',
      };
    }
  };
};
