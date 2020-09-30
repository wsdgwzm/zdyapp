<template>
    <div>
      <div id="header">
        <span class="back" onclick="history.go(-1)"></span>
        <div class="title">登陆</div>
      </div>
      <div class="content">

        <div class="item" style="margin-top: 1.2rem;">
          <input type="text" maxlength="11" class="user" placeholder="请输入用户名" v-model="username" />
        </div>
        <div class="item">
          <input type="password"  class="psw" placeholder="请输入密码"  v-model="psw"/>
        </div>

        <div class="logBtn" @click="login()">登陆</div>
        <div class="tips " :class="checked? 'checked':''" @click="readCheckbox()">我已阅读并同意<a href="javascript:;" @click.stop="goPage('policy.html')">《隐私政策和用户注册协议》</a></div>
        <div class="log-footer">
          <a href="editPassword.html" class="btn forget">忘记密码</a>
          <a href="register.html" class="btn reg">免费注册</a>
        </div>
      </div>
    </div>
</template>

<script>
  import { reqKey, reqLogin} from "../../api";
  import layer from 'layui-layer'
  import {JSEncrypt} from 'jsencrypt'
  export default {
      data () {
        return{
          username:'',
          psw:'',
          checked:true
        }
      },
      async mounted(){

      },
      methods:{
        readCheckbox(){
          this.checked= !this.checked
        },
          goPage(u){
              window.location.href=u
          },
        encryptedData(publicKey,data){
          let encryptor= new JSEncrypt({default_key_size: 1024})
          encryptor.setPublicKey(publicKey)
          return encryptor.encrypt(data)
        },
        login(){
          reqKey().then(res =>{
            let key= res
            let username= this.encryptedData(key,this.username)
            let psw= this.encryptedData(key,this.psw)
            console.log(username)
            reqLogin(username,psw).then(res =>{
              if(res.code==1) {
                  this.$store.dispatch('getToken',res.data.token)
                this.untils.setCookie('token', res.data.token)
                this.untils.setCookie('diamonds', res.data.topupnum)
                this.$router.replace('/userCenter')
              }else{
                layer.msg(res.msg)
              }
            })
          })
        }
      }
    }
</script>

<style scoped>

  .logo{
    width: 1.1rem;
    height: 1.1rem;
    display: block;
    margin: 0.8rem auto 1rem;
  }
  .item{
    width: 6rem;
    height: 0.85rem;
    border: 1px solid #c0c0c0;
    background: #fff;
    border-radius: 0.15rem;
    margin:0 auto 0.3rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

  }
  .item input{
    border: none;
    height: 0.85rem;
    line-height: 0.85rem;
    padding-left: 0.8rem;
    outline: none;
    margin: 0;
    font-size: 0.28rem;
  }
  .item .user{
    background: url(./images/login/reg08.png) no-repeat 0.2rem center;
    background-size: 0.4rem 0.4rem;
    width: 100%;
  }
  .item .psw{
    background: url(./images/login/reg07.png) no-repeat 0.2rem center;
    background-size: 0.4rem 0.4rem;
    width: 100%;
  }

  .tips{
    margin-left: 0.75rem;
    background: url(./images/login/icon-check.png) no-repeat left center ;
    background-size: 0.3rem 0.3rem;
    padding-left: 0.45rem;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.24rem;
  }
  .tips.checked{
    background: url(./images/login/icon-checked.png) no-repeat left center ;
    background-size: 0.3rem 0.3rem;
  }
  .tips a{
    color: #cd002c;
  }

  .logBtn{
    width: 6rem;
    margin: 0.6rem auto 0.2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    background: #cd002c;
    border-radius: 0.15rem;
    text-align: center;
    color: #fff;
    font-size: 0.32rem;
  }




  .log-footer{
    margin-top: 0.7rem;
    padding: 0 0.8rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 0.6rem;
  }
  .log-footer .btn{
    width: 2rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    display: block;
    font-size: 0.3rem;
    border-radius: 0.3rem;
  }
  .log-footer .btn.forget{
    border: 1px solid #727272;
    color: #727272;
  }
  .log-footer .btn.reg{
    border: 1px solid #0088e9;
    background: #0088e9;
    color: #fff;
  }
</style>
