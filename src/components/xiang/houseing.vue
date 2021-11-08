<template>

  <el-main>

    <el-tabs v-model="activeName" @tab-click="handleClick">

      <el-tab-pane label="合租" name="first">

        <!--  搜索新增板块  -->
        <el-form
            style="margin-left: 17px;margin-top: 15px"
            :model="searchPrm"
            ref="searchForm"
            label-width="80px"
            :inline="true"
            size="small"
        >
          <el-form-item>
            <el-input placeholder="请输入房型名称" v-model="searchPrm.searchName"></el-input>
          </el-form-item>

          <el-form-item>

            <!--    多条件单选框开始    -->
            <div style="height: 20px">
              <el-radio-group v-model="radio">
                <el-radio :label="1">Option A</el-radio>
                <el-radio :label="2">Option B</el-radio>
                <el-radio :label="3">Option C</el-radio>
                <el-radio :label="4">Option D</el-radio>
              </el-radio-group>

            </div>
            <!--    多条件单选框结束    -->

          </el-form-item>

          <el-form-item>
            <el-button style="color:#ff7670" icon="el-icon-close">重置</el-button>
            <el-button icon="el-icon-search">查询</el-button>
            <el-button
                icon="el-icon-edit-outline"
                type="success"
                size="small"
                @click="dialogVisible=true"
            >新增
            </el-button>

          </el-form-item>

        </el-form>


<!--        &lt;!&ndash;    最大的框    &ndash;&gt;-->
<!--        <div class="bigkuang">-->

<!--          &lt;!&ndash;    框的子框1      &ndash;&gt;-->
<!--          <div style="margin-left: 20px"  v-for="maxItem in housingList">-->
<!--            <span>編号：{{maxItem.houseId}}</span>-->

