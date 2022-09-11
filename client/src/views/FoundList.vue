<template>
  <div class="fillcontain">
    <div>
      <el-from :inline="true" ref="add_data">
        <el-from-item>
          <el-button
            type="primary"
            size="samll"
            icon="view"
            @click="getFoundList()"
          >
            刷新
          </el-button>
        </el-from-item>
        <el-from-item class="btnRight">
          <el-button
            type="primary"
            size="samll"
            icon="view"
            @click="handleAdd()"
          >
            添加
          </el-button>
        </el-from-item>
      </el-from>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        style="width: 100%"
        height="500"
        border
      >
        <el-table-column label="序号" type="index" width="70" align="center">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createDate"
          width="250"
          align="center"
        >
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="收支类型"
          prop="type"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="收支描述 "
          prop="describe"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column label="收入" prop="income" width="100" align="center">
          <template #default="scope">
            <span style="color: #00d053">+ {{ scope.row.income }}</span>
          </template>
        </el-table-column>

        <el-table-column label="支出" prop="expend" width="100" align="center">
          <template #default="scope">
            <span style="color: #f56767">- {{ scope.row.expend }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="账户现金"
          prop="crash"
          width="100"
          align="center"
        >
          <template #default="scope">
            <span style="color: #4db3ff">{{ scope.row.crash }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" width="180" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              size="small"
              type="warning"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Dialog
      :dialog="dialog"
      :formData="formData"
      :tableData="tableData"
      @update="getFoundList"
      ref="formDialog"
      :index="index"
    ></Dialog>
  </div>
</template>
<script>
import Dialog from "../components/Dialog.vue";

export default {
  name: "foundList",
  components: {
    Dialog,
  },
  data() {
    return {
      tableData: [],
      dialog: {
        show: false,
        title: "",
        option: "",
      },
      formData: {
        type: "",
        describe: "",
        income: "",
        crash: "",
        remark: "",
        expend: "",
        id: "",
      },
      index: Number,
    };
  },
  created() {
    this.getFoundList();
  },
  methods: {
    async getFoundList() {
      console.log("发送接口获取数据前！");
      const { data } = await this.$axios.get("/api/profiles").catch((err) => {
        console.log("请求失败");
        throw err;
      });
      console.log("发送接口获取数据后！");
      console.log("table获取数据前！");
      this.tableData = data;
      console.log("table获取数据后！");
    },
    handleEdit(index, row) {
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        crash: row.crash,
        remark: row.remark,
        expend: row.expend,
        id: row.id,
      };
      this.index = index;
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit",
      };
    },
    async handleDelete(index, row) {
      this.$axios.delete(`/api/profiles/delete/${row.id}`).then((res) => {
        this.$message({
          message: "删除数据成功！",
          type: "success",
        });
        console.log("已删除数据！");
        console.log("this.tableData:", this.tableData[index], index);
        this.tableData.splice(index, 1);
      });

      await this.getFoundList();
    },
    handleAdd() {
      this.formData = {
        type: "",
        describe: "",
        income: "",
        crash: "",
        remark: "",
        expend: "",
        id: "",
      };
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add",
      };
    },
  },
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>