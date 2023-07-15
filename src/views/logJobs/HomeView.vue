<template>
    <div class="common-layout">
        <el-container class="app-wrapper">
            <el-aside width="246px" class="sidebar-container">
                <LogJobLeftAside></LogJobLeftAside>
            </el-aside>
            <el-container class="container right-container">
                <el-header>
                    <LogJobHeader></LogJobHeader>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        <!-- </div> -->
    </div>
</template>

<script setup>
import LogJobLeftAside from '@/views/logJobs/logjobmain/LogJobLeftAside.vue'
import LogJobHeader from '@/views/logJobs/logjobmain/LogJobHeader.vue'
</script>

<style scoped>
body {
    background: var(--background, #f0f6ff);
    margin-top: 0px !important;
}

.common-layout {
    /* height: 1160px; */
    /* width: 100%; */
    flex-shrink: 0;
    background: var(--background, #f0f6ff);
}
.el-aside {
    overflow: inherit;
}
</style>
