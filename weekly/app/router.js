'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 验证token是否有效的中间件
  const checkToken = app.middleware.checkToken({ secret: app.config.jwt.secret });
  // 项目启动的时候问候路由
  router.get('/', controller.home.index);
  // 验证token
  router.get('/test/token', checkToken, controller.home.index);

  // 登录
  router.post('/login', controller.login.index);
  // 获取首页功能列表
  router.get('/get/home/list', checkToken, controller.homeList.getMenu);

  // 日志提交情况
  router.get('/get/overview/day', checkToken, controller.myOverview.OverviewDay);
  // 周志提交情况
  router.get('/get/overview/week', checkToken, controller.myOverview.OverviewWeek);
  //
  // 获取同部门人员列表
  router.get('/get/view/dept_person', checkToken, controller.view.getDeptPerson);
  // 根据ID获取历史日志
  router.get('/get/view/history/day', checkToken, controller.view.getHistoryDay);
  // 根据ID获取历史周志
  router.get('/get/view/history/week', checkToken, controller.view.getHistoryWeek);

  // 是否可以提交日志
  router.get('/add/day/tag', checkToken, controller.dayLog.canAdd);
  // 新建日志
  router.post('/add/day', checkToken, controller.dayLog.add);
  // 删除日志
  router.delete('/del/day', checkToken, controller.dayLog.del);
  // 更改日志
  router.put('/update/day', checkToken, controller.dayLog.update);
  // 个人历史日志
  router.get('/get/day', checkToken, controller.dayLog.read);

  // 是否可以提交周志
  router.get('/add/week/tag', checkToken, controller.weekLog.canAdd);
  // 新建周志
  router.post('/add/week', checkToken, controller.weekLog.add);
  // 根据日志一键生成周志
  router.get('/add/week/quick', checkToken, controller.weekLog.getWeekQuick);
  // 删除周志
  router.delete('/del/week', checkToken, controller.weekLog.del);
  // 更改周志
  router.put('/update/week', checkToken, controller.weekLog.update);
  // 个人历史周志
  router.get('/get/week', checkToken, controller.weekLog.read);

  // 管理员
  // 日志提交情况
  router.get('/admin/get/view/day', checkToken, controller.admin.overview.OverviewDay);
  // 周志提交情况
  router.get('/admin/get/view/week', checkToken, controller.admin.overview.OverviewWeek);
  // 日志评阅情况
  router.get('/admin/get/read/day', checkToken, controller.admin.read.readDay);
  // 周志评阅情况
  router.get('/admin/get/read/week', checkToken, controller.admin.read.readWeek);

  // 获取指定日期日志  人员列表
  router.get('/admin/update/day/list', checkToken, controller.admin.logList.getDayUserList);
  // 根据日志ID获取日志
  router.get('/admin/get/day/detail', checkToken, controller.admin.logList.getDayDetail);
  // 日志评阅和取消评阅
  router.post('/admin/update/day/read/status', checkToken, controller.admin.read.updateDayReadStatus);
  // 获取指定日期周志  人员列表
  router.get('/admin/update/week/list', checkToken, controller.admin.logList.getWeekUserList);
  // 根据周志ID获取周志
  router.get('/admin/get/week/detail', checkToken, controller.admin.logList.getWeekDetail);
  // 周志的评阅和取消评阅
  router.post('/admin/update/week/read/status', checkToken, controller.admin.read.updateWeekReadStatus);

  // 管理员获取本部门人员列表
  router.get('/admin/get/dept/person', checkToken, controller.admin.user.userList);
  // 移除人员
  router.post('/admin/del/dept/person', checkToken, controller.admin.user.del);
  // 管理员添加人员
  router.post('/admin/add/user', checkToken, controller.admin.user.addUser);
  // 获取员工个人信息
  router.get('/admin/get/user/info', checkToken, controller.admin.user.getUserInfo);

  // 获取部门信息
  router.get('/admin/get/dept/info', checkToken, controller.admin.dept.getDeptInfo);
  // 获取职位表
  router.get('/admin/get/pos/info', checkToken, controller.admin.pos.getPosInfo);

  // 获取个人信息
  router.get('/get/user/info', checkToken, controller.user.getUserInfo);
  // 修改个人信息
  router.post('/update/user/info', checkToken, controller.user.updateUserInfo);
  // 修改密码
  router.post('/update/user/info/pwd', checkToken, controller.user.updatePwd);

  // super
  // 删除职位
  router.get('/super/del/pos', checkToken, controller.super.pos.delPosList);
  // 添加职位
  router.get('/super/add/pos', checkToken, controller.super.pos.addPosList);
  // 修改职位
  router.get('/super/update/pos', checkToken, controller.super.pos.updatePosList);

  // 删除部门
  router.get('/super/del/dept', checkToken, controller.super.dept.delDept);
  // 添加部门
  router.get('/super/add/dept', checkToken, controller.super.dept.addDept);
  // 获取部门树形结构数据
  router.get('/super/get/dept', checkToken, controller.super.dept.getDept);
  // 修改部门
  router.get('/super/update/dept', checkToken, controller.super.dept.updateDept);
  // 获取部门选择菜单
  router.get('/super/get/dept/menu', checkToken, controller.super.dept.getDeptMenu);

  // 获取所有人
  router.get('/super/get/user', checkToken, controller.super.user.getUser);
  // 添加人
  router.get('/super/add/user', checkToken, controller.super.user.addUser);
  // 修改人
  router.get('/super/update/user', checkToken, controller.super.user.updateUser);
  // 删除人
  router.get('/super/del/user', checkToken, controller.super.user.delUser);
};
