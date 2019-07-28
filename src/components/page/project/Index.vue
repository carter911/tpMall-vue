<template>
    <div>
        <el-card class="box-card" style="margin-bottom:10px;">
            <div class="search">
                <el-form size="mini" :inline="true" :model="search">
                    <el-form-item label="商品名称">
                        <el-input
                            v-model="search.where.item_name"
                            placeholder="商品名称"
                        >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select
                            v-model="search.where.status"
                            placeholder="状态"
                        >
                            <el-option label="制作中" value="1"></el-option>
                            <el-option label="已完成" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchSubmit"
                            >查询</el-button
                        >
                    </el-form-item>
                    <div style="float:right">
                        <i
                            @click="showMode = 'list'"
                            v-show="this.showMode == 'view'"
                            style="font-size:18px;color:#67C23A"
                            class="el-icon-s-data"
                        >
                            列表模式</i
                        >
                        <i
                            @click="showMode = 'view'"
                            v-show="this.showMode == 'list'"
                            style="font-size:18px;color:#67C23A"
                            class="el-icon-menu"
                        >
                            九宫格模式</i
                        >
                    </div>
                </el-form>
            </div>
            <div style="clear:both">
                <el-row
                    v-if="this.showMode == 'view'"
                    class="list"
                    :gutter="30"
                >
                    <el-col
                        class="item"
                        :span="4"
                        v-for="(item, key) in list"
                        :key="key"
                    >
                        <el-card
                            shadow="hover"
                            :body-style="{ padding: '0px' }"
                        >
                            <img
                                style="width:100%;"
                                :src="imageFormat(item.image)"
                                class="image"
                            />
                            <div style="padding: 10px;">
                                <div class="item_name" style="">
                                    {{ formatGoodsName(item.item_name) }}
                                </div>
                                <div
                                    style="font-size:11px;"
                                    class="bottom clearfix"
                                >
                                    <time
                                        style="font-size:11px;color:red"
                                        class="time"
                                        ><span style="font-size:13px;color:#000"
                                            >{{ item.discount_price }}¥
                                        </span>
                                        <span
                                            style="text-decoration:line-through;color:#ccc"
                                            >{{ item.product_price }}¥</span
                                        ></time
                                    >
                                    <p style="text-align:left">
                                        <el-button type="text" class="button"
                                            >编辑</el-button
                                        >
                                        <el-button type="text" class="button"
                                            >删除</el-button
                                        >
                                        <el-button type="text" class="button"
                                            >下架</el-button
                                        >
                                    </p>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-table
                    v-if="this.showMode == 'list'"
                    :data="list"
                    class="table"
                    ref="multipleTable"
                >
                    <el-table-column
                        type="selection"
                        width="55"
                        align="center"
                    ></el-table-column>
                    <el-table-column prop="image" label="图片" width="80">
                        <template slot-scope="scope">
                            <img
                                style="height:60px;width:60px;"
                                :src="scope.row.image"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="item_name"
                        label="商品"
                        sortable
                        width="300"
                    >
                        <template slot-scope="scope">
                            <p>{{ formatGoodsName(scope.row.item_name) }}</p>
                            <p>
                                <span style="color:red;font-size:13px;"
                                    >¥{{ scope.row.discount_price }}</span
                                >
                                &nbsp;
                                <span
                                    style="color:#ccc;text-decoration:line-through;font-size:11px;"
                                    >¥{{ scope.row.product_price }}</span
                                >
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="stock" label="库存" width="100">
                    </el-table-column>
                    <el-table-column prop="look_num" label="访问量" width="100">
                    </el-table-column>
                    <el-table-column
                        prop="base_sales"
                        label="总销量"
                        width="100"
                    >
                    </el-table-column>
                    <el-table-column prop="create_time" label="创建/更新时间">
                        <template slot-scope="scope">
                            <p>{{ scope.row.create_time }}</p>
                            <p>{{ scope.row.update_time }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sale_num" label="总销量">
                        <template slot-scope="scope">
                            <el-switch
                                v-model="scope.row.soldout"
                                active-text="下架"
                                inactive-text="上架"
                            >
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                                >编辑</el-button
                            >
                            <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="text-align:center">
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next"
                    :page-size="20"
                    :total="search.count"
                >
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
            showMode: 'list',
            defaultImage: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564243194584&di=81433823ad22ccd6ef680dc6fab29f4d&imgtype=0&src=http%3A%2F%2Fimg4.99114.com%2Fgroup1%2FM00%2F65%2F96%2FwKgGTFeDV5WAVgfOAADS7djF-hg871_600_600.jpg',
            currentDate: new Date(),
            search: {
                where: {
                    user_name: '',
                    field: '',
                }
            },
            list: []
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
        imageFormat(image) {
            if (image) {
                return image
            } else {
                return this.defaultImage
            }
        },
        getData() {

            getItemList(this.search).then((res) => {
                console.log(res);
                this.list = res.data.list;
                this.search = res.data.where;
            });
        },
        formatGoodsName(item_name) {
            return item_name.substring(0, 35) + '...';
        },
        searchSubmit() {
            this.getData();
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
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            if (this.tableData[this.idx].id === this.id) {
                this.$set(this.tableData, this.idx, this.form);
            } else {
                for (let i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].id === this.id) {
                        this.$set(this.tableData, i, this.form);
                        return;
                    }
                }
            }
        },
        // 确定删除
        deleteRow() {
            this.$message.success('删除成功');
            this.delVisible = false;
            if (this.tableData[this.idx].id === this.id) {
                this.tableData.splice(this.idx, 1);
            } else {
                for (let i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].id === this.id) {
                        this.tableData.splice(i, 1);
                        return;
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
.list .item {
    margin-bottom: 30px;
}

.item_name {
    font-size: 12px;
    height: 66px;
    overflow: hidden;
}
</style>
