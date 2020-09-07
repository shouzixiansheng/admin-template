<template>
  <div class="login">
    <!-- <my-header class="my-header"></my-header> -->
    <div class="login-panel">
      <h2 class="tc">管理员登录</h2>
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="手机号登陆" name="first"></el-tab-pane>
        <el-tab-pane label="用户名登陆" name="second"></el-tab-pane>
      </el-tabs> -->
      <el-form :model="form" ref="form" class="mt20">
        <el-form-item v-if="activeName === 'first'" prop="phone" :rules="{validator:validator_phone,trigger:'blur'}">
          <el-input v-model="form.phone" type="number" placeholder="手机号">
            <template slot="prepend">
              <img :src="require('@/assets/images/phone.png')" width="15" height="15">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="activeName === 'second'" prop="username" :rules="{required:true,validator:validator_username,trigger:'blur'}">
          <el-input v-model="form.username" placeholder="用户名">
            <template slot="prepend">
              <img :src="require('@/assets/images/user.png')" width="15" height="15">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" :rules="{required:true,message:'请输入密码',trigger:'blur'}">
          <el-input   :type="pwdType" @keyup.enter.native="submit('form')"  v-model="form.password" placeholder="密码">
            <template slot="prepend">
              <img :src="require('@/assets/images/pass.png')" width="15" height="15">
            </template>
            <span  slot='suffix'  class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-input>
        </el-form-item>
        <el-form-item v-if="isBindGoogleCode" prop="code" :rules="{required:true,message:'请输入谷歌验证码',trigger:'blur'}">
          <el-input type="code" v-model="form.code" placeholder="谷歌验证码">
            <template slot="prepend">
              <img :src="require('@/assets/images/auth.png')" width="15" height="15">
            </template>
          </el-input>
        </el-form-item>
        <!-- <el-form-item prop="image_code" :rules="{required:true,message:'请输入验证码',trigger:'blur'}">
          <el-input v-model="form.image_code" placeholder="验证码" class="w320">
            <template slot="prepend">
              <img :src="require('@/assets/images/pass.png')" width="15" height="15">
            </template>
          </el-input>
          <img :src="imgSrc" class="pointer imgsize" @click="getImageCode" />
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="submit('form')" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <my-footer class="my-footer"></my-footer> -->
  </div>
</template>
<script>
import MyHeader from '@/components/MyHeader'
import MyFooter from '@/components/MyFooter'
import { getChannelTypeList } from '@/api/public'
import { totpCheckUserName } from '@/api/system'
import * as s from '@/utils/sessionStorage'
// import { getUserCurrent } from '@/api/public'
import { login } from '@/api/login'
export default {
  name: 'login',
  components: {
    MyHeader, MyFooter
  },
  data() {
    return {
      activeName: 'second',
      imgSrc: '',
      loading: false,
      isBindGoogleCode: false,
      form: {
        username: '',
        password: '',
        code: ''
      },
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    async getChannelTypeList() {
      const res = await getChannelTypeList()
      s.set('filterChannels', res.data)
    },
    getImageCode() {
      this.imgSrc = `/api/user-center/v1.0/captcha/image/code?width=110&height=35&nonce=${new Date().getTime()}`
    },
    async login() {
      try {
        this.loading = true
        const res = await login({ ...this.form })
        this.$store.commit('setIsBindGoogleCode', this.isBindGoogleCode)
        await this.$store.dispatch('setUserInfo', res.data).then(() => {
          this.getChannelTypeList()
          if (this.$route.path === '/login' || !this.$route.meta.roles.includes(res.data.userInfo.type)) {
            this.$router.push('/')
          }
        })
      } catch (error) {
        this.loading = false
      }
    },
    handleClick() {
      this.$refs.form.resetFields()
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },
    async validator_username(rule, value, callback) {
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入用户名'))
      } else {
        await totpCheckUserName(this.form.username).then(res => {
          this.isBindGoogleCode = res.data.success
          callback()
        })
      }
    }
  },
  created() {
    this.getImageCode()
  },
  mounted() { }
}
</script>
<style lang='less'>
.login {
  width: 100%;
  height: 100%;
  // height: calc(100% - 60px);
  // margin-bottom: 60px;
  position: relative;
  background: url('../../assets/images/2.png') no-repeat;
  background-size: 100% 100%;
  // background-color: #2d3a4b;
}

.login-panel {
  position: absolute;
  top: 40%;
  // right: 0;
  left: 50%;
  // bottom: 0;
  width: 520px;
  padding: 35px 35px 15px 35px;
  transform: translate(-50%, -50%);
  // margin: 120px auto;
  background-color: #fff;
  border-radius: 15px;
  // box-shadow: rgba(255, 255, 255, 0.3) 0px 0px 15px 6px;
  .el-menu--horizontal > .el-menu-item {
    text-align: center;
    width: 50%;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    color: #ffcf98;
  }
  .el-tabs__item {
    width: 225px;
    text-align: center;
  }
}
.imgsize {
  width: 100px;
  height: 38px;
  border: 1px solid #eee;
}
.my-footer {
  position: absolute;
  left: 0;
  bottom: -60px;
  right: 0;
  z-index: 100;
}
.show-pwd {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}
</style>
