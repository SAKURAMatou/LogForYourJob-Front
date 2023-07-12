<template>
    <div class="layout">
        <LoginLogo></LoginLogo>
        <div class="login-main">
            <div class="login-left">
                <!-- 登陆的密码等输入 -->
                <LoginLeftText></LoginLeftText>
                <br />
                <div class="login-input">
                    <!-- 账号密码输入 -->
                    <el-form ref="userValidate" :model="userForm" :rules="rules" hide-required-asterisk="true"
                        label-position="top" class="demo-ruleForm" status-icon>
                        <el-form-item label="User name" prop="name">
                            <el-input v-model="userForm.name" style="height: 59px" placeholder="Please input username" />
                        </el-form-item>

                        <el-form-item label="Password" prop="pwd">
                            <!-- <el-icon>
                                <InfoFilled />
                            </el-icon> -->
                            <el-input v-model="userForm.pwd" style="height: 59px" type="password" @keyup.enter="handleLogin"
                                placeholder="Please input password" show-password />
                            <el-icon>
                                <View />
                            </el-icon>
                        </el-form-item>
                        <div class="forget-pwd">
                            <router-link class="forget-pwd-text" to="/login/forgetpwd">Forgot Password ?</router-link>
                        </div>
                        <br />

                        <el-button type="primary" class="login-button my-login-button" style="
                                width: 100%;
                                height: 57px;
                                border-radius: 6px;
                                background: #000;
                            " @click="handleLogin">登陆</el-button>
                        <div>
                            <LoginButtomText>
                                <template #l>Don't have an Account ?</template>
                                <template #r>
                                    <RouterLink to="/login/register">Register</RouterLink>
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
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import LoginLeftText from '@/components/loginComp/LoginLeftText.vue'
import LoginLogo from '@/components/loginComp/LoginLogo.vue'
import LoginButtomText from '@/components/loginComp/LoginButtomText.vue'

//表单绑定对象
const userForm = ref({
    name: '',
    pwd: ''
})
//校验的对象
const userValidate = ref({
    name: '',
    pwd: ''
})

const rules = reactive({
    name: [
        { required: true, message: 'Please input user name', trigger: 'blur' }
        // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    pwd: [
        {
            required: true,
            message: 'Please input password',
            trigger: 'blur'
        }
    ]
})

const handleLogin = () => {
    user.value.validate(async (valid) => {
        if (valid) {
            // ElMessage.info("成功！");
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

.forget-pwd-text {
    color: #4d4d4d;
    font-family: Poppins;
    font-size: 12px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    width: 99px;
    margin-left: 321px;
    position: relative;
    /* margin-right: 47px; */
}
</style>
