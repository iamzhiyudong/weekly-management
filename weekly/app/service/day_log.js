'use strict';
const Service = require('egg').Service;

class DayLog extends Service {
  /**
   * 获取同部门人员日志
   * @param {string} date 时间
   * @param {number} dept_id 部门ID
   */
  async getTodayLogSameDept(date, dept_id) {
    const logs = await this.app.mysql.query(`select * from user,day_log where day_create_time like '%${date}%' and user.user_id = day_log.day_user_id and user.user_department_id = '${dept_id}' and user.user_is_admin = '0'`);
    return logs;
  }
  /**
   * 获取下级部门经理日志
   * @param {string} date 时间
   * @param {number} dept_id 部门ID
   */
  async getTodayLogDownDept(date, dept_id) {
    const logs = await this.app.mysql.query(`select * from user,day_log where day_create_time like '%${date}%' and user.user_id = day_log.day_user_id and user.user_up_department_id = '${dept_id}' and user.user_is_admin = '1'`);
    return logs;
  }
  /**
   * 根据用户ID获取历史日志
   * @param {number} user_id 用户ID
   */
  async getDayLogByUserID(user_id) {
    const sql_str = `
    SELECT day_id, day_summery, day_next_day, day_read_status, DATE_FORMAT(day_create_time,'%Y-%m-%d %H:%i:%S') as create_time
    from  day_log
    WHERE day_user_id = ${user_id}
    ORDER BY create_time DESC`;
    const logs = await this.app.mysql.query(sql_str);
    return logs;
  }
  /**
   * 是否可以添加日志
   * @param {number} user_id 用户ID
   * @param {date} time 时间
   */
  async canAdd(user_id, time) {
    try {
      const str = `
      select * from day_log where day_user_id = '${user_id}'
      and day_create_time LIKE '%${time}%'
      `;
      const result = this.app.mysql.query(str);
      return result;
    } catch (e) {
      return [];
    }
  }
  // 添加日志
  async addLog(day_log) {
    try {
      const result = this.app.mysql.insert('day_log', {
        ...day_log,
      });
      return result;
    } catch (error) {
      console.log(error);
      return {
        msg: error.toString(),
      };
    }
  }
  // 删除日志
  async delLog(day_id) {
    try {
      const result = this.app.mysql.delete('day_log', { day_id });
      return result;
    } catch (e) {
      console.log(e);
      return e.toString();
    }
  }
  // 更新日志
  async updateLog(day_id, day_log) {
    try {
      // const result = await this.app.mysql.update('day_log', day_log, { where: { day_id } });
      const str = `
        UPDATE day_log set day_summery = '${day_log.day_summery}', 
        day_next_day = '${day_log.day_next_day}' , 
        day_create_time = '${day_log.day_create_time}' where day_id = '${day_id}'
      `;
      const result = await this.app.mysql.query(str);
      return result;
    } catch (error) {
      console.log(error);
      return error.toString();
    }
  }
}

module.exports = DayLog;
