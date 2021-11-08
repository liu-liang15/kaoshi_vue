<template>
 
  <el-container>
		<el-header>首页部分</el-header>
		 <el-container>
			<!-- 菜单区 -->
			<el-aside width="200px">
				 <el-menu :uniqueOpened="true" default-active="1" class="el-menu-vertical-demo" @open="handleOpen"
					@close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
					<el-submenu index="1">
						<!-- 标题插槽完整版 -->
						<template #title>
							<i class="el-icon-location"></i><!-- 图标 -->
						 </template>
						<el-menu-item index="1-1">新增部门</el-menu-item>
						<el-menu-item index="1-2">编辑部门</el-menu-item>
						<el-submenu index="1-4">
							<!-- 标题插槽迷你版 没有图标-->
							<template #title>部门权限</template>
							<el-menu-item index="1-4-1">新增角色</el-menu-item>
						</el-submenu>
					</el-submenu>
				   <el-submenu>
					   <el-menu-item index="2">
						   <router-link to="/appointment">客源管理</router-link>
					 </el-menu-item>
					 <el-menu-item index="3">
					 		  <router-link to="/yy">预约弹框</router-link>
					 </el-menu-item>
					 <el-menu-item index="4">
					 		  <router-link to="/supred">客源新增弹框</router-link>
					 </el-menu-item>
					 <el-menu-item index="5">
					 		  <router-link to="/supre">新增预定</router-link>
					 </el-menu-item>
					  <el-menu-item index="6">
					 		  <router-link to="/forwardShow">预约一览</router-link>
					 </el-menu-item>
					 </el-submenu>
				 </el-menu>
			</el-aside>
			<el-container>
				 <router-view />
				<el-main>
				</el-main>
				<el-footer>
					底部底部
				</el-footer>
			</el-container>
		</el-container>
	</el-container>
 
 
  <el-container style="height: 100vh">
    <el-header class="bjtp">
      <img src="public/xhzf.jpg" style="height: 60px;float: left;display: inline-block">
      <h1 style="position: absolute;left: 140px; font-size: 20px;"> 象 盒 找  房 - - - - - 找 房 大 平 台</h1>

      <el-menu class="el-menu-demo">
        <el-dropdown>
        <span class="el-dropdown-link" style="color: black;font-size: 16px;">
           刘 亮
        </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="drawer = true">修改密码</el-dropdown-item>
              <el-dropdown-item  @click="logout()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-menu>

      <el-menu class="el-menu-demo">
        <el-dropdown>
        <span class="el-dropdown-link" style="color: black;font-size: 16px;">
           <el-button icon="el-icon-search" circle></el-button>
        </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="drawer = true">房源录入</el-dropdown-item>
              <el-dropdown-item  @click="logout()">合同录入</el-dropdown-item>
              <el-dropdown-item  @click="logout()">添加预订</el-dropdown-item>
              <el-dropdown-item  @click="logout()">添加记账</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-menu>
      
    </el-header>

    <el-container>

      <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo" >
        <router-link  :to="{path:'/zhuye'}">
          <el-menu-item index="1">
            <template #title > 客 源 </template>
          </el-menu-item>
        </router-link>


        <router-link  :to="{path:'/children1'}">
          <el-menu-item index="2">
            <template #title> 房 源 </template>
          </el-menu-item>
        </router-link>

        <router-link  :to="{path:'/children2'}">
          <el-menu-item index="3">
            <template #title> 合 同 </template>
          </el-menu-item>
        </router-link>

        <router-link  :to="{path:'/leaseback'}">
          <el-menu-item index="4">
            <template #title> 租 后 </template>
          </el-menu-item>
        </router-link>


        <router-link  :to="{path:'/children3'}">
          <el-menu-item index="5">
            <template #title> 财 务 </template>
          </el-menu-item>
        </router-link>

      </el-menu>






      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <el-drawer
      v-model="drawer"
      title="修改密码"
      :direction="direction"
  >
    <div class="drawer2">
      <el-form :model="loginForm" >
        <el-form-item prop="password">
        <span class="svg-container">
          请输入原密码
        </span>
          <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.yhKey"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="password">
        <span class="svg-container">
          新密码
        </span>
          <el-input
              :key="passwordType"
              ref="password"
              v-model="password1"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              auto-complete="on"
          />
        </el-form-item>
        <el-form-item prop="password">
        <span class="svg-container">
          确认新密码
        </span>
          <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.yhMm"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              auto-complete="on"
          />
          <span v-show="err" style="color: red">{{tishi}}</span>
        </el-form-item>
        <el-button :loading="loading" style="width:100%;margin-bottom:30px;" @click="updatepsw()" >确认修改</el-button>
      </el-form>
    </div>
  </el-drawer>
 
