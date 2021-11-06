import {createRouter,createWebHistory} from 'vue-router'

//定义组件，定义路由
const routes = [
	//	登录页面
	{
		name:'Login',
		path:'',
		component:() => import('/src/components/liang/login/index.vue'),
		meta:'登录'
	},
	{
		name:'zhuye',
		path:'/zhuye',
		component:() => import('/src/components/Home.vue'),
		meta:'主页',
		children:[
			{
				path: '/register',
				component:import('/src/components/shi/Register.vue'),
				name: '登记'
			}
		]
	}

]

//创建Router路由实例
const router = createRouter({
	history: createWebHistory(),//去除路由中的#
	routes
})

//给路由实例定义一个对外的引用（注入路由）
export default router


