<template>
  <el-container style="height:100%">
    <el-header style="text-align: right; font-size: 12px" height="40px">
      <div style="display:flex;justify-content:space-between">
        <div>
          <span style="font-size:16px">Cloud Paste 云剪切板</span>
        </div>
        <div>
          <span>内网IP: 192.168.1.4</span>
          <span> | </span>
          <span>地区: 哈尔滨工程大学 21#4003</span>
          <span> | </span>
          <span>status: </span>
          <span style="color:green">active (running)</span>
          <i class="el-icon-loading" style="margin-left:20px"></i>
        </div>
        <div>
          <el-dropdown>
            <div style="margin-right:15px">
              <i class="el-icon-s-custom"></i>&nbsp;
              <span>更多</span>
            </div>
            <el-dropdown-menu slot="dropdown" style="text-align:center">
              <el-dropdown-item>关于</el-dropdown-item>
              <el-dropdown-item @click.native="gotoOldWeb">怀念旧版</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu class="aside_item" :default-openeds="['1']">
          <el-submenu index="1" style="text-align:center">
            <template slot="title">
              <i class="el-icon-magic-stick"></i>
              <span>共享剪切板</span>
            </template>
            <el-menu-item index="1-1" @click="gotoTextView"><i class="el-icon-notebook-2"></i>Text</el-menu-item>
            <el-menu-item index="1-2" @click="gotoFileView"><i class="el-icon-folder"></i>File</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main style="padding:10px">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import globalAPI from '../globalAPI.js'
export default {
  data() {
    return {
    }
  },
  mounted() {

  },
  methods: {
    gotoOldWeb() {
      window.location.href = globalAPI.oldURL
    },
    gotoTextView() {
      this.$router.push('/')
    },
    gotoFileView() {
      this.$router.push('/file')
    }
  }
};
</script>

<style>
.el-header {
  background-color: #6da3b4;
  color: #333;
  line-height: 40px;
}

.el-aside {
  color: #333;
}

.aside_item .el-menu-item {
  text-align: center;
}
</style>