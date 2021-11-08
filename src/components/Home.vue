<template>

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
              <el-dropdown-item  @click="centerDialogVisible=!centerDialogVisible">合同录入</el-dropdown-item>
              <el-dropdown-item  @click="logout()">添加预订</el-dropdown-item>
              <el-dropdown-item  @click="logout()">添加记账</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-menu>
      <!--        ================      -->
    </el-header>

    <el-container>

      <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"

      >
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

  <!--  修改密码的弹框 -->
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

  <!--  录入合同的弹框  -->
  <el-dialog
      title="录入合同"
      v-model="centerDialogVisible"
      width="58%"
      destroy-on-close
      center
  >
    <el-form
        :model="heTongBd"
        ref="ruleForm"
        class="demo-ruleForm"
    >
      <el-radio-group v-model="radio222">
        <el-radio :label="0">已签纸质合同</el-radio>
      </el-radio-group>
      <el-form-item label="请选择房屋">
        <!--        <el-autocomplete-->
        <!--            v-model="heTongBd.fwId"-->
        <!--            :fetch-suggestions="querySearchAsync"-->
        <!--            placeholder="请输入内容"-->
        <!--            @select="handleSelect"-->
        <!--        ></el-autocomplete>-->
        <el-input v-model="heTongBd.fwId" style="width: 240px" placeholder="智能搜索" size="small"></el-input>
      </el-form-item>
      <el-form-item label="承租人:"><br/>
        <el-input v-model="heTongBd.czrPojo.name" style="width: 240px" placeholder="姓名" size="small"></el-input>
        <el-input v-model="heTongBd.czrPojo.phone" style="width: 240px" placeholder="电话" size="small"></el-input>
        <el-input v-model="heTongBd.czrPojo.sfz" style="width: 240px" placeholder="身份证" size="small"></el-input>
      </el-form-item>
      <el-button type="text" icon="el-icon-plus" @click="addTable()">添加同住人</el-button>
      <el-table v-show="bgxs" :data="heTongBd.czrs" >
        <el-table-column label="姓名" align="center">
          <template #default="scope">
            <el-input v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="电话" align="center">
          <template #default="scope">
            <el-input v-model="scope.row.phone"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="身份证" align="center">
          <template #default="scope">
            <el-input v-model="scope.row.sfz"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--      入住人表格结束   -->
      <el-form-item label="合同信息:"><br/>
        <div class="block">
          <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="提前付款天数:">
        <el-input v-model="heTongBd.tqfk" style="width: 40px" size="small"></el-input> 天
      </el-form-item>
      <div style="width: 100%;padding-left: 40%">
        <el-button style="width:100px;margin-bottom: 30px" @click="xzht()" >确认</el-button>
      </div>
    </el-form>

  </el-dialog>



</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { ElNotification } from 'element-plus'

export default{
  setup() {
    const open1 = () => {
      ElNotification({
        title: '提示',
        message: '成功！',
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
      shortcuts: [
        {
          text: '最近一周',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          },
        },
        {
          text: '最近一个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          },
        },
        {
          text: '最近三个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          },
        },
      ],
      value1: '',
      //表格是否显示
      bgxs: false,
      //合同上面的单选框
      radio222:0,
      heTongBd: {
        //主键
        "zjId": 0,
        //合同编号
        "htId": "HT20211106118848",
        // 房屋的ID
        "fwId": "",
        //签合同的人
        "czrPojo": {
          "rzId": null,
          "name": "",
          "phone": "",
          "sfz": "",
        },
        "htksSj": "2021-11-04 14:43:05",
        "htdqSj": "2022-05-13 14:43:09",
        "zhuJing": 8600.00,
        "yaJing": 2000.00,
        "tqfk": 3,
        "zhuangTai": "0",
        //成交的员工
        "cjr": {
          "kySurepreYg": null,
          "ygId": 1108,
          "ygName": "刘亮",
          "password": null,
          "gwId": null
        },
        "czrs": [],
        //  签约的时间
        "qysj": "2021-11-01 11:16:54",
        //房源实体
        "fyHousing": {
          "houseId": 1,
        }
      },
      //合同录入的框
      centerDialogVisible: false,
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
    xzht(){
      this.centerDialogVisible=false;
      this.heTongBd.htksSj=this.value1[0].getFullYear() + "-" + (this.value1[0].getMonth() + 1) + "-" + this.value1[0].getDate();
      this.heTongBd.htdqSj=this.value1[1].getFullYear() + "-" + (this.value1[1].getMonth() + 1) + "-" + this.value1[1].getDate();
      this.axios.post("xzHeTong",this.heTongBd).then(req => {
        console.log(req.data)
      })
      this.open1()
    },
    //同住人新增一行
    addTable() {
      this.bgxs=true;
      let htRuZhur = {
        "name": "",
        "phone": "",
        "sfz": "",
        "fjId" : ''

      }
      this.heTongBd.czrs.push(htRuZhur);

    },
    //车辆删除一行
    handleDelete(index, row) {
      console.log(index, row);
      this.heTongBd.czrs.splice(index, 1);
    },
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
      this.$router.push('/')
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

.el-submenu {
  height: 50px;
  line-height: 29px;
  padding: 0 45px;
  min-width: 200px;
}


.bjtp{
  background-color: white;
}
.drawer2{
  margin-left: 20px;
  width: 300px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100px;
  min-height: 400px;
}
a {
  text-decoration: none;
}
</style>

