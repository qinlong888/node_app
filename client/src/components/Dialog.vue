<template>
  <div>
    <el-dialog
      :title="dialog.title"
      v-model="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="false"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="formRules"
          label-width="120px"
          style="margin: 10px; width: auto"
        >
          <el-form-item label="收支类型:" prop="type">
            <el-select v-model="formData.type" placeholder="收支类型">
              <el-option
                v-for="(formtype, index) in format_type_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="收支描述:" prop="describe">
            <el-input type="textarea" v-model="formData.describe"> </el-input>
          </el-form-item>
          <el-form-item label="收入:" prop="income">
            <el-input type="number" v-model="formData.income" min="0">
            </el-input>
          </el-form-item>
          <el-form-item label="支出:" prop="expend">
            <el-input type="number" v-model="formData.expend" min="0">
            </el-input>
          </el-form-item>
          <el-form-item label="账户现金:" prop="crash">
            <el-input type="number" v-model="formData.crash" min="0">
            </el-input>
          </el-form-item>
          <el-form-item label="备注:" prop="remark">
            <el-input type="textarea" v-model="formData.remark"> </el-input>
          </el-form-item>
          <el-form-item class="text_right">
            <el-button @click="dialog.show = false"> 取消 </el-button>
            <el-button type="primary" @click="handleSubmit('form')"
              >提交
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: "dialog",
  props: {
    dialog: Object,
    formData: Object,
    tableData: Array,
    index: Number,
  },
  data() {
    return {
      format_type_list: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账",
      ],
      formRules: {
        describe: [
          { required: true, message: "收支描述不能为空！", trigger: "blur" },
        ],
        income: [
          { required: true, message: "收入不能为空！", trigger: "blur" },
        ],
        expend: [
          { required: true, message: "支出不能为空！", trigger: "blur" },
        ],
        crash: [{ required: true, message: "账户不能为空！", trigger: "blur" }],
      },
    };
  },
  created() {
    console.log("dialog:", this.dialog);
  },
  methods: {
    handleSubmit(from) {
      this.$refs[from].validate((valid) => {
        if (valid) {
          const option = this.dialog.option;
          const url = option === "add" ? "add" : `edit/${this.formData.id}`;

          this.$axios
            .post(`/api/profiles/${url}`, this.formData)
            .then((res) => {
              //   console.log("res:", res);
              //   console.log("这是添加接口！");

              if (option === "add") {
                this.tableData.push(this.formData);
              } else {
                this.tableData[this.index] = this.formData;
              }
              //   this.getFormData();
              this.$message({
                message: "保存数据成功！",
                type: "success",
              });
            });
          // 更新组件信息
          console.log("更新组件！");

          this.$emit("update");

          this.dialog.show = false;
        }
      });
    },

    // this.formData 的数据传回父组件Foundlist
    getFormData() {
      console.log("this.formData:", this.formData);
      return this.formData();
    },
  },
};
</script>