'use strict';
const Service = require('egg').Service;
class UserService extends Service {
  /**
   * 获取同部门人员日志
   * @param {string} date 时间
   * @param {number} dept_id 部门ID
   */
  async getTodayLogSameDept(date, dept_id) {
    const logs = await this.app.mysql.query(`select user_id, user_name, day_log.day_id,  DATE_FORMAT(day_log.day_create_time,'%Y-%m-%d %H:%i:%S') as create_time, day_log.day_read_status from user, day_log where day_create_time like '%${date}%' and user.user_id = day_log.day_user_id and user.user_department_id = '${dept_id}' and user.user_is_admin = '0'`);
    return logs;
  }
  /**
   * 获取下级部门经理日志
   * @param {string} date 时间
   * @param {number} dept_id 部门ID
   */
  async getTodayLogDownDept(date, dept_id) {
    const logs = await this.app.mysql.query(`select user_id, user_name, day_log.day_id,  DATE_FORMAT(day_log.day_create_time,'%Y-%m-%d %H:%i:%S') as create_time, day_log.day_read_status from user, day_log where day_create_time like '%${date}%' and user.user_id = day_log.day_user_id and user.user_up_department_id = '${dept_id}' and user.user_is_admin = '1'`);
    return logs;
  }
  /**
   * 获取同部门本周日志
   * @param {date} date 时间对象
   * @param {number} dept_id 部门ID
   */
  async getWeekLogSameDept(date, dept_id) {
    const logs = await this.app.mysql.query(`select user_id, user_name, week_log.week_id,  DATE_FORMAT(week_log.week_create_time,'%Y-%m-%d %H:%i:%S') as create_time, week_log.week_read_status from user, week_log where week_create_time like '%${date}%' and user.user_id = week_log.week_user_id and user.user_department_id = '${dept_id}' and user.user_is_admin = '0'`);
    return logs;
  }
  /**
  * 获取下级部门本周日志
  * @param {date} date 时间对象
  * @param {number} dept_id 部门ID
  */
  async getWeekLogDownDept(date, dept_id) {
    const logs = await this.app.mysql.query(`select user_id, user_name, week_log.week_id,  DATE_FORMAT(week_log.week_create_time,'%Y-%m-%d %H:%i:%S') as create_time, week_log.week_read_status from user, week_log where week_create_time like '%${date}%' and user.user_id = week_log.week_user_id and user.user_up_department_id = '${dept_id}' and user.user_is_admin = '1'`);
    return logs;
  }

  // 获取指定日期  日志 的 人员 列表
  async getDayUserList(user_dept_id, time) {
    const str = `
    select user_id, user_name, day_log.day_id,  DATE_FORMAT(day_log.day_create_time,'%Y-%m-%d %H:%i:%S') as create_time, day_log.day_read_status from user, day_log
    where user_department_id = '${user_dept_id}'
    and user.user_id = day_log.day_user_id
    and day_log.day_create_time LIKE '%${time}%'
    `;
    try {
      const result = await this.app.mysql.query(str);
      return result;
    } catch (error) {
      console.log(error);
      return error.toString();
    }
  }
  // 获取指定日期  周志 的 人员 列表
  async getWeekUserList(user_read_id, time) {
    const str = `
    select user_id, user_name, week_log.week_id,  DATE_FORMAT(week_log.week_create_time,'%Y-%m-%d %H:%i:%S') as create_time, week_log.week_read_status from user, week_log
    where user_read_person_id = '${user_read_id}'
    and user.user_id = week_log.week_user_id
    and week_log.week_create_time LIKE '%${time}%'
    ORDER BY create_time DESC
    `;
    try {
      const result = await this.app.mysql.query(str);
      return result;
    } catch (error) {
      console.log(error);
      return error.toString();
    }
  }
  // 根据日志ID获取日志
  async getDayDetail(day_id) {
    try {
      const result = await this.app.mysql.get('day_log', { day_id });
      return result;
    } catch (e) {
      return e.toString();
    }
  }
  // 根据周志ID获取周志
  async getWeekDetail(week_id) {
    try {
      const result = await this.app.mysql.get('week_log', { week_id });
      return result;
    } catch (e) {
      return e.toString();
    }
  }
}
module.exports = UserService;
