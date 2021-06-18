'use strict';
const Service = require('egg').Service;

class WeekLog extends Service {
  /**
   * 获取同部门本周日志
   * @param {date} date 时间对象
   * @param {number} dept_id 部门ID
   */
  async getWeekLogSameDept(date, dept_id) {
    const logs = await this.app.mysql.query(`select * from user,week_log where week_create_time > '${date.begin}' and week_create_time < '${date.end}' and user.user_id = week_log.week_user_id and user.user_department_id = '${dept_id}' and user.user_is_admin = '0'`);
    return logs;
  }
  /**
  * 获取下级部门本周日志
  * @param {date} date 时间对象
  * @param {number} dept_id 部门ID
  */
  async getWeekLogDownDept(date, dept_id) {
    const logs = await this.app.mysql.query(`select * from user,week_log where week_create_time > '${date.begin}' and week_create_time < '${date.end}' and user.user_id = week_log.week_user_id and user.user_up_department_id = '${dept_id}' and user.user_is_admin = '1'`);
    return logs;
  }
  /**
   * 获取同部门本周日志评阅
   * @param {date} date 时间对象
   * @param {number} dept_id 部门ID
   */
  async getWeekLogReadSameDept(date, dept_id) {
    const logs = await this.app.mysql.query(`select * from user,week_log where week_create_time > '${date.begin}' and week_create_time < '${date.end}' and user.user_id = week_log.week_user_id and user.user_department_id = '${dept_id}' and user.user_is_admin = '0' and week_log.week_read_status = '1'`);
    return logs;
  }
  /**
  * 获取下级部门本周日志评阅
  * @param {date} date 时间对象
  * @param {number} dept_id 部门ID
  */
  async getWeekLogReadDownDept(date, dept_id) {
    const logs = await this.app.mysql.query(`select * from user,week_log where week_create_time > '${date.begin}' and week_create_time < '${date.end}' and user.user_id = week_log.week_user_id and user.user_up_department_id = '${dept_id}' and user.user_is_admin = '1' and week_log.week_read_status = '1'`);
    return logs;
  }
  /**
   * 根据用户ID获取历史日志
   * @param {number} user_id 用户ID
   */
  async getWeekLogByUserID(user_id) {
    const sql_str = `
    SELECT week_id, week_summery, week_next_week, week_read_status, DATE_FORMAT(week_create_time,'%Y-%m-%d %H:%i:%S') as create_time
    from  week_log
    WHERE week_user_id = ${user_id}
    ORDER BY create_time DESC`;
    try {
      const result = await this.app.mysql.query(sql_str);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  // 是否可以添加周志
  async canAdd(user_id, time_begin, time_end) {
    try {
      const str = `
        select * from week_log where week_user_id = '${user_id}'
        and week_create_time >= '${time_begin}' 
        and week_create_time < '${time_end}'
        `;
      const result = this.app.mysql.query(str);
      return result;
    } catch (e) {
      return [];
    }
  }
  // 获取本周日志数据
  async getWeekDayLog(user_id, time_begin, time_end) {
    try {
      const str = `
        select * from day_log where day_user_id = '${user_id}'
        and day_create_time >= '${time_begin}' 
        and day_create_time < '${time_end}'
        `;
      const result = this.app.mysql.query(str);
      return result;
    } catch (e) {
      return [];
    }
  }
  // 添加周志
  async addLog(week_log) {
    try {
      const result = this.app.mysql.insert('week_log', {
        ...week_log,
      });
      return result;
    } catch (error) {
      console.log(error);
      return {
        msg: error.toString(),
      };
    }
  }
  // 删除周志
  async delLog(week_id) {
    try {
      const result = this.app.mysql.delete('week_log', { week_id });
      return result;
    } catch (e) {
      console.log(e);
      return e.toString();
    }
  }
  // 更新周志
  async updateLog(week_id, week_log) {
    try {
      // const result = await this.app.mysql.update('day_log', day_log, { where: { day_id } });
      const str = `
          UPDATE week_log set week_summery = '${week_log.week_summery}', 
          week_next_week = '${week_log.week_next_week}' , 
          week_create_time = '${week_log.week_create_time}' where week_id = '${week_id}'
        `;
      const result = await this.app.mysql.query(str);
      return result;
    } catch (error) {
      console.log(error);
      return error.toString();
    }
  }
}

module.exports = WeekLog;
