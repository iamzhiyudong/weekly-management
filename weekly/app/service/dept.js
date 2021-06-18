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
  async getDeptUserInfo(user) {
    const str = `select * from user, dept where user.user_department_id = dept.dept_id and
    user_id = '${user.user_id}'
    and user_is_admin = '${user.user_is_admin}'`;
    return await this.app.mysql.query(str);
  }
}

module.exports = UserService;
