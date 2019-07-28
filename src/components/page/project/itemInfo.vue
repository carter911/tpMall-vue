<template>
<div>
    
    <!-- <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-pie-chart"></i> 效果图列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div> -->
    <el-card class="box-card" style="margin-bottom:10px;">
    <div class="search">
    <el-form size='mini' :inline="true" :model="search" >
    <el-form-item label="制作者">
        <el-input v-model="search.user_name" placeholder="制作者"></el-input>
    </el-form-item>
    <el-form-item label="名称">
        <el-input v-model="search.field" placeholder="请输入名称或者编号"></el-input>
    </el-form-item>
    <el-form-item label="状态">
        <el-select v-model="search.status" placeholder="状态">
        <el-option label="制作中" value="1"></el-option>
        <el-option label="已完成" value="2"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="searchSubmit">查询</el-button>
    </el-form-item>
    </el-form>
    </div>
    <div style="clear:both">
   <el-row class="list" :gutter="30">
    <el-col class="item" :span="4" v-for="(item,key) in list" :key="key" >
    <el-card shadow="hover" :body-style="{ padding: '0px', }">
      <img style="width:100%;" :src="imageFormat(item.image)" class="image">
      <div style="padding: 10px;">
        <div class="item_name" style="">{{item.item_name}}</div>
        <div style="font-size:11px;" class="bottom clearfix">
          <time style="font-size:11px;color:red" class="time"><span style="font-size:13px;color:#000">{{item.discount_price}}¥  </span> <span style="text-decoration:line-through;color:#ccc">{{item.product_price}}¥</span></time>
          <div>
              <el-button type="text" class="button">查看</el-button>
              <el-button type="text" class="button">删除</el-button>
              <el-button type="text" class="button">下架</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
    </div>
    <div style="text-align:center">
    <el-pagination
  background
  @current-change="handleCurrentChange"
  layout="prev, pager, next"
  :page-size="search.pageIndex"
  :total="search.count">
</el-pagination>
</div>
</el-card>
</div>
</template>
<script>
    import { getItemList } from '../../../api/index';
    export default {
        name: 'basetable',
        data() {
            return {
                defaultImage:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564243194584&di=81433823ad22ccd6ef680dc6fab29f4d&imgtype=0&src=http%3A%2F%2Fimg4.99114.com%2Fgroup1%2FM00%2F65%2F96%2FwKgGTFeDV5WAVgfOAADS7djF-hg871_600_600.jpg',
                currentDate: new Date(),
                search: {
                    user_name: '',
                    field: '',
                },
                list:[]
            }
        },
        created() {
            this.getData();
        },
        computed: {
            
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.search.pageIndex = val;
                this.getData();
            },
            imageFormat(image){
                if(image){
                    return image
                }else{
                    return this.defaultImage
                }
            },
            getData() {
                getItemList(this.search).then((res) => {
                    this.list = res.data.list;
                    this.search = res.data.where;
                });
            },
            searchSubmit() {
                //this.is_search = true;
            },
            handleEdit(index, row) {
                this.idx = index;
                this.id = row.id;
                this.form = {
                    id: row.id,
                    name: row.name,
                    date: row.date,
                    address: row.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.id = row.id;
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
                if(this.tableData[this.idx].id === this.id){
                    this.$set(this.tableData, this.idx, this.form);
                }else{
                    for(let i = 0; i < this.tableData.length; i++){
                        if(this.tableData[i].id === this.id){
                            this.$set(this.tableData, i, this.form);
                            return ;
                        }
                    }
                }
            },
            // 确定删除
            deleteRow(){
                this.$message.success('删除成功');
                this.delVisible = false;
                if(this.tableData[this.idx].id === this.id){
                    this.tableData.splice(this.idx, 1);
                }else{
                    for(let i = 0; i < this.tableData.length; i++){
                        if(this.tableData[i].id === this.id){
                            this.tableData.splice(i, 1);
                            return ;
                        }
                    }
                }
            }
        }
    }

</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    }
   .search { 
        /* float: right; */
    }
    .list .item{
        margin-bottom: 30px;
    }

    .item_name{
        font-size:12px;height:66px;overflow:hidden;
    }
</style>
