<template>
    <div class="user-avatar-wrapper">
        <el-popover
            :width="246"
            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
        >
            <!-- style="
                    width: 100%;
                    height: 39px;
                    border-radius: 6px;
                    background: #000;
                " -->
            <template #reference>
                <el-avatar size="large" :src="userInfo.avatarurl" />
            </template>
            <template #default>
                <div style="text-align: center; margin: 0">
                    <p>May you find a new job swiftly!</p>
                    <el-button
                        type="danger"
                        class="login-button my-login-button"
                        @click="logout"
                        >退出</el-button
                    >
                </div>
            </template>
        </el-popover>
        <div class="avatar-text-wrapper">
            <span class="name">{{ userInfo.username }}</span>
            <span class="email">{{ userInfo.useremail }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { LoginStore } from '@/stores/logjobstore/loginstroe.js'
const loginStore = LoginStore()
const userInfo = loginStore.getUserInfo
if (!userInfo.username) {
    userInfo.username = 'admin'
}
if (!userInfo.useremail) {
    userInfo.useremail = 'test@qq.com'
}

function logout() {
    loginStore.logout()
}
</script>
<style scoped>
.user-avatar-wrapper {
    display: flex;
    width: 207px;
    height: 49px;
    padding-right: 0px;
    align-items: center;
    gap: 8.238px;
    flex-shrink: 0;
    margin: 57px 245px 97px 25px;
    /* margin-bottom: 97px; */
}
.avatar-text-wrapper {
    display: inline-grid;
}
.name {
    color: #0d062d;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    overflow: hidden;
}
.email {
    color: #787486;
    text-align: right;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    float: right;
    margin-left: 20px;
    overflow: hidden;
}
</style>