<!--          <el-row :gutter="20">-->
<!--            <el-col :span="6">-->
<!--              &lt;!&ndash;      框的子框2      &ndash;&gt;-->
<!--              <div class="grid-content bg-purple">-->
<!--                &lt;!&ndash;       框2的子框       &ndash;&gt;-->
<!--                <div style="padding-top:8px;background-color:yellow;padding-left:20px;border: 1px solid hotpink"></div>-->
<!--                <div style="padding-top:5px;padding-left:20px;border: 1px solid hotpink;font-weight: bolder">-->
<!--                  整租-朝南-10平方米-->
<!--                </div>-->
<!--                <div style="padding-top:10px;padding-left:20px;border: 1px solid #FF7670">出租价: 1000/月</div>-->
<!--                <div style="padding-top:2px;padding-left:20px;border: 1px solid #FF7670">底价: 700/月</div>-->
<!--              </div>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--        </div>-->
<!--        </div>-->


        <!--合租div-->
        <div class="max_box" style="border:1px solid #888888;width: 1000px;height: 200px" v-for="maxItem in housingList">
          <div>編号：{{maxItem.houseId}}</div>
          <div>地址：{{maxItem.city}}</div>
          <div class="minBox" style="border: 1px solid red;width: 180px;height:150px;float: left;margin-left: 50px" v-for="minItem in maxItem.fyRooms">
            <div style="width: 190px;height:15px;background-color: #409EFF;  border-radius: 20%;"></div>
            房间Id：{{minItem.roomId}}
            <p></p>
            房间名称：{{minItem.roomName}}
            <p></p>
            房间价格：{{minItem.roomPrices}}万元

            <div style="float: right;top: 10px;margin-right: 10px">
              <el-button type="text" @click="updateMin(minItem)">编辑</el-button>
            </div>
          </div>
          <p></p>

          <div style="float: right">
            <el-button type="text" @click="save">新增房间</el-button>
            <el-button type="text">删除</el-button>
          </div>
        </div>
        <!--    最大div结束     -->


        <!--   房间户型新增按钮表单   -->
        <el-dialog
            @close="clearHousing()"
            title="房源信息"
            v-model="dialogVisible"
            :before-close="handleClose"
            width="60%">

          <el-form
              :model="housingForm1"
              label-width="80px"
              :inline="true"
              size="small">

            <el-row>

              <el-col :span="12">
                <el-form-item label="地址">
                  <el-input v-model="housingForm1.city"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="负责人">
                  <el-input v-model="housingForm1.userId"></el-input>
                </el-form-item>
              </el-col>
              ----------------------------------------------------------------房屋格局--------------------------------------------------------------
            </el-row>

            <!--      第二层      -->
            <el-row>

              <el-col :span="6">
                <el-form-item label="几室">
                  <el-input v-model="housingForm1.roomNum"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="厅">
                  <el-input v-model="housingForm1.hall"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="6">
                <el-form-item label="卫">
                  <el-input v-model="housingForm1.defend"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="厨房">
                  <el-input v-model="housingForm1.kitchen"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="所处层数">
                  <el-input v-model="housingForm1.inLayers"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="共几层">
                  <el-input v-model="housingForm1.totalCeng"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">

                <el-form-item label="朝向">
                  <el-select v-model="housingForm1.orientationId" filterable>

                    <el-option
                        v-for="provider in tableOrientation"
                        :key="provider.orientationId"
                        :label="provider.orientationName"
                        :value="provider.orientationId"
                    />

                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="平方">
                  <el-input v-model="housingForm1.houseMeters"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <!--      第二层 结束     -->


            ----------------------------------------------------------------装修类型--------------------------------------------------------------

            <!--      装修类型      -->
            <el-row>

              <el-col :span="6">
                <el-form-item label="装修类型">
                  <el-select v-model="housingForm1.fitmentId" filterable>

                    <el-option
                        v-for="provider in tableFitment"
                        :key="provider.fitmentId"
                        :label="provider.fitmentName"
                        :value="provider.fitmentId"
                    />

                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="房屋性质">
                  <el-select v-model="housingForm1.natureId" filterable>

                    <el-option
                        v-for="provider in tableNature"
                        :key="provider.natureId"
                        :label="provider.natureName"
                        :value="provider.natureId"
                    />

                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="可租时间">
                  <el-date-picker
                      format="YYYY-MM-DD HH:mm:ss"
                      type="datetime"
                      v-model="housingForm1.houserRentDate"
                      placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>

            </el-row>
            <!--第三层结束-->
            -----------------------------------------------------------------出租价格-------------------------------------------------------------
            <!--     出租价格       -->

            <el-row>

              <el-col :span="8">
                <el-form-item label="出租价格">
                  <el-input v-model="housingForm1.rentalPrices"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="底价">
                  <el-input v-model="housingForm1.houseFloorPrice"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="付款方式">
                  <el-input v-model="housingForm1.housePaymentMethod"></el-input>
                </el-form-item>
              </el-col>

            </el-row>

            ------------------------------------------------------------------房屋特色------------------------------------------------------------
            <el-row>

              <el-col :span="12">
                <el-form-item label="房屋特色">
                  <el-select v-model="housingForm1.featureId" filterable>

                    <el-option
                        v-for="provider in tableFeature"
                        :key="provider.featureId"
                        :label="provider.featureName"
                        :value="provider.featureId"
                    />

                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="房源描述">
                  <el-input v-model="housingForm1.houseProperty"></el-input>
                </el-form-item>
              </el-col>

            </el-row>


            <!--     增加子房间       -->

          </el-form>


          <template #footer>

             <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addHousing1(),dialogVisible = false">确 定</el-button>
             </span>

          </template>

        </el-dialog>


      </el-tab-pane>
      <!--   合租房源结束-----------------------------------------------------   -->


      <!--   整租开始   -->
      <el-tab-pane label="整租" name="second">

        <!--  搜索新增板块  -->
        <el-form
            style="margin-left: 17px;margin-top: 15px"
            :model="searchPrm1"
            ref="searchForm"
            label-width="80px"
            :inline="true"
            size="small"
        >
          <el-form-item>
            <el-input placeholder="请输入房型名称" v-model="searchPrm.searchName"></el-input>
          </el-form-item>

          <el-form-item>

            <!--    多条件单选框开始    -->
            <div style="height: 20px">
              <el-radio-group v-model="radio">
                <el-radio :label="1">Option A</el-radio>
                <el-radio :label="2">Option B</el-radio>
                <el-radio :label="3">Option C</el-radio>
                <el-radio :label="4">Option D</el-radio>
              </el-radio-group>

            </div>
            <!--    多条件单选框结束    -->

          </el-form-item>

          <el-form-item>
            <el-button style="color:#ff7670" icon="el-icon-close">重置</el-button>
            <el-button icon="el-icon-search">查询</el-button>
            <el-button
                icon="el-icon-edit-outline"
                type="success"
                size="small"
                @click="dialogVisible1=true"
            >新增
            </el-button>

          </el-form-item>

        </el-form>


        <el-card v-for="h in housing" class="box-card" shadow="hover">
          <div class="text item">出租价：{{ h.rentalPrices }}/月</div>
          <div class="text item">位置：{{ h.houseFloorPrice }}楼</div>
          <div class="text item">户型：{{ h.roomNum }}室{{ h.hall }}厅{{ h.defend }}卫{{ h.kitchen }}厨</div>
          <div class="text item">状态：
            <el-tag size="small">{{ h.homeState ? "可租" : "预定" }}</el-tag>
          </div>
        </el-card>


        <!--    最大div结束     -->


        <!--   房间户型新增按钮表单   -->
        <el-dialog
            @close="clearHousing()"
            title="房源信息"
            v-model="dialogVisible1"
            :before-close="handleClose"
            width="60%">

          <el-form
              :model="housingForm"
              label-width="80px"
              :inline="true"
              size="small">

            <el-row>

              <el-col :span="12">
                <el-form-item label="地址">
                  <el-input v-model="housingForm.city"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="负责人">
                  <el-input v-model="housingForm.userId"></el-input>
                </el-form-item>
              </el-col>
              ----------------------------------------------------------------房屋格局--------------------------------------------------------------
            </el-row>

            <!--      第二层      -->
            <el-row>

              <el-col :span="6">
                <el-form-item label="几室">
                  <el-input v-model="housingForm.roomNum"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="厅">
                  <el-input v-model="housingForm.hall"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="6">
                <el-form-item label="卫">
                  <el-input v-model="housingForm.defend"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="厨房">
                  <el-input v-model="housingForm.kitchen"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="所处层数">
                  <el-input v-model="housingForm.inLayers"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="共几层">
                  <el-input v-model="housingForm.totalCeng"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">

                <el-form-item label="朝向">
                  <el-select v-model="housingForm.orientationId" filterable>

                    <el-option
                        v-for="provider in tableOrientation"
                        :key="provider.orientationId"
                        :label="provider.orientationName"
                        :value="provider.orientationId"
                    />

                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="平方">
                  <el-input v-model="housingForm.houseMeters"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <!--      第二层 结束     -->


            ----------------------------------------------------------------装修类型--------------------------------------------------------------

            <!--      装修类型      -->
            <el-row>

              <el-col :span="6">
                <el-form-item label="装修类型">
                  <el-select v-model="housingForm.fitmentId" filterable>

                    <el-option
                        v-for="provider in tableFitment"
                        :key="provider.fitmentId"
                        :label="provider.fitmentName"
                        :value="provider.fitmentId"
                    />

                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="房屋性质">
                  <el-select v-model="housingForm.natureId" filterable>

                    <el-option
                        v-for="provider in tableNature"
                        :key="provider.natureId"
                        :label="provider.natureName"
                        :value="provider.natureId"
                    />

                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="可租时间">
                  <el-date-picker
                      format="YYYY-MM-DD HH:mm:ss"
                      type="datetime"
                      v-model="housingForm.houserRentDate"
                      placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>

            </el-row>
            <!--第三层结束-->
            -----------------------------------------------------------------出租价格-------------------------------------------------------------
            <!--     出租价格       -->

            <el-row>

              <el-col :span="8">
                <el-form-item label="出租价格">
                  <el-input v-model="housingForm.rentalPrices"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="底价">
                  <el-input v-model="housingForm.houseFloorPrice"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="付款方式">
                  <el-input v-model="housingForm.housePaymentMethod"></el-input>
                </el-form-item>
              </el-col>

            </el-row>

            ------------------------------------------------------------------房屋特色------------------------------------------------------------
            <el-row>

              <el-col :span="12">
                <el-form-item label="房屋特色">
                  <el-select v-model="housingForm.featureId" filterable>

                    <el-option
                        v-for="provider in tableFeature"
                        :key="provider.featureId"
                        :label="provider.featureName"
                        :value="provider.featureId"
                    />

                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="房源描述">
                  <el-input v-model="housingForm.houseProperty"></el-input>
                </el-form-item>
              </el-col>

            </el-row>


            <!--     增加子房间       -->

          </el-form>


          <template #footer>

             <span class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="addHousing(),dialogVisible1 = false">确 定</el-button>
             </span>

          </template>

        </el-dialog>

      </el-tab-pane>

    </el-tabs>


  </el-main>

