<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="computeTime > 0" class="get_verification"
                      :class="{right: enableClick}" @click.prevent="sendCode">{{computeTime ? `已发送(${computeTime})s`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="isPwdShow ? 'text': 'password'" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button" @click.prevent="isPwdShow = !isPwdShow" :class="isPwdShow ? 'on': '' ">
                  <div class="switch_circle" :class="isPwdShow ? 'right': ''"></div>
                  <span class="switch_text">{{isPwdShow ? 'abc' : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" ref="captcha" src="http://localhost:4000/captcha" alt="captcha" @click="sendUrlCode">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui';
import {reqSmsCode, reqLoginSms, reqLoginPwd} from '../../api'
export default {
  data () {
    return {
      loginWay: true,
      phone: '',
      code: '',
      computeTime: 0,
      name: '',
      pwd: '',
      captcha: '',
      isPwdShow: false
    }
  },
  computed: {
     enableClick () {
       return /^1\d{10}$/.test(this.phone)
     }
  },
  methods: {
    async sendCode () {
     if(this.enableClick){
       let computeTime = this.computeTime = 10
       let IntervalId = setInterval(() => {
         this.computeTime = computeTime--
         if(this.computeTime <= 0){
           this.computeTime = 0
           clearInterval(IntervalId)
         }
       },1000)
       const result =await reqSmsCode(this.phone)
       if (result.code === 0) {
         Toast('短信已发送');
       } else {
         this.computeTime = 0
         MessageBox.alert(result.msg, '提示');
       }
     }
    },
    sendUrlCode () {
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+Date.now()
    },
    alertMsg (msg) {
      MessageBox.alert(msg, '提示');
    },
    async login () {
      const {phone, code, name, pwd, captcha} = this
      let result
      if(this.loginWay){ // 短信验证
       if(!this.enableClick){
         this.alertMsg('请输入正确格式手机号')
         return
       } else if (!/^\d{6}$/.test(this.code)) {
         this.alertMsg('请输入正确验证码')
         return
       }
       result = await reqLoginSms({phone, code})
      } else { //密码验证
        if(!this.name){
          this.alertMsg('请输入用户名')
          return
        } else if (!this.pwd) {
          this.alertMsg('请输入密码')
          return
        } else if (!this.captcha) {
          this.alertMsg('请输入图片验证码')
          return
        }
        result = await reqLoginPwd({name, pwd, captcha})
      }
      if(result.code === 0) {
        this.$store.dispatch('saveUser', result.data)
        this.$router.replace('/profile')
      } else {
        this.computeTime = 0
        this.alertMsg(result.msg)
        this.sendUrlCode()
      }
    }
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
