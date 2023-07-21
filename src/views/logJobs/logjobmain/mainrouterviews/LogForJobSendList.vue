<template>
    <h1>投递记录列表</h1>
    <div class="job-log-wrapper">
        <!--  -->
        <div class="joblog-list-layout">
            <el-table
                :data="tableData"
                style="width: 100%"
                max-height="600px"
                size="large"
                :row-style="initRowStyle"
                row-class-name="table-row-class"
            >
                <el-table-column label="公司名称">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <!-- <el-icon><timer /></el-icon> -->
                            <span>{{ scope.row.cname }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="岗位名称">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <!-- <el-icon><timer /></el-icon> -->
                            <span>{{ scope.row.jobname }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="薪资" width="180">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <!-- <el-icon><timer /></el-icon> -->
                            <span>{{ scope.row.salary }}&nbsp;K</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="投递时间" width="180">
                    <template #default="scope">
                        <SvgIcon name="calendar"></SvgIcon>
                        <span>{{ scope.row.sendtime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="意向程度" width="180">
                    <template #default="scope">
                        <SvgIcon
                            :name="`heart-level-${scope.row.heartlevel}`"
                        ></SvgIcon>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button
                            @click="handleOpenDetail(scope.$index, scope.row)"
                            circle
                            text
                            size="large"
                            v-no-more-click
                        >
                            <template #icon>
                                <SvgIcon name="terminal-browser"></SvgIcon>
                            </template>
                        </el-button>
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
    <div class="drawer-wrapper">
        <el-drawer v-model="detail.opendrawer" size="60%">
            <template #header="{ titleId }">
                <span :id="titleId" class="titleClass">
                    {{ detail.mname }}/{{ detail.cname }}
                </span>
            </template>
            <el-divider style="margin-top: 0px" class="dividerStyle" />
            <LogForJobSendDetail :detail="detail"></LogForJobSendDetail>
        </el-drawer>
    </div>
</template>
<script setup>
import router from '@/router'
import { ref, onMounted, inject, reactive } from 'vue'
import {
    getsendList,
    deleteSendLog,
    getSendLogDetail
} from '@/api/logForJobUtil.js'
import LogForJobSendDetail from '@/views/logJobs/logjobmain/mainrouterviews/LogForJobSendDetail.vue'
const guid = ref(router.currentRoute.value.query.guid)

//列表绑定数据的对象
const tableData = ref([])
//分页的对象
const pager = reactive({ total: 0, currentPager: 1, pageSize: 10 })
const listCount = inject('listCount')
//请求列表数据的入参对象
const dataBean = reactive({
    mguid: guid.value,
    guid: '',
    cpage: pager.currentPager,
    pagesize: pager.pageSize,
    startdate: '',
    enddate: '',
    cname: '',
    heartlevel: ''
})
const detail = reactive({
    opendrawer: false,
    cname: '公司名称',
    mname: '',
    jobname: '',
    salary: '',
    heartlevel: '',
    sendtime: '',
    cwebsite: '',
    jobdescription: '',
    requirement: '',
    comment: ''
})

onMounted(() => {
    getsendListData()
})
/**
 * 获取列表数据
 */
const getsendListData = () => {
    getsendList(dataBean).then((res) => {
        if (res.state.code === '200') {
            tableData.value = res.custom.list
            pager.total = res.custom.count
            pager.currentPager = res.custom.currentpage
            listCount.value = pager.total
        } else {
        }
    })
}

/**
 * 打公司开详情页
 * @param {*} index
 * @param {*} row
 */
const handleOpenDetail = (index, row) => {
    //打开详情，先请求详情，成功之后detail.opendrawer=true

    getSendLogDetail(row.guid).then((res) => {
        if (res.state.code === '200') {
            // detail =
            Object.assign(detail, res.custom)
            detail.opendrawer = true
            // console.log('detail', detail)
        } else {
        }
        //
    })
}
const handleEdit = (index, row) => {}
const handleDelete = (index, row) => {
    console.log('handleDelete', row.guid)
    //删除数据成功之后重新请求列表数据
    deleteSendLog(row.guid).then(getsendListData)
}

function handleCurrentChange(e) {}

function initRowStyle(row, rowIndex) {
    return {
        'border-radius': '20px',
        'box-shadow': '0 0 0 10px #F0F6FF',
        'background': 'var(--background, #F0F6FF)'
        // 'outline': 'var(--background, #F0F6FF)',
        // 'padding-top': '24px',
        // 'padding-buttom': '24px',
    }
}
</script>

<style scoped>
@import '@/assets/joblogcss/jobloglistcss.css';

.icon-heart-level-1,
.icon-heart-level-2,
.icon-heart-level-3,
.icon-heart-level-4,
.icon-heart-level-0 {
    width: 96px;
    height: 48px;
}

.icon-terminal-browser,
.icon-pencil-01,
.icon-trash-01 {
    width: 24px;
    height: 24px;
}

.titleClass {
    color: #000;
    font-family: Microsoft YaHei UI;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 25px;
    /* 78.125% */
    height: 35.565px;
    margin-top: 32.12px;
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

/* tr { */
/* display: block; */
/* margin-top: 10px; */
/* } */
::v-deep .el-table__body {
    /* webkit-border-horizontal-spacing: 13px; */
    -webkit-border-vertical-spacing: 13px;
}
</style>
