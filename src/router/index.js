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
			//杨思
			{
				path: '',
				component:import('/src/components/shi/Appointment.vue'),
				name: '资源'
			},
			//易湘君
			{
				path: '/children1',
				component:import('/src/components/liang/Hetong.vue'),
				name: '房源'
			},
			//刘亮
			{
				path: '/children2',
				component:import('/src/components/liang/Hetong.vue'),
				name: '合同'
			},
			//	文丽君
			{
				path: '/leaseback',
				component:import('/src/components/li/Weixiu.vue'),
				name: '租后'
			},
			//罗佳豪
			{
				path: '/children3',
				component:import('/src/components/liang/Hetong.vue'),
				name: '财务'
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


