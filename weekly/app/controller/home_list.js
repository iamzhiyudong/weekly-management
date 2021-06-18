/* eslint-disable eqeqeq */
'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const HOMELIST = require('../utils/home_list_data');

class HomeListController extends Controller {
  // 之前的获取列表的方法
  async index() {
    // 获取请求头
    const header = this.ctx.request.headers;
    // 获取token
    const token = header.authorization.split(' ')[1];
    // 解码token
    const decode_token = await jwt.verify(token, this.config.jwt.secret);
    // 获取role_id
    const { user_id } = decode_token;
    // 看看部门列表里是否存在这个人
    const user_info_result = await this.ctx.service.dept.find(user_id);
    if (user_info_result.length > 0) {
      this.ctx.body = {
        code: 0,
        msg: '菜单列表获取成功',
        data: HOMELIST.list,
      };
    } else {
      this.ctx.body = {
        code: 0,
        msg: '菜单列表获取成功',
        data: HOMELIST.list_general,
      };
    }
  }
  // 用于区别经理的获取菜单的方法
  async getMenu() {
    // 获取请求头
    const header = this.ctx.request.headers;
    // 获取token
    const token = header.authorization.split(' ')[1];
    // 解码token
    const decode_token = await jwt.verify(token, this.config.jwt.secret);
    // 获取role_id
    // 查询人员和部门信息
    const result = await this.ctx.service.dept.getDeptUserInfo(decode_token);
    console.log(decode_token);

    if (result.length > 0 && decode_token.user_is_admin != '11') {
      if (result[0].user_is_admin == '0') {
        // 普通用户
        this.ctx.body = {
          code: 0,
          msg: '菜单列表获取成功(普通用户)',
          data: HOMELIST.list_general,
        };
      } else if (result[0].user_is_admin == '1' && result[0].dept_parent_id != null) {
        // 普通经理
        this.ctx.body = {
          code: 0,
          msg: '菜单列表获取成功（普通经理）',
          data: HOMELIST.list,
        };
      } else if (result[0].user_is_admin == '1' && result[0].dept_parent_id == null) {
        // 没有上级的用户
        this.ctx.body = {
          code: 0,
          msg: '菜单列表获取成功（总经理）',
          data: HOMELIST.list_no_up,
        };
      }
    } else {
      if (decode_token.user_is_admin == '11') {
        // 超级管理员
        this.ctx.body = {
          code: 0,
          msg: '菜单列表获取成功（超级管理员）',
          data: HOMELIST.list_super,
        };
      }
    }

    // if (user_info_result.length > 0) {
    //   this.ctx.body = {
    //     code: 0,
    //     msg: '菜单列表获取成功',
    //     data: HOMELIST.list,
    //   };
    // } else {
    //   this.ctx.body = {
    //     code: 0,
    //     msg: '菜单列表获取成功',
    //     data: HOMELIST.list_general,
    //   };
    // }
  }
}

module.exports = HomeListController;
