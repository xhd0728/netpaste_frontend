<template>
    <div>
        <el-empty style="height:300px" description="作者还没做好这个功能">
            <el-button type="primary" @click="addBtnCount">催更{{ cnt }}</el-button>
        </el-empty>
        <el-dialog title="来自某处的声音" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :close-on-click-modal="false">
            <span>别催了！</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            click_num: 0,
            cnt: ''
        }
    },
    methods: {
        addBtnCount() {
            this.click_num += 1
            this.cnt = " " + this.click_num + "次"
            if (this.click_num % 5 == 0) {
                this.dialogVisible = true
            }
        }
    }
}
</script>

<style>

</style>