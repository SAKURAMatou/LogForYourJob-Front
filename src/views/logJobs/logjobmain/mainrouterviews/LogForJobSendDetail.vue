<template>
    <div class="detail-table">
        <div class="detail-table-job detail-table-01">
            <SvgIcon class="svg-icon-icon" name="user-03"></SvgIcon>
            <span class="detail-table-01-text">{{ detail.cname }}岗位</span>
        </div>
        <div class="detail-table-salary detail-table-01">
            <SvgIcon class="svg-icon-icon" name="currency-dollar"></SvgIcon>
            <span>薪资{{ detail.salary }}&nbsp;K</span>
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
</template>
<script setup>
const prop = defineProps({
    detail: Object
})
console.log('ziye', prop.detail)
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
    font-size: 20px;
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
