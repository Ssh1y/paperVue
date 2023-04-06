<template>
    <div class="app-container">
        <div class="filter-container">
            <el-select v-model="listQuery.searchType" placeholder="搜索类型" clearable style="width: 150px"
                class="filter-item" size="large">
                <el-option v-for="item in searchTypeOptions" :key="item.value" :label="item.label"
                    :value="item.value"></el-option>
            </el-select>
            <el-input v-model="listQuery.searchContent" placeholder="键入关键词搜索文献" style="width:400px;"
                class="filter-item" size="large"></el-input>
            <el-button class="filter-item" type="primary" @click="handleSearch" size="large"><el-icon :size="15">
                    <Search />
                </el-icon>&nbsp搜一搜</el-button>
        </div>
        <el-divider></el-divider>
        <div class="table-body">
            <el-table :data="paperlist" style="width: 100%" border fit highlight-current-row v-loading="listLoading">
                <el-table-column label="ID" width="80" align="center">
                    <template #default="scope">
                        <span>{{ scope.row.paperid }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="标题" align="center">
                    <template #default="scope">
                        <span>{{ scope.row.papername }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="作者" width="200" align="center">
                    <template #default="scope">
                        <span>{{ scope.row.paperauthor }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="来源" width="240" align="center">
                    <template #default="scope">
                        <span>{{ scope.row.papersource }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="发表时间" width="180" align="center">
                    <template #default="scope">
                        <span>{{ scope.row.paperpubtime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="" width="120" align="center">
                    <template #default="scope">
                        <router-link :to="{ name: 'PaperDetail', params: { id: scope.row.paperid } }" target="_blank"
                            style="text-decoration: none;">查看</router-link>
                    </template>
                </el-table-column>
            </el-table>

            <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="handlePageOrSizeChange" />
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import Pagination from '@/components/Pagination'
import { fetchSearchPapers } from '@/api/paper'
import { useStore } from 'vuex'

const store = useStore()
const searchTypeOptions = [
    { label: '全部', value: 0 },
    { label: '文献标题', value: 1 },
    { label: '作者', value: 2 },
    { label: '关键词', value: 3 },
    { label: '摘要', value: 4 },
]
const paperlist = ref([])
const listLoading = ref(false)
const listQuery = reactive({
    searchType: 0,
    searchContent: undefined,
    page: 1,
    limit: 20
})
const total = ref(0)

// TODO 解决这边的双向绑定问题为何不生效，只能重新绑定一个函数来修改listQuery的值
const handlePageOrSizeChange = (pagination) => {
    listQuery.page = pagination.page
    listQuery.limit = pagination.limit
    handleSearch()
}

const handleSearch = () => {
    listLoading.value = true
    // 构造post的数据
    const data = {
        searchType: listQuery.searchType,
        searchContent: listQuery.searchContent,
        page: listQuery.page,
        limit: listQuery.limit
    }
    fetchSearchPapers(data).then(res => {
        paperlist.value = res.data.records
        total.value = res.data.total
    }).finally(() => listLoading.value = false)
}

// 根据token获取用户信息，更新store，封装成一个函数
const getUserInfo = () => {
    // 判断是否有用户信息，如果没有则获取
    if (!store.getters.name || !store.getters.email || !store.getters.avatar || !store.getters.role){
        store.dispatch('user/getInfo').then(() => {
            console.log('获取用户信息成功')
        }).catch((err) => {
            console.log(err)
        })
    }
}

onMounted(() => {
    handleSearch(),
    getUserInfo()
})

</script>

<style scoped>
.app-container {
    margin: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}


.filter-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.filter-item {
    margin-right: 10px;
    /* 添加右边距 */
}
</style>