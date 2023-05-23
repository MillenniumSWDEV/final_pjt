import Vue from "vue";
import VueRouter from "vue-router";
import MainPageView from "@/views/MainPageView";
import BulletinBoardView from "@/views/BulletinBoardView";
import OnlineProductView from "@/views/OnlineProductView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MainPageView",
    component: MainPageView,
  },
  {
    path: "/board",
    name: "BulletinBoardView",
    component: BulletinBoardView,
  },
  {
    path: "/online-product",
    name: "OnlineProductView",
    component: OnlineProductView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
