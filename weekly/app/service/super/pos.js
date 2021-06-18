'use strict';
const Service = require('egg').Service;

class PosService extends Service {
  // 删除职位
  async delPos(pos_id) {
    const result = await this.app.mysql.query('delete from position where pos_id = ?', pos_id);
    return result;
  }
  // 添加职位
  async addPos(pos_name) {
    const result = await this.app.mysql.insert('position', {
      pos_name,
    });
    return result;
  }
  // 修改职位
  async updatePos(pos_id, pos_name) {
    const str = `update position set pos_name = '${pos_name}' where pos_id = '${pos_id}'`;
    const result = await this.app.mysql.query(str);
    return result;
  }
}

module.exports = PosService;
