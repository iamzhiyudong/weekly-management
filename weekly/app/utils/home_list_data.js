'use strict';

// 普通经理
const list = [
  {
    name: '总体概览',
    id: 1,
    children: [
      {
        name: '提交情况',
        id: 11,
        path: 'overview',
      },
      {
        name: '日志查看',
        id: 12,
        path: 'view_day',
      },
      {
        name: '周志查看',
        id: 13,
        path: 'view_week',
      },
    ],
  },
  {
    name: '我的日志',
    id: 2,
    children: [
      {
        name: '日志管理',
        id: 21,
        path: 'my_day',
      },
    ],
  },
  {
    name: '我的周志',
    id: 3,
    children: [
      {
        name: '周志管理',
        id: 31,
        path: 'my_week',
      },
    ],
  },
  {
    name: '部门日志',
    id: 4,
    children: [
      {
        name: '部门概览',
        id: 41,
        path: 'dept_day',
      },
      {
        name: '日志评阅',
        id: 42,
        path: 'read_day',
      },
    ],
  },
  {
    name: '部门周志',
    id: 5,
    children: [
      {
        name: '部门概览',
        id: 51,
        path: 'dept_week',
      },
      {
        name: '周志评阅',
        id: 52,
        path: 'read_week',
      },
    ],
  },
  {
    name: '部门人员',
    id: 6,
    children: [
      {
        name: '部门人员',
        id: 61,
        path: 'person',
      },
    ],
  },
];
// 普通用户
const list_general = [
  {
    name: '总体概览',
    id: 1,
    children: [
      {
        name: '提交情况',
        id: 11,
        path: 'overview',
      },
      {
        name: '日志查看',
        id: 12,
        path: 'view_day',
      },
      {
        name: '周志查看',
        id: 13,
        path: 'view_week',
      },
    ],
  },
  {
    name: '我的日志',
    id: 2,
    children: [
      {
        name: '日志管理',
        id: 21,
        path: 'my_day',
      },
    ],
  },
  {
    name: '我的周志',
    id: 3,
    children: [
      {
        name: '周志管理',
        id: 31,
        path: 'my_week',
      },
    ],
  },
];
// 没有上级的经理
const list_no_up = [
  {
    name: '部门日志',
    id: 4,
    children: [
      {
        name: '部门概览',
        id: 41,
        path: 'dept_day',
      },
      {
        name: '日志评阅',
        id: 42,
        path: 'read_day',
      },
    ],
  },
  {
    name: '部门周志',
    id: 5,
    children: [
      {
        name: '部门概览',
        id: 51,
        path: 'dept_week',
      },
      {
        name: '周志评阅',
        id: 52,
        path: 'read_week',
      },
    ],
  },
  {
    name: '部门人员',
    id: 6,
    children: [
      {
        name: '部门人员',
        id: 61,
        path: 'person',
      },
    ],
  },
];
// 超级管理员
const list_super = [
  {
    name: '职位管理',
    id: 1,
    children: [
      {
        name: '职位管理',
        id: 11,
        path: 'su_pos',
      },
    ],
  },
  {
    name: '部门管理',
    id: 2,
    children: [
      {
        name: '部门管理',
        id: 21,
        path: 'su_dept',
      },
    ],
  },
  {
    name: '部门人员',
    id: 3,
    children: [
      {
        name: '部门人员',
        id: 31,
        path: 'su_person',
      },
    ],
  },
];
module.exports = {
  list,
  list_general,
  list_no_up,
  list_super,
};
