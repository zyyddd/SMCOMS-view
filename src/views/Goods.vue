<template>
  <div class="goods">
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="
        tableData.filter(
          (data) =>
            !search || data.goodname.toLowerCase().includes(search.toLowerCase())
        )"
      style="width: 100%"
    >
      <el-table-column label="商品id" prop="gid"> </el-table-column>
      <el-table-column label="商品名" prop="goodname">
          <template slot-scope="scope">
          <input type="text" v-model="scope.row.goodname" />
        </template>
      </el-table-column>
      <el-table-column label="价格" prop="price">
          <template slot-scope="scope">
          <input type="text" v-model="scope.row.price" />
        </template>
      </el-table-column>
      <el-table-column label="剩余商品数" prop="resnum">
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.resnum" />
        </template>
      </el-table-column>
      
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入商品名搜索" />
        </template>
        <template slot-scope="scope">
          <el-popconfirm
            title="确定去修改吗？"
            v-on:confirm="handleEdit(scope.$index, scope.row)"
          >
            <el-button size="mini" slot="reference">修改</el-button>
          </el-popconfirm>
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
    this.getGoodsMessage();
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
      getGoodsMessage() {
      this.axios({
        method: "get",
        url: "getallgoods",
        
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
    //修改index 为当前行的序号 row为当前行的数据
    handleEdit(index, row) {
        this.axios({
            method:'put',
            url:'/updategoods',
            // data传请求体 不要加花括号{}
            data:row,
            
            
        }).then(res =>{
            if(res.data == 1){
                console.log("修改成功")
            }
        }).catch(err =>{
            console.log(err)
        })
        this.reload();
    },
    //删除
    handleDelete(index, row) {
        this.deleteId = row.gid;
        this.axios({
            method:'delete',
            url:'/deletegoods',
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