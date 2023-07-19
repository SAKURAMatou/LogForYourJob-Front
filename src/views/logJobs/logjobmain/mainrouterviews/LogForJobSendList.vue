<template>
    <h1>投递记录列表</h1>
</template>
<script setup>
import router from '@/router'
import { ref } from 'vue'
const guid = ref(router.currentRoute.value.query.guid)
console.log('字列表', guid)
</script>
