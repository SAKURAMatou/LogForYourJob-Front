<template>
    <div class="layout">
        <div class="login-logo">
            <SvgIcon name="systemLog"></SvgIcon>
        </div>
        <div class="login-main">
            <div class="login-left">
                <!-- 登陆的密码等输入 -->
                <LoginLeftText></LoginLeftText>
                <div class="login-input">
                    <!-- 账号密码输入 -->
                    <el-form ref="userValidate" :model="userForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                        status-icon>
                        <el-form-item label="" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="Please input username" />
                        </el-form-item>

                        <el-form-item label="" prop="pwd">
                            <el-icon>
                                <InfoFilled />
                            </el-icon>
                            <el-input v-model="ruleForm.pwd" type="password" @keyup.enter="handleLogin"
                                placeholder="Please input password" show-password />
                            <el-icon>
                                <View />
                            </el-icon>
                        </el-form-item>
                        <br />
                        <el-button type="primary" class="login-button my-login-button" style="width: 100px;"
                            @click="handleLogin">登陆</el-button>
                    </el-form>
                </div>
            </div>
            <div class="login-left-img">
                <!-- 左侧图片他单独一个组件LoginLeftImg -->
                <SvgIcon name="loginLeftImg" id="loginLeftImg"></SvgIcon>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
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
    width: 1440px;
    height: 900px;
}

body {
    background: #fff;
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
</style>
