<template>
  <div class="adduser">
    <el-form ref="form" :model="addUser" label-width="80px" size="mini">
      <el-form-item label="账户名">
        <el-input v-model="addUser.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="addUser.password"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="addUser.name"></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-select v-model="addUser.rid" placeholder="请选择职称">
          <el-option label="管理员" value="0"></el-option>
          <el-option label="收银员" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit()">立即添加用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addUser: {
        username: "",
        password: "",
        name: "",
        rid: "",
      },
    };
  },
  methods: {
    onSubmit() {
    if(this.addUser.username !='' && this.addUser.password !='' && this.addUser.name !='' && this.addUser.rid !='' ){
      this.axios({
        method: "post",
        url: "/adduser",
        data: this.addUser,
      })
        .then((res) => {
          if (res.data == 1) {
              this.open1();
              this.$router.push("User")
          }else{
              this.open2();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }else{
        this.open3();
    }
    },
    // 添加成功提示信息
    open1() {
        const h = this.$createElement;

        this.$notify({
          title: '提示',
          message: h('i', { style: 'color: teal'}, '添加成功')
        });
    },
    open2() {
        const h = this.$createElement;

        this.$notify({
          title: '提示',
          message: h('i', { style: 'color: red'}, '添加失败,账户名重复')
        });
    },
    open3() {
        const h = this.$createElement;

        this.$notify({
          title: '提示',
          message: h('i', { style: 'color: red'}, '还有信息没有填写')
        });
    },
  },
};
</script>

<style lang="less" scoped>
.adduser {
  margin: 10px;
}
</style>