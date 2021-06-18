/* eslint-disable eqeqeq */
'use strict';

const Controller = require('egg').Controller;
class PosController extends Controller {
  async getPosInfo() {
    const result = await this.ctx.service.admin.position.getPosInfo();
    // 除去管理员
    for (let i = 0; i < result.length; i++) {
      if (result[i].pos_name == '管理员') {
        result.splice(i, 1);
        break;
      }
    }
    this.ctx.body = {
      code: '0',
      msg: '获取职位信息成功',
      data: result,
    };
  }
}
module.exports = PosController;
