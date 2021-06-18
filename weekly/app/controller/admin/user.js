/* eslint-disable eqeqeq */
'use strict';

const Controller = require('egg').Controller;
const { getUserInfoGet } = require('../../utils/token_info');
class User extends Controller {
  /**
   * 获取部门下的人员列表
   */
  async userList() {
    const { ctx } = this;
    const user_info = await getUserInfoGet(this, ctx.request.header);
    // 获取部门的所有人数,不包括经理,包括下级部门的经理
    const all_users_same_dept = await ctx.service.user.findSameDeptUserInfo(user_info.user_department_id);
    const all_users_down_dept = await ctx.service.user.findDownDeptUserInfo(user_info.user_department_id);
    ctx.body = {
      code: 0,
      msg: '获取部门人员列表成功',
      data: all_users_same_dept.concat(all_users_down_dept),
    };
  }
  /**
   * 删除人员
   */
  async del() {
    const { ctx } = this;
    const result = await ctx.service.admin.user.deleteUser(ctx.request.body.user_id);
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 0,
        msg: '删除成功',
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '删除失败',
      };
    }
  }
  /**
  * 添加部门人员
  */
  async addUser() {
    const { ctx } = this;
    const user_info = await getUserInfoGet(this, ctx.request.header);
    const param = ctx.request.body;
    // 处理账号重复
    if (param.user_account) {
      const account = await ctx.service.admin.user.find(param.user_account);
      if (account.length > 0) {
        ctx.body = {
          code: 1,
          msg: '此账号已存在',
        };
      } else {
        // 账号没有重复
        if (param.user_position) {
          const result = await ctx.service.admin.position.getPosId(param.user_position);
          if (result.length > 0) {
            // 职位正确
            const result_add = await ctx.service.admin.user.addUser(param, user_info.user_department_id, result[0].pos_id);
            if (result_add.affectedRows === 1) {
              ctx.body = {
                code: 0,
                msg: '添加成功',
              };
            } else {
              ctx.body = {
                code: 2,
                msg: '添加失败',
              };
            }
          } else {
            ctx.body = {
              code: 1,
              msg: '没有此职位',
            };
          }
        }
      }
    } else {
      ctx.body = {
        code: 1,
        msg: '传递信息不完整',
      };
    }
  }
  /**
    * 获取用户信息
    */
  async getUserInfo() {
    const { ctx } = this;
    const param = ctx.query;
    const result = await ctx.service.user.getUserInfo(param);
    ctx.body = {
      code: 0,
      msg: '获取个人信息成功',
      data: result,
    };
  }
}
module.exports = User;
