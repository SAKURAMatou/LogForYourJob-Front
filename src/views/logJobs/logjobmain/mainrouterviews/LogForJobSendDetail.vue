<template>
    <div class="detail-table">
        <div class="detail-table-job detail-table-01">
            <SvgIcon class="svg-icon-icon" name="user-03"></SvgIcon>
            <span class="detail-table-01-text">{{ detail.cname }}岗位</span>
        </div>
        <div class="detail-table-salary detail-table-01">
            <SvgIcon class="svg-icon-icon" name="currency-dollar"></SvgIcon>
            <span>
                薪资:{{ detail.salarydown }}-{{ detail.salaryup }}&nbsp;K
            </span>
        </div>
        <div class="detail-table-heart detail-table-01">
            <SvgIcon
                class="svg-icon-heart"
                :name="`heart-level-${detail.heartlevel}`"
            ></SvgIcon>
        </div>
        <div class="detail-table-website">
            <SvgIcon class="svg-icon-icon" name="bank"></SvgIcon>
            <a :href="detail.cwebsite" target="_blank">公司网站</a>
        </div>
    </div>
    <!-- style="margin-top: 0px"  -->
    <el-divider class="dividerStyle" />

    <el-descriptions class="detail-description-title" title="岗位职责">
        <el-descriptions-item>
            <div class="detail-description-text">
                {{ detail.jobdescription }}
            </div>
        </el-descriptions-item>
    </el-descriptions>

    <el-descriptions class="detail-description-title" title="岗位要求">
        <el-descriptions-item>
            <div class="detail-description-text">
                {{ detail.requirement }}
            </div>
        </el-descriptions-item>
    </el-descriptions>

    <el-divider class="dividerStyle" />
    <div>
        <el-descriptions class="detail-description-title" title="我的评价">
            <el-descriptions-item>
                <div class="detail-description-text">
                    {{ detail.comment }}
                </div>
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>
<script setup>
const prop = defineProps({
    detail: Object
})
</script>

<style scoped>
.detail-table {
    display: flex; /* Use flexbox to create a horizontal layout */
    flex-wrap: nowrap; /* Prevent elements from wrapping to the next line */
    justify-content: space-between; /* Distribute elements with space in between */
}

.detail-table-01 {
    flex: 1; /* Make all .detail-table-01 elements occupy equal space */
    display: flex; /* Use flexbox for the .detail-table-01 elements as well */
    align-items: center; /* Vertically center the content within each .detail-table-01 element */
}

.detail-table-01 > .svg-icon {
    margin-right: 5px; /* Add a little space between the icon and the text */
}

.detail-table-01 > span,
a {
    white-space: nowrap; /* Prevent the text from wrapping to the next line */
    color: #000;
    font-family: Microsoft YaHei UI;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px; /* 125% */
    letter-spacing: 0.6px;
    margin-left: 5px;
}
.svg-icon-icon {
    width: 25.251px;
    height: 27.534px;
    flex-shrink: 0;
}
.svg-icon-heart {
    width: 130px;
    height: 36.712px;
}
</style>
<style>
.detail-description-text {
    /* color: #000; */
    color: var(--el-text-color-regular);
    font-family: Microsoft YaHei UI;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px; /* 125% */
    letter-spacing: 0.6px;
    white-space: pre-wrap;
    padding-left: 4ch;
}
.detail-description-title,
.el-descriptions__title {
    color: #171a1f;
    font-family: Microsoft YaHei UI;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 25px; /* 125% */
    letter-spacing: 0.6px;
}
</style>
