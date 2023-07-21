<template>
    <h1>新增投递记录</h1>
    <div class="button-group">
        <el-button class="job-send-button" @click="saveAndNew" v-no-more-click>
            保存并新增
        </el-button>
        <el-button
            class="job-send-button"
            @click="emit('jobSendLogAddClose')"
            v-no-more-click
        >
            确定新增
        </el-button>
    </div>
</template>
<script setup>
const emit = defineEmits(['jobSendLogAddClose'])
// @click="dialogShow = false"
// console.log('dialogShow', prop.dialogShow)
function saveAndNew() {}
</script>
