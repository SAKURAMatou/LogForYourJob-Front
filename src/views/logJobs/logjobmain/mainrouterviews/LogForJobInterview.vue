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
                        <el-check-tag
                            v-for="(tag, i) in tagLsit"
                            v-bind:color="tag.type"
                            @click="onChange"
                            v-bind:checked="tag.checked"
                            v-bind:index="`${i}`"
                            >{{ tag.tagName }}</el-check-tag
                        >
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
            <QuestionAdd></QuestionAdd>
        </el-dialog>
        <el-dialog
            v-model="interviewQuestionEdit"
            :destroy-on-close="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            title="修改面经答案"
        >
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import { getInterviewQuestions } from '@/api/interviewUtil.js'
import QuestionAdd from '@/components/interviewComp/QuestionAdd.vue'

const searchBean = reactive({
    tagvalue: '',
    keyword: ''
})
const interviewQuestionAdd = ref(false)
const interviewQuestionEdit = ref(false)
//列表绑定数据的对象
const tableData = ref([])
//分页的对象
const pager = reactive({ total: 0, currentPager: 1, pageSize: 10 })
const tagLsit = reactive([
    { tagValue: '01', tagName: 'java', type: '2ED65D', checked: false },
    { tagValue: '02', tagName: 'spring', type: '9DC0FA', checked: false },
    { tagValue: '03', tagName: '数据库', type: 'F6C4C4', checked: false },
    { tagValue: '04', tagName: '消息队列', type: 'F2EF9D', checked: false },
    { tagValue: '05', tagName: '中间件', type: 'DAF2BC', checked: false },
    { tagValue: '06', tagName: '微服务', type: '2ED65D', checked: false }
])

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
    searchBean.tagvalue = tagLsit
        .filter((item) => item.checked == true)
        .map((item) => item.tagValue)
        .join(';')
    getQuestions()
}

function onChange(e) {
    var index = e.target.getAttribute('index')
    tagLsit[index].checked = !tagLsit[index].checked
}

function handleEdit(index, row) {}
function handleDelete(index, row) {}
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
