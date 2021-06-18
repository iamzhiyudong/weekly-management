'use strict';
const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const moment = require('moment');

class UserController extends Controller {
  // 获取指定日期日志  人员列表
  async getDayUserList() {
    const { ctx } = this;
    const token = ctx.request.headers.authorization.split(' ')[1];
    const time = ctx.query.time;
    console.log(time);
    const user = jwt.verify(token, this.config.jwt.secret);
    // const result = await ctx.service.admin.logList.getDayUserList(user.user_department_id, time);
    // 获取指定日期已经提交日志的人
    const today_user_same_dept = await ctx.service.admin.logList.getTodayLogSameDept(time, user.user_department_id);
    const today_user_down_dept = await ctx.service.admin.logList.getTodayLogDownDept(time, user.user_department_id);
    ctx.body = {
      code: 0,
      msg: '获取日志人员列表成功',
      data: today_user_same_dept.concat(today_user_down_dept),
    };
  }
  // 获取指定日期周志  人员列表
  async getWeekUserList() {
    const { ctx } = this;
    const token = ctx.request.headers.authorization.split(' ')[1];
    const time = ctx.query.time;
    const user = jwt.verify(token, this.config.jwt.secret);
    // // 生成本周周一的日期
    // const week_day_begin = moment().subtract(moment().format('E') - 1, 'd').format('YYYY-MM-DD');
    // // 生成本周周日的日期  加一是为了处理时间的边界问题
    // const week_day_end = moment().add(7 - moment().format('E') + 1, 'd').format('YYYY-MM-DD');
    // 获取本周已经提交日志的人数
    // const week_user_same_dept = await ctx.service.admin.logList.getWeekLogSameDept({ begin: week_day_begin, end: week_day_end }, user.user_department_id);
    // const week_user_down_dept = await ctx.service.admin.logList.getWeekLogDownDept({ begin: week_day_begin, end: week_day_end }, user.user_department_id);
    const week_user_same_dept = await ctx.service.admin.logList.getWeekLogSameDept(time, user.user_department_id);
    const week_user_down_dept = await ctx.service.admin.logList.getWeekLogDownDept(time, user.user_department_id);
    ctx.body = {
      code: 0,
      msg: '获取周志人员列表成功',
      data: week_user_same_dept.concat(week_user_down_dept),
    };
  }
  // 根据日志ID获取日志
  async getDayDetail() {
    const { ctx } = this;
    const log_id = ctx.query.day_id;
    // 获取日志数据
    const result = await ctx.service.admin.logList.getDayDetail(log_id);
    result.day_create_time = moment(result.day_create_time).format('YYYY-MM-DD HH:mm:ss');
    ctx.body = {
      code: 0,
      msg: '获取日志成功',
      data: result,
    };
  }
  // 根据周志ID获取周志
  async getWeekDetail() {
    const { ctx } = this;
    const log_id = ctx.query.week_id;
    // 获取日志数据
    const result = await ctx.service.admin.logList.getWeekDetail(log_id);
    result.week_create_time = moment(result.week_create_time).format('YYYY-MM-DD HH:mm:ss');
    ctx.body = {
      code: 0,
      msg: '获取日志成功',
      data: result,
    };
  }
}

module.exports = UserController;

