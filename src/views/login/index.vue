<template>
    <div class="login-body">
        <div class="login-container">
            <div class="title-container">
                <h3 class="title">文献检索系统v1.0</h3>
            </div>
            <el-form label-position="top" :rules="state.rules" :model="state.ruleForm" ref="loginForm" class="login-form">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model.trim="state.ruleForm.username" autocomplete="off" size="large" :prefix-icon="UserFilled"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model.trim="state.ruleForm.password" autocomplete="off" size="large" :prefix-icon="Lock"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="verifyCode">
                    <el-row>
                        <el-col :span="15">
                            <el-input type="text" v-model.trim="state.ruleForm.verifyCode" autocomplete="off" size="large"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-image style="width: 90%;height: 90%; margin-left: 10px"
                                src="http://localhost:8088/sms/system/getVerifyCodeImage" fit="fill"
                                @click="refreshVerifyCode"></el-image>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <div style="color: #333">登录表示您已同意<a href="#">《服务条款》</a></div>
                    <el-button style="width: 100%" type="primary" @click="handleLogin" :loading="loading"
                        class="loginbtn" size="large">立即登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { UserFilled, Lock } from '@element-plus/icons-vue'

const loading = ref(false)
const store = useStore()
const router = useRouter()
const loginForm = ref(null)
const state = reactive({
    ruleForm: {
        username: '',
        password: '',
        verifyCode: ''
    },
    checked: true,
    rules: {
        username: [
            { required: 'true', message: '账户不能为空', trigger: 'blur' }
        ],
        password: [
            { required: 'true', message: '密码不能为空', trigger: 'blur' }
        ],
        verifyCode: [
            { required: 'true', message: '验证码不能为空', trigger: 'blur' }
        ]
    }
})
const refreshVerifyCode = () => {
    document.querySelector('.el-image__inner').src = 'http://localhost:8088/sms/system/getVerifyCodeImage?' + Math.random()
}
const handleLogin = () => {

    loginForm.value.validate((valid) => {
        if (valid) {
            loading.value = true
            store.dispatch('user/login', state.ruleForm).then(() => {
                router.push({ path: '/' })
                ElMessage.success('登录成功')
                loading.value = false
            }).catch(() => {
                refreshVerifyCode()
                ElMessage.error('账号密码错误或者验证码错误')
                loading.value = false
            })
        } else {
            console.log('error submit!!');
            return false;
        }
    });
}
</script>

<style scoped>
.login-body {
    width: 100%;
    height: 100%;
    /* background: #f5f5f5; */
    display: flex;
    justify-content: center;
    align-items: center;
    /* 上边距 */
    margin-top: 100px;
}

.login-container {
    width: 600px;
    height: 430px;
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.title-container {
    position: relative;
}

.title-container .title {
    font-size: 26px;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
}
</style>