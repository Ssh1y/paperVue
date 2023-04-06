<template>
    <div class="block">
        <el-timeline>
            <el-timeline-item v-for="(item, index) of state.timeline" :key="index" :timestamp="item.timestamp" placement="top">
                <el-card>
                    <h4>{{ item.title }}</h4>
                    <p>{{ item.content }}</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
const state = reactive({
    timeline: [
        {
            timestamp: '2023/3/20',
            title: '后端开发',
            content: '开始着手处理springboot的后端开发'
        },
        {
            timestamp: '2023/3/24',
            title: '后端开发',
            content: '完成了后端的Api编写,完成了推荐算法的设计'
        },
        {
            timestamp: '2023/3/25',
            title: '前端开发',
            content: '开始着手处理vue的前端开发'
        },
        {
            timestamp: '2023/3/26',
            title: '前端开发',
            content: '完成了前端重要功能的页面设计和代码编写'
        }
    ]
})
</script>