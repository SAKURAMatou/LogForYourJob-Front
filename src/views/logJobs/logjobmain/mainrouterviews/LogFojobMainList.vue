<template>
    <h1>找工作记录列表</h1>
    <div class="job-log-wrapper">
        <div class="joblog-list-layout">
            <el-table :data="tableData" style="width: 100%" max-height="500px">
                <el-table-column label="Date" width="180">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-icon><timer /></el-icon>
                            <span style="margin-left: 10px">{{
                                scope.row.date
                            }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="Name" width="180">
                    <template #default="scope">
                        <el-popover
                            effect="light"
                            trigger="hover"
                            placement="top"
                            width="auto"
                        >
                            <template #default>
                                <div>name: {{ scope.row.name }}</div>
                                <div>address: {{ scope.row.address }}</div>
                            </template>
                            <template #reference>
                                <el-tag>{{ scope.row.name }}</el-tag>
                            </template>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="Operations">
                    <template #default="scope">
                        <el-button
                            size="small"
                            @click="handleEdit(scope.$index, scope.row)"
                            >Edit</el-button
                        >
                        <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            >Delete</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="joblog-list-pager">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="1000"
                class="pager"
            />
        </div>
    </div>
</template>
<script setup>
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    }
]
</script>
<style scoped>
.joblog-list-layout {
    border-radius: 20px;
    background: #fff;
    padding: 24px 24px 19px 24px;
}
.joblog-list-pager {
    position: relative;
    margin-top: 30px;
    /* left: 50%; */
    height: 32px;
}
.pager {
    position: absolute;
    left: 50%; /* 将元素左边缘设置在父元素的中央位置 */
    transform: translateX(
        -50%
    ); /* 将元素自身的宽度的一半左移，从而实现居中效果 */
    /* 其他样式 */
}
</style>
