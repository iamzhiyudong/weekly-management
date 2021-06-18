'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    // 接收用户传过来的参数
    const { account, pwd } = ctx.request.body;
    // 根据手机号参数查询是否存在此用户
    const user = await ctx.service.user.find(account);
    // 如果用匹配的用户  判断密码是否正确
    if (user.length > 0) {
      // 如果密码正确
      if (pwd === user[0].user_pwd) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          token: await this.getToken(user[0]),
        };
      } else { // 密码不正确
        ctx.body = {
          code: 1,
          msg: '用户名或密码错误',
        };
      }

    } else { // 如果没有匹配的用户
      ctx.body = {
        code: 2,
        msg: '此用户未注册',
      };
    }
  }

  /**
   * 用户登录成功后获取token
   * @param {string} user 用于获取token的用户信息
   */
  async getToken(user) {
    const token = this.app.jwt.sign({
      ...user,
    }, this.config.jwt.secret, {
      expiresIn: 60 * 60 * 24,
    });
    return token;
  }
}

module.exports = LoginController;
