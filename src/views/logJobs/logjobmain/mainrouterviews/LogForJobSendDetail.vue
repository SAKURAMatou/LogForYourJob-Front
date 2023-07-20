<template>
    <h2>{{ detail.mname }}/{{ detail.cname }}</h2>
</template>
<script setup>
// const detail = defineProps({
//     opendrawer: false,
//     cname: '公司名称',
//     mname: '',
//     jobname: '',
//     salary: '',
//     heartlevel: '',
//     sendtime: '',
//     cwebsite: '',
//     jobdescription: '',
//     requirement: '',
//     comment: ''
// })
const prop = defineProps({
    detail: Object
})
console.log('ziye', prop.detail)
</script>
