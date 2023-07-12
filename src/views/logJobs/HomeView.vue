
<template>
  <div class="common-layout">
    <el-container class="app-wrapper">
      <el-aside width="240px" class="sidebar-container">

        <el-row class="tac">
          <!-- <div class="layout"> -->
          <el-col>
            <SvgIcon name="systemLog" id="left-aside-logo"></SvgIcon>
            <!-- <h4 class="mb-2">侧面菜单</h4> -->
            <el-menu default-active="00" @open="handleOpen" @close="handleClose">
              <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <span>Navigator Two</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <el-icon>
                  <document />
                </el-icon>
                <span>Navigator Three</span>
              </el-menu-item>
              <el-menu-item index="4">
                <el-icon>
                  <setting />
                </el-icon>
                <span>Navigator Four</span>
              </el-menu-item>
              <!-- 把stores中的数据渲染成菜单 -->
              <!-- <template v-for="item in store.state.permission.menus" :key="item.id">
              <el-menu-item :index="item.path">
                <el-icon>
                  <setting />
                </el-icon>
                <span>{{ item.name }}</span>
              </el-menu-item>
            </template> -->


            </el-menu>
          </el-col>
        </el-row>

      </el-aside>
      <el-container class="container right-container">
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!-- </div> -->

  </div>
</template>

<script setup>

</script>

<style scoped>
body {
  background: var(--background, #F0F6FF);
}

.common-layout {
  height: 1160px;
  /* width: 100%; */
  flex-shrink: 0;
  background: var(--background, #F0F6FF);

}

#left-aside-logo {
  display: flex;
  height: 74px;
  width: 240px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;
  background: #FFF;
}

.app-wrapper {
  height: 100%;
}

.tac {
  height: 100%;
}
.el-col{
  background: var(--white, #FFF);
}
</style>
