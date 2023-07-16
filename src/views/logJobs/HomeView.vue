<template>
    <div class="common-layout">
        <el-container class="app-wrapper">
            <el-aside width="246px" class="sidebar-container">
                <LogJobLeftAside></LogJobLeftAside>
            </el-aside>
            <el-container class="container right-container">
                <el-header style="position: relative; height: 90px">
                    <LogJobHeader>
                        <template #name>
                            {{ listCount }}
                        </template>
                        <template #btntext>
                            {{ btntext }}
                        </template>
                    </LogJobHeader>
                </el-header>
                <MainViewDivider></MainViewDivider>
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
import MainViewDivider from '@/components/logForJobComp/MainViewDivider.vue'
import { ref } from 'vue'
const listCount = ref(0)
const btntext = ref('返回上级')
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

.right-container {
    flex: 1; /* 占满剩余空间 */
}
</style>
