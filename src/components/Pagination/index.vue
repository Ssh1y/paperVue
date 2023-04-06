<template>
    <div class="pagination-container">
        <el-pagination :background="background" :current-page.sync="currentPage" :page-size.sync="pageSize" :layout="layout"
            :page-sizes="pageSizes" :total="total" v-bind="$attrs" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance, computed } from "vue";
import { scrollTo } from '@/utils/scroll-to'

const self = getCurrentInstance();
// console.log(self)

const props = defineProps({
    total: {
        required: true,
        type: Number
    },
    page: {
        type: Number,
        default: 1
    },
    limit: {
        type: Number,
        default: 20
    },
    pageSizes: {
        type: Array,
        default: () => [10, 20, 50, 100]
    },
    layout: {
        type: String,
        default: "total, sizes, prev, pager, next, jumper"
    },
    background: {
        type: Boolean,
        default: true
    },
    autoScroll: {
        type: Boolean,
        default: true
    }
})

const currentPage = computed({
    get() {
        return props.page
    },
    set(val) {
        self.emit('update:page', val)
    }
})

const pageSize = computed({
    get() {
        return props.limit
    },
    set(val) {
        self.emit('update:limit', val)
    }
})

const handleSizeChange = (val) => {
    self.emit('pagination', { page: currentPage.value, limit: val })
    if (props.autoScroll) {
        scrollTo(0, 800)
    }
}

const handleCurrentChange = (val) => {
    self.emit('pagination', { page: val, limit: pageSize.value })
    if (props.autoScroll) {
        scrollTo(0, 800)
    }
}


</script>

<style scoped>
.pagination-container {
    background: #fff;
    padding: 32px 16px;
}
</style>