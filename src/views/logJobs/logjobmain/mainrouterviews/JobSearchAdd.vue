<template>
    <div class="job-search-add-wrapper">
        <el-form
            :model="dataBean"
            ref="dataBeanRuleRef"
            label-width="120px"
            :rules="dataBeanRule"
            label-position="top"
            style="padding-top: 10px"
            class="send-log-add-form"
        >
            <!-- <el-row> -->
            <!-- class="el-form-item-half" -->
            <el-form-item label="找工作记录名称" prop="mname">
                <!-- class="input-half" -->
                <el-input
                    v-model="dataBean.mname"
                    placeholder="请输入找工作记录名称"
            /></el-form-item>
            <!-- </el-row> -->
            <el-row class="input-three-three">
                <el-form-item
                    label="开始时间"
                    class="el-form-item-half"
                    prop="startdate"
                >
                    <el-date-picker
                        v-model="dataBean.startdate"
                        type="date"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                        placeholder="请选择开始时间"
                        :shortcuts="shortcuts"
                        clearable
                    />
                </el-form-item>
                <el-form-item>
                    <div class="button-row">
                        <div class="button-group search-add-button">
                            <div class="button-item">
                                <el-button
                                    class="job-send-button"
                                    @click="addJobSeachLog"
                                    v-no-more-click
                                >
                                    新增
                                </el-button>
                            </div>
                            <div class="button-item">
                                <el-button
                                    @click="emit('jobSearchLogAddClose')"
                                    v-no-more-click
                                    type="danger"
                                    class="job-send-button-danger"
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
import { addJobSearchLog } from '@/api/logForJobUtil.js'
import { ElMessage, ElMessageBox } from 'element-plus'

//定义子组件操作父组件方法
const emit = defineEmits(['jobSearchLogAddClose'])
//表单对象
const dataBean = reactive({
    mname: '',
    startdate: ''
})
const dataBeanRule = reactive({
    mname: [
        { required: true, message: '请输入找工作记录名称', trigger: 'blur' }
    ],
    startdate: [
        { required: true, message: '请输入找工作开始时间', trigger: 'blur' }
    ]
})
//进行表单校验的对象
const dataBeanRuleRef = ref()
const shortcuts = [
    {
        text: '现在',
        value: new Date()
    },
    {
        text: '明天',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            return date
        }
    },
    {
        text: '昨天',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
        }
    },
    {
        text: '一周前',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
        }
    },
    {
        text: '一周后',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            return date
        }
    }
]
/**
 * 新增找工作记录
 */
function addJobSeachLog() {
    dataBeanRuleRef.value.validate((valid) => {
        if (valid) {
            // console.log('addJobSeachLog', dataBean)
            addJobSearchLog(dataBean).then((res) => {
                if (res.state.code === '200') {
                    ElMessageBox.alert('新增成功，祝君找工作顺利！', '提示', {
                        confirmButtonText: '确定',
                        callback: (action) => {
                            emit('jobSearchLogAddClose')
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
</script>
<style scoped>
/* @import '@/assets/joblogcss/jobsendlogadd.css'; */
.search-add-button {
    margin-top: 28px;
}
.job-send-button-danger {
    border-radius: 6px;
}
/* 最后一行样式 */

.input-three-three {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.input-comment {
    flex: 1;
}
.button-row {
    position: relative;
}

.button-group {
    display: flex;

    justify-content: space-between;
    flex-direction: initial;
}
.button-item {
    margin-left: 67px;
}
.job-send-button {
    border-radius: 6px;
    border: 1.5px solid var(--unnamed, #3472d7);
    color: var(--unnamed, #3472d7);
    font-family: Microsoft YaHei UI;
}
</style>
