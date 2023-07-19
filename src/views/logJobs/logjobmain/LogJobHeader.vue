<template>
    <div class="head-wrapper">
        <div class="head-content head-left-text">
            <span class="title-text"> Find Jobs </span>
            <!-- <span class="title-text"> (<slot name="count">0</slot>)</span> -->
            <span class="title-text"> ({{ listCount }})</span>
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
const ishide = ref(false)
// const guid = ref(router.query.guid)
//头部列表数据
const listCount = inject('listCount')
ishide.value = router.currentRoute.value.name === 'job'
watch(router.currentRoute, (r) => {
    // console.log('currentRoute', r)
    ishide.value = 'job' === r.name
})
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
.head-content {
    position: absolute;
    top: 50%;

    transform: translate(-50%, -50%);
}
.head-left-text {
    left: 138px;

    margin-left: 50px;
}
.title-text {
    color: #000;
    font-family: Microsoft YaHei UI;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}
.hide {
    display: none;
}
</style>
