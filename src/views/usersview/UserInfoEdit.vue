<template>
    <h1>右侧用户信息修改</h1>
    <div class="user-setting-edit-wrapper">
        <el-container>
            <el-aside width="200px">
                <el-menu
                    default-active="0"
                    class="user-setting-edit-menu"
                    text-color="#5D7285"
                    @select="menuitemselected"
                >
                    <!-- element menu的index接收字符串，直接使用 :index="i"的话默认传number，会有异常-->
                    <el-menu-item v-for="(menu, i) in menuList" :index="`${i}`">
                        <span>{{ menu.text }}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <component
                    :is="menuList[activeIndex].component"
                    @userinfochange="refreshUserInfo"
                ></component>
            </el-main>
        </el-container>
    </div>
</template>
<script setup>
import UserPwdEdit from '@/views/usersview/userinfoedit/UserPwdEdit.vue'
import UserPhoneEdit from '@/views/usersview/userinfoedit/UserPhoneEdit.vue'
import UserBaseInfoEdit from '@/views/usersview/userinfoedit/UserBaseInfoEdit.vue'

import { ref } from 'vue'
const emit = defineEmits(['refreshUserInfo'])
const activeIndex = ref(0)

const menuList = [
    {
        component: UserBaseInfoEdit,
        text: '修改基本信息'
    },
    {
        component: UserPwdEdit,
        text: '修改密码'
    },
    {
        component: UserPhoneEdit,
        text: '绑定手机号'
    }
]
// const menuList = [
//     {
//         component: () =>
//             import('@/views/usersview/userinfoedit/UserBaseInfoEdit.vue'),
//         text: '修改基本信息'
//     },
//     {
//         component: () =>
//             import('@/views/usersview/userinfoedit/UserPwdEdit.vue'),
//         text: '修改密码'
//     },
//     {
//         component: () =>
//             import('@/views/usersview/userinfoedit/UserPhoneEdit.vue'),
//         text: '绑定手机号'
//     }
// ]

// console.log(menuList)
function menuitemselected(key) {
    // console.log('menuitemselected', key, keyPath)
    activeIndex.value = key
}
function refreshUserInfo() {
    emit('refreshUserInfo')
}
</script>
<style scoped>
.user-setting-edit-wrapper {
    height: 95%;
}
</style>
