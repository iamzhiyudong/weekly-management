/* eslint-disable eqeqeq */
'use strict';
const Controller = require('egg').Controller;
const { getUserInfoGet } = require('../utils/token_info');
// const moment = require('moment');

class View extends Controller {
  async getDeptPerson() {
    const { ctx } = this;
    // 获取用户的信息
    const user_info = await getUserInfoGet(this, ctx.request.headers);
    if (user_info.user_is_admin == '1' && user_info.user_up_department_id) {
      // 经理获取上级部门的
      // 获取部门的所有人数,不包括经理,包括下级部门的经理
      const all_users_same_dept = await ctx.service.user.findSameDeptUser(user_info.user_up_department_id);
      const all_users_down_dept = await ctx.service.user.findDownDeptUser(user_info.user_up_department_id);
      ctx.body = {
        code: '获取同部门人员列表成功',
        data: all_users_same_dept.concat(all_users_down_dept),
      };
    } else {
      // 员工获取当前部门的
      // 获取部门的所有人数,不包括经理,包括下级部门的经理
      const all_users_same_dept = await ctx.service.user.findSameDeptUser(user_info.user_department_id);
      const all_users_down_dept = await ctx.service.user.findDownDeptUser(user_info.user_department_id);
      ctx.body = {
        code: '获取同部门人员列表成功',
        data: all_users_same_dept.concat(all_users_down_dept),
      };
    }
  }

  async getHistoryDay() {
    const { ctx } = this;
    // 根据传过来的ID获取日志
    const params = ctx.query;
    const dayLogs = await ctx.service.dayLog.getDayLogByUserID(params.id);
    ctx.body = {
      code: '根据传过来的ID获取历史日志成功',
      data: dayLogs,
    };
  }
  async getHistoryWeek() {
    const { ctx } = this;
    // 根据传过来的ID获取日志
    const params = ctx.query;
    const weekLogs = await ctx.service.weekLog.getWeekLogByUserID(params.id);
    ctx.body = {
      code: '根据传过来的ID获取历史周志成功',
      data: weekLogs,
    };
  }
}

module.exports = View;
