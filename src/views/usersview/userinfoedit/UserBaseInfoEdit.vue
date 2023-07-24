<template>
    <!-- <h1>修改用户基本信息</h1> -->
    <el-container class="user-edit-inner-container">
        <el-main>
            <el-form
                :model="userInfo"
                label-width="120px"
                ref="userInfoRef"
                :rules="rules"
                label-position="top"
            >
                <el-form-item label="用户名称" prop="name">
                    <el-input
                        v-model="userInfo.name"
                        placeholder="请输入新的用户名称"
                    />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input
                        v-model="userInfo.email"
                        placeholder="请输入新的邮箱"
                    />
                </el-form-item>
                <el-form-item>
                    <div class="button-row"></div>
                </el-form-item>
            </el-form>
        </el-main>
        <el-footer>
            <div class="button-item">
                <el-button
                    class="log-job-button"
                    @click="saveUserinfoEdit"
                    v-no-more-click
                >
                    确定修改
                </el-button>
            </div>
        </el-footer>
    </el-container>
</template>
<script setup>
import { userBaseInfoChange } from '@/api/userSettingUtil.js'
const emit = defineEmits(['userinfochange'])
import { ref, reactive } from 'vue'
const userInfo = reactive({
    name: '',
    email: ''
})
//表单验证对象
const userInfoRef = ref()

//表单校验规则
const rules = reactive({
    email: [
        // { required: true, message: '输入邮箱', trigger: 'blur' },
        {
            type: 'email',
            message: '输入正确的邮箱',
            trigger: ['blur', 'change']
        }
    ]
})
function saveUserinfoEdit() {
    userInfoRef.value.validate((valid) => {
        if (valid) {
            userBaseInfoChange(userInfo).then((res) => {
                if (res.state.code === '200') {
                    ElMessageBox.alert('用户基本信息修改成功！', '提示', {
                        confirmButtonText: '确定',
                        callback: (action) => {
                            emit('userinfochange')
                        }
                    })
                } else {
                    ElMessage({
                        message: res.state.msg,
                        type: 'warning'
                    })
                }
            })
        }
    })
}
</script>
<style scoped>
@import '@/assets/logjobbuttoncss.css';
@import '@/assets/usersetting/usersetting.css';
</style>
