<template>
    <div class="app-container">
        <div v-if="user">
            <el-row :gutter="20">

                <el-col :span="6" :xs="24">
                    <user-card :user="user" />
                </el-col>

                <el-col :span="18" :xs="24">
                    <el-card>
                        <el-tabs v-model="activeTab">
                            <!-- <el-tab-pane label="动态" name="activity">
                                <activity />
                            </el-tab-pane> -->
                            <el-tab-pane label="时间线" name="timeline">
                                <timeline />
                            </el-tab-pane>
                            <el-tab-pane label="账户" name="account">
                                <account :user="user" />
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </el-col>

            </el-row>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import UserCard from './components/UserCard'
import Account from './components/Account'
import Timeline from './components/Timeline'

const activeTab = ref('timeline')
const store = useStore()
const user = computed(() => store.state.user)
</script>

<style scoped>
.app-container {
    padding: 20px;
}
</style>