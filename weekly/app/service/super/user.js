'use strict';
const Service = require('egg').Service;

class PosService extends Service {
  // 获取所有人
  async getUser() {
    const str = `
    select * from user, position, dept where user.user_position_id = position.pos_id and dept.dept_id = user.user_department_id
    `;
    const result = await this.app.mysql.query(str);
    return result;
  }
  // 删除人
  async delUser(user_id) {
    const result = await this.app.mysql.query('delete from user where user_id = ?', user_id);
    return result;
  }
  // 添加人
  async addUser(user) {
    const result = await this.app.mysql.insert('user', {
      ...user,
    });
    return result;
  }
  // 修改人
  async updateUser(user) {
    const opt = {
      where: {
        user_id: user.user_id,
      },
    };
    const _user = user;
    delete _user.user_id;
    const row = {
      ..._user,
    };
    if (!('user_up_department_id' in _user)) {
      row.user_up_department_id = null;
    }
    const result = await this.app.mysql.update('user', row, opt);
    return result;
  }
}

module.exports = PosService;
