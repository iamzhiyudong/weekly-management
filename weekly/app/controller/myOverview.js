/* eslint-disable eqeqeq */
'use strict';
const Controller = require('egg').Controller;
const { getUserInfoGet } = require('../utils/token_info');
const moment = require('moment');

class MyOverview extends Controller {
  /**
   * 当前用户获取日志提交情况
   * @class
   */
  async OverviewDay() {
    const { ctx } = this;
    // 获取用户的信息
    const user_info = await getUserInfoGet(this, ctx.request.headers);
    // 判断是否是经理，经理的预览是上级部门的
    // eslint-disable-next-line eqeqeq
    // if (user_info.user_up_department_id != '1' && user_info.user_is_admin == '1') {
    //   /**
    //    * 如果是经理，但是没有上级，返回0（顶级）
    //    */
    //   ctx.body = {
    //     code: 0,
    //     msg: '获取今日日志预览数据成功，不存在上级部门',
    //     data: [{
    //       all_num: 1,
    //       already_num: 1,
    //     }],
    //   };

    //   // eslint-disable-next-line eqeqeq
    // } else
    if (user_info.user_up_department_id != null && user_info.user_is_admin == '1') {
      /**
       * 如果是经理，而且有上级，返回的是上级部门的数据
       */
      // 获取部门的所有人数,不包括经理,包括下级部门的经理
      const all_users_same_dept = await ctx.service.user.findSameDeptUser(user_info.user_up_department_id);
      const all_users_down_dept = await ctx.service.user.findDownDeptUser(user_info.user_up_department_id);
      // 生成今日日期
      const date_today = moment().format('YYYY-MM-DD');
      // 获取今日已经提交日志的人数
      const today_user_same_dept = await ctx.service.dayLog.getTodayLogSameDept(date_today, user_info.user_up_department_id);
      const today_user_down_dept = await ctx.service.dayLog.getTodayLogDownDept(date_today, user_info.user_up_department_id);
      ctx.body = {
        code: 0,
        msg: '获取今日日志预览数据成功',
        data: [{
          all_num: all_users_same_dept.length + all_users_down_dept.length,
          already_num: today_user_same_dept.length + today_user_down_dept.length,
        }],
      };
    } else {
      /**
       * 普通用户
       */
      // 获取部门的所有人数,不包括经理,包括下级部门的经理
      const all_users_same_dept = await ctx.service.user.findSameDeptUser(user_info.user_department_id);
      const all_users_down_dept = await ctx.service.user.findDownDeptUser(user_info.user_department_id);
      // 生成今日日期
      const date_today = moment().format('YYYY-MM-DD');
      // 获取今日已经提交日志的人数
      const today_user_same_dept = await ctx.service.dayLog.getTodayLogSameDept(date_today, user_info.user_department_id);
      const today_user_down_dept = await ctx.service.dayLog.getTodayLogDownDept(date_today, user_info.user_department_id);
      ctx.body = {
        code: 0,
        msg: '获取今日日志预览数据成功',
        data: [{
          all_num: all_users_same_dept.length + all_users_down_dept.length,
          already_num: today_user_same_dept.length + today_user_down_dept.length,
        }],
      };
    }
  }

  async OverviewWeek() {
    const { ctx } = this;
    // 获取用户的信息
    const user_info = await getUserInfoGet(this, ctx.request.headers);
    // 判断是否是经理，经理的预览是上级部门的
    // eslint-disable-next-line eqeqeq
    // if (user_info.user_up_department_id != '1' && user_info.user_is_admin == '1') {
    //   /**
    //    * 如果是经理，但是没有上级，返回0（顶级）
    //    */
    //   ctx.body = {
    //     code: 0,
    //     msg: '获取今日周志预览数据成功，不存在上级部门',
    //     data: [{
    //       all_num: 1,
    //       already_num: 1,
    //     }],
    //   };

    //   // eslint-disable-next-line eqeqeq
    // } else
    if (user_info.user_up_department_id != null && user_info.user_is_admin == '1') {
      /**
       * 如果是经理，而且有上级，返回的是上级部门的数据
       */
      // 获取部门的所有人数,不包括经理,包括下级部门的经理
      const all_users_same_dept = await ctx.service.user.findSameDeptUser(user_info.user_up_department_id);
      const all_users_down_dept = await ctx.service.user.findDownDeptUser(user_info.user_up_department_id);
      // 生成本周周一的日期
      const week_day_begin = moment().subtract(moment().format('E') - 1, 'd').format('YYYY-MM-DD');
      // 生成本周周日的日期  加一是为了处理时间的边界问题
      const week_day_end = moment().add(7 - moment().format('E') + 1, 'd').format('YYYY-MM-DD');
      // 获取本周已经提交日志的人数
      const week_user_down_dept = await ctx.service.weekLog.getWeekLogDownDept({ begin: week_day_begin, end: week_day_end }, user_info.user_up_department_id);
      const week_user_same_dept = await ctx.service.weekLog.getWeekLogSameDept({ begin: week_day_begin, end: week_day_end }, user_info.user_up_department_id);
      ctx.body = {
        code: 0,
        msg: '获取本周周志预览数据成功',
        data: [{
          all_num: all_users_same_dept.length + all_users_down_dept.length,
          already_num: week_user_same_dept.length + week_user_down_dept.length,
        }],
      };
    } else {
      /**
       * 普通用户
       */
      // 获取部门的所有人数,不包括经理,包括下级部门的经理
      const all_users_same_dept = await ctx.service.user.findSameDeptUser(user_info.user_department_id);
      const all_users_down_dept = await ctx.service.user.findDownDeptUser(user_info.user_department_id);
      // 生成本周周一的日期
      const week_day_begin = moment().subtract(moment().format('E') - 1, 'd').format('YYYY-MM-DD');
      // 生成本周周日的日期  加一是为了处理时间的边界问题
      const week_day_end = moment().add(7 - moment().format('E') + 1, 'd').format('YYYY-MM-DD');
      // 获取本周已经提交日志的人数
      const week_user_same_dept = await ctx.service.weekLog.getWeekLogSameDept({ begin: week_day_begin, end: week_day_end }, user_info.user_department_id);
      const week_user_down_dept = await ctx.service.weekLog.getWeekLogDownDept({ begin: week_day_begin, end: week_day_end }, user_info.user_department_id);
      ctx.body = {
        code: 0,
        msg: '获取本周周志预览数据成功',
        data: [{
          all_num: all_users_same_dept.length + all_users_down_dept.length,
          already_num: week_user_same_dept.length + week_user_down_dept.length,
        }],
      };
    }
  }
}

module.exports = MyOverview;
