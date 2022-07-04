<template>
  <div class="adduser">
    <el-form ref="form" :model="addGoods" label-width="80px" size="mini">
      <el-form-item label="商品名">
        <el-input v-model="addGoods.goodname"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="addGoods.price"></el-input>
      </el-form-item>
      <el-form-item label="商品剩余数">
        <el-input v-model="addGoods.resnum"></el-input>
      </el-form-item>
      

      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit()">立即添加商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addGoods: {
        goodname: "",
        price: "",
        resnum: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if(this.addGoods.goodname !='' && this.addGoods.price !='' && this.addGoods.resnum !='' ){
      this.axios({
        method: "post",
        url: "/addgoods",
        data: this.addGoods,
      })
        .then((res) => {
          if (res.data == 1) {
              this.open1();
              this.$router.push("Goods")
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