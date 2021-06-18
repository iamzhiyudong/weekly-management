'use strict';
const Service = require('egg').Service;
// const moment = require('moment');

class ReadService extends Service {
  // 获取日志的评阅状态
  async getDayReadStatus(day_id) {
    try {
      const result = await this.app.mysql.select('day_log', {
        where: {
          day_id,
        },
        columns: [ 'day_read_status' ],
      });
      return result;
    } catch (error) {
      console.log(error);
      return error.toString();
    }
  }
  // 更改日志的评阅状态
  async setDayReadStatus(day_id, status) {
    try {
      const result = await this.app.mysql.update('day_log', {
        day_read_status: status,
      }, {
        where: {
          day_id,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return {
        error_msg: error.toString(),
      };
    }
  }
  // 获取周志的评阅状态
  async getWeekReadStatus(week_id) {
    try {
      const result = await this.app.mysql.select('week_log', {
        where: {
          week_id,
        },
        columns: [ 'week_read_status' ],
      });
      return result;
    } catch (error) {
      console.log(error);
      return error.toString();
    }
  }
  // 更改周志的评阅状态
  async setWeekReadStatus(week_id, status) {
    try {
      const result = await this.app.mysql.update('week_log', {
        week_read_status: status,
      }, {
        where: {
          week_id,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return {
        error_msg: error.toString(),
      };
    }
  }
}

module.exports = ReadService;

