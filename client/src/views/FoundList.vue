<template>
  <div class="fillcontain">
    <div>
      <el-from :inline="true" ref="add_data">
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
              >Delete
            </el-button>
            <el-button
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Dialog :dialog="dialog" @update="getFoundList()"></Dialog>
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
      },
    };
  },
  created() {
    this.getFoundList();
  },
  methods: {
    getFoundList() {
      this.$axios
        .get("/api/profiles")
        .then((res) => {
          console.log("profiles:", res);
          this.tableData = res.data;
          console.log("table:", this.tableData);
        })
        .catch((err) => {
          console.log("请求失败");
          throw err;
        });
    },
    handleEdit() {},
    handleDelete() {},
    handleAdd() {
      this.dialog.show = true;
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