/* eslint-disable eqeqeq */
'use strict';
const Controller = require('egg').Controller;
const { getUserInfoGet } = require('../../utils/token_info');

class SuperPosController extends Controller {
  /**
   * 获取所有人
   */
  async getUser() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      msg: '获取所有人列表成功',
      data: await ctx.service.super.user.getUser(),
    };
  }
  /**
   * 删除人
   */
  async delUser() {
    const { ctx } = this;
    const param = ctx.query;
    const result = await ctx.service.super.user.delUser(param.user_id);
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 0,
        msg: '删除人成功',
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '删除人失败',
      };
    }
  }
  /**
   * 添加人
   */
  async addUser() {
    const { ctx } = this;
    const param = ctx.query;
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
        // 判断是不是设置为管理员
        if (param.user_is_admin == '1') {
          // 管理员
          // 查看他的上级部门ID
          const dept_info = await ctx.service.super.dept.getDeptInfo(param.user_department_id);
          // 如果有上级的话
          if (dept_info[0].dept_parent_id != '0') {
            param.user_up_department_id = dept_info[0].dept_parent_id;
          }
          const result = await ctx.service.super.user.addUser(param);
          if (result.affectedRows === 1) {
            ctx.body = {
              code: 0,
              msg: '添加人成功',
            };
          } else {
            ctx.body = {
              code: 1,
              msg: '添加人失败',
            };
          }
        } else {
          const result = await ctx.service.super.user.addUser(param);
          if (result.affectedRows === 1) {
            ctx.body = {
              code: 0,
              msg: '添加人成功',
            };
          } else {
            ctx.body = {
              code: 1,
              msg: '添加人失败',
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
  * 修改人
  */
  async updateUser() {
    const { ctx } = this;
    const param = ctx.query;
    // 处理账号重复
    if (param.user_account) {
      const account = await ctx.service.admin.user.find(param.user_account);
      if (account.length > 0 && account[0].user_id != param.user_id) {
        ctx.body = {
          code: 1,
          msg: '此账号已存在',
        };
      } else {
        // 账号没有重复
        // 判断是不是设置为管理员
        if (param.user_is_admin == '1') {
          // 管理员
          // 查看他的上级部门ID
          const dept_info = await ctx.service.super.dept.getDeptInfo(param.user_department_id);
          // 如果有上级的话
          if (dept_info[0].dept_parent_id != '0') {
            param.user_up_department_id = dept_info[0].dept_parent_id;
          }
          const result = await ctx.service.super.user.updateUser(param);
          if (result.affectedRows === 1) {
            ctx.body = {
              code: 0,
              msg: '修改人成功',
            };
          } else {
            ctx.body = {
              code: 1,
              msg: '修改人失败',
            };
          }
        } else {
          const result = await ctx.service.super.user.updateUser(param);
          if (result.affectedRows === 1) {
            ctx.body = {
              code: 0,
              msg: '修改人成功',
            };
          } else {
            ctx.body = {
              code: 1,
              msg: '修改人失败',
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
}

module.exports = SuperPosController;
