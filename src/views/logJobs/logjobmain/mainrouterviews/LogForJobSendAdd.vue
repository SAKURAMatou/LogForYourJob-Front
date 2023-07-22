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
                    <el-input
                        v-model="dataBean.cname"
                        placeholder="请输入公司名称"
                        class="input-half"
                    />
                </el-form-item>
                <el-form-item
                    label="岗位名称"
                    class="el-form-item-half"
                    prop="jobname"
                >
                    <el-input
                        v-model="dataBean.jobname"
                        placeholder="请输入岗位名称"
                        class="input-half"
                    />
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
                <el-form-item
                    label="公司网址"
                    prop="cwebsite"
                    class="el-form-item-half"
                >
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
                <el-form-item label="评价" prop="comment" class="input-comment">
                    <el-input
                        v-model="dataBean.comment"
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
                                    @click="addNewSendLog"
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
import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps(['mguid'])
const emit = defineEmits(['jobSendLogAddClose'])

const checkWebsite = (rule, value, callback) => {
    if (value) {
        //有值的时候校验是否满足网站格式
        const urlRegex =
            /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/
        if (!urlRegex.test(value)) {
            callback(new Error('请输入正确的网址!'))
        } else {
            callback()
        }
    } else {
        //非必填，值为空的时候不校验
        callback()
    }
}

const dataBean = reactive({
    mguid: props.mguid,
    guid: '',
    cname: '',
    jobname: '',
    salary: '',
    heartlevel: '',
    cwebsite: '',
    jobdescription: '',
    requirement: '',
    comment: ''
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
    salary: [
        { required: true, message: '输入薪资', trigger: 'blur' },
        { type: 'number', message: '薪资必须是数字' }
    ],
    heartlevel: [{ required: true, message: '选择意向程度', trigger: 'blur' }],
    comment: [{ required: true, message: '输入评价', trigger: 'blur' }],
    // cwebsite: [{ validator: checkWebsite, trigger: 'blur' }]
    cwebsite: [{ type: 'url', message: '请输入正确的网址', trigger: 'blur' }]
})

/**
 * 添加新的投递记录
 */
function addNewSendLog() {
    dataBeanRuleRef.value.validate(async (valid) => {
        if (valid) {
            console.log('addNewSendLog', dataBean)
            //请求新增数据
            addSendLog(dataBean).then((res) => {
                if (res.state.code === '200') {
                    ElMessageBox.alert('新增成功!', '提示', {
                        confirmButtonText: '确定',
                        callback: (action) => {
                            emit('jobSendLogAddClose')
                        }
                    })
                } else {
                    ElMessage.error(res.custom.description)
                }
            })
        }
    })
}

/**
 * Saves the data and creates a new record.
 *
 * @param {function} valid - Callback function to validate the data.
 * @return {void}
 */
function saveAndNew() {
    dataBeanRuleRef.value.validate(async (valid) => {
        if (valid) {
            console.log('saveAndNew', JSON.stringify(dataBean))
            addSendLog(dataBean).then((res) => {
                if (res.state.code === '200') {
                    ElMessageBox.alert('新增成功!', '提示', {
                        confirmButtonText: '确定',
                        callback: (action) => {
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
                    })
                } else {
                    ElMessage.error(res.custom.description)
                }
            })
        }
    })
}
</script>

<style scoped>
@import '@/assets/joblogcss/jobsendlogadd.css';
</style>
