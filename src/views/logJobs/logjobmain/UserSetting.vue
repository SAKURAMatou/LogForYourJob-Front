<template>
    <div class="user-setting-wrapper">
        <div class="user-setting-left">
            <UserInfoDisplay></UserInfoDisplay>
        </div>
        <div class="user-setting-right">
            <UserInfoEdit></UserInfoEdit>
        </div>
    </div>
</template>

<script setup>
import UserInfoEdit from '@/views/usersview/UserInfoEdit.vue'
import UserInfoDisplay from '@/views/usersview/UserInfoDisplay.vue'
</script>
<style scoped>
.user-setting-wrapper {
    /* grid布局 */
    display: grid;
    grid-template-columns: 231px 736px; /* Set the specific widths for the columns */
    grid-column-gap: 102px;

    padding-left: 45px;
    padding-top: 5px;
    /* flex布局 */
    /* display: flex; */
    /* justify-content: space-between;
    align-items: flex-start; */
}
.user-setting-left {
    display: flex;

    height: 610px;
    padding: 24px 24px 19px 24px;
    flex-direction: column;
    align-items: center;
    gap: 28px;
    flex-shrink: 0;
    border-radius: 20px;
    background: #fff;

    /* margin-right: 102px; */
}

.user-setting-right {
    /* width: 702x; */
    height: 610px;
    flex-shrink: 0;
    border-radius: 20px;
    background: #fff;
    padding: 24px 24px 19px 24px;
}
</style>
