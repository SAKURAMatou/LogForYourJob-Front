<template>
    <div class="user-setting-wrapper">
        <div class="user-setting-left">
            <UserInfoDisplay :userInfo="userInfo"></UserInfoDisplay>
        </div>
        <div class="user-setting-right">
            <UserInfoEdit @refreshUserInfo="refreshUserInfo"></UserInfoEdit>
        </div>
    </div>
</template>

<script setup>
import UserInfoEdit from '@/views/usersview/UserInfoEdit.vue'
import UserInfoDisplay from '@/views/usersview/UserInfoDisplay.vue'

import { ref, onMounted } from 'vue'
// import { LoginStore } from '@/stores/logjobstore/loginstroe.js'
import { getUserInfo } from '@/api/userSettingUtil.js'
import { ElMessage } from 'element-plus'
const userInfo = ref({})
// const loginStore = LoginStore()
// const userInfo = loginStore.getUserInfo
function initUserInfo() {
    getUserInfo().then((res) => {
        if (res.state.code === '200') {
            //用户信息获取成功
            userInfo.value = res.custom.userinfo
            // console.log('userInfo', userInfo.value)
        } else {
            ElMessage({ message: res.state.msg, type: 'warning' })
        }
    })
}
onMounted(() => {
    initUserInfo()
})

function refreshUserInfo() {
    initUserInfo()
}
</script>
<style scoped>
.user-setting-wrapper {
    /* grid布局 */
    display: grid;
    grid-template-columns: 231px 736px; /* Set the specific widths for the columns */
    grid-column-gap: 102px;

    padding-left: 45px;
    padding-top: 5px;
    /* flex布局 */
    /* display: flex; */
    /* justify-content: space-between;
    align-items: flex-start; */
}
.user-setting-left {
    display: flex;

    height: 410px;
    padding: 24px 24px 19px 24px;
    flex-direction: column;
    align-items: center;
    gap: 28px;
    flex-shrink: 0;
    border-radius: 20px;
    background: #fff;

    /* margin-right: 102px; */
}

.user-setting-right {
    /* width: 702x; */
    height: 410px;
    flex-shrink: 0;
    border-radius: 20px;
    background: #fff;
    padding: 24px 24px 19px 24px;
}
</style>
