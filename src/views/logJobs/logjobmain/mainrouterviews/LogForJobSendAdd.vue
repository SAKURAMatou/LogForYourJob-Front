<template>
    <div class="send-log-add-wrapper">
        <el-form
            :model="dataBean"
            ref="dataBeanRuleRef"
            label-width="120px"
            :inline="true"
            :rules="dataBeanRule"
            label-position="top"
            style="padding-top: 10px"
            class="send-log-add-form"
        >
            <el-row>
                <el-form-item
                    label="公司名称"
                    class="el-form-item-half"
                    prop="cname"
                >
                    <el-input v-model="dataBean.cname" class="input-half" />
                </el-form-item>
                <el-form-item
                    label="岗位名称"
                    class="el-form-item-half"
                    prop="jobname"
                >
                    <el-input v-model="dataBean.jobname" class="input-half" />
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item
                    label="薪资"
                    class="el-form-item-half"
                    prop="salary"
                >
                    <el-input-number
                        v-model="dataBean.salary"
                        min="0"
                        step-strictly
                        class=".input-half"
                    />&nbsp;K
                </el-form-item>
                <el-form-item label="公司网址" class="el-form-item-half">
                    <el-input
                        v-model="dataBean.cwebsite"
                        placeholder="输入公司网址"
                        class="input-with-select input-half"
                    >
                    </el-input>
                </el-form-item>
            </el-row>
            <el-row class="input-two-three">
                <el-form-item
                    label="岗位职责"
                    prop="jobdescription"
                    class="el-form-item-half"
                >
                    <el-input
                        v-model="dataBean.jobdescription"
                        placeholder="请输入岗位职责"
                        show-word-limit
                        type="textarea"
                    />
                </el-form-item>
                <el-form-item
                    label="意向程度"
                    prop="heartlevel"
                    class="el-form-item-half"
                >
                    <el-select
                        placeholder="选择意向程度"
                        v-model="dataBean.heartlevel"
                        clearable
                    >
                        <el-option label="毫无波澜" value="0" />
                        <el-option label="略有心动" value="1" />
                        <el-option label="微微心动" value="2" />
                        <el-option label="强烈心动" value="3" />
                        <el-option label="震撼心动" value="4" />
                    </el-select>
                </el-form-item>
            </el-row>
            <el-row class="input-two-three">
                <el-form-item
                    label="岗位要求"
                    prop="requirement"
                    class="el-form-item-half"
                >
                    <el-input
                        v-model="dataBean.requirement"
                        placeholder="请输入岗位要求"
                        show-word-limit
                        type="textarea"
                    />
                </el-form-item>
                <el-form-item class="el-form-item-half"></el-form-item>
            </el-row>
            <el-row class="input-three-three">
                <el-form-item
                    label="评价"
                    prop="requirement"
                    class="input-comment"
                >
                    <el-input
                        v-model="dataBean.requirement"
                        placeholder="请输入评价"
                        show-word-limit
                        type="textarea"
                    />
                </el-form-item>
                <el-form-item>
                    <div class="button-row">
                        <div class="button-group">
                            <div class="button-item">
                                <el-button
                                    class="job-send-button"
                                    @click="saveAndNew"
                                    v-no-more-click
                                >
                                    保存并新增
                                </el-button>
                            </div>
                            <div class="button-item">
                                <el-button
                                    class="job-send-button"
                                    @click="emit('jobSendLogAddClose')"
                                    v-no-more-click
                                >
                                    确定新增
                                </el-button>
                            </div>
                        </div>
                    </div>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { addSendLog } from '@/api/logForJobUtil.js'

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
//进行表单校验的对象
const dataBeanRuleRef = ref()
const dataBeanRule = reactive({
    cname: [
        {
            required: true,
            message: '输入公司名称',
            trigger: 'blur'
        }
    ],
    jobname: [
        {
            required: true,
            message: '输入岗位名称',
            trigger: 'blur'
        }
    ],
    salary: [],
    heartlevel: [],
    requirement: []
})

/**
 * 添加新的投递记录
 */
function addNewSendLog() {}

// @click="dialogShow = false"
// console.log('dialogShow', props.mguid, dataBean)
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
@import '@/assets/joblogcss/jobsendlogadd.css';
</style>