</template>

<script>
import {defineComponent, ref} from 'vue'


export default {
  name: "houseing",

  data() {
    return {

      housingList: [], // 查询所有房间房源

      activeName: 'first',// tabs

      searchPrm: {
        searchName: ''
      },// 合租搜索框

      radio: ref(1),// 合租单选框

      //  -----------合租搜索模块
      dialogVisible: false,//合租弹窗

      housingForm1: {
        orientationId: '',//朝向id
        fitmentId: '',//装修id
        natureId: '',//性质id
        featureId: '',// 房间特色id
        houseId: '', // 房源id
        city: '',//城市小区
        userId: '',//操作人
        roomNum: '',//几卧室
        hall: '',//厅
        defend: '',//卫
        kitchen: '',//厨房
        houseMeters: '',//多少平方
        inLayers: '',//所处层数
        totalCeng: '',// 共几层
        houserRentDate: '',//出租时间
        rentalPrices: '', // 出租价格
        houseFloorPrice: '', // 底价
        housePaymentMethod: '', //付款方式（押一付三）
        houseProperty: '',//房源描述
        homeState: 0, //房屋状态（可租）
        jointRent: 0, //合租整租状态
      },


      //整租开始--------------------------------------------------

      searchPrm1: {
        searchName: ''
      },// 合租搜索框

      tableOrientation: [], // 存放数朝向数据
      tableFitment: [], // 粗放装修数据域
      tableNature: [],// 存放所有性质
      tableFeature: [],//存放所有特色


      housing: [], // 房屋数据域

      housingForm: {
        orientationId: '',//朝向id
        fitmentId: '',//装修id
        natureId: '',//性质id
        featureId: '',// 房间特色id
        houseId: '', // 房源id
        city: '',//城市小区
        userId: '',//操作人
        roomNum: '',//几卧室
        hall: '',//厅
        defend: '',//卫
        kitchen: '',//厨房
        houseMeters: '',//多少平方
        inLayers: '',//所处层数
        totalCeng: '',// 共几层
        houserRentDate: '',//出租时间
        rentalPrices: '', // 出租价格
        houseFloorPrice: '', // 底价
        housePaymentMethod: '', //付款方式（押一付三）
        houseProperty: '',//房源描述
        homeState: 0, //房屋状态（可租）
        jointRent: 1, //合租整租状态
      },

      clearHousing() {
        this.dialogVisible = false;
        this.dialogVisible1 = false;
        this.housingForm.orientationId = "";
        this.housingForm.fitmentId = "";
        this.housingForm.natureId = "";
        this.housingForm.featureId = "";
        this.housingForm.houseId = ""; // 房源id
        this.housingForm.city = "";//城市小区
        this.housingForm.userId = "";//操作人
        this.housingForm.roomNum = "";//几卧室
        this.housingForm.hall = "";//厅
        this.housingForm.defend = "";//卫
        this.housingForm.kitchen = "";//厨房
        this.housingForm.houseMeters = "";//多少平方
        this.housingForm.inLayers = "";//所处层数
        this.housingForm.totalCeng = "";// 共几层
        this.housingForm.houserRentDate = "";//出租时间
        this.housingForm.rentalPrices = ""; // 出租价格
        this.housingForm.houseFloorPrice = ""; // 底价
        this.housingForm.housePaymentMethod = ""; //付款方式（押一付三）
        this.housingForm.houseProperty = "";//房源描述
        this.housingForm.homeState = ""; //房屋状态（可租）
        this.housingForm.jointRent = "";//合租整租状态

      },


      dialogVisible1: false,// 整租弹窗

      roomForm:{},

    }
  },

  methods: {
    updateMin(item){
      this.roomForm = Object.assign({},item)
      console.log("roomForm",this.roomForm)

    },
    selectHousingList() {
      this.axios.get("http://localhost:8848/housing/selectHousingList").then((v) => {
        this.housingList = v.data
      })
    },//查询所有房源和子房源


    addHousing1() {
      this.axios.post("http://localhost:8848/housing/addHousing", this.housingForm1).then((v) => {
        this.selectHousingList()
      })
    }, // 新增整租房源


    // 整租开始-----------------------------------

    addHousing() {
      this.axios.post("http://localhost:8848/housing/addHousing", this.housingForm).then((v) => {
        this.getHousingList()
      })
    }, // 新增整租房源

    getHousingList() {
      this.axios.get("http://localhost:8848/housing/getHousingList").then((v) => {
        this.housing = v.data.data
      })
    },//查询所有房源

    getFgOrientationList() {
      this.axios.get("http://localhost:8848/orientation/getFgOrientationList").then((v) => {
        this.tableOrientation = v.data.data
      })
    }, // 查询所有房间朝向

    getFgFitmentList() {
      this.axios.get("http://localhost:8848/fitment/getFgFitmentList").then((v) => {
        this.tableFitment = v.data.data
      })
    }, // 查询所有房间装修类型

    getFgNatureList() {
      this.axios.get("http://localhost:8848/nature/getFgNatureList").then((v) => {
        this.tableNature = v.data.data
      })
    }, // 查询所有房屋性质

    getFgFeatureList() {
      this.axios.get("http://localhost:8848/fgfeature/getFgFeatureList").then((v) => {
        this.tableFeature = v.data.data
      })
    }, // 查询所有房间特色

    dateformat(row, column) {
      const data = row[column.property]
      if (data == undefined) {
        return
      }
      return moment(data).format("yyyy-MM-DD HH:mm:ss")
    },

    //---------------------整租结束
    //按钮表单弹出
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },// 按钮表单弹窗


    handleClick(tab, event) {
      console.log(tab, event)
    }, // tabs 切换
  },
  created() {
    this.getFgOrientationList() // 预先加载房屋朝向
    this.getFgFitmentList() // 预先加载装修类型
    this.getFgNatureList() // 预先加载房屋性质数据
    this.getFgFeatureList() // 预先加载所有房间特色
    // 整租
    this.getHousingList() //预先加载所有房源
    // 合租
    this.selectHousingList()//页面

  }


}
</script>