</template>

<script>
import { defineComponent, ref } from 'vue'
import { ElNotification } from 'element-plus'

export default{
  setup() {
    const open1 = () => {
      ElNotification({
        title: '提示',
        message: '修改成功！',
        type: 'success',
      })
    }
    const open4 = () => {
      ElNotification({
        title: '错误',
        message: '原密码错误！',
        type: 'error',
      })
    }
    const drawer = ref(false)
    const direction = ref('rtl')
    return {
      open1,
      open4,
      drawer,
      direction,
    }
  },
  data() {
    return {
      // 原密码
      password: '',
      // 密码的提示
      tishi: '',
      //提示是否显示
      err: false,
      passwordType: 'password',
      //新密码的框
      password1: '',
      loginForm: {
        yhKey: '',
        ygId: '',
        yhMm: ''
      },
      yonghu:{},
      ly: []
    }
  },
  methods: {
    updatepsw(){
      if (this.loginForm.yhMm.length<5){
        this.tishi="密码长度不能小于5！"
        this.err=true
        return
      }
      if (this.loginForm.yhMm !== this.password1){
        this.err=true
        this.tishi="两次密码输入不一致！"
        return
      }
      this.loginForm.ygId=this.yonghu.ygId
      this.axios.post("system/xgmm",this.loginForm).then(
          responsee => {
            if (responsee.data.code === 200){
              this.open1()
              this.logout()
            }else{
              this.open4()
            }
            this.err=false
          })
    },
    //获取动态 菜单栏
    add() {
      this.ly = this.$store.state.children;
    },
    //退出登录
    logout() {
      this.$router.push('/login')
    }
  },
  created() {

  }
}
</script>


<style>
.bjtp{
  /*width: 60px;*/
  /*height: 100%;*/
  /*position: absolute;*/
  /*left:0px;*/
  /*top:0px;*/

  /*transform:rotate(270deg);*/
  background-size:100% 100%;
  background-attachment:fixed;
}

.el-menu-demo {
  width: 100px;
  float: right;
  background: rgba(255,193,7, 0);
}

.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  /* background-color: #D3DCE6; */
  color: #333;
  height: 574px;
  text-align: left;
  float: left;
}

.el-aside .el-menu .el-submenu .el-menu-item-group .el-menu-item li {
  list-style: none;
  padding: 10px 15px
}

.el-aside .el-menu .el-submenu .el-menu-item-group .el-menu-item li a {
  color: black;
  text-decoration: none;
}

.el-aside .el-menu .el-submenu .el-menu-item-group a {
  color: black;
  text-decoration: none;
}

.el-aside .el-menu .el-submenu .el-menu-item-group .el-menu-item li:hover a {
  color: darkslateblue;
}

.el-main {
  background-color: #E9EEF3;
  /* color: #333;
  text-align: center;
  line-height: 400px; */
}

.el-submenu .el-menu-item {
  height: 50px;
  line-height: 29px;
  padding: 0 45px;
  min-width: 200px;
}

.elformbd .el-row .el-col .el-form-item .el-form-item__label {
  width: 80px;
}

.bjtp{
  background-color: white;
}
.drawer2{
  margin-left: 100px;
  width: 300px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100px;
  min-height: 400px;
}
.router-link-active {
  text-decoration: none;
}
a {
  text-decoration: none;
}
</style>

