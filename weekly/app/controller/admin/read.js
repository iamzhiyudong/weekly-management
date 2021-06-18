'use strict';
const Controller = require('egg').Controller;
const { getUserInfoGet } = require('../../utils/token_info');
const moment = require('moment');

class ReadController extends Controller {
  // 日志评阅情况
  async readDay() {
    const { ctx } = this;
    // 获取用户的信息
    const user_info = await getUserInfoGet(this, ctx.request.headers);
    // 生成今日日期
    const date_today = moment().format('YYYY-MM-DD');
    // 获取部门的所有人数,不包括经理,包括下级部门的经理
    const all_users_same_dept = await ctx.service.admin.user.findSameDeptUser(user_info.user_department_id);
    const all_users_down_dept = await ctx.service.admin.user.findDownDeptUser(user_info.user_department_id);
    // 获取今日日志已经评阅过的
    const today_user_same_dept = await ctx.service.admin.dayLog.getTodayLogReadSameDept(date_today, user_info.user_department_id);
    const today_user_down_dept = await ctx.service.admin.dayLog.getTodayLogReadDownDept(date_today, user_info.user_department_id);

    ctx.body = {
      code: 0,
      msg: '获取日志评阅情况成功',
      data: [{
        all_num: all_users_same_dept.length + all_users_down_dept.length,
        already_num: today_user_same_dept.length + today_user_down_dept.length,
      }],
    };
  }
  // 周志评阅情况
  async readWeek() {
    const { ctx } = this;
    // 获取用户的信息
    const user_info = await getUserInfoGet(this, ctx.request.headers);
    // 获取部门的所有人数,不包括经理,包括下级部门的经理
    const all_users_same_dept = await ctx.service.admin.user.findSameDeptUser(user_info.user_department_id);
    const all_users_down_dept = await ctx.service.admin.user.findDownDeptUser(user_info.user_department_id);

    // 生成本周周一的日期
    const week_day_begin = moment().subtract(moment().format('E') - 1, 'd').format('YYYY-MM-DD');
    // 生成本周周日的日期  加一是为了处理时间的边界问题
    const week_day_end = moment().add(7 - moment().format('E') + 1, 'd').format('YYYY-MM-DD');

    // 获取本周周志已经评阅过的
    const today_user_same_dept = await ctx.service.admin.weekLog.getWeekLogReadSameDept({ begin: week_day_begin, end: week_day_end }, user_info.user_department_id);
    const today_user_down_dept = await ctx.service.admin.weekLog.getWeekLogReadDownDept({ begin: week_day_begin, end: week_day_end }, user_info.user_department_id);

    ctx.body = {
      code: 0,
      msg: '获取周志评阅情况成功',
      data: [{
        all_num: all_users_same_dept.length + all_users_down_dept.length,
        already_num: today_user_same_dept.length + today_user_down_dept.length,
      }],
    };
  }
  // 改变日志评阅状态
  async updateDayReadStatus() {
    const { ctx } = this;
    const { day_id } = ctx.request.body;
    // 获取当前日志的评阅状态
    const read_status_result = await ctx.service.admin.read.getDayReadStatus(day_id);
    // 如果当前的评阅状态是1  已经评阅 则改成0
    if (read_status_result[0].day_read_status === '1') {
      const result_not_read = await ctx.service.admin.read.setDayReadStatus(day_id, '0');
      if (result_not_read.affectedRows === 1) {
        ctx.body = {
          code: 0,
          msg: '取消评阅成功',
        };
      } else {
        ctx.body = {
          code: 1,
          msg: '取消评阅失败',
        };
      }
    } else {
      const result_read = await ctx.service.admin.read.setDayReadStatus(day_id, '1');
      if (result_read.affectedRows === 1) {
        ctx.body = {
          code: 0,
          msg: '评阅成功',
        };
      } else {
        ctx.body = {
          code: 1,
          msg: '评阅失败',
        };
      }
    }
  }
  // 改变周志评阅状态
  async updateWeekReadStatus() {
    const { ctx } = this;
    const { week_id } = ctx.request.body;
    // 获取当前周志的评阅状态
    const read_status_result = await ctx.service.admin.read.getWeekReadStatus(week_id);
    // 如果当前的评阅状态是1  已经评阅 则改成0
    if (read_status_result[0].week_read_status === '1') {
      const result_not_read = await ctx.service.admin.read.setWeekReadStatus(week_id, '0');
      if (result_not_read.affectedRows === 1) {
        ctx.body = {
          code: 0,
          msg: '取消评阅成功',
        };
      } else {
        ctx.body = {
          code: 1,
          msg: '取消评阅失败',
        };
      }
    } else {
      const result_read = await ctx.service.admin.read.setWeekReadStatus(week_id, '1');
      if (result_read.affectedRows === 1) {
        ctx.body = {
          code: 0,
          msg: '评阅成功',
        };
      } else {
        ctx.body = {
          code: 1,
          msg: '评阅失败',
        };
      }
    }
  }
}

module.exports = ReadController;
