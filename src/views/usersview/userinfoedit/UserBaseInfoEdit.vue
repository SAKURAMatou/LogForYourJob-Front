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
                <!-- <el-form-item> </el-form-item> -->
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
                <el-form-item label="用户头像">
                    <div class="file-upload">
                        <el-upload
                            class="avatar-uploader circular-uploader"
                            action=""
                            accept="image/*"
                            auto-upload="false"
                            :http-request="handleFileUpload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img
                                v-if="imageUrl"
                                :src="imageUrl"
                                class="avatar"
                            />
                            <el-icon v-else class="avatar-uploader-icon">
                                <svg
                                    viewBox="0 0 1024 1024"
                                    xmlns="http://www.w3.org/2000/svg"
                                    data-v-36fef47d=""
                                >
                                    <path
                                        fill="currentColor"
                                        d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"
                                    ></path>
                                </svg>
                            </el-icon>
                        </el-upload>
                        <div class="button-item">
                            <el-button
                                class="log-job-button"
                                @click="saveUserinfoEdit"
                                v-no-more-click
                            >
                                确定修改
                            </el-button>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-main>
        <el-footer>
            <!-- <div class="button-item">
                <el-button
                    class="log-job-button"
                    @click="saveUserinfoEdit"
                    v-no-more-click
                >
                    确定修改
                </el-button>
            </div> -->
        </el-footer>
    </el-container>
</template>
<script setup>
import { userBaseInfoChange, userAvatarChange } from '@/api/userSettingUtil.js'
import { ref, reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const emit = defineEmits(['userinfochange'])

const userInfo = reactive({
    name: '',
    email: '',
    avatarguid: ''
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

// 头像的url
const imageUrl = ref('')

function handleAvatarSuccess(response, uploadFile) {
    imageUrl.value = URL.createObjectURL(uploadFile.raw)
}

function beforeAvatarUpload(rawFile) {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}

function handleFileUpload(uploadFile) {
    return new Promise((resolve, reject) => {
        userAvatarChange(uploadFile).then((res) => {
            if (res.state.code === '200') {
                userInfo.avatarguid = res.custom.avatarguid
                resolve()
            } else {
                ElMessage.error('头像文件上传失败！' + res.state.msg)
                reject(new Error('头像文件上传失败!'))
            }
        })
        // var t = setTimeout(() => {
        //     console.log('Uploading...', uploadFile)
        //     imageUrl.value = 'test_img_url'
        //     // 模拟上传成功
        //     resolve()
        //     // 如果上传失败，你可以调用 reject(new Error('上传失败!'));
        // }, 2000)
    })
}

/**
 * 用户信息保存方法
 */
function saveUserinfoEdit() {
    userInfoRef.value.validate((valid) => {
        if (valid) {
            userBaseInfoChange(userInfo).then((res) => {
                if (res.state.code == '200') {
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
.circular-uploader {
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    border: 1px dashed var(--el-border-color); /* This line adds the desired border */
    display: inline-block;
    width: 88px;
    height: 88px;
}
.avatar-uploader .avatar {
    width: 88px;
    height: 88px;
    display: flex;
}
.button-item {
    margin-left: 235px;

    padding-top: 59px;
}
.file-upload {
    display: flex;
}
</style>
<style>
.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 88px;
    height: 88px;
    text-align: center;
}
.circular-uploader .el-upload--text {
    width: 88px;
    height: 88px;
}
.circular-uploader .el-icon.avatar-uploader-icon {
    border-radius: 50%;
    /* add more styles if necessary */
}
</style>
