'use strict';
const Service = require('egg').Service;

class PositionService extends Service {
  /**
   * 根据职位名获取职位ID
   * @param {string} pos_name 职位名称
   */
  async getPosId(pos_name) {
    const result = await this.app.mysql.query('select pos_id from position where pos_name = ?', pos_name);
    return result;
  }
  /**
   * 获取职位信息
   */
  async getPosInfo() {
    const result = await this.app.mysql.query('select * from position');
    return result;
  }
}

module.exports = PositionService;
