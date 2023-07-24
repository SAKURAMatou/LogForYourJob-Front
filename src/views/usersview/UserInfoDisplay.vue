<template>
    <!-- <h1>左侧用户信息展示</h1> -->
    <el-avatar size="large" :src="userInfo.avatarurl" />
    <el-descriptions title="" :column="1">
        <el-descriptions-item class-name="user-display-item">
            <template #label>
                <SvgIcon name="user-01"></SvgIcon>
            </template>
            {{ userInfo.username }}
        </el-descriptions-item>
        <el-descriptions-item class-name="user-display-item" width="180px">
            <template #label>
                <SvgIcon name="mail-02"></SvgIcon>
            </template>
            {{ userInfo.email }}
        </el-descriptions-item>
        <el-descriptions-item class-name="user-display-item">
            <template #label>
                <SvgIcon name="phone"></SvgIcon>
            </template>
            {{ userInfo.phone }}</el-descriptions-item
        >
    </el-descriptions>
</template>

<script setup>
const prop = defineProps({
    userInfo: Object
})
</script>

<style>
.svg-icon {
    width: 24px;
    height: 24px;
}
.user-display-item {
    width: 142px;
    /* 防止文本换行 */
    white-space: nowrap;
    /* 隐藏超出容器宽度的部分文本 */
    overflow: hidden;
    /* 显示省略号来表示被截断的文本 */
    text-overflow: ellipsis;
}
</style>
