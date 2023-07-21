<template>
    <div class="job-send-title">
        <!-- 投递记录列表 -->
        <div class="job-send-title-search">
            <el-form
                :model="dataBean"
                label-width="120px"
                :inline="true"
                style="padding-top: 10px"
            >
                <el-form-item label="公司名称">
                    <el-input
                        placeholder="请输入公司名称"
                        v-model="dataBean.cname"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="意向程度">
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
                <el-form-item label="薪资范围">
                    <el-col :span="11">
                        <el-input-number
                            v-model="dataBean.salarydown"
                            clearable
                            :min="0"
                            :max="10"
                            placeholder="选择薪资下限"
                            controls-position="right"
                        />
                    </el-col>
                    <el-col :span="2" class="text-center">
                        <span class="text-gray-500">-</span>
                    </el-col>
                    <el-col :span="11">
                        <el-input-number
                            v-model="dataBean.salaryup"
                            clearable
                            :min="0"
                            :max="10"
                            placeholder="选择薪资上限"
                            controls-position="right"
                        />
                    </el-col>
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
                    @click="jobSendLogAdd = true"
                    v-no-more-click
                >
                    新增
                </el-button>
            </div>
        </div>
    </div>
    <el-divider />

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
    <div class="job-send-log-dialog-add">
        <el-dialog
            v-model="jobSendLogAdd"
            :destroy-on-close="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :before-close="beforeAdd"
            title="新增投递记录"
            width="70%"
        >
            <LogForJobSendAdd
                @jobSendLogAddClose="jobSendLogAdd = false"
                :mguid="guid"
            ></LogForJobSendAdd>
        </el-dialog>
    </div>
    <div class="job-send-log-dialog-edit"></div>
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
import LogForJobSendAdd from '@/views/logJobs/logjobmain/mainrouterviews/LogForJobSendAdd.vue'

const guid = ref(router.currentRoute.value.query.guid)

//列表绑定数据的对象
const tableData = ref([])
const jobSendLogAdd = ref(false)
//分页的对象
const pager = reactive({ total: 0, currentPager: 1, pageSize: 10 })
const listCount = inject('listCount')
//请求列表数据的入参对象,即搜索条件
const dataBean = reactive({
    mguid: guid.value,
    guid: '',
    cpage: pager.currentPager,
    pagesize: pager.pageSize,
    startdate: '',
    enddate: '',
    salarydown: '',
    salaryup: '',
    cname: '',
    heartlevel: ''
})
/**
 * 点击详情按钮之后详情页的数据对象
 */
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
    //删除数据成功之后重新请求列表数据
    deleteSendLog(row.guid).then(getsendListData)
}
function jobsendlistsearch() {
    getsendListData()
}

/**
 * 翻页操作事件
 * @param {*} e:翻页后页码
 */
function handleCurrentChange(e) {
    dataBean.cpage = e
    // console.log('handleCurrentChange', e, dataBean)
    // getsendListData()
}

function beforeAdd(e) {
    console.log('beforeAdd', e)
    jobSendLogAdd.value = false
}

/**
 * 自定义列表的样式方法
 * @param {*} row
 * @param {*} rowIndex
 */
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
@import '@/assets/joblogcss/jobsendlist.css';
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
