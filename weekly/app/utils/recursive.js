'use strict';
// 递归
// 获取树形结构
async function Recursive(that, dept_id) {
  const res = await that.ctx.service.super.dept.getDept(dept_id);
  for (let i = 0; i < res.length; i++) {
    res[i].children = await Recursive(that, res[i].dept_id);
  }
  return res;
}
// 删除
async function RecursiveRemove(that, dept_id) {
  const res = await that.ctx.service.super.dept.getDept(dept_id);
  for (let i = 0; i < res.length; i++) {
    await RecursiveRemove(that, res[i].dept_id);
    await that.ctx.service.super.dept.delDept(res[i].dept_id);
  }
}
module.exports = {
  Recursive,
  RecursiveRemove,
};
