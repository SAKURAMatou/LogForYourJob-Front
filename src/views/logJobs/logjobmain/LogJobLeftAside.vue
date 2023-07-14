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
                <el-menu-item index="2">
                    <el-icon><icon-menu /></el-icon>
                    <span>Navigator Two</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>Navigator Three</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>Navigator Four</span>
                </el-menu-item>
                <!-- 把stores中的数据渲染成菜单 -->
                <!-- <template v-for="item in store.state.permission.menus" :key="item.id">
              <el-menu-item :index="item.path">
                <el-icon>
                  <setting />
                </el-icon>
                <span>{{ item.name }}</span>
              </el-menu-item>
            </template> -->
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
}

#line-ap {
    stroke-width: 1px;
    stroke: var(--line, #d4d9db);
    height: 0px;
    flex-shrink: 0;
    align-self: stretch;
}

.main-left-img {
    height: 479px;
    flex-shrink: 0;
    align-self: stretch;
    margin-top: 64px;
}
</style>
