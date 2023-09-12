<template>
    <div class="interview-question-title job-send-title">
        <div class="interview-question-search job-send-title-search">
            <el-form
                :model="dataBean"
                label-width="120px"
                :inline="true"
                style="padding-top: 10px"
            >
                <el-form-item label="">
                    <div class="interview-question-search-tags">
                        <QuestionTagSelect
                            ref="questionTagSelectRef"
                        ></QuestionTagSelect>
                    </div>
                </el-form-item>
                <el-form-item label="关键字">
                    <el-input
                        placeholder="请输入问题关键字"
                        v-model="searchBean.keyword"
                        clearable
                    />
                </el-form-item>
            </el-form>
        </div>
        <div class="button-container">
            <div style="margin-bottom: 28px">
                <el-button
                    class="job-send-button"
                    @click="questionlistsearch"
                    v-no-more-click
                >
                    搜索
                </el-button>
            </div>
            <div>
                <el-button
                    class="job-send-button"
                    @click="interviewQuestionAdd = true"
                    v-no-more-click
                >
                    新增
                </el-button>
            </div>
        </div>
    </div>
    <el-divider />
    <div class="job-log-wrapper">
        <div class="joblog-list-layout">
            <el-table
                :data="tableData"
                style="width: 100%"
                max-height="580px"
                size="large"
                :row-style="initRowStyle"
                row-class-name="table-row-class"
                @expand-change="expandChange"
            >
                <el-table-column type="expand">
                    <template #default="props">
                        <div>
                            {{ props.row.answer }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="问题">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <!-- <el-icon><timer /></el-icon> -->
                            <span>{{ scope.row.question }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="标签" width="400">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-tag class="ml-2" color="#F6C4C4">{{
                                scope.row.question
                            }}</el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template #default="scope">
                        <el-button
                            circle
                            text
                            size="large"
                            v-no-more-click
                            @click="handleEdit(scope.$index, scope.row)"
                        >
                            <template #icon>
                                <SvgIcon name="pencil-01"></SvgIcon>
                            </template>
                        </el-button>
                        <el-button
                            circle
                            text
                            size="large"
                            v-no-more-click
                            @click="handleDelete(scope.$index, scope.row)"
                        >
                            <template #icon>
                                <SvgIcon name="trash-01"></SvgIcon>
                            </template>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="joblog-list-pager">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="pager.total"
                v-model:current-page="pager.currentPager"
                v-model:page-size="pager.pageSize"
                @current-change="handleCurrentChange"
                class="pager"
            />
            <!-- @size-change="handleSizeChange" -->
        </div>
    </div>
    <div class="interview-dialog">
        <el-dialog
            v-model="interviewQuestionAdd"
            :destroy-on-close="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            title="新增面经"
            width="80%"
        >
            <QuestionAdd @closeDialog="closeDialog"></QuestionAdd>
        </el-dialog>
        <el-dialog
            v-model="interviewQuestionEdit"
            :destroy-on-close="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            title="修改面经答案"
            width="80%"
        >
            <QuestionEdit
                :dataBean="editBean"
                @closeDialog="interviewQuestionEdit = fales"
                @closeAndRefresh="editClose"
            ></QuestionEdit>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import {
    getInterviewQuestions,
    deleteInterviewQuestion,
    getQuestionByGuid,
    updateViewTimes
} from '@/api/interviewUtil.js'
import QuestionAdd from '@/components/interviewComp/QuestionAdd.vue'
import QuestionEdit from '@/components/interviewComp/QuestionEdit.vue'
import QuestionTagSelect from '@/components/interviewComp/QuestionTagSelect.vue'

const searchBean = reactive({
    tagvalue: '',
    keyword: ''
})
const editBean = reactive({
    question: '',
    answer: '',
    tagName: '',
    tagValue: '',
    rowguid: ''
})
const interviewQuestionAdd = ref(false)
const interviewQuestionEdit = ref(false)

//子组件对象
const questionTagSelectRef = ref(null)
//列表绑定数据的对象
const tableData = ref([])
//分页的对象
const pager = reactive({ total: 0, currentPager: 1, pageSize: 10 })

onMounted(() => {
    getQuestions()
})

/**
 * 获取列表数据
 */
function getQuestions() {
    getInterviewQuestions(searchBean).then((res) => {
        console.log(res)
        if (res.state.code === '200') {
            tableData.value = res.custom.list
            pager.total = res.custom.count
            pager.currentPager = res.custom.currentpage
        } else {
            ElMessage({ message: res.state.msg, type: 'warning' })
        }
    })
}

/**
 * 搜索事件
 */
function questionlistsearch() {
    //找到选中的标签
    searchBean.tagvalue = questionTagSelectRef.value.getSelectedTags().value
    // console.log(searchBean)
    getQuestions()
}

/**
 * 新增之后的关闭弹窗事件
 */
function closeDialog() {
    interviewQuestionAdd.value = false
    questionlistsearch()
}

function editClose() {
    interviewQuestionEdit.value = false
    questionlistsearch()
}

function handleEdit(index, row) {
    getQuestionByGuid(row.kguid).then((res) => {
        if (res.state.code == '200') {
            editBean.answer = res.custom.answer
            editBean.question = res.custom.question
            editBean.rowguid = row.kguid
            editBean.tagValue = res.custom.tagvalue
            interviewQuestionEdit.value = true
        } else {
            ElMessage({ message: res.state.msg, type: 'warning' })
        }
    })
}
function handleDelete(index, row) {
    deleteInterviewQuestion(row.kguid).then((res) => {
        if (res.state.code == '200') {
            ElMessage({ message: '删除成功', type: 'success' })
            questionlistsearch()
        } else {
            ElMessage({ message: res.state.msg, type: 'warning' })
        }
    })
}

function expandChange(row, expandedRows) {
    console.log(row)
    console.log(expandedRows)
    for (let i in expandedRows) {
        if (expandedRows[i].kguid == row.kguid) {
            //对当前行数据进行了展开，查看次数+1
            updateViewTimes(row.kguid)
        }
    }
}
</script>

<style scoped>
@import '@/assets/joblogcss/jobloglistcss.css';
@import '@/assets/joblogcss/jobsendlist.css';
.el-icon {
    width: 24px !important;
    height: 24px !important;
}
</style>
<style>
.el-icon {
    width: 24px !important;
    height: 24px !important;
}

.dividerStyle {
    stroke-width: 2px;
    /* stroke: #dee1e6; */
    filter: blur(2px);

    stroke: #bcb6b6;

    flex-shrink: 0;
}
.el-drawer__body {
    padding: 5px 20px 20px 20px;
}

::v-deep .el-table__body {
    /* webkit-border-horizontal-spacing: 13px; */
    -webkit-border-vertical-spacing: 13px;
}
</style>
