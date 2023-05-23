import Vue from "vue";
import VueRouter from "vue-router";
import MainPageView from "@/views/MainPageView";
import BulletinBoardView from "@/views/BulletinBoardView";
import OnlineProductView from "@/views/OnlineProductView";
import TestView from "@/views/TestView";
import AccountsView from "@/views/AccountsView";

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
  {
    path: "/finance-psychological-test",
    name: "TestView",
    component: TestView,
  },
  {  
    path: "/online-product",
    name: "AccountsView",
    component: AccountsView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
