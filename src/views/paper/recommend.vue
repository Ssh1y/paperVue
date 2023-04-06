<template>
    <div class="app-container">
        <div class="paper-title">
            <p>根据文章：【{{ title }}】&nbsp;的推荐结果为：</p>
        </div>
        <el-divider></el-divider>
        <el-table :data="paperlist" border stripe style="width: 100%" v-loading="listLoading">
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
            <el-table-column label="本次推荐评分" width="180" align="center">
                <template #default="scope">
                    <el-rate v-model="scope.row.score" :show-score="false" @change="handleRating(scope.row)" />
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
            @pagination="handlePageOrSizeChange" />
    </div>
</template>

<script setup>
import { onMounted, ref, reactive, h } from 'vue'
import { useRoute } from 'vue-router'
import { fetchRecommendPapers } from '@/api/paper'
import { RatePaper } from '@/api/action'
import { ElMessage } from 'element-plus'
import Pagination from '@/components/Pagination'

const route = useRoute()
const paperId = route.params.id
const title = route.query.title

const paperlist = ref([])
const listLoading = ref(false)
const listQuery = reactive({
    page: 1,
    limit: 20
})
const total = ref(0)

const handlePageOrSizeChange = (pagination) => {
    listQuery.page = pagination.page
    listQuery.limit = pagination.limit
    handleRecommend(paperId)
}

const handleRecommend = (id) => {
    listLoading.value = true
    // 构造post的数据
    const data = {
        paperId: id,
        page: listQuery.page,
        limit: listQuery.limit
    }
    fetchRecommendPapers(data).then(res => {
        paperlist.value = res.data.records
        total.value = res.data.total

    }).finally(() => listLoading.value = false)
}

const handleRating = (row) => {
    const data = {
        recommendationId: row.paperid,
        ratedPaperId: paperId,
        rating: row.score
    }
    RatePaper(data).then(res => {
        if (res.code === 200) {
            ElMessage({
                message: res.data + '，感谢您的评分！',
                type: 'success',
            })
        }
    })
}

onMounted(() => {
    handleRecommend(paperId)
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

.paper-title {
    background-color: #f5f5f5;
    padding: 20px;
    margin-bottom: 20px;
    text-align: center;
}

.paper-title p {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
}
</style>