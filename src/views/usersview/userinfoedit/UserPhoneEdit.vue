<template>
    <h1>修改用户手机号码</h1>
    <el-button @click="emit('userinfochange')">刷新</el-button>
</template>
<script setup>
const emit = defineEmits(['userinfochange'])
</script>
