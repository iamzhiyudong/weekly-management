/* eslint-disable eqeqeq */
'use strict';

const Controller = require('egg').Controller;
// const { getUserInfoGet } = require('../../utils/token_info');
class DeptController extends Controller {
  async getDeptInfo() {
    const result = await this.ctx.service.admin.dept.getDeptInfo();
    // 除去管理员
    for (let i = 0; i < result.length; i++) {
      if (result[i].dept_name == '管理员') {
        result.splice(i, 1);
        break;
      }
    }
    this.ctx.body = {
      code: '0',
      msg: '获取部门信息成功',
      data: result,
    };
  }
}
module.exports = DeptController;
