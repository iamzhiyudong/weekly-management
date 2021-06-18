'use strict';
const Service = require('egg').Service;

class DeptService extends Service {
  // 获取当前部门信息
  async getDeptInfo(dept_id) {
    return await this.app.mysql.query(`select * from dept where dept_id = '${dept_id}'`);
  }
  // 删除部门
  async delDept(dept_id) {
    const result = await this.app.mysql.query('delete from dept where dept_id = ?', dept_id);
    return result;
  }
  // 添加部门
  async addDept(dept) {
    const result = await this.app.mysql.insert('dept', {
      ...dept,
    });
    return result;
  }
  // 查找部门
  async getDept(dept_parent_id) {
    let str;
    if (dept_parent_id == null) {
      str = 'select * from dept where dept_parent_id is NUll';
    } else {
      str = `select * from dept where dept_parent_id = '${dept_parent_id}'`;
    }
    const result = await this.app.mysql.query(str);
    return result;
  }
  // 获取除了管理员的部门菜单列表
  async getDeptMenu(dept_id) {
    // const str = `select * from dept where dept_id <> ${dept_id} and dept_id <> 4`;
    const str = 'select * from dept where dept_id and dept_id <> 4';
    return await this.app.mysql.query(str);
  }
  // 修改用户表中上级部门信息
  async updateUserDept(info) {
    const str = `update user 
    set user_up_department_id = '${info.dept_parent_id}'
    where user_is_admin = '1' and
    user_department_id = '${info.dept_id}'`;
    return await this.app.mysql.query(str);
  }
  // 修改用户表中上级部门信息
  async updateDept(info) {
    const str = `update dept 
    set dept_name = '${info.dept_name}'
    ,dept_parent_id = '${info.dept_parent_id}'
    where dept_id = '${info.dept_id}'`;
    return await this.app.mysql.query(str);
  }
}

module.exports = DeptService;
