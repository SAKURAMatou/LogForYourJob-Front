<template>
    <div class="send-log-add-wrapper">
        <el-form
            :model="dataBean"
            label-width="120px"
            :inline="true"
            label-position="top"
            style="padding-top: 10px"
            class="send-log-add-form"
        >
            <el-row>
                <el-form-item label="公司名称">
                    <el-input v-model="dataBean.cname" class="input-half" />
                </el-form-item>
                <el-form-item label="岗位名称">
                    <el-input v-model="dataBean.jobname" class="input-half" />
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="薪资">
                    <el-input-number
                        v-model="dataBean.salary"
                        min="0"
                        step-strictly
                        class=".input-half"
                    />&nbsp;K
                </el-form-item>
                <el-form-item label="公司网址">
                    <el-input
                        v-model="dataBean.cwebsite"
                        placeholder="输入公司网址"
                        class="input-with-select input-half"
                    >
                        <template #prepend>
                            <el-select
                                v-model="dataBean.cwebsitepre"
                                placeholder="Select"
                                style="width: 115px"
                            >
                                <el-option label="http" value="http" />
                                <el-option label="https" value="https" />
                            </el-select>
                        </template>
                        <!-- <template #append>
                            <el-button :icon="Search" />
                        </template> -->
                    </el-input>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
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
import { reactive } from 'vue'

const props = defineProps(['mguid'])
const emit = defineEmits(['jobSendLogAddClose'])

const dataBean = reactive({
    mguid: props.mguid,
    guid: '',
    cname: '',
    jobname: '',
    salary: '',
    heartlevel: '',
    sendtime: '',
    cwebsite: '',
    jobdescription: '',
    requirement: '',
    comment: '',
    cwebsitepre: 'http'
})

// @click="dialogShow = false"
console.log('dialogShow', props.mguid, dataBean)
function saveAndNew() {
    dataBean.guid = ''
    dataBean.cname = ''
    dataBean.jobname = ''
    dataBean.salary = ''
    dataBean.heartlevel = ''
    dataBean.sendtime = ''
    dataBean.cwebsite = ''
    dataBean.jobdescription = ''
    dataBean.requirement = ''
    dataBean.comment = ''
}
</script>

<style scoped>
.el-row {
    width: 100%;
}
.el-form--inline .el-form-item {
    flex: 1 0 40%;
    align-items: center;
}
.send-log-add-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: 32px;
}
.send-log-add-form .el-input {
    --el-input-width: 100%;
}
/* .el-input-number .el-input {
    --el-input-width: 100%;
} */
.el-form--inline .el-input {
    width: 90%;
}
</style>
