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
                        value-key="value"
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
                                    @click="saveEdit"
                                    v-no-more-click
                                >
                                    保存修改
                                </el-button>
                            </div>
                            <div class="button-item">
                                <el-button
                                    class="job-send-button-danger"
                                    @click="cancleEdit"
                                    v-no-more-click
                                    type="danger"
                                >
                                    取消
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
import { modifySendLog } from '@/api/logForJobUtil.js'
import { ElMessage, ElMessageBox } from 'element-plus'
//定义从父组件获取的记录详情对象
const prop = defineProps({
    dataBean: Object
})
const emit = defineEmits(['jobSendLogEditClose'])
// console.log('edit', prop.dataBean)
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
 * 保存修改
 */
function saveEdit() {
    dataBeanRuleRef.value.validate((valid) => {
        if (valid) {
            console.log('saveEdit', JSON.stringify(prop.dataBean))
            modifySendLog(prop.dataBean).then((res) => {
                if (res.state.code === '200') {
                    ElMessageBox.alert('修改成功，祝君找工作顺利！', '提示', {
                        confirmButtonText: '确定',
                        callback: (action) => {
                            emit('jobSendLogEditClose')
                        }
                    })
                } else {
                    ElMessage({
                        message: res.state.msg,
                        type: 'warning'
                    })
                }
            })
        }
    })
}
/**
 * 取消修改
 */
function cancleEdit() {
    prop.dataBean.openedit = false
}
</script>

<style scoped>
@import '@/assets/joblogcss/jobsendlogadd.css';
</style>
