<template>
  <div class="user">
    <!-- 表格 -->
      <el-table
      v-loading="loading"
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="用户id"
      prop="uid">
    </el-table-column>
    <el-table-column
      label="用户名"
      visEdit="true"
      prop="username">
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="name">
      <template slot-scope="scope">
          <input type="text" v-model="scope.row.name">
      </template>
    </el-table-column>
    <el-table-column
      label="角色"
      prop="rid">
      <template slot-scope="scope">
          <p>{{scope.row.rid==1?"收银员":"管理员"}}</p>
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
    


    <!-- 页码
      <el-pagination background layout="prev, pager, next" :page-size="this.pageSize" :total="this.total">
      </el-pagination> -->


  </div>

</template>


<script>
import { Header } from 'element-ui';
export default {
  inject:['reload'],
  created() {
    this.getUsermessageByPage(this.current);
  },
  data() {
    return {
      current: 1,
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
    getUsermessageByPage(current) {
      this.axios({
        method: "get",
        url: "getUsermessage",
        params: {
          current: current,
        },
      })
        .then((res) => {
        //   console.log(res.data);
          this.tableData = res.data.records;
        //   this.tableData.map(o=>{
        //       if(o.rid == 0){
        //           o.rid = "管理员"
        //       }else{
        //           o.rid = "收银员"
        //       }
        //   })
        //   this.total=res.data.total
        //   this.pageSize = res.data.size
        //   console.log(this.total)
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
            url:'/updateuser',
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
        this.deleteId = row.uid;
        this.axios({
            method:'delete',
            url:'/deleteUser',
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