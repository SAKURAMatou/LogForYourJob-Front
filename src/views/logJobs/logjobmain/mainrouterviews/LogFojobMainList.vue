<template>
    <!-- <h1>找工作记录列表</h1> -->
    <div class="job-send-title">
        <div class="job-send-title-search">
            <el-form
                :model="dataBean"
                label-width="120px"
                :inline="true"
                style="padding-top: 10px"
            >
                <el-form-item label="记录名称">
                    <el-input
                        placeholder="请输入记录名称"
                        v-model="dataBean.mname"
                        clearable
                    />
                </el-form-item>
            </el-form>
        </div>
        <div class="button-container">
            <div style="margin-bottom: 28px">
                <el-button
                    class="job-send-button"
                    @click="jobsendlistsearch"
                    v-no-more-click
                >
                    搜索
                </el-button>
            </div>
            <div>
                <el-button
                    class="job-send-button"
                    @click="jobSearchLogAdd = true"
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
                max-height="600px"
                row-class-name="table-row-class"
            >
                <el-table-column label="记录名称">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <!-- <el-icon><timer /></el-icon> -->
                            <span style="margin-left: 10px">{{
                                scope.row.name
                            }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="开始时间" width="180">
                    <template #default="scope">
                        <SvgIcon name="calendar"></SvgIcon>
                        <span style="margin-left: 10px">{{
                            scope.row.staredate
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="结束时间" width="180">
                    <template #default="scope">
                        <SvgIcon name="calendar"></SvgIcon>
                        <span style="margin-left: 10px">{{
                            scope.row.enddate
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template #default="scope">
                        <div class="job-search-list-operation">
                            <el-button
                                @click="
                                    handleOpenJobSendList(
                                        scope.$index,
                                        scope.row
                                    )
                                "
                                circle
                                text
                                size="large"
                                v-no-more-click
                            >
                                <template #icon>
                                    <SvgIcon name="search2"></SvgIcon>
                                </template>
                            </el-button>
                            <el-button
                                @click="
                                    finishSearchLog(scope.$index, scope.row)
                                "
                                circle
                                text
                                size="large"
                                v-no-more-click
                                v-if="scope.row.isend === '0'"
                            >
                                <template #icon>
                                    <SvgIcon name="check"></SvgIcon>
                                </template>
                            </el-button>
                        </div>
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
    <div class="job-send-log-dialog-add">
        <el-dialog
            v-model="jobSearchLogAdd"
            :destroy-on-close="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            title="新增找工作记录"
        >
            <JobSearchAdd @jobSearchLogAddClose="beforeAdd"></JobSearchAdd>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import { getJobSearchMainList, finishJobSeachLog } from '@/api/logForJobUtil.js'
import { ElMessage, ElMessageBox } from 'element-plus'

import JobSearchAdd from '@/views/logJobs/logjobmain/mainrouterviews/JobSearchAdd.vue'
import router from '@/router'
//分页绑定的对象
const pager = reactive({ total: 0, currentPager: 1, pageSize: 10 })
//列表数据对象
const tableData = ref([])
//新增页面的弹出框标识
const jobSearchLogAdd = ref(false)
//
const emit = defineEmits(['updateTotlal'])
//在头部展示列表总数的对象
const listCount = inject('listCount')
//请求列表数据的入参对象
const dataBean = reactive({
    mname: '',
    cpage: pager.currentPager,
    pagesize: pager.pageSize
})
onMounted(() => {
    //组件挂载的时候请求列表数据
    getJobSearchMainList(dataBean).then(mainListData)
})

/**
 * 点击列表的查看详情按钮之后进入本次的列表页面
 */
function handleOpenJobSendList(index, row) {
    // console.log(index, row)
    // console.log(router, router.history)
    router.push('/logjobs/jobsearch?guid=' + row.guid)
}

/**
 * 处理请求列表数据之后的返回值
 * @param {*} res
 */
const mainListData = (res) => {
    return new Promise((resolve, reject) => {
        // console.log('getJobSearchMainList', res)
        if (res.state.code === '200') {
            pager.total = res.custom.count
            pager.currentPager = res.custom.currentpage
            tableData.value = res.custom.list
            listCount.value = pager.total
            dataBean.cpage = pager.currentPager
            dataBean.pagesize = pager.pageSize
            // console.log('mainListData', res.custom.list)
        }
        resolve()
    })

    // console.log(tableData.value)
}

function handleCurrentChange(e) {
    // console.log('handleCurrentChange', e)
    getJobSearchMainList(dataBean).then(mainListData)
}
/**
 * 列表搜索事件
 */
function jobsendlistsearch() {
    getJobSearchMainList(dataBean).then(mainListData)
}

/**
 * 弹窗页面关闭之前执行的操作，主要是更新列表数据
 */
function beforeAdd() {
    // console.log('beforeAdd')
    getJobSearchMainList(dataBean)
        .then(mainListData)
        .then(() => {
            jobSearchLogAdd.value = false
        })
}

/**
 * 办结找工作记录
 * @param {*} index
 * @param {*} row
 */
function finishSearchLog(index, row) {
    // console.log('finishSearchLog', row)
    ElMessageBox.confirm(`确定要结束${row.name}吗?`, '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        // console.log('finishJobSeachLog-确认')
        finishJobSeachLog().then((res) => {
            if (res.state.code === '200') {
                //办结成功之后是否需要等列表刷新之后再提示，待定
                ElMessage({
                    message: '办结成功！',
                    type: 'success'
                })
                jobsendlistsearch()
            } else {
                ElMessage({ message: res.state.msg, type: 'warning' })
            }
        })
    })
}
</script>
<style scoped>
@import '@/assets/joblogcss/jobloglistcss.css';
@import '@/assets/joblogcss/jobsendlist.css';
</style>
<style>
.el-icon {
    width: 24px !important;
    height: 24px !important;
}
</style>
