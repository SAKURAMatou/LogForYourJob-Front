<template>
    <el-main>
        <el-form
            :model="userInfo"
            label-width="120px"
            ref="userInfoRef"
            :rules="rules"
            label-position="top"
        >
            <el-form-item
                label="绑定手机"
                prop="phone"
                v-show="!userInfo.phone"
            >
                <el-input
                    v-model="userInfo.phone"
                    placeholder="请输入手机号码"
                />
            </el-form-item>
            <el-form-item
                label="更换手机号码"
                v-show="userInfo.phone"
                prop="newphone"
            >
                <el-input
                    v-model="userInfo.newphone"
                    placeholder="请输入新的手机号码"
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
                @click="savePhoneEdit"
                v-no-more-click
            >
                保存
            </el-button>
        </div>
    </el-footer>
</template>
<script setup>
import { userPhoneChange } from '@/api/userSettingUtil.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
const emit = defineEmits(['userinfochange'])
const prop = defineProps(['exitPhone'])
const userInfo = reactive({
    newphone: '',
    phone: prop.exitPhone
})

//表单验证对象
const userInfoRef = ref()

const rules = reactive({
    newphone: [
        { required: true, message: '输入新的手机号码', trigger: 'blur' }
    ],
    phone: [{ required: true, message: '输入手机号码', trigger: 'blur' }]
})

function savePhoneEdit() {
    userInfoRef.value.validate((valid) => {
        if (!valid) {
            return
        }
        userPhoneChange(userInfo).then((res) => {
            if (res.state.code === '200') {
                ElMessageBox.alert('操作成功！', '提示', {
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
