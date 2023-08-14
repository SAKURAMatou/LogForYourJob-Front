<template>
    <div class="layout">
        <LoginLogo></LoginLogo>
        <div class="login-main" style="height: 757px">
            <div class="login-left">
                <LoginLeftText></LoginLeftText>
                <br />
                <div class="login-input">
                    <el-form
                        ref="userValidate"
                        :model="userForm"
                        :rules="rules"
                        hide-required-asterisk="true"
                        label-position="top"
                        class="demo-ruleForm"
                        status-icon
                    >
                        <el-form-item label="email" prop="email">
                            <el-input
                                v-model="userForm.email"
                                placeholder="Please input email"
                            />
                        </el-form-item>
                        <el-form-item label="User name" prop="name">
                            <el-input
                                v-model="userForm.name"
                                placeholder="Please input username"
                            />
                        </el-form-item>
                        <el-form-item label="Password" prop="pwd">
                            <el-input
                                v-model="userForm.pwd"
                                type="password"
                                placeholder="Please input password"
                                autocomplete="off"
                                show-password
                            />
                        </el-form-item>
                        <el-form-item label="Confirm" prop="checkPass">
                            <el-input
                                v-model="userForm.checkPass"
                                type="password"
                                placeholder="Please input password again"
                                autocomplete="off"
                                show-password
                            />
                        </el-form-item>
                        <br />

                        <el-button
                            type="primary"
                            class="login-button my-login-button"
                            style="
                                width: 100%;
                                height: 39px;
                                border-radius: 6px;
                                background: #000;
                            "
                            @click="handleRegister"
                            v-no-more-click
                            >注册</el-button
                        >
                        <div>
                            <LoginButtomText>
                                <template #l
                                    >Already have an Account ?
                                </template>
                                <template #r>
                                    <RouterLink to="/login/login"
                                        >login</RouterLink
                                    >
                                </template>
                            </LoginButtomText>
                        </div>
                    </el-form>
                </div>
            </div>
            <div class="login-right-img">
                <!-- 左侧图片他单独一个组件LoginLeftImg -->
                <img src="@/assets/login-right-img.png" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import LoginLeftText from '@/components/loginComp/LoginLeftText.vue'
import LoginLogo from '@/components/loginComp/LoginLogo.vue'
import LoginButtomText from '@/components/loginComp/LoginButtomText.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { userRegister } from '@/api/loginUtil.js'

//表单绑定对象
const userForm = ref({
    name: '',
    pwd: '',
    email: '',
    checkPass: ''
})
//校验的对象
const userValidate = ref({
    name: '',
    pwd: '',
    email: '',
    checkPass: ''
})

const validatePwd = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    } else {
        if (userForm.value.checkPass !== '') {
            //触发密码确认的校验
            userValidate.value.validateField('checkPass', () => null)
        }
        callback()
    }
}
const checkPass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    } else if (value !== userForm.value.pwd) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
}

const rules = reactive({
    name: [
        { required: true, message: '输入用户昵称', trigger: 'blur' }
        // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    pwd: [{ validator: validatePwd, trigger: 'blur' }],
    email: [
        { required: true, message: '输入邮箱', trigger: 'blur' },
        {
            type: 'email',
            message: 'Please input correct email address',
            trigger: ['blur', 'change']
        }
    ],
    checkPass: [{ validator: checkPass, trigger: 'blur' }]
})

/**
 * 用户注册方法
 */
function handleRegister() {
    userValidate.value.validate(async (valid) => {
        if (valid) {
            userRegister(userForm.value).then((res) => {
                if (res.state.code == '200') {
                    ElMessageBox.alert(res.state.msg, '注册成功！', {
                        type: 'success',
                        confirmButtonText: 'OK',
                        callback: () => {
                            userForm.value = {
                                name: '',
                                pwd: '',
                                email: '',
                                checkPass: ''
                            }
                        }
                    })
                } else {
                    ElMessage({ type: 'warning', message: res.state.msg })
                }
            })

            //表单验证通过之后执行登陆操作，通过vuex
            // store.dispatch("login", ruleForm.value)
        } else {
            ElMessage.error('失败！')
            return false
        }
    })
}
</script>
<style scoped>
@import '@/assets/logincss/logincommon.css';

.login-left {
    width: 505px;
    height: 705px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 0.5px solid #878787;
    background: #fff;
    box-shadow: 0px 4px 64px 0px rgba(0, 0, 0, 0.05);
}

/* .layout {
    width: 100%;
    height:757px;
    background: #fff;
} */
</style>
