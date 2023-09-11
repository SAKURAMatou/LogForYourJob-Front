<template>
    <el-row class="tac">
        <el-col>
            <SvgIcon name="systemLog" id="left-aside-logo"></SvgIcon>
            <!-- <h4 class="mb-2">侧面菜单</h4> -->
            <el-menu
                default-active="00"
                router
                @open="handleOpen"
                @close="handleClose"
            >
                <el-menu-item :index="jobSearch">
                    <el-icon><SvgIcon name="document"></SvgIcon></el-icon>
                    <span class="left-aside-menu">找工作记录</span>
                </el-menu-item>
                <el-menu-item :index="interview">
                    <el-icon><SvgIcon name="document"></SvgIcon></el-icon>
                    <span class="left-aside-menu">面经问答</span>
                </el-menu-item>

                <div id="line-ap">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="241"
                        height="2"
                        viewBox="0 0 241 2"
                        fill="none"
                    >
                        <path
                            d="M240 1.037L240.5 1.037L240.5 0.0369968L240 0.0369968L240 1.037ZM4.37114e-08 1.03702L240 1.037L240 0.0369968L-4.37114e-08 0.0370178L4.37114e-08 1.03702Z"
                            fill="#D4D9DB"
                        />
                    </svg>
                </div>
                <el-menu-item :index="setting">
                    <el-icon><SvgIcon name="setting"></SvgIcon></el-icon>
                    <span class="left-aside-menu">用户设置</span>
                </el-menu-item>
                <div class="main-left-img">
                    <!-- 左侧图片他单独一个组件LoginLeftImg -->
                    <img src="@/assets/imgs/main_left_img01.png" />
                </div>
                <UserAvatar></UserAvatar>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script setup>
import UserAvatar from '@/components/logForJobComp/UserAvatar.vue'
// import document from '@element-plus/icons-vue'
import { ref } from 'vue'
import { DL_ROUTER_PATH } from '@/CONST_VALUE.js'
const jobSearch = ref(
    DL_ROUTER_PATH.main_view.main_root +
        '/' +
        DL_ROUTER_PATH.main_view.children.log_main
)
const setting = ref(
    DL_ROUTER_PATH.main_view.main_root +
        '/' +
        DL_ROUTER_PATH.main_view.children.setting
)
const interview = ref(
    DL_ROUTER_PATH.main_view.main_root +
        '/' +
        DL_ROUTER_PATH.main_view.children.interview
)

const handleOpen = (key, keyPath) => {
    console.log('handleOpen', key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}
</script>

<style scoped>
#left-aside-logo {
    display: flex;
    height: 74px;
    width: 240px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    align-self: stretch;
    background: #fff;
    margin-top: 16px;
}

.app-wrapper {
    height: 100%;
}

.tac {
    height: 100%;
}

.el-col {
    background: var(--white, #fff);
    /* height: 90%; */
}

#line-ap {
    stroke-width: 1px;
    stroke: var(--line, #d4d9db);
    height: 0px;
    flex-shrink: 0;
    align-self: stretch;

    margin-top: 32px;
    margin-bottom: 32px;
}

.main-left-img {
    height: 479px;
    flex-shrink: 0;
    align-self: stretch;
    margin-top: 12px;
}
.left-aside-menu {
    color: #5d7285;
    /* font-family: Poppins; */
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 21.954px; /* 150% */
    letter-spacing: 0.146px;
    font-family: Microsoft YaHei UI;
}
</style>