<style lang="scss">

.span1 {
  margin-top: 200px;
}

.bigkuang {
  box-shadow: 3px 3px 3px 3px red;
  margin: 10px;
  height: 160px;
  border: 2px solid black;
  border-radius: 10px;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border: 2px black solid;
  height: 120px;
  margin: 10px;
  border-radius: 8px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}


.button {
  float: right;
  background: steelblue;
}

h3 {
  text-align: center;
  margin: 10px auto;
  border-bottom: 1px solid #ddd;
  margin: 10px 0px;
  padding-bottom: 10px;
}

.mrname {
  color: steelblue;
  font-size: 21px;
  margin-bottom: 30px;
  cursor: pointer;
}

.text {
  font-size: 14px;
}

.item {
  padding: 5px 0;
}

.item:after {
  content: '';
  display: block;
  clear: both;
}

.box-card {
  height: 200px;
  width: 18%;
  display: block;
  float: left;
  margin: 10px;
}

.max_box{
  padding: 10px;
  border-radius: 10%;
  margin-top: 20px;
  box-shadow: 5px 5px 5px #888888;
}
.minBox p{

}

.minBox{
  margin-top: 10px;
  color: #333333;
  box-shadow: 10px 10px 5px #888888;
  border-radius: 20%;

}
</style>
