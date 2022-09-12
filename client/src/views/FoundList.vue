<template>
  <div class="fillcontain">
    <div>
      <el-form :inline="true" ref="search_data" :model="search_data">
        <el-form-item label="投标时间筛选:">
          <el-date-picker
            v-model="search_data.startTime"
            type="datetime"
            placeholder="选择开始时间"
          >
          </el-date-picker>
          --
          <el-date-picker
            v-model="search_data.endTime"
            type="datetime"
            placeholder="选择结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            icon="search"
            @click="handleSearch()"
            >筛选</el-button
          >
        </el-form-item>
        <el-from-item class="btnRight">
          <el-button
            type="primary"
            size="small"
            icon="view"
            @click="handleAdd()"
            v-if="user.identity === 'admin'"
            >添加</el-button
          >
        </el-from-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length > 0"
        :data="showTableData"
        style="width: 100%"
        max-height="600"
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
              v-if="user.identity === 'admin'"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              v-if="paginations.total > 0"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
              :current-page="paginations.page_index"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
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
      showTableData: [],
      filterTableData: [],

      dialog: {
        show: false,
        title: "",
        option: "",
      },
      // 传入弹窗的表单数据
      formData: {
        type: "",
        describe: "",
        income: "",
        crash: "",
        remark: "",
        expend: "",
        id: "",
      },
      index: Number, // table修改的下标

      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper", // 翻页属性
      },
      // 模糊搜索条件
      search_data: {
        startTime: "",
        endTime: "",
      },
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

      this.tableData = data;
      this.filterTableData = data;
      // 设置分页数据
      this.setPaginations();
    },

    setPaginations() {
      // 分页属性设置,根据this.tableData设置
      this.paginations.total = this.tableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      // 设置默认的分页数据
      this.showTableData = this.tableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
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
    // 页面切换数据量展示
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.showTableData = this.tableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(current_page) {
      // 获取当前页的第一条数据的下标
      let current_start_index = this.paginations.page_size * (current_page - 1);
      // 当页的下一页的第一条数据的下标
      let current_end_index = this.paginations.page_size * current_page;
      let table = [];
      for (let i = current_start_index; i < current_end_index; i++) {
        if (this.tableData[i]) {
          table.push(this.tableData[i]);
        }
      }
      this.showTableData = table;
    },
    // 筛选函数
    handleSearch() {
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间",
        });

        this.getFoundList();
        return;
      }

      const startTime = this.search_data.startTime.getTime();
      const endTime = this.search_data.endTime.getTime();

      console.log("startTime", startTime, endTime);

      this.tableData = this.filterTableData.filter((item, index) => {
        let date = new Date(item.createDate);
        let time = date.getTime();
        return time >= startTime && time <= endTime;
      });

      this.setPaginations();
    },
  },
  watch: {
    // 监听对话框是否关闭，关闭直接刷新组件
    "dialog.show": {
      handler() {
        this.getFoundList();
      },
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
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
  float: right;
  margin-top: 10px;
}
</style>