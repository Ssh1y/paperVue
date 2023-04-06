<template>
    <div class="app-container">
        <!-- <el-card> -->
        <div slot="header">
            <el-row justify="space-between">
                <h2>{{ paper.title }}</h2>
                <router-link :to="{ name: 'PaperRecommend', params: { id: paperId }, query: { title: paper.title } }"
                    active-class="active-link" class="link">【以文搜文】</router-link>
            </el-row>
        </div>
        <div>
            <p>
                <el-row>
                    <el-col :span="2">
                        <div class="label">作者：</div>
                    </el-col>
                    <el-col :span="22">
                        <span>{{ paper.authors.join(', ') }}</span>
                    </el-col>
                </el-row>
            </p>
            <p>
                <el-row>
                    <el-col :span="2">
                        <div class="label">单位：</div>
                    </el-col>
                    <el-col :span="22">
                        <span>{{ paper.unit }}</span>
                    </el-col>
                </el-row>
            </p>
            <p>
                <el-row>
                    <el-col :span="2">
                        <div class="label">来源：</div>
                    </el-col>
                    <el-col :span="22">
                        <span>{{ paper.source }}</span>
                    </el-col>
                </el-row>
            </p>
            <p>
                <el-row>
                    <el-col :span="2">
                        <div class="label">关键词：</div>
                    </el-col>
                    <el-col :span="22">
                        <span class="keywords">{{ paper.keywords }}</span>
                    </el-col>
                </el-row>
            </p>
            <p>
                <el-row>
                    <el-col :span="2">
                        <div class="label">摘要：</div>
                    </el-col>
                    <el-col :span="22">
                        <span class="abstract">{{ paper.abstract }}</span>
                    </el-col>
                </el-row>
            </p>
            <p>
                <el-row>
                    <el-col :span="2">
                        <div class="label">发表时间：</div>
                    </el-col>
                    <el-col :span="22">
                        <span>{{ paper.pubtime }}</span>
                    </el-col>
                </el-row>
            </p>
            <p>
                <el-row>
                    <el-col :span="2">
                        <div class="label">链接：</div>
                    </el-col>
                    <el-col :span="22">
                        <!-- <a :href="paper.url">{{ paper.url }}</a> -->
                        <el-link type="primary" :underline="false" :href="paper.url">{{ paper.url }}</el-link>
                    </el-col>
                </el-row>
            </p>
        </div>
        <!-- </el-card> -->
    </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { fetchPaperDetail } from '@/api/paper'
import { useRoute } from 'vue-router'

const paper = reactive({
    title: '',
    authors: [],
    unit: '',
    source: '',
    keywords: '',
    abstract: '',
    pubtime: '',
    url: ''
})
// 获取url中的参数
const route = useRoute()
const paperId = route.params.id

onMounted(() => {
    fetchPaperDetail(paperId).then(res => {
        paper.title = res.data.papername
        // 作者以;分割，处理成数组
        paper.authors = res.data.paperauthor.split(';')
        paper.unit = res.data.authorunit
        paper.source = res.data.papersource
        // 关键字以;;分割，处理成以逗号分割的字符串
        paper.keywords = res.data.paperkeywords.split(';;').join(', ')
        paper.abstract = res.data.paperabstract
        paper.pubtime = res.data.paperpubtime
        // 判断URL是否为nan，如果是则不显示
        paper.url = res.data.paperurl === 'nan' ? '#' : res.data.paperurl
    })
})

</script>

<style scope>
.app-container {
    margin: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.label {
    font-weight: bold;
}

.keywords {
    color: #666666;
}

.abstract {
    color: #666666;
}

.link {
    color: #1890ff;
    text-decoration: none;
    /* 去掉下划线 */
}

.active-link {
    font-weight: bold;
}
</style>