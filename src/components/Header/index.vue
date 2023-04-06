<template>
    <div class="header" v-if="user.avatar">
        <div class="left">
            <div class="logo">PaperRec</div>
            <router-link class="toIndex" to="/">首页</router-link>
        </div>
        <div class="right">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-avatar class="avatar" :src="user.avatar" />
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleJumpToProfile">个人主页</el-dropdown-item>
                        <el-dropdown-item @click="handleToGithub">Github</el-dropdown-item>
                        <el-dropdown-item divided @click="handleLogout">登出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

const store = useStore()
const router = useRouter()

const props = defineProps({
    user: {
        type: Object,
        default: () => ({ name: '', email: '', avatar: '', role: '' })
    }
})

const handleLogout = () => {
    // 清除 vuex 中的 token、用户信息
    store.dispatch('user/logout').then(() => {
        ElMessage.success('退出成功')
        // 跳转到登录页
        router.push({ path: '/login' })
    })
}

const handleJumpToProfile = () => {
    router.push({ path: '/profile' })
}

const handleToGithub = () => {
    window.open('https://ssh1y.site', '_blank')
}

</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.left {
    display: flex;
    align-items: center;
}

.toIndex {
  font-size: 16px;
  color: #333;
  background-color: #eee;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 50px;
  text-decoration: none;
}

.right {
    display: flex;
    align-items: center;
}

.logo {
    font-size: 24px;
    font-weight: bold;
}

.avatar {
    width: 36px;
    height: 36px;
}

.el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}
</style>
  