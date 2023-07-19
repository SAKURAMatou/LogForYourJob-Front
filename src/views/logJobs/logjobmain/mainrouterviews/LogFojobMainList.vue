<template>
    <h1>找工作记录列表</h1>
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
                        <el-button
                            @click="
                                handleOpenJobSendList(scope.$index, scope.row)
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
</template>
<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import { getJobSearchMainList } from '@/api/logForJobUtil.js'
import router from '@/router'
const pager = reactive({ total: 0, currentPager: 1, pageSize: 10 })
const tableData = ref([])
const emit = defineEmits(['updateTotlal'])
const listCount = inject('listCount')
onMounted(() => {
    //组件挂载的时候请求列表数据
    getJobSearchMainList().then(mainListData)
})

/**
 * 点击列表的查看详情按钮之后进入本次的列表页面
 */
function handleOpenJobSendList(index, row) {
    // console.log(index, row)
    // console.log(router, router.history)
    router.push('/logjobs/jobsearch?guid=' + row.guid)
}
const mainListData = (res) => {
    // console.log('getJobSearchMainList', res)
    if (res.state.code === '200') {
        pager.total = res.custom.count
        pager.currentPager = res.custom.currentpage
        tableData.value = res.custom.list
        listCount.value = pager.total
        // emit('updateTotlal', pager.total)
    }
    // console.log(tableData.value)
}

function handleCurrentChange(e) {
    // console.log('handleCurrentChange', e)
    getJobSearchMainList().then(mainListData)
}
</script>
<style scoped>
@import '@/assets/joblogcss/jobloglistcss.css';
</style>
<style>
.el-icon {
    width: 24px !important;
    height: 24px !important;
}
</style>
