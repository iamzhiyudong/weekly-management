'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 根据用户的账号查找用户
   * @param {string} account 用户的账号
   */
  async find(account) {
    const user = await this.app.mysql.query('select * from user where user_account = ?', account);
    return user;
  }
  /**
   * 获取本部门除了经理的其他人
   * @param {number} dept_id 用户的部门ID
   */
  async findSameDeptUser(dept_id) {
    const user = await this.app.mysql.query("select * from user where user_department_id = ? and user_is_admin = '0'", dept_id);
    return user;
  }
  /**
   * 获取下级部门经理
   * @param {number} dept_id 用户的部门ID
   */
  async findDownDeptUser(dept_id) {
    const user = await this.app.mysql.query("select * from user where user_up_department_id = ? and user_is_admin = '1'", dept_id);
    return user;
  }
  /**
   * 获取本部门除了经理的其他人
   * @param {number} dept_id 用户的部门ID
   */
  async findSameDeptUserInfo(dept_id) {
    const user = await this.app.mysql.query("select * from user, dept, position where user_department_id = ? and user_is_admin = '0' and dept.dept_id = user.user_department_id and user.user_position_id = position.pos_id", dept_id);
    return user;
  }
  /**
   * 获取下级部门经理
   * @param {number} dept_id 用户的部门ID
   */
  async findDownDeptUserInfo(dept_id) {
    const user = await this.app.mysql.query("select * from user, dept, position where user_up_department_id = ? and user_is_admin = '1' and dept.dept_id = user.user_department_id and user.user_position_id = position.pos_id", dept_id);
    return user;
  }
  /**
   * 获取用户信息
   * @param {object} user_info token中的用户信息，主要是用户的ID
   */
  async getUserInfo(user_info) {
    const str = `
    select * from user, dept, position 
    where dept.dept_id = user.user_department_id 
    and user.user_position_id = position.pos_id 
    and user.user_id = '${user_info.user_id}'
    `;
    const result = await this.app.mysql.query(str);
    return result;
  }
  // eslint-disable-next-line jsdoc/require-param
  /**
   * 根据用户id修改用户信息
   */
  async updateUserInfo(user_id, data) {
    try {
      const options = {
        where: {
          user_id,
        },
      };
      const result = await this.app.mysql.update('user', data, options);
      return result;
    } catch (e) {
      return e.toString();
    }
  }
  /**
   * 修改密码
   */
  async updatePwd(user_id, pwd) {
    try {
      const opt = {
        where: {
          user_id,
        },
      };
      const result = this.app.mysql.update('user', { user_pwd: pwd }, opt);
      return result;
    } catch (e) {
      return e.toString();
    }
  }
}

module.exports = UserService;
