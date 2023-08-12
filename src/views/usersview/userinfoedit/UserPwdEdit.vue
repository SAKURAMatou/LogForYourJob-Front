<template>
    <el-container class="user-edit-inner-container">
        <el-main>
            <el-form
                :model="pwdInfo"
                ref="pwdInfoRef"
                :rules="rules"
                label-width="120px"
                label-position="top"
            >
                <el-form-item label="当前密码" prop="nowpwd">
                    <el-input
                        v-model="pwdInfo.nowpwd"
                        type="password"
                        show-password
                        placeholder="请输入当前密码"
                    />
                </el-form-item>
                <el-form-item label="新密码" prop="newpwd">
                    <el-input
                        v-model="pwdInfo.newpwd"
                        type="password"
                        placeholder="请输入新的密码"
                        show-password
                    />
                </el-form-item>
                <el-form-item label="新密码确认" prop="pwdcheck">
                    <el-input
                        v-model="pwdInfo.pwdcheck"
                        show-password
                        type="password"
                        placeholder="请再次输入新的密码"
                    />
                </el-form-item>
            </el-form>
        </el-main>
        <el-footer>
            <div class="button-item">
                <el-button
                    class="log-job-button"
                    @click="savepwdEdit"
                    v-no-more-click
                >
                    确定修改
                </el-button>
            </div>
        </el-footer>
    </el-container>
</template>

<script setup>
import { userPwdChange } from '@/api/userSettingUtil.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'

const emit = defineEmits(['userinfochange'])

const pwdInfo = reactive({
    nowpwd: '',
    newpwd: '',
    pwdcheck: ''
})
//表单校验对象
const pwdInfoRef = ref({})

const validatePwd = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入新密码!'))
    } else if (pwdInfo.nowpwd == value) {
        callback(new Error('新密码和旧密码相同!'))
    } else {
        if (pwdInfo.pwdcheck !== '') {
            //触发密码确认的校验
            pwdInfoRef.value.validateField('pwdcheck', () => null)
        }
        callback()
    }
}
const checkPass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入新密码!'))
    } else if (pwdInfo.newpwd && pwdInfo.newpwd != '') {
        if (pwdInfo.nowpwd == pwdInfo.newpwd) {
            callback(new Error('新密码和旧密码相同!'))
        } else if (value != pwdInfo.newpwd) {
            callback(new Error('两次输入密码不一致!'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}
//表单校验规则
const rules = reactive({
    nowpwd: [
        { required: true, message: '输入当前密码', trigger: 'blur' }
        // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    newpwd: [{ required: true, validator: validatePwd, trigger: 'blur' }],
    pwdcheck: [{ required: true, validator: checkPass, trigger: 'blur' }]
})
function savepwdEdit() {
    pwdInfoRef.value.validate((valid) => {
        if (!valid) {
            return
        }
        userPwdChange(pwdInfo).then((res) => {
            if (res.state.code == '200') {
                ElMessageBox.alert('密码修改成功！', '提示', {
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
    })
}
</script>

<style scoped>
@import '@/assets/logjobbuttoncss.css';
@import '@/assets/usersetting/usersetting.css';
</style>
