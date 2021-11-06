<template>
  <div style="text-align: center;margin:0 auto;">
    <el-input v-model="shou" placeholder="Please input" class="kuaiDu"/>
    <el-button type="primary" @click="qd()" round>搜 索</el-button>

    <el-table
        :data="tableData"
        style="width: 100%"
        border="border"
    >
      <el-table-column prop="id" label="住院Id"/>
      <el-table-column prop="hzNzme" label="患者姓名"/>
      <el-table-column prop="sex" label="Address" />
      <el-table-column prop="age" label="Address" />
      <el-table-column prop="sbbm" label="Address" />
      <el-table-column prop="gzdw" label="Address" />
      <el-table-column prop="jtzz" label="Address" />
      <el-table-column prop="rysj" label="Address" />
      <el-table-column prop="zd" label="Address" />
      <el-table-column prop="zyh" label="Address" />
      <el-table-column prop="jingGuo" label="Address" />
      <el-table-column prop="csr" label="Address" />
      <el-table-column prop="gx" label="Address" />
      <el-table-column prop="tbr" label="Address" />
      <el-table-column prop="hzqm" label="Address" />
    </el-table>

      <el-button type="primary" @click="open=!open" round>新 增</el-button>
  </div>
  <!-- 添加修改对话框开始 -->
  <el-dialog
      :title="title"
      v-model="open"
      width="1200px"
      center
      append-to-body
  >
    <el-input v-model="kaoShi.hzNzme" placeholder="Please input" class="kuaiDu"/>
    <el-input v-model="kaoShi.sex" placeholder="Please input" class="kuaiDu"/>
    <el-input v-model="kaoShi.age" placeholder="Please input" class="kuaiDu"/>
    <el-input v-model="kaoShi.sbbm" placeholder="Please input" class="kuaiDu"/>
    <el-input v-model="kaoShi.gzdw" placeholder="Please input" class="kuaiDu"/>
    <el-input v-model="kaoShi.phone" placeholder="Please input" class="kuaiDu"/>
    <el-input v-model="kaoShi.jtzz" placeholder="Please input" class="kuaiDu"/>
    <el-input v-model="kaoShi.rysj" placeholder="Please input" class="kuaiDu"/>
    <el-input v-model="kaoShi.zd" placeholder="Please input" class="kuaiDu"/>
    <el-input v-model="kaoShi.zyh" placeholder="Please input" class="kuaiDu"/>
    <el-input v-model="kaoShi.jingGuo" placeholder="Please input" class="kuaiDu"/>
    <el-input v-model="kaoShi.csr" placeholder="Please input" class="kuaiDu"/>
    <el-input v-model="kaoShi.tbr" placeholder="Please input" class="kuaiDu"/>
    <el-input v-model="kaoShi.hzqm" placeholder="Please input" class="kuaiDu"/><br/>
    <el-select v-model="kaoShi.gx" placeholder="和患者的关系">
      <el-option
          v-for="item in xlk"
          :key="item.guanXi"
          :label="item.guanXi"
          :value="item.guanXi"
      >
      </el-option>
    </el-select>

    <el-button type="primary" @click="open=!open,tjbd()" round>确 定</el-button>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      shou:'',
      input:'',
      title: '弹框',
      open: true,
      a :'',
      xlk: [
        {
          "id": 4,
          "guanXi": "弟弟"
        }
          ],
      tableData: [
        {
          "id": 101111,
          "hzNzme": "徐宏11宇",
          "sex": "111男",
          "age": 21110,
          "sbbm": "1211345678",
          "gzdw": "上海11",
          "phone": "1711673845994",
          "jtzz": "湖南111省株洲市茶陵",
          "rysj": "2021-11111-02 09:46:05",
          "zd": "左脑头上111一个包",
          "zyh": "zy189111237",
          "jingGuo": "走着走111着不小心踩到了狗屎，还是稀的，就脚底一滑摔了一跤，头摔出一个包来。",
          "csr": "刘111亮",
          "gx": "父111亲",
          "tbr": "刘111亮",
          "hzqm": "徐1111宇"
        }
      ],
    kaoShi:{
        "hzNzme": "",
        "sex": "",
        "age": '',
        "sbbm": "",
        "gzdw": "",
        "phone": "",
        "jtzz": "",
        "rysj": "2021-11-02 09:46:05",
        "zd": "",
        "zyh": "",
        "jingGuo": "",
        "csr": "",
        "gx": "",
        "tbr": "",
        "hzqm": ""
    }
    }
  },
  methods: {
    // 查询表格数据
    qd() {

      this.axios("test01").then(req =>{
        this.tableData=req.data.data
      })
      this.axios("test02").then(req =>{
        this.xlk=req.data.data
      })
    },
    tjbd(){
      this.axios.post("xzzy",this.kaoShi).then(req =>{
        alert(req.data.message)
        this.qd()
      })
    },
    test(){
      alert("test")
    }
  },
  created() {
    this.qd()
  }
}
</script>
<style>
.kuaiDu{
  margin: 10px 20px;
  width: 380px;
}
</style>
