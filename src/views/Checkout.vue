<template>
  <div class="checkout">
    <el-header style="text-align: right; font-size: 12px">
      <span
        style="
          margin-right: 50%;
          font-size: large;
          font-weight: bold;
          color: black;
        "
        >超市收银系统</span
      >
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="loginout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>你好，{{ usermessage.name }}</span>
    </el-header>


    <el-row style="float:left">
      <el-button style="margin:10px" type="primary"  round @click="dialogFormVisible1 = true">输入会员卡号</el-button>
      <el-dialog title="会员卡卡号" :visible.sync="dialogFormVisible1">
        <el-form >
          <el-form-item label="请输入卡号" label-width="120px">
            <el-input v-model="vipnum" autocomplete="off"></el-input>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="selectvipnum()"
            >确 定</el-button>
        </div>
        </el-dialog>
      <span>尊贵的会员：{{vipname}}</span>

      <el-button  style="margin:10px;margin-left:250px" type="primary" round @click="dialogFormVisible2 = true">添加商品</el-button>
        <el-dialog title="添加商品" :visible.sync="dialogFormVisible2">
        <el-form >
          <el-form-item label="请输入商品id" label-width="120px">
            <el-input v-model="gid" autocomplete="off"></el-input>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="addGoodsToTable()"
            >确 定</el-button>
        </div>
        </el-dialog>


    </el-row>



    <el-table :data="tableData" height="500px" border style="width: 100%">
      <el-table-column prop="gid" label="商品id"> </el-table-column>
      <el-table-column prop="goodname" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column values label="商品数量">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.number" @keyup="sumPrice()" />
        </template>
      </el-table-column>
      <el-table-column  label="该商品总价格">
        <template slot-scope="scope">
          <p>{{scope.row.price * scope.row.number}}</p>
        </template>
      </el-table-column>
    </el-table>
    <h1 style="color:red;text-align:left">所有商品总价格:{{allprice}}</h1>
    <el-button round  type="primary" @click="checkout()">结算</el-button>
  </div>
</template>

<script>
export default {
  created() {
    this.getCheckout();
    var uid = localStorage.getItem("uid");
    this.getloginmessage(uid);
  },
  data() {
    return {
      tableData: [],
      usermessage: [],
      vipnum: "",
      vipname:"",
      gid:"",
      allprice:0,
      dialogFormVisible1:false,
      dialogFormVisible2:false,
    };
  },
  methods: {
    getCheckout() {
      if (localStorage.getItem("_lk") != 1) {
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
          console.log(this.usermessage);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //输入顾客的会员卡卡号
    selectvipnum(){
        this.axios({
            method:'get',
            url:'selectvipnum',
            params:{
                vipnum:this.vipnum
            }
        }).then(res =>{
            console.log(res)
            if(res.data != ''){
                this.vipname = res.data.name
                this.open1();
                this.dialogFormVisible1 = false;
            }else{
                this.vipnum = '';
                this.vipname = '';
                this.open2();
            }
        }).catch(err =>{
            console.log(err)
        })
    },
    //添加商品
    addGoodsToTable(){
        this.axios({
            method:'get',
            url:'selectgoods',
            params:{
                gid:this.gid
            }
        }).then(res =>{
            if(res.data != ''){
                this.tableData.push(res.data);
                this.gid = "";
                this.open3();
                this.dialogFormVisible1 = false;
                this.sumPrice();
            }else{
                this.gid = "";
                this.open4();
            }
            
        }).catch(err =>{
            this.open4();
            console.log(err)
        })
    },
    //计算总商品价格
    sumPrice(){
        let allprice = 0;
        this.tableData.map(o =>{
            let sumprice = o.price * o.number;
            allprice = allprice + sumprice;
        })
        this.allprice = allprice;
    },
    //结账
    checkout(){
        if(this.tableData != '' && this.tableData !=null){
           this.axios({
            method:'post',
            url:'/addorder',
            data:this.tableData,
            params:{
                vipnum:this.vipnum
            }
        }).then(res =>{
            if(res.data == 1){
                this.open5();
                this.tableData = [];
                this.vipnum = '';
                this.vipname = '';
                this.allprice = 0;
            }else{
                
            }
        }).catch(err =>{
            console.log(err)
        }) 
        }else{
            alert("没有任何商品需要结算")
        }
        
    },



    loginout() {
      localStorage.removeItem("_lk");
      localStorage.removeItem("uid");
      this.$router.push("Login");
    },
    //输入vip卡号后相应情况响应
    open1() {
        const h = this.$createElement;

        this.$notify({
          title: '提示',
          message: h('i', { style: 'color: red'}, '会员卡号查找成功')
        });
    },
    open2() {
        const h = this.$createElement;

        this.$notify({
          title: '提示',
          message: h('i', { style: 'color: red'}, '不存在该vip')
        });
    },
    //输入商品后相应情况响应
    open3() {
        const h = this.$createElement;

        this.$notify({
          title: '提示',
          message: h('i', { style: 'color: red'}, '添加商品成功')
        });
    },
    open4() {
        const h = this.$createElement;

        this.$notify({
          title: '提示',
          message: h('i', { style: 'color: red'}, '不存在该商品')
        });
    },
    //添加账单成功提示
    open5() {
        const h = this.$createElement;

        this.$notify({
          title: '提示',
          message: h('i', { style: 'color: red'}, '添加账单成功')
        });
    },
    open6() {
        const h = this.$createElement;

        this.$notify({
          title: '提示',
          message: h('i', { style: 'color: red'}, '失败失败失败')
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>