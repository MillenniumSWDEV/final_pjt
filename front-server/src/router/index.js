import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleView from '@/views/ArticleView'
import CreateView from '@/views/CreateView'
import DetailView from '@/views/DetailView'
// import SignUpView from '@/views/SignUpView'
// import LogInView from '@/views/LogInView'
import MapView from '@/views/MapView'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'ArticleView',
		component: ArticleView,
	},
	{
		path: '/create',
		name: 'CreateView',
		component: CreateView,
	},
	// {
	//   path: '/signup',
	//   name: 'SignUpView',
	//   component: SignUpView
	// },

	// {
	//   path: '/login',
	//   name: 'LogInView',
	//   component: LogInView
	// },

	{
		path: '/:id',
		name: 'DetailView',
		component: DetailView,
	},
	{
		path: '/map',
		name: 'MapView',
		component: MapView,
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
