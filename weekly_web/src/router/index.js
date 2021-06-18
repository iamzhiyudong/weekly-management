import Vue from "vue";
import VueRouter from "vue-router";

import Index from "@/views/Index.vue";
import Home from "@/views/Home.vue";
import Tip from "@/components/HomeTip.vue";
import Submission from "@/components/overview/Submission.vue";
import ViewDay from "@/components/overview/ViewDay.vue";
import ViewWeek from "@/components/overview/ViewWeek.vue";
import DayLog from "@/components/my-day-log/DayLog.vue";
import WeekLog from "@/components/my-week-log/WeekLog.vue";
import DeptView from "@/components/dept-day/DeptView";
import DeptRead from "@/components/dept-day/DeptRead";
import DeptReadWeek from "@/components/dept-week/DeptReadWeek";
import DeptViewWeek from "@/components/dept-week/DeptViewWeek";
import Person from "@/components/person/Person";

import SuPos from '@/components/super/pos';
import SuDept from '@/components/super/dept';
import SuPerson from '@/components/super/person';
// 懒加载路由
// const Index = () => import("@/views/Index.vue");
// const Home = () => import("@/components/HomeTip.vue");
// const Tip = () => import("@/components/HomeTip.vue");
// const Submission = () => import("@/components/overview/Submission.vue");
// const ViewDay = () => import("@/components/overview/ViewDay.vue");
// const ViewWeek = () => import("@/components/overview/ViewWeek.vue");
// const DayLog = () => import("@/components/my-day-log/DayLog.vue");
// const WeekLog = () => import("@/components/my-week-log/WeekLog.vue");
// const DeptView = () => import("@/components/dept-day/DeptView");
// const DeptRead = () => import("@/components/dept-day/DeptRead");
// const DeptReadWeek = () => import("@/components/dept-week/DeptReadWeek");
// const DeptViewWeek = () => import("@/components/dept-week/DeptViewWeek");
// const Person = () => import("@/components/person/Person");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    component: Index,
  },
  {
    path: "/home",
    component: Home,
    redirect: "/home/tip",
    children: [
      {
        path: "tip",
        component: Tip,
      },
      {
        path: "/overview",
        component: Submission,
      },
      {
        path: "/view_day",
        component: ViewDay,
      },
      {
        path: "/view_week",
        component: ViewWeek,
      },
      {
        path: "/my_day",
        component: DayLog,
      },
      {
        path: "/my_week",
        component: WeekLog,
      },
      {
        path: "/dept_day",
        component: DeptView,
      },
      {
        path: "/read_day",
        component: DeptRead,
      },
      {
        path: "/dept_week",
        component: DeptViewWeek,
      },
      {
        path: "/read_week",
        component: DeptReadWeek,
      },
      {
        path: "/person",
        component: Person,
      },
      {
        path: "/su_pos",
        component: SuPos,
      },
      {
        path: "/su_dept",
        component: SuDept,
      },
      {
        path: "/su_person",
        component: SuPerson,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 放行登录页
  if (to.path === "/index") return next();
  // 没有token
  if (!window.sessionStorage.getItem("token")) return next("/index");
  next();
});

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

export default router;
