<template>
  <div class="customer">
    <!-- 表格 -->
      <el-table
      v-loading="loading"
    :data="tableData.filter(
    (data) => 
      !search || data.name.toLowerCase().includes(search.toLowerCase())
    )"
    style="width: 100%">
    <el-table-column
      label="VIP账号"
      prop="vipnum">
    </el-table-column>
    
    <el-table-column
      label="姓名"
      prop="name">
      <template slot-scope="scope">
          <input type="text" v-model="scope.row.name">
      </template>
    </el-table-column>

    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入姓名搜索"/>
      </template>
      <template slot-scope="scope">
        
          <el-popconfirm title="确定去修改吗？" v-on:confirm="handleEdit(scope.$index, scope.row)">
            <el-button  
            size="mini" 
            slot="reference">修改</el-button>
          </el-popconfirm>
          <el-popconfirm title="确定删除吗？" value="true" v-on:confirm="handleDelete(scope.$index, scope.row)">
            <el-button
            size="mini"
            slot="reference"
            >删除</el-button>
          </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
    



  </div>

</template>


<script>
import { Header } from 'element-ui';
export default {
  inject:['reload'],
  created() {
    this.getCustomermessage();
  },
  data() {
    return {
      tableData: [],
    //   total:0,
    //   pageSize:0,
      search: '',
      deleteId:0,
      loading: true
      
      
      
    };
  },
  methods: {
    // 获得登录用户信息
    getCustomermessage() {
      this.axios({
        method: "get",
        url: "getcustomermessage",
        
      })
        .then((res) => {
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
            url:'/updatecustomer',
            // data传请求体 不要加花括号{}
            data:row,
            
            
        }).then(res =>{
            console.log(res.data)
            if(res.data == 1){
                
            }
        }).catch(err =>{
            console.log(err)
        })
        this.reload();
    },
    //删除
    handleDelete(index, row) {
        this.deleteId = row.vipnum;
        this.axios({
            method:'delete',
            url:'/deletecustomer',
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
};
</script>

<style lang="scss" scoped>
</style>