<template>
  <div class="login-container" >
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">

      <div class="title-container">
        <h3 class="title">太 极 找 房</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          账号
        </span>
        <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          密码
        </span>
        <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
        />
        <i slot="suffix"
           :class="[flag?'el-icon-minus':'el-icon-view']"
           style="margin-top:8px;font-size:18px;"
           @click="showPwd" />
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click="handleLogin()" >登录</el-button>

    </el-form>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  setup() {
    const open4 = () => {
      ElMessage.error('密码错误！')
    }
    return {
      open4,
    }
  },

  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
        callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能少于5位'))
      } else {
        callback()
      }
    }
    return {
      flag: '',
      loginForm: {
        username: '1003',
        password: 'aaaaa'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  created() {
    //清空sessionStorage
    // this.$store.state.token = ''
    // this.$store.state.children = undefined
    // sessionStorage.removeItem("token")
  },
  methods: {
    showPwd() {
      this.flag=!this.flag
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.axios.post('system/user/login', { ygId: this.loginForm.username, yhMm: this.loginForm.password })
              .then(responsee => {
                if (responsee.status === 201){
                  ElMessage.error(responsee.data)
                  this.loading = false
                  return
                }
                if(responsee.data.code === 200){
                  this.$store.state.token = responsee.data.data;
                  sessionStorage.setItem("token",JSON.stringify(responsee.data.data))
                  //存state
                  this.$router.push('/home')
                }else if(responsee.data.code === 300){
                  this.open4()
                }
                this.loading = false
              }
          )
        } else {
          console.log('提交失败!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
}
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  //height: 897px;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#eee;
$light_gray:#000;
.login-container {
  width: 100%;
  height: 100%;
  background-color: $bg;
  position: absolute;
  background-size:100% 100%;
  background-attachment:fixed;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 30px;
      color: white;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
