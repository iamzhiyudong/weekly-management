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
   * 删除人员
   * @param {number} user_id 用户的部门ID
   */
  async deleteUser(user_id) {
    const user = await this.app.mysql.query('delete from user where user_id = ?', user_id);
    return user;
  }
  /**
   * 添加人员
   * @param {object} user_info 传递的基本信息
   * @param {number} dept_id 部门ID
   * @param {number} pos_id 职位id
   */
  async addUser(user_info, dept_id, pos_id) {
    const str = `
    INSERT into user (user_name, user_account, user_phone,user_sex,user_pwd,user_department_id,user_position_id,user_is_admin)
    VALUES ('${user_info.user_name}','${user_info.user_account}','${user_info.user_phone}','${user_info.user_sex}'
    ,'${user_info.user_pwd}','${dept_id}','${pos_id}', '0')
    `;
    const user = await this.app.mysql.query(str);
    return user;
  }
}

module.exports = UserService;
