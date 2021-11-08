import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
//引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
//ElementUI改中文
import locale from "element-plus/lib/locale/lang/zh-cn"
//导库
import VueAxios from 'vue-axios'
import axios from 'axios'
//统一的跨域前缀
axios.defaults.baseURL = 'http://localhost:8848/';

//设置默认的请求超时时间。例如超过了5s，就会告知用户当前请求超时，请刷新等。
axios.defaults.timeout = 10000;

createApp(App).use(router).use(VueAxios,axios)
.use(ElementPlus,{locale}).mount('#app')
