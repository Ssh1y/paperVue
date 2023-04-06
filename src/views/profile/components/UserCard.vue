<template>
    <el-card style="margin-bottom:20px;">
        <div slot="header" class="clearfix">
            <span>关于</span>
        </div>

        <div class="user-profile">
            <div class="box-center">
                <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
                    <div>你好</div>
                    {{ user.role }}
                </pan-thumb>
            </div>
            <div class="box-center">
                <div class="user-name text-center">{{ user.name }}</div>
                <div class="user-role text-center text-muted">权限：{{ user.role }}</div>
            </div>
        </div>

        <div class="user-bio">
            <div class="user-education user-bio-section">
                <div class="user-bio-section-header"><el-icon><Document /></el-icon><span>教育经历</span></div>
                <div class="user-bio-section-body">
                    <div class="text-muted">
                        厦门大学2019级计算机系本科生
                    </div>
                </div>
            </div>

            <div class="user-skills user-bio-section">
                <div class="user-bio-section-header"><el-icon><Opportunity /></el-icon><span>知识技能</span></div>
                <div class="user-bio-section-body">
                    <div class="progress-item">
                        <span>Python</span>
                        <el-progress :percentage="20" />
                    </div>
                    <div class="progress-item">
                        <span>Php</span>
                        <el-progress :percentage="10" />
                    </div>
                    <div class="progress-item">
                        <span>Java</span>
                        <el-progress :percentage="5" />
                    </div>
                    <div class="progress-item">
                        <span>bishe</span>
                        <el-progress :percentage="100" status="success" />
                    </div>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script setup>
import PanThumb from '@/components/PanThumb'

const props = defineProps({
    user: {
        type: Object,
        required: true,
        default: () => {
            return {
                name: '',
                role: '',
                avatar: '',
                email: ''
            }
        }
    }
})
</script>

<style scoped>
.box-center {
    margin: 0 auto;
    display: table;
}

.text-muted {
    color: #777;
}

.user-profile .user-name {
    font-weight: bold;
}

.user-profile .box-center {
    padding-top: 10px;
}

.user-profile .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
}

.user-profile .box-social .el-table {
    border-top: 1px solid #dfe6ec;
}

.user-profile .user-follow {
    padding-top: 20px;
}

.user-bio {
    margin-top: 20px;
    color: #606266;
}

.user-bio span {
    padding-left: 4px;
}

.user-bio .user-bio-section {
    font-size: 14px;
    padding: 15px 0;
}

.user-bio .user-bio-section-header {
    border-bottom: 1px solid #dfe6ec;
    padding-bottom: 10px;
    margin-bottom: 10px;
    font-weight: bold;
}
</style>
