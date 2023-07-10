<template>
    <div class="layout">
        <div class="login-logo">
            <SvgIcon name="systemLog"></SvgIcon>
        </div>
        <div class="login-main">
            <div class="login-left">
                <!-- 登陆的密码等输入 -->
                <LoginLeftText></LoginLeftText>
                <br>
                <div class="login-input">
                    <!-- 账号密码输入 -->
                    <el-form ref="userValidate" :model="userForm" :rules="rules" label-position="top" class="demo-ruleForm"
                        status-icon>
                        <el-form-item label="User name" prop="name">
                            <el-input v-model="userForm.name" style="height:59px;" placeholder="Please input username" />
                        </el-form-item>

                        <el-form-item label="Password" prop="pwd">
                            <el-icon>
                                <InfoFilled />
                            </el-icon>
                            <el-input v-model="userForm.pwd" style="height:59px;" type="password" @keyup.enter="handleLogin"
                                placeholder="Please input password" show-password />
                            <el-icon>
                                <View />
                            </el-icon>
                        </el-form-item>
                        <div class="forget-pwd">
                            <router-link class="forget-pwd-text" to="/login/forgetpwd">Forgot Password ?</router-link>
                        </div>
                        <br />

                        <el-button type="primary" class="login-button my-login-button"
                            style="width: 100%;height:57px;border-radius: 6px;background: #000;"
                            @click="handleLogin">登陆</el-button>

                    </el-form>
                </div>
            </div>
            <div class="login-left-img">
                <!-- 左侧图片他单独一个组件LoginLeftImg -->
                <img src="@/assets/login-right-img.png">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import LoginLeftText from '@/components/loginComp/LoginLeftText.vue'

//表单绑定对象
const userForm = ref({
    name: '',
    pwd: '',
});
//校验的对象
const userValidate = ref({
    name: '',
    pwd: '',
});

const rules = reactive({
    name: [
        { required: true, message: 'Please input user name', trigger: 'blur' },
        // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    pwd: [
        {
            required: true,
            message: 'Please input password',
            trigger: 'blur',
        },
    ],

});


const handleLogin = () => {
    user.value.validate(async (valid) => {
        if (valid) {
            // ElMessage.info("成功！");
            //表单验证通过之后执行登陆操作，通过vuex
            // store.dispatch("login", ruleForm.value)
        } else {
            ElMessage.error("失败！");
            return false
        }
    })
}
</script>

<style scoped>
.layout {
    width: 1410px;
    height: 794px;
}

body {
    background: #fff;
}

.login-main {
    margin-left: 111px;
    display: flex;
}

.login-logo {
    display: flex;
    width: 274px;
    height: 74px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
}

.login-left {
    width: 505px;
    height: 701px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 0.5px solid #878787;
    background: #FFF;
    box-shadow: 0px 4px 64px 0px rgba(0, 0, 0, 0.05);
}

.login-input {
    margin-left: 35px;
    margin-right: 47px;
}

.forget-pwd-text {
    color: #4D4D4D;
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
