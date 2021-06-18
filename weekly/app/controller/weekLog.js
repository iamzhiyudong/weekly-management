'use strict';
const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const moment = require('moment');

class WeekLogController extends Controller {
  // 是否可以添加周志
  async canAdd() {
    const { ctx } = this;
    const token = ctx.request.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, this.config.jwt.secret);
    // 生成本周周一的日期
    const week_day_begin = moment().subtract(moment().format('E') - 1, 'd').format('YYYY-MM-DD');
    // 生成本周周日的日期  加一是为了处理时间的边界问题
    const week_day_end = moment().add(7 - moment().format('E') + 1, 'd').format('YYYY-MM-DD');
    const result = await ctx.service.weekLog.canAdd(user.user_id, week_day_begin, week_day_end);
    // const result = await ctx.service.weekLog.canAdd('22', week_day_begin, week_day_end);
    if (result.length > 0) {
      ctx.body = {
        code: 1,
        msg: '本周已经提交过',
      };
    } else {
      ctx.body = {
        code: 0,
        msg: '可以添加',
      };
    }
  }
  // 根据日志一键生成周志
  async getWeekQuick() {
    const { ctx } = this;
    const token = ctx.request.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, this.config.jwt.secret);
    // 生成本周周一的日期
    const week_day_begin = moment().subtract(moment().format('E') - 1, 'd').format('YYYY-MM-DD');
    // 生成本周周日的日期  加一是为了处理时间的边界问题
    const week_day_end = moment().add(7 - moment().format('E') + 1, 'd').format('YYYY-MM-DD');

    const result = await ctx.service.weekLog.getWeekDayLog(user.user_id, week_day_begin, week_day_end);
    // const result = await ctx.service.weekLog.getWeekDayLog('22', week_day_begin, week_day_end);
    // 如果结果中有数据
    if (result.length > 0) {
      // 将时间转换成星期几
      const _result = result.map(item => {
        item.day_create_time = moment(item.day_create_time).format('E');
        return item;
      });
      // 结果字符串
      let result_str = '';
      // 合成数据
      _result.forEach(item => {
        let weekday = '';
        switch (item.day_create_time) {
          case '1':
            weekday = '一';
            break;
          case '2':
            weekday = '二';
            break;
          case '3':
            weekday = '三';
            break;
          case '4':
            weekday = '四';
            break;
          case '5':
            weekday = '五';
            break;
          case '6':
            weekday = '六';
            break;
          case '7':
            weekday = '日';
            break;
          default:
            break;
        }
        result_str += `<h1>星期${weekday}</h1><br/>${item.day_summery}`;
      });
      ctx.body = {
        code: 0,
        msg: '生成数据获取成功',
        data: result_str,
      };
    } else {
      ctx.body = {
        code: 0,
        msg: '生成数据获取成功',
        data: '',
      };
    }
  }
  // 添加周志
  async add() {
    const { ctx } = this;
    // 获取信息
    const token = ctx.request.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, this.config.jwt.secret);
    // 获取请求体
    const body = ctx.request.body;
    // 整理数据
    // 日志对象
    const week_log = {
      week_user_id: user.user_id,
      week_summery: body.week_summery,
      week_next_week: body.week_next_week,
      week_read_status: '0',
      week_create_time: moment().format('YYYY-MM-DD HH:mm:ss').toString(),
    };
    const result = await ctx.service.weekLog.addLog(week_log);
    // 判断是否添加成功
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 0,
        msg: '周志添加成功',
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '周志添加失败',
      };
    }
  }
  // 删除周志
  async del() {
    const { ctx } = this;
    const { week_id } = ctx.query;
    const result = await ctx.service.weekLog.delLog(week_id);
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 0,
        msg: '删除成功',
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '删除失败',
      };
    }
  }
  // 更新周志
  async update() {
    const { ctx } = this;
    // 获取请求体
    const body = ctx.request.body;
    // 日志对象
    const week_log = {
      week_summery: body.week_summery,
      week_next_week: body.week_next_week,
      week_create_time: moment().format('YYYY-MM-DD HH:mm:ss').toString(),
    };
    // 获取要更改的日志的ID
    const { week_id } = body;
    // 修改
    const result = await ctx.service.weekLog.updateLog(week_id, week_log);
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 0,
        msg: '更新周志成功',
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '更新周志失败',
      };
    }
  }
  // 个人历史周志
  async read() {
    const { ctx } = this;
    const token = ctx.request.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, this.config.jwt.secret);
    const result = await ctx.service.weekLog.getWeekLogByUserID(user.user_id);
    ctx.body = {
      code: 0,
      msg: '获取个人历史日志成功',
      data: result,
    };
  }
}

module.exports = WeekLogController;
