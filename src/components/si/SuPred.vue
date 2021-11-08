<template>
  <!-- 新增预定 -->
  <el-button @click="tk()">弹框页面</el-button>
  <!--  -->
  <el-dialog title="客源新增" v-model="ydform">
    <div id="div_need">客户信息</div>
    <div id="dialog_div" >
      <el-form style="margin-top: 10px;">
        <el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="cname" id="input_width">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号码" prop="cname" id="input_width">
                <el-input></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="号码" prop="ctel" id="input_width">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="租客来源" id="input_width" >
                <el-select v-model="origin" placeholder="来源"
                           clearable="true" size="medium"
                           style="margin-left:13px;">
                  <el-option v-for="item in origins" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="性别" prop="csex" id="input_width">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="租客年龄" prop="cage"
                            id="input_width">
                <el-input  style="margin-left:13px;width: 160px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 房源地址 -->
          <el-row>
            <el-col :span="24">
              <el-form-item label="房源地址" prop="cage"
                            id="input_width">
                <el-select v-model="origin" placeholder="房源地址"
                           clearable="true" size="medium"
                           style="margin-left:13px;">
                  <el-option v-for="item in origins" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div id="div_need" style="width: 670px;">预定信息</div>
      <el-form>
        <el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="定金" :label-width="formLabelWidth" id="input_width">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收定人" id="input_width">
                <el-input></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="签约失效时间" :label-width="formLabelWidth" id="input_width">
                <el-date-picker   type="date" placeholder="签约失效时间" style="width: 200px;">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预计签约时间" :label-width="formLabelWidth" id="input_width">
                <el-date-picker   type="date" placeholder="预计签约时间" style="width: 200px;">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form-item>
      </el-form>
      <div style="width: 200px;margin-left: 450px;">
        <el-button plain size="small" style="background-color: lightcoral;color: white;margin-left: -13px;">
          确认
        </el-button>
        <el-button plain size="small" style="background-color: skyblue;color: white;margin-left: 13px;"   @click="ydform=false">
          取消
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      ydform:false
    }
  },
  methods: {
    tk() {
      console.log("弹框");
      this.ydform = true;

    }
  }
}
</script>

<style scoped="scoped">
/deep/.el-input--prefix .el-input__inner {
  width: 140px;
}

#dialog_div {
  width: 720px;
  margin: 0px auto;
  min-height: 450px;
}

#div_need {
  background-color: #1E90FF;
  border: 1px solid gainsboro;
  height: 20px;
}

#input_width {
  width: 240px;
  margin-top: 20px;
}
</style>
