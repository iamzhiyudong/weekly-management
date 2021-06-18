'use strict';
const Controller = require('egg').Controller;
const { getUserInfoGet } = require('../utils/token_info');
const moment = require('moment');

class DayLog extends Controller {
  // 是否可以添加日志
  async canAdd() {
    const { ctx } = this;
    // 获取用户的信息
    const user_info = await getUserInfoGet(this, ctx.request.headers);
    const time = moment().format('YYYY-MM-DD');

    const result = await ctx.service.dayLog.canAdd(user_info.user_id, time);
    if (result.length > 0) {
      ctx.body = {
        code: 1,
        msg: '今日已经提交过',
      };
    } else {
      ctx.body = {
        code: 0,
        msg: '可以添加',
      };
    }
  }
  // 添加日志
  async add() {
    const { ctx } = this;
    // 获取用户的信息
    const user = await getUserInfoGet(this, ctx.request.headers);
    // 获取请求体
    const body = ctx.request.body;
    // 整理数据
    // 日志对象
    const day_log = {
      day_user_id: user.user_id,
      day_summery: body.day_summery,
      day_next_day: body.day_next_day,
      day_read_status: '0',
      day_create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    const result = await ctx.service.dayLog.addLog(day_log);
    // 判断是否添加成功
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 0,
        msg: '日志添加成功',
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '日志添加失败',
      };
    }
  }
  // 删除日志
  async del() {
    const { ctx } = this;
    const { day_id } = ctx.query;
    const result = await ctx.service.dayLog.delLog(day_id);
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
  // 更新日志
  async update() {
    const { ctx } = this;
    // 获取请求体
    const body = ctx.request.body;
    // 日志对象
    const day_log = {
      day_summery: body.day_summery,
      day_next_day: body.day_next_day,
      day_create_time: moment().format('YYYY-MM-DD HH:mm:ss').toString(),
    };
    // 获取要更改的日志的ID
    const { day_id } = body;
    // 修改
    const result = await ctx.service.dayLog.updateLog(day_id, day_log);
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 0,
        msg: '更新日志成功',
      };
    } else {
      ctx.body = {
        code: 1,
        msg: '更新日志失败',
      };
    }
  }
  // 个人历史日志
  async read() {
    const { ctx } = this;
    // 获取用户的信息
    const user = await getUserInfoGet(this, ctx.request.headers);
    const result = await ctx.service.dayLog.getDayLogByUserID(user.user_id);
    ctx.body = {
      code: 0,
      msg: '获取个人历史日志成功',
      data: result,
    };
  }
}

module.exports = DayLog;
