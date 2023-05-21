import Vue from "vue";
import VueRouter from "vue-router";
import ArticleView from "@/views/ArticleView";
import CreateView from "@/views/CreateView";
import DetailView from "@/views/DetailView";
import SignUpView from "@/views/SignUpView";
import LogInView from "@/views/LogInView";
import ProductsView from "@/views/ProductsView";
import MapView from "@/views/MapView";
import ExchangeRateView from "@/views/ExchangeRateView";
import GBTIView from "@/views/GBTIView";
import TournamentView from "@/views/TournamentView";
import ProductDetailView from "@/views/ProductDetailView";
import MyPageView from "@/views/MyPageView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ArticleView",
    component: ArticleView,
  },
  {
    path: "/create",
    name: "CreateView",
    component: CreateView,
  },
  {
    path: "/signup",
    name: "SignUpView",
    component: SignUpView,
  },

  {
    path: "/login",
    name: "LogInView",
    component: LogInView,
  },

  {
    path: "/article/:id",
    name: "DetailView",
    component: DetailView,
  },
  {
    path: "/products",
    name: "ProductsView",
    component: ProductsView,
  },
  {
    path: "/product/:id",
    name: "ProductDetailView",
    component: ProductDetailView,
  },
  {
    path: "/map",
    name: "MapView",
    component: MapView,
  },
  {
    path: "/ex-rate",
    name: "ExchangeRateView",
    component: ExchangeRateView,
  },
  {
    path: "/tournament",
    name: "TournamentView",
    component: TournamentView,
  },
  {
    path: "/GBTI",
    name: "GBTIView",
    component: GBTIView,
  },
  {
    path: "/mypage",
    name: "MyPageView",
    component: MyPageView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
