<template>
  <div class="adduser">
    <el-form ref="form" :model="addCustomer" label-width="80px" size="mini">
      <el-form-item label="vip账号">
        <el-input v-model="addCustomer.vipnum"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="addCustomer.name"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit()">立即添加会员</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addCustomer: {
        vipnum: "",
        name: "",
      },
    };
  },
  methods: {
    onSubmit() {
    if(this.addCustomer.vipnum !='' && this.addCustomer.name !='' ){
      this.axios({
        method: "post",
        url: "/addcustomer",
        data: this.addCustomer,
      })
        .then((res) => {
          if (res.data == 1) {
              this.open1();
              this.$router.push("Customer")
          }else{
              this.open2();
          }
        })
        .catch((err) => {
          console.log(err);
          this.open2();
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
          message: h('i', { style: 'color: red'}, '添加失败')
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