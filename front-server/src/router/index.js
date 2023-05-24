import Vue from "vue";
import VueRouter from "vue-router";
import MainPageView from "@/views/MainPageView";
import BulletinBoardView from "@/views/BulletinBoardView";
import OnlineProductView from "@/views/OnlineProductView";
import FinTestView from "@/views/FinTestView";
import LoginView from "@/views/LoginView";
import SignupView from "@/views/SignupView";
import DetailView from "@/views/DetailView";
import CreateView from "@/views/CreateView";
import MyCartView from "@/views/MyCartView";

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
    name: "FinTestView",
    component: FinTestView,
  },
  {
    path: "/Login",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/Signup",
    name: "SignupView",
    component: SignupView,
  },
  {
    path: "/detail/:articleId",
    name: "DetailView",
    component: DetailView,
    props: true,
  },
  {
    path: "/create",
    name: "CreateView",
    component: CreateView,
    props: true,
  },
  {
    path: "/MyCart",
    name: "MyCartView",
    component: MyCartView,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
