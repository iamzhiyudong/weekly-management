'use strict';
const Controller = require('egg').Controller;
const { getUserInfoGet } = require('../../utils/token_info');
const { Recursive, RecursiveRemove } = require('../../utils/recursive');

class SuperPosController extends Controller {
  /**
   * 删除部门
   */
  async delDept() {
    const { ctx } = this;
    const param = ctx.query;
    await RecursiveRemove(this, param.dept_id);
    await this.ctx.service.super.dept.delDept(param.dept_id);
    ctx.body = {
      code: 0,
      msg: '删除成功',
    };
  }
  /**
   * 添加部门
   */
  async addDept() {
    const { ctx } = this;
    const param = ctx.query;
    const result = await ctx.service.super.dept.addDept(param);
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 0,
        msg: '添加部门成功',
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '添加部门失败',
      };
    }
  }
  /**
   * 获取部门
   */
  async getDept() {
    const { ctx } = this;
    // 获取一级
    // const frist = await ctx.service.super.dept.getDept(null);
    const res = await Recursive(this, null);
    ctx.body = {
      code: 0,
      msg: '获取树形结构成功',
      data: res,
    };
  }
  /**
  * 修改部门
  */
  async updateDept() {
    const { ctx } = this;
    const param = ctx.query;
    // 先修改部门信息
    const res = await ctx.service.super.dept.updateDept(param);
    if (res.affectedRows === 1) {
      // 再修改用户表中的上级信息
      await ctx.service.super.dept.updateUserDept(param);
      ctx.body = {
        code: 0,
        msg: '修改部门成功',
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '修改部门失败',
      };
    }
  }
  /**
   * 获取部门菜单列表
   */
  async getDeptMenu() {
    const { ctx } = this;
    const param = ctx.query;
    const result = await ctx.service.super.dept.getDeptMenu(param.dept_id);
    ctx.body = {
      code: 0,
      msg: '修改部门成功',
      data: result,
    };
  }
}

module.exports = SuperPosController;
