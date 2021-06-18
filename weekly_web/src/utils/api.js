import http from "./http";

// 登录
const login = (data) => {
  return http.post('/login', data);
};
// 注册
const register = (data) => {
  return http.post('/register', data);
}
// 获取功能菜单
const getHomeList = () => {
  return http.get('/get/home/list');
}

// 总体概览
// 获取日志的提交情况
const getDayOverview = () => {
  return http.get('/get/overview/day');
}
// 获取周志的提交情况
const getWeekOverview = () => {
  return http.get('/get/overview/week');
}
// 获取同部门人员列表
const getDeptPerson  = () => {
  return http.get('/get/view/dept_person');
}
// 根据id获取历史日志
const getHistoryDay = (params) => {
  return http.get('/get/view/history/day', params);
}
// 根据id获取历史周志
const getHistoryWeek = (params) => {
  return http.get('/get/view/history/week', params);
}

// 我的日志
// 获取个人历史日志
const getMyDay = () => {
  return http.get('/get/day');
}
// 是否可以添加日志
const canAddDay = () => {
  return http.get('/add/day/tag');
}
// 添加日志
const addDay = (data) => {
  return http.post('/add/day', data);
}
// 删除日志
const delDay = (params) => {
  return http.del('/del/day', params);
}
// 更新日志
const updateDay = (data) => {
  return http.put('/update/day', data);
}

// 我的周志
// 获取个人历史周志
const getMyWeek = () => {
  return http.get('/get/week');
}
// 是否可以添加周志
const canAddWeek = () => {
  return http.get('/add/week/tag');
}
// 一键生成周志
const addWeekOnekey = () => {
  return http.get('/add/week/quick');
}
// 添加周志
const addWeek = (data) => {
  return http.post('/add/week', data);
}
// 删除周志
const delWeek = (params) => {
  return http.del('/del/week', params);
}
// 更新周志
const updateWeek = (data) => {
  return http.put('/update/week', data);
}

// 部门日志
// 日志提交情况预览
const adminViewDay = () => {
  return http.get('/admin/get/view/day');
}
// 日志评阅情况预览
const adminReadDay = () => {
  return http.get('/admin/get/read/day');
}
// 评阅日志列表
const adminDayReadList = (data) => {
  return http.get('/admin/update/day/list', data);
}
// 根据日志ID获取日志详情
const adminDayDetail = (data) => {
  return http.get('/admin/get/day/detail', data);
}
// 日志评阅和取消评阅
const adminDayReadStatus = (data) => {
  return http.post('/admin/update/day/read/status', data);
}

// 部门周志
// 周志提交情况预览
const adminViewWeek = () => {
  return http.get('/admin/get/view/week');
}
// 周志评阅情况预览
const adminReadWeek = () => {
  return http.get('/admin/get/read/week');
}
// 评阅日志列表
const adminWeekReadList = (data) => {
  return http.get('/admin/update/week/list', data);
}
// 根据周志ID获取周志详情
const adminWeekDetail = (data) => {
  return http.get('/admin/get/week/detail', data);
}
// 周志评阅和取消评阅
const adminWeekReadStatus = (data) => {
  return http.post('/admin/update/week/read/status', data);
}

// 获取同部门人员列表
const adminGetDeptPerson = () => {
  return http.get('/admin/get/dept/person');
}
// 移除人员
const adminDelPerson = (data) => {
  return http.post('/admin/del/dept/person', data);
}
// 查找人员
const adminSearchPerson = (params) => {
  return http.get('/admin/get/user', params);
}
// 添加人员
const adminAddPerson = (data) => {
  return http.post('/admin/add/user', data);
}

// 个人信息
// 获取个人信息
const getUserInfo = () => {
  return http.get('/get/user/info');
}
// 修改个人信息
const updateUserInfo = (data) => {
  return http.post('/update/user/info', data);
}
// 修改密码
const updatePwd = (data) => {
  return http.post('/update/user/info/pwd', data);
}

// 获取职位信息
const getPosInfo = () => {
  return http.get('/admin/get/pos/info');
}
// 更改职位信息
const updatePosInfo = (data) => {
  return http.get('/super/update/pos', data);
}
// 删除职位信息
const delPosInfo = (data) => {
  return http.get('/super/del/pos', data);
}
// 添加职位信息
const addPosInfo = (data) => {
  return http.get('/super/add/pos', data);
}

// 获取部门信息
const getDeptInfo = () => {
  return http.get('/admin/get/dept/info');
}


// 获取所有人信息
const getAllUserInfo = () => {
  return http.get('/super/get/user');
}
// 更新人员信息
const updateSuperUserInfo = (data) => {
  return http.get('/super/update/user', data);
}
// 删除人
const delSuperUserInfo = (data) => {
  return http.get('/super/del/user', data);
}
// 删除人
const addSuperUserInfo = (data) => {
  return http.get('/super/add/user', data);
}

// 获取树形部门
const getSuperDeptInfo = () => {
  return http.get('/super/get/dept');
}
// 删除部门
const delSuperDeptInfo = (data) => {
  return http.get('/super/del/dept', data);
}
// 添加部门
const addSuperDeptInfo = (data) => {
  return http.get('/super/add/dept', data);
}
// 获取部门菜单列表
const getSuperDeptMenu = (data) => {
  return http.get('/super/get/dept/menu', data);
}
// 获取部门菜单列表
const updateSuperDept = (data) => {
  return http.get('/super/update/dept', data);
}


export default {
  login,
  getHomeList,
  register,
  getDayOverview,
  getWeekOverview,
  getDeptPerson,
  getHistoryDay,
  getHistoryWeek,
  getMyDay,
  addDay,
  canAddDay,
  delDay,
  updateDay,
  getMyWeek,
  addWeek,
  addWeekOnekey,
  canAddWeek,
  delWeek,
  updateWeek,
  adminViewDay,
  adminReadDay,
  adminDayReadList,
  adminDayDetail,
  adminDayReadStatus,
  adminViewWeek,
  adminReadWeek,
  adminWeekReadList,
  adminWeekDetail,
  adminWeekReadStatus,
  adminGetDeptPerson,
  adminDelPerson,
  adminSearchPerson,
  adminAddPerson,
  getUserInfo,
  updateUserInfo,
  updatePwd,
  getPosInfo,
  updatePosInfo,
  delPosInfo,
  addPosInfo,
  getAllUserInfo,
  getDeptInfo,
  updateSuperUserInfo,
  delSuperUserInfo,
  addSuperUserInfo,
  getSuperDeptInfo,
  delSuperDeptInfo,
  addSuperDeptInfo,
  getSuperDeptMenu,
  updateSuperDept,
}
