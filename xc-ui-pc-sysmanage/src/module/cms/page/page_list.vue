<template>
  <div>
    <!--编写静态页面部分，即view部分-->
    <!-- 查询表单 -->
    <el-form :model="params">
      <el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option
        v-for="item in siteList"
        :key="item.siteId"
        :label="item.siteName"
        :value="item.siteId">
        </el-option>
      </el-select>
      页面别名：<el-input v-model="params.pageAliase" style="width:100px"></el-input>
      <el-button type="primary" size="small" v-on:click="query">查询</el-button>
      <!-- router-link相当于a标签，后边的to是路由地址 -->
      <router-link :to="{path:'/cms/page/add',query:{
        page:this.params.page,
        siteId:this.params.siteId
      }}">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>
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
      <el-table-column label="操作" width="80">
        <template slot-scope="page">
          <el-button size="small" type="text"
          @click="edit(page.row.pageId)">编辑
          </el-button>
          <el-button size="small" type="text"
          @click="del(page.row.pageId)">删除
          </el-button>
        </template>
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
  import * as cmsApi from '../api/cms'
  export default {
    data() {
      return {
        siteList:[],//站点列表
        list: [],
        total: 0,
        params: {
          page: 1,
          size: 7,
          siteId: '',
          pageAlise: ''
        }
      }
    },
    methods:{
      //页面查询
      query:function () {
        //请求是异步请求，服务端返回的数据会调用回调方法
        cmsApi.page_list(this.params.page,this.params.size,this.params).then((result)=>{
          //将result结果数据赋值给数据模型对象,this表示当前vue实例
          this.list = result.queryResult.list;
          this.total = result.queryResult.total;
        })
      },
      changePage:function (page) { //形参是当前页码
        this.params.page = page
        this.query()
      },
      querySite:function(){
        cmsApi.site_list().then((result) =>{
          this.siteList = result.queryResult.list
        })
      },
      edit:function(pageId){
        //该方法打开修改页面（更改路由）
        this.$router.push({
          path:'/cms/page/edit/'+ pageId,
          query:{
            page:this.params.page,
            siteId:this.params.siteId
          }
        })
      },
      del:function(pageId){
        this.$confirm('确认删除吗？', '提示', {}).then(()=>{
            cmsApi.page_del(pageId).then((result)=>{
              //解析服务端的相应内容
              if(result.success){
                this.$message.success("删除成功")
                this.query()
              }else{
                this.$message.error("删除失败")
              }
            })
        })
      }
    },
    //当DOM元素还没有渲染时调用钩子方法
    created(){
      //获取当前路由中的参数，赋值给数据对象，地址栏中取出的字符串要抓换成数字，没有的话转换成1，防止路由中没有该参数，转换时失败报错
      this.params.page = Number.parseInt(this.$route.query.page || 1)
      this.params.siteId =  this.$route.query.siteId || ''
    },
    //钩子方法，当DOM元素全部渲染完成后调用狗子方法
    mounted(){
      this.query()
      //初始化站点列表
      this.querySite()
    }
  }
</script>

<style>
  /*编写页面的静态部分，不是必须的*/
</style>
