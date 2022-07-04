<template>
  <div class="goods">
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="
        tableData.filter(
          (data) =>
            !search || data.orderdetail.toLowerCase().includes(search.toLowerCase())
        )"
      style="width: 100%"
    >
      <el-table-column label="订单id" prop="oid"> </el-table-column>
      <el-table-column label="订单内容" prop="orderdetail"> </el-table-column>
      <el-table-column label="订单所属人(vip卡号)" prop="vipnum">
          <template slot-scope="scope">
            <p>{{scope.row.vipnum==null?"无(非vip用户)":scope.row.vipnum}}</p>
          </template>
      </el-table-column>
      
      
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入订单内容搜索" />
        </template>
        <template slot-scope="scope">
          <el-popconfirm
            title="确定删除吗？"
            value="true"
            v-on:confirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button size="mini" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  inject:['reload'],
  created() {
    this.getOrdersMessage();
  },
  data() {
    return {
      tableData: [],
      search: "",
      deleteId: 0,
      loading: true,
    };
  },
  methods:{
      getOrdersMessage() {
      this.axios({
        method: "get",
        url: "getallorder",
        
      })
        .then((res) => {
        //   console.log(res.data);
          this.tableData = res.data;
          this.loading =false
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //index 为当前行的序号 row为当前行的数据
    
    //删除
    handleDelete(index, row) {
        this.deleteId = row.oid;
        this.axios({
            method:'delete',
            url:'/deleteorders',
            // 传参数用params 加花括号
            params:{
                id:this.deleteId
            }
        }).then(res =>{
            console.log(res)
        }).catch(err =>{
            console.log(err)
        })
        this.reload();
    }
  },
  }

</script>

<style lang="scss" scoped>
</style>