<template>
    <div class="head-wrapper">
        <div class="head-content head-left-text">
            <!-- <div class="head-left-wrapper"> -->
            <div class="title-text">Jobs Logs:</div>
            <el-breadcrumb class="breadcrumb">
                <el-breadcrumb-item
                    v-for="(item, index) in breadcrumbData"
                    :key="item"
                    >{{ item.tag }}
                    <template
                        v-if="
                            index == breadcrumbData.length - 1 &&
                            !item.hideTotal
                        "
                        >({{ listCount }})</template
                    >
                </el-breadcrumb-item>
                <!-- <el-breadcrumb-item>二级菜单</el-breadcrumb-item>
                <el-breadcrumb-item>二级菜单</el-breadcrumb-item> -->
            </el-breadcrumb>
            <!-- </div> -->
            <!-- <span class="title-text"> (<slot name="count">0</slot>)</span> -->
            <!-- <span class="title-text"> ({{ listCount }})</span> -->
        </div>

        <el-button
            class="head-content login-button my-login-button hide"
            id="head-right-button"
            @click="backHandle"
            v-show="ishide"
            ><slot name="btntext">返回上级</slot></el-button
        >
    </div>
</template>
<script setup>
// import { getDataTest } from '@/api/logForJobUtil.js'
import { inject, watch, ref } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
const ishide = ref(false)
const breadcrumbData = ref([])

const route = useRoute()

//头部列表数据
const listCount = inject('listCount')
ishide.value = route.name === 'job'
watch(router.currentRoute, (r) => {
    ishide.value = 'job' === r.name
    initBreadcrumbData()
})

const initBreadcrumbData = () => {
    breadcrumbData.value = []
    if (route.query.name) {
        breadcrumbData.value.push({ tag: route.query.name, hideTotal: true })
    }
    breadcrumbData.value.push(route.meta)
    // console.log('breadcrumbData', breadcrumbData)
}
initBreadcrumbData()
/**
 * 点击之后路由回退
 */
const backHandle = () => {
    router.back()
}
</script>

<style scoped>
#head-right-button {
    display: inline-flex;
    height: 40px;
    padding: 10px 25px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 6px;
    border: 2px solid var(--unnamed, #3472d7);
    color: var(--unnamed, #3472d7);
    font-family: Microsoft YaHei UI;

    font-size: 18px;
    font-style: normal;
    float: right;
    /* margin-right: 71px; */

    right: 71px;
    /* transform: translate(0, -50%); */
}
.head-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
}
.head-content {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    /* 左侧文字新增 */

    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translateY(-50%);
}

.head-left-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
}
.title-text {
    color: #000;
    font-family: Microsoft YaHei UI;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    width: 210px;
    flex: 0 0 auto; /* 不伸缩，固定宽度 */
    position: absolute;

    margin-left: 10px;
}
.hide {
    display: none;
}
.breadcrumb {
    color: #000;
    font-family: Microsoft YaHei UI;
    line-height: normal;
    font-style: normal;
    font-size: 22px;
    flex: 1;
    left: 229px;
    position: relative;
}
</style>
