'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
     * 根据用户的ID查找用户
     * @param {string} id 用户的ID
     */
  async find(id) {
    const user = await this.app.mysql.query('select * from dept where dept_admin_id = ?', id);
    return user;
  }
  /**
   * 获取部门信息
   */
  async getDeptInfo() {
    const result = await this.app.mysql.query('select * from dept');
    return result;
  }
}

module.exports = UserService;
