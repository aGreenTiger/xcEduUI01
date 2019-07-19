<template>
  <div>
    <!--编写静态页面部分，即view部分-->
    <el-button type="primary" size="small" v-on:click="query">查询</el-button>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
      </el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180">
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :current-page="params.page"
      :page-size="params.size"
      @current-change="changePage"
      style="float: right">
    </el-pagination>
  </div>
</template>
<script>
  /*编写页面的静态部分，即model,即vm部分*/
  import * as cmaApi from '../api/cms'
  export default {
    data() {
      return {
        list: [],
        total: 0,
        params: {
          page: 1,
          size: 7
        }
      }
    },
    methods:{
      query:function () {
        //请求是异步请求，服务端返回的数据会调用回调方法
        cmaApi.page_list(this.params.page,this.params.size).then((result)=>{
          //将result结果数据赋值给数据模型对象,this表示当前vue实例
          this.list = result.queryResult.list;
          this.total = result.queryResult.total;
        })
      },
      changePage:function (page) { //形参是当前页码
        this.params.page = page
        this.query()
      }
    },
    //钩子方法，当DOM元素全部渲染完成后调用狗子方法
    created(){
      this.query()
    }
  }
</script>

<style>
  /*编写页面的静态部分，不是必须的*/
</style>
