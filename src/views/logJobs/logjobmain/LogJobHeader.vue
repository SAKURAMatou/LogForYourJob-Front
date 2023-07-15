<template>
    <div class="head-wrapper">
        <div class="head-content head-left-text">
            <span class="title-text"> Find Jobs </span>
            <span class="title-text"> (<slot name="count">0</slot>)</span>
        </div>

        <el-button
            class="head-content login-button my-login-button"
            id="head-right-button"
            @click="getData"
            ><slot name="btntext">返回上级</slot></el-button
        >
    </div>
</template>
<script setup>
import { getDataTest } from '@/api/logForJobUtil.js'

function getData() {
    getDataTest().then((res) => {
        console.log(res)
    })
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
    font-size: 16px;
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
</style>
