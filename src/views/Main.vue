<template>
  <div class="main">
    <el-container style="height: 730px; border: 1px solid #eee">
      <el-aside width="183px" style="background-color: rgb(238, 241, 246)">
          <!-- 默认开启的第一个第三个:default-openeds="['1', '3'] -->
        <!-- <el-menu :default-openeds="['1', '3']"> -->
        <el-menu>
          <el-submenu index="1">
            <template slot="title" ><i class="el-icon-message"></i>用户管理</template
            >
            <router-link  to="/user">
              <el-menu-item index="1-1">显示所有用户信息</el-menu-item>
            </router-link>
            <router-link to="/adduser">
              <el-menu-item index="1-2">添加用户</el-menu-item>
            </router-link>
              
            
          </el-submenu>
          
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>商品管理</template>
            <router-link to="/goods">
              <el-menu-item index="2-1">显示所有商品</el-menu-item>
            </router-link>
            <router-link to="/addgoods">
              <el-menu-item index="2-2">添加商品</el-menu-item>
            </router-link>  
            
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>订单管理</template
            >
            <router-link to="/order">
              <el-menu-item index="3-1">显示所有订单</el-menu-item>
            </router-link>  
              
          </el-submenu>
          <el-submenu index="4">
              <template slot="title"><i class="el-icon-setting"></i>会员管理</template
            >
            <router-link to="/customer">
              <el-menu-item index="4-1">显示所有会员信息</el-menu-item>
            </router-link>
            <router-link to="addcustomer">
                <el-menu-item index="4-2">添加会员</el-menu-item>
            </router-link>
              
           
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span style="margin-right:50%;font-size:large;font-weight:bold;color:black">超市收银系统</span>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="loginout">退出登录</el-dropdown-item>
              
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{usermessage.name}}</span>
        </el-header>

        
        
            <router-view/>
        

      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    this.getMain();
    var uid= localStorage.getItem("uid")
    this.getloginmessage(uid);
  },
  data() {
    
    return {
      usermessage: [],
      
      
    };
  },
  methods: {
    getMain() {
      if (localStorage.getItem("_lk") != 0) {
        return this.$router.push("Login");
      }
    },
    getloginmessage(uid) {
      this.axios({
        method: "get",
        url: "/getloginMessage",
        params: { uid: uid },
      })
        .then((res) => {
          this.usermessage = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loginout(){
        localStorage.removeItem("_lk")
        localStorage.removeItem("uid")
        this.$router.push("Login")
    }
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-submenu{
    .el-menu-item{
        min-width: 165px;
    }
}
</style>