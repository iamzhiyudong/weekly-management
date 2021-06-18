/* eslint-disable eqeqeq */
'use strict';

const Controller = require('egg').Controller;
const { getUserInfoGet } = require('../utils/token_info');
class User extends Controller {
  /**
   * 获取用户信息
   */
  async getUserInfo() {
    const { ctx } = this;
    const user_info = await getUserInfoGet(this, ctx.request.header);
    const result = await ctx.service.user.getUserInfo(user_info);
    ctx.body = {
      code: 0,
      msg: '获取个人信息成功',
      data: {
        ...result,
      },
    };
  }
  // 修改用户信息
  async updateUserInfo() {
    const { ctx } = this;
    const queryData = ctx.request.body;
    const user_info = await getUserInfoGet(this, ctx.request.header);
    // 管理员登录
    if (user_info.user_account == '00' && user_info.user_name == 'admin' && user_info.user_is_admin == '1') {
      // 修改部门等信息
    } else {
      // 修改基本信息
      const result = await ctx.service.user.updateUserInfo(user_info.user_id, queryData);
      if (result.affectedRows === 1) {
        ctx.body = {
          code: 0,
          msg: '更新成功',
        };
      } else {
        ctx.body = {
          code: 1,
          msg: '更新失败',
        };
      }
    }
  }
  /**
   * 修改密码
   */
  async updatePwd() {
    const { ctx } = this;
    const user = await getUserInfoGet(this, ctx.request.header);
    // 获取请求数据post
    const params = ctx.request.body;
    const result = await ctx.service.user.updatePwd(user.user_id, params.pwd);
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 0,
        msg: '更新成功',
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '更新失败',
      };
    }
  }
}
module.exports = User;
