<template>
  <div>
    <div>
      <el-button type="success" icon="el-icon-circle-plus-outline" plain @click="openAddDialog">新建内容</el-button>
      <el-button type="info" icon="el-icon-refresh" plain @click="getTableData(1)">刷新</el-button>
    </div>
    <div>
      <div style="margin:20px"></div>
      <el-table :data="tableData" height="600px" border stripe style="width: 100%" :row-style="{ height: '0' }"
        :cell-style="{ padding: '0' }">
        <el-table-column type="index" label="编号" width="50">
        </el-table-column>
        <el-table-column prop="create_time" label="添加时间" width="180">
        </el-table-column>
        <el-table-column label="Text">
          <template slot-scope="scope">
            <pre v-highlightjs style="max-height:150px;overflow-y: scroll;">{{ scope.row.text }}</pre>
          </template>
        </el-table-column>
        <el-table-column prop="code_lang" label="语言" width="100">
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope1">
            <el-button type="primary" icon="el-icon-document-copy" circle
              @click="getCopyText(scope1.row.text)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteText(scope1.row.tid)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新建内容" :visible.sync="dialogFormVisible" width="40%" :close-on-click-modal="false">
        <el-form :model="form">
          <el-form-item label="语言" :label-width="formLabelWidth">
            <el-select v-model="form.code_lang" placeholder="请选择语言(默认为LaTex)">
              <el-option label="C/C++" value="cpp"></el-option>
              <el-option label="Java" value="java"></el-option>
              <el-option label="Python" value="python"></el-option>
              <el-option label="JavaScript" value="javascript"></el-option>
              <el-option label="C#" value="csharp"></el-option>
              <el-option label="JSON" value="json"></el-option>
              <el-option label="HTML" value="html"></el-option>
              <el-option label="Kotlin" value="kotlin"></el-option>
              <el-option label="Matlab" value="matlab"></el-option>
              <el-option label="PHP" value="php"></el-option>
              <el-option label="SQL" value="sql"></el-option>
              <el-option label="XML" value="xml"></el-option>
              <el-option label="LaTeX" value="latex"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容" :label-width="formLabelWidth">
            <el-input v-model="form.text" autocomplete="off" type="textarea" rows="10"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="postAddForm">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import hljs from 'highlight.js'
import 'highlight.js/styles/xcode.css'
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        code_lang: '',
        text: ''
      },
      formLabelWidth: '120px',
      refresh_time: false
    }
  },
  mounted() {
    this.getTableData()
    hljs.highlightAll()
    // this.autoRefresh()
    codeBlockElement.classList.add('line-numbers')
  },
  methods: {
    getTableData(e) {
      axios.request({
        method: 'GET',
        url: '/api/text/texts'
      }).then((res) => {
        this.tableData = res.data
        if (e == 1) {
          this.$message({
            message: 'ok',
            type: 'success'
          })
        }
      })
    },
    openAddDialog(e) {
      this.dialogFormVisible = true
    },
    postAddForm(e) {
      axios.request({
        method: 'POST',
        url: '/api/text/text',
        data: {
          code_lang: this.form.code_lang,
          text: this.form.text
        }
      }).then((res) => {
        this.getTableData()
        this.dialogFormVisible = false
      })
    },
    getCopyText(e) {
      this.$copyText(e).then(
        this.$message({
          message: '复制成功',
          type: 'success'
        })
      ).catch((err) => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    deleteText(e) {
      axios.request({
        method: 'DELETE',
        url: '/api/text/text',
        data: {
          tid: e
        }
      }).then((res) => {
        this.getTableData()
      })
    },
  }
}
</script>

<style>
.el-table td,
.el-table th {
  padding: 0px;
}
</style>