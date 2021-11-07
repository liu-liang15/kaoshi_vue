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
				path: '/appointment',
				component:import('/src/components/si/Appointment.vue'),
				name: '客户一览'
			},
			{
				path: '/forwardShow',
				component:import('/src/components/si/ForwardShow.vue'),
				name: '预约一览'
			},{
			 	path: '/supre',
			 	component:import('/src/components/si/Supre.vue'),
			 	name: '客源新增'
			  },{
			 	path: '/supred',
			 	component:import('/src/components/si/SuPred.vue'),
			 	name: '预定'
			  },
			  {
			  	 path: '/yy',
			  	 component:import('/src/components/si/YY.vue'),
			  	 name: '预约弹框'
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


