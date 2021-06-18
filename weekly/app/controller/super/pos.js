'use strict';
const Controller = require('egg').Controller;
const { getUserInfoGet } = require('../../utils/token_info');

class SuperPosController extends Controller {
  /**
   * 删除职位
   */
  async delPosList() {
    const { ctx } = this;
    const param = ctx.query;
    const result = await ctx.service.super.pos.delPos(param.pos_id);
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 0,
        msg: '删除职位成功',
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '删除职位失败',
      };
    }
  }
  /**
   * 添加职位
   */
  async addPosList() {
    const { ctx } = this;
    const param = ctx.query;
    const result = await ctx.service.super.pos.addPos(param.pos_name);
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 0,
        msg: '添加职位成功',
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '添加职位失败',
      };
    }
  }
  /**
  * 修改职位
  */
  async updatePosList() {
    const { ctx } = this;
    const param = ctx.query;
    const result = await ctx.service.super.pos.updatePos(param.pos_id, param.pos_name);
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 0,
        msg: '修改职位成功',
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '修改职位失败',
      };
    }
  }
}

module.exports = SuperPosController;
