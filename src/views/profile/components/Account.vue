<template>
    <el-form>
        <el-form-item label="账户名">
            <el-input v-model.trim="user.name" />
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model.trim="user.email" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleUpdate">更新</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { defineProps } from 'vue'
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex'

const store = useStore()
const props = defineProps({
    user: {
        type: Object,
        default: () => ({ name: '', email: '' })
    }
})

const handleUpdate = () => {
    const data = {
        username: props.user.name,
        email: props.user.email
    }
    store.dispatch('user/updateInfo', data).then(() => {
        ElMessage.success('更新成功')
    }).catch(() => {
        ElMessage.error('更新失败')
    })
}
</script>