<template>
<div class="login">
    <div class="entire">
    <div class="login-box">
        <form action="" id="form">
            <h1 style="text-align: center;color: aliceblue;">立即登录</h1>
            <p>账户:<input type="text" v-model="username" value="username"></p>
            
            <p>密码:<input type="password" v-model="password" value="password" ></p>
            <p>{{message}}</p>
            <div style="text-align: center;margin-top: 30px;">
                
                <input type="button" class="button" value="登录" @click="login">
            </div>
        </form>
    </div>

    </div>
</div>

</template> 

<script>
import "../assets/less/login.less"
    export default {
        data() {
            return {
                username:'',
                password:'',
                loginuser:[],
                message:'',
            }
        },
        methods: {
            login(){
                this.axios({
                    method:'post',
                    url:"/login",
                    params:{
                    username:this.username,
                    password:this.password
                    }
                    
                }).then(res =>{
                    if(res.data != ''){
                        this.loginuser = res.data
                        localStorage.setItem("_lk",res.data.rid)
                        localStorage.setItem("uid",res.data.uid)
                        if(this.loginuser.rid === 0){
                            this.$router.push({
                                name:"Bef_main",
                            })
                        }else if(this.loginuser.rid === 1){
                            this.$router.push({
                                name:"Checkout",
                                })
                        }
                    }
                    
                    else{
                        this.message="您输出的账号或密码错误"
                        this.username = ''
                        this.password=''
                        console.log("message",this.message)
                    }
                }).catch(err =>{
                    console.log("错误信息",err)
                })
            },

        },
    }
</script>

<style lang="less" scoped>

</style>