<template>
  <el-main>

    <el-tabs v-model="activeName" @tab-click="handleClick">

      <!--   房间户型   -->
      <el-tab-pane label="房间户型" name="first">

        <!--  搜索新增板块  -->
        <el-form
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
            <el-button icon="el-icon-search">查询</el-button>
            <el-button style="color:#ff7670" icon="el-icon-close">重置</el-button>
            <el-button
                icon="el-icon-edit-outline"
                type="success"
                size="small"
                @click="dialogVisible=true"
            >新增
            </el-button>

          </el-form-item>

        </el-form>


        <!--   房间户型表格显示   -->
        <el-table
            style="width: 100%"
            :data="tableType.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border stripe
        >
          <el-table-column
              align="center"
              prop="typeName"
              label="名称">
          </el-table-column>

          <el-table-column
              align="center"
              prop="typeNum"
              label="排序值">
          </el-table-column>

          <el-table-column
              align="center"
              prop="typeRemark"
              label="描述">
          </el-table-column>


          <el-table-column align="center" label="操作" width="290px">

            <template #default="scope">
              <!--              addType(scope.row)-->
              <el-button
                  icon="el-icon-close"
                  type="primary"
                  size="small"
                  @click="editFgRoomType(scope.row)"
              >编辑
              </el-button>

              <el-button
                  icon="el-icon-close"
                  type="danger"
                  size="small"
                  @click="deleteFgRoomType(scope.row)"
              >删除
              </el-button>

            </template>

          </el-table-column>

        </el-table>

        <!--房间户型分页-->
        <div class="fy_div" style="margin-left: 280px">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableType.length">
          </el-pagination>
        </div>


        <!--   房间户型新增按钮表单   -->
        <el-dialog
            @close="clearType()"
            title="房间户型"
            v-model="dialogVisible"
            width="60%"
            :before-close="handleClose">

          <el-form status-icon ref="record" label-width="100px" class="demo-ruleForm">

            <el-row>

              <el-col :span="10">

                <el-form-item label="名称">
                  <el-input v-model="tableTypeForm.typeName"></el-input>
                </el-form-item>

              </el-col>

              <el-col :span="10">

                <el-form-item label="排序值">
                  <el-input v-model="tableTypeForm.typeNum"></el-input>
                </el-form-item>

              </el-col>

              <el-col :span="10">

                <el-form-item label="描述">
                  <el-input v-model="tableTypeForm.typeRemark"></el-input>
                </el-form-item>

              </el-col>

            </el-row>

          </el-form>

          <template #footer>

             <span class="dialog-footer">
                <el-button @click="clearType(),dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addFgRoomType(),dialogVisible = false">确 定</el-button>
             </span>

          </template>

        </el-dialog>

      </el-tab-pane>
      <!--   ----------------------房间结束----------------------------   -->

      <!--  装修类型   -->
      <el-tab-pane label="装修类型" name="second">

        <!--  搜索新增板块  -->
        <el-form
            :model="searchPrm1"
            ref="searchForm"
            label-width="80px"
            :inline="true"
            size="small"
        >
          <el-form-item>
            <el-input placeholder="请输入房型名称" v-model="searchPrm1.searchName"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button icon="el-icon-search">查询</el-button>
            <el-button style="color:#ff7670" icon="el-icon-close">重置</el-button>
            <el-button
                icon="el-icon-edit-outline"
                type="success"
                size="small"
                @click="dialogVisible1=true"
            >新增
            </el-button>

          </el-form-item>

        </el-form>

        <!--   装修类型表格显示   -->
        <el-table
            style="width: 100%"
            :data="tableFitment.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border stripe
        >
          <el-table-column
              align="center"
              prop="fitmentName"
              label="名称">
          </el-table-column>

          <el-table-column
              align="center"
              prop="fitmentNum"
              label="排序值">
          </el-table-column>

          <el-table-column
              align="center"
              prop="fitmentRemark"
              label="描述">
          </el-table-column>


          <el-table-column align="center" label="操作" width="290px">

            <template #default="scope">

              <el-button
                  icon="el-icon-close"
                  type="primary"
                  size="small"
                  @click="editFgFitment(scope.row)"
              >编辑
              </el-button>

              <el-button
                  icon="el-icon-close"
                  type="danger"
                  size="small"
                  @click="deleteFgFitment(scope.row)"
              >删除
              </el-button>

            </template>

          </el-table-column>

        </el-table>

        <!--装修类型分页-->
        <div class="fy_div" style="margin-left: 400px">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="FitmentPage.currentPage"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="FitmentPage.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableFitment.length">
          </el-pagination>
        </div>


        <!--   房间户型新增按钮表单   -->
        <el-dialog
            @close="clearFitment()"
            title="新增装修类型"
            v-model="dialogVisible1"
            width="60%"
            :before-close="handleClose">

          <el-form status-icon ref="record" label-width="100px" class="demo-ruleForm">

            <el-row>

              <el-col :span="10">

                <el-form-item label="名称">
                  <el-input v-model="tableFitmentForm.fitmentName"></el-input>
                </el-form-item>

              </el-col>

              <el-col :span="10">

                <el-form-item label="排序值">
                  <el-input v-model="tableFitmentForm.fitmentNum"></el-input>
                </el-form-item>

              </el-col>

              <el-col :span="10">

                <el-form-item label="描述">
                  <el-input v-model="tableFitmentForm.fitmentRemark"></el-input>
                </el-form-item>

              </el-col>

            </el-row>

          </el-form>

          <template #footer>

             <span class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="addFgFitment(),dialogVisible1 = false">确 定</el-button>
             </span>

          </template>

        </el-dialog>


      </el-tab-pane>
      <!--   ----------------------装修结束----------------------------   -->

      <!--  房屋性质   -->
      <el-tab-pane label="房屋性质" name="third">

        <!--  搜索新增板块  -->
        <el-form
            :model="searchPrm2"
            ref="searchForm"
            label-width="80px"
            :inline="true"
            size="small"
        >
          <el-form-item>
            <el-input placeholder="请输入房型名称" v-model="searchPrm2.searchName"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button icon="el-icon-search">查询</el-button>
            <el-button style="color:#ff7670" icon="el-icon-close">重置</el-button>
            <el-button
                icon="el-icon-edit-outline"
                type="success"
                size="small"
                @click="dialogVisible2=true"
            >新增
            </el-button>

          </el-form-item>

        </el-form>

        <!--   房屋性质表格显示   -->
        <el-table
            style="width: 100%"
            :data="tableNature.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border stripe
        >
          <el-table-column
              align="center"
              prop="natureName"
              label="名称">
          </el-table-column>

          <el-table-column
              align="center"
              prop="natureNum"
              label="排序值">
          </el-table-column>

          <el-table-column
              align="center"
              prop="natureRemark"
              label="描述">
          </el-table-column>


          <el-table-column align="center" label="操作" width="290px">

            <template #default="scope">

              <el-button
                  icon="el-icon-close"
                  type="primary"
                  size="small"
                  @click="editFgNature(scope.row)"
              >编辑
              </el-button>

              <el-button
                  icon="el-icon-close"
                  type="danger"
                  size="small"
                  @click="deleteFgNature(scope.row)"
              >删除
              </el-button>

            </template>

          </el-table-column>

        </el-table>

        <!--房屋性质分页-->
        <div class="fy_div" style="margin-left: 400px">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="naturePage.currentPage"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="naturePage.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableNature.length">
          </el-pagination>
        </div>

        <!--   房屋性质新增按钮表单   -->
        <el-dialog
            @close="clearNature()"
            title="新增装修类型"
            v-model="dialogVisible2"
            width="60%"
            :before-close="handleClose">

          <el-form status-icon ref="record" label-width="100px" class="demo-ruleForm">

            <el-row>

              <el-col :span="10">

                <el-form-item label="名称">
                  <el-input v-model="tableNatureForm.natureName"></el-input>
                </el-form-item>

              </el-col>

              <el-col :span="10">

                <el-form-item label="排序值">
                  <el-input v-model="tableNatureForm.natureNum"></el-input>
                </el-form-item>

              </el-col>

              <el-col :span="10">

                <el-form-item label="描述">
                  <el-input v-model="tableNatureForm.natureRemark"></el-input>
                </el-form-item>

              </el-col>

            </el-row>

          </el-form>

          <template #footer>

             <span class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="addFgNature(),dialogVisible2 = false">确 定</el-button>
             </span>

          </template>

        </el-dialog>

      </el-tab-pane>
      <!--   ----------------------性质结束----------------------------   -->

      <!--  房屋朝向   -->
      <el-tab-pane label="房屋朝向" name="fourth">

        <!--  搜索新增板块  -->
        <el-form
            :model="searchPrm3"
            ref="searchForm"
            label-width="80px"
            :inline="true"
            size="small"
        >
          <el-form-item>
            <el-input placeholder="请输入房型名称" v-model="searchPrm3.searchName"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button icon="el-icon-search">查询</el-button>
            <el-button style="color:#ff7670" icon="el-icon-close">重置</el-button>
            <el-button
                icon="el-icon-edit-outline"
                type="success"
                size="small"
                @click="dialogVisible3=true"
            >新增
            </el-button>

          </el-form-item>

        </el-form>

        <!--   房屋朝向表格显示   -->
        <el-table
            style="width: 100%"
            :data="tableOrientation.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border stripe
        >
          <el-table-column
              align="center"
              prop="orientationName"
              label="名称">
          </el-table-column>

          <el-table-column
              align="center"
              prop="orientationNum"
              label="排序值">
          </el-table-column>

          <el-table-column
              align="center"
              prop="orientationRemark"
              label="描述">
          </el-table-column>


          <el-table-column align="center" label="操作" width="290px">

            <template #default="scope">

              <el-button
                  icon="el-icon-close"
                  type="primary"
                  size="small"
                  @click="editOrientation(scope.row)"
              >编辑
              </el-button>

              <el-button
                  icon="el-icon-close"
                  type="danger"
                  size="small"
                  @click="deleteOrientation(scope.row)"
              >删除
              </el-button>

            </template>

          </el-table-column>

        </el-table>


        <!--房屋朝向分页-->
        <div class="fy_div" style="margin-left: 400px">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="orientationPage.currentPage"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="orientationPage.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableOrientation.length">
          </el-pagination>
        </div>


        <!--   房屋朝向新增按钮表单   -->
        <el-dialog
            @close="clearOrientation()"
            title="新增装修类型"
            v-model="dialogVisible3"
            width="60%"
            :before-close="handleClose">

          <el-form status-icon ref="record" label-width="100px" class="demo-ruleForm">

            <el-row>

              <el-col :span="10">

                <el-form-item label="名称">
                  <el-input v-model="tableOrientationForm.orientationName"></el-input>
                </el-form-item>

              </el-col>

              <el-col :span="10">

                <el-form-item label="排序值">
                  <el-input v-model="tableOrientationForm.orientationNum"></el-input>
                </el-form-item>

              </el-col>

              <el-col :span="10">

                <el-form-item label="描述">
                  <el-input v-model="tableOrientationForm.orientationRemark"></el-input>
                </el-form-item>

              </el-col>

            </el-row>

          </el-form>

          <template #footer>

             <span class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="addOrientation(),dialogVisible3 = false">确 定</el-button>
             </span>

          </template>

        </el-dialog>

      </el-tab-pane>
      <!--   ----------------------朝向结束----------------------------   -->

      <!--  房屋特色   -->
      <el-tab-pane label="房屋特色" name="five">

        <!--  搜索新增板块  -->
        <el-form
            :model="searchPrm3"
            ref="searchForm"
            label-width="80px"
            :inline="true"
            size="small"
        >
          <el-form-item>
            <el-input placeholder="请输入房型名称" v-model="searchPrm3.searchName"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button icon="el-icon-search">查询</el-button>
            <el-button style="color:#ff7670" icon="el-icon-close">重置</el-button>
            <el-button
                icon="el-icon-edit-outline"
                type="success"
                size="small"
                @click="dialogVisible4=true"
            >新增
            </el-button>

          </el-form-item>

        </el-form>

        <!--   房屋特色表格显示   -->
        <el-table
            style="width: 100%"
            :data="tableFeature.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border stripe
        >
          <el-table-column
              align="center"
              prop="featureName"
              label="名称">
          </el-table-column>

          <el-table-column
              align="center"
              prop="featureNum"
              label="排序值">
          </el-table-column>

          <el-table-column
              align="center"
              prop="featureRemark"
              label="描述">
          </el-table-column>


          <el-table-column align="center" label="操作" width="290px">

            <template #default="scope">

              <el-button
                  icon="el-icon-close"
                  type="primary"
                  size="small"
                  @click="editFgFeature(scope.row)"
              >编辑
              </el-button>

              <el-button
                  icon="el-icon-close"
                  type="danger"
                  size="small"
                  @click="deleteFgFeture(scope.row)"
              >删除
              </el-button>

            </template>

          </el-table-column>

        </el-table>


        <!--房屋特色分页-->
        <div class="fy_div" style="margin-left: 400px">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="featurePage.currentPage"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="featurePage.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableFeature.length">
          </el-pagination>
        </div>


        <!--   房屋特色新增按钮表单   -->
        <el-dialog
            @close="clearFeature()"
            title="新增装修类型"
            v-model="dialogVisible4"
            width="60%"
            :before-close="handleClose">

          <el-form status-icon ref="record" label-width="100px" class="demo-ruleForm">

            <el-row>

              <el-col :span="10">

                <el-form-item label="名称">
                  <el-input v-model="tableFeatureForm.featureName"></el-input>
                </el-form-item>

              </el-col>

              <el-col :span="10">

                <el-form-item label="排序值">
                  <el-input v-model="tableFeatureForm.featureNum"></el-input>
                </el-form-item>

              </el-col>

              <el-col :span="10">

                <el-form-item label="描述">
                  <el-input v-model="tableFeatureForm.featureRemark"></el-input>
                </el-form-item>

              </el-col>

            </el-row>

          </el-form>

          <template #footer>

             <span class="dialog-footer">
                <el-button @click="dialogVisible4 = false">取 消</el-button>
                <el-button type="primary" @click="addFgFeature(),dialogVisible4 = false">确 定</el-button>
             </span>

          </template>

        </el-dialog>

      </el-tab-pane>
      <!--   ----------------------特色结束----------------------------   -->

    </el-tabs>


  </el-main>
</template>

<script>



export default {

  name: "pipe",

  data() {
    return {

      searchPrm: {
        searchName: ''
      }, // 房间户型名称模糊查询

      tableType: [], // 房间户型数据域

      tableTypeForm: {
        typeId: '',
        typeName: '',
        typeNum: '',
        typeRemark: ''
      }, // 清空房间户型or新增form表单,数据域

      dialogVisible: false, // 房间户型 弹窗

      currentPage: 1, //初始页
      pageSize: 5,    //    每页的数据

      // 房间结束-------------

      searchPrm1: {
        searchName1: ''
      }, // 装修名称模糊查询

      tableFitment: [], //装修数据域

      tableFitmentForm: {
        fitmentId: '',
        fitmentName: '',
        fitmentNum: '',
        fitmentRemark: ''
      }, // 清空装修类型or新增form表单,数据域

      dialogVisible1: false, // 装修类型 弹窗

      FitmentPage: {
        currentPage: 1,
        pageSize: 5,
      }, // 装修类型 分页

      // 装修结束------------


      searchPrm2: {
        searchName2: ''
      }, // 房屋性质模糊查询

      tableNature: [], //房屋性质数据域

      tableNatureForm: {
        natureId: '',
        natureName: '',
        natureNum: '',
        natureRemark: ''
      }, // 清空房屋性质or新增form表单,数据域

      dialogVisible2: false, // 房屋性质 弹窗

      naturePage: {
        currentPage: 1,
        pageSize: 5,
      }, // 房屋性质 分页

      // 房屋性质结束-----------


      searchPrm3: {
        searchName3: ''
      }, // 房间朝向模糊查询

      tableOrientation: [], //房间朝向数据域

      tableOrientationForm: {
        orientationId: '',
        orientationName: '',
        orientationNum: '',
        orientationRemark: ''
      }, // 清空房屋朝向or新增form表单,数据域

      dialogVisible3: false, // 房屋朝向 弹窗

      orientationPage: {
        currentPage: 1,
        pageSize: 5,
      }, // 房间朝向 分页

      // 房屋朝向结束---------------

      searchPrm4: {
        searchName4: ''
      }, // 房间特色模糊查询

      tableFeature: [], //房间特色数据域

      tableFeatureForm: {
        featureId: '',
        featureName: '',
        featureNum: '',
        featureRemark: ''
      }, // 清空房屋特色or新增form表单,数据域

      dialogVisible4: false, // 房屋特色 弹窗

      featurePage: {
        currentPage: 1,
        pageSize: 5,
      }, // 房间特色 分页

      // 房屋特色结束-----------

      activeName: 'first',// tabs 切换,默认 first


    }
  },
  methods: {

    getFgRoomTypeList() {
      this.axios.get("http://localhost:8848/roomtype/getFgRoomTypeList").then((v) => {
        console.log("1111111",v)
        this.tableType = v.data
        console.log("123456789",this.tableType)
      })
    }, // 查询所有房间户型

    addFgRoomType() {
      this.axios.post("http://localhost:8848/roomtype/addFgRoomType", this.tableTypeForm).then((v) => {
        this.getFgRoomTypeList()
      })
    }, // 新增房间户型

    editFgRoomType(row) {
      this.dialogVisible = true
      this.tableTypeForm.typeId = row.typeId
      this.tableTypeForm.typeName = row.typeName
      this.tableTypeForm.typeNum = row.typeNum
      this.tableTypeForm.typeRemark = row.typeRemark
    },// 房间户型编辑回显

    deleteFgRoomType(row) {
      console.log(row.id, "3333333333")
      let parm = {
        typeId: row.id
      }

      console.log("wwwwwwwwwww", parm)
      // this.tableType.typeId = row.id
      this.axios.delete("http://localhost:8848/roomtype/deleteFgRoomType", parm).then((v) => {
        this.getFgRoomTypeList()
      })
    },//根据当前行id进行删除

    clearType() {
      this.dialogVisible = false;
      this.tableTypeForm.typeName = "";
      this.tableTypeForm.typeNum = "";
      this.tableTypeForm.typeRemark = "";
    }, //清空房间类型表单数据

    // 房间户型--方法功能结束----------------


    getFgFitmentList() {
      this.axios.get("http://localhost:8848/fitment/getFgFitmentList").then((v) => {
        this.tableFitment = v.data.data
      })
    }, // 查询所有房间装修类型

    addFgFitment() {
      this.axios.post("http://localhost:8848/fitment/addFgFitment", this.tableFitmentForm).then((v) => {
        this.getFgFitmentList()
      })
    }, // 新增装修类型

    editFgFitment(row) {
      this.dialogVisible1 = true
      this.tableFitmentForm.fitmentId = row.fitmentId;
      this.tableFitmentForm.fitmentName = row.fitmentName;
      this.tableFitmentForm.fitmentNum = row.fitmentNum;
      this.tableFitmentForm.fitmentRemark = row.fitmentRemark;
    },// 编辑装修类型

    deleteFgFitment(row) {
      // console.log(row.id,"3333333333")
      // let parm = {
      //   typeId:row.id
      // }
      //
      // console.log("wwwwwwwwwww",parm)
      // // this.tableType.typeId = row.id
      // this.axios.delete("http://localhost:8848/roomtype/deleteFgRoomType",parm).then((v) => {
      //   this.getFgRoomTypeList()
      // })
    },//根据当前行id进行删除

    clearFitment() {
      this.dialogVisible1 = false;
      this.tableFitmentForm.fitmentId = "";
      this.tableFitmentForm.fitmentName = "";
      this.tableFitmentForm.fitmentNum = "";
      this.tableFitmentForm.fitmentRemark = "";

    }, // 清空装修类型表单数据

    // 房间装修类型--结束---------------------


    getFgNatureList() {
      this.axios.get("http://localhost:8848/nature/getFgNatureList").then((v) => {
        this.tableNature = v.data.data
      })
    }, // 查询所有房屋性质

    addFgNature() {
      this.axios.post("http://localhost:8848/nature/addFgNature", this.tableNatureForm).then((v) => {
        this.getFgNatureList()
      })
    }, // 新增房屋性质

    editFgNature(row) {
      this.dialogVisible2 = true
      this.tableNatureForm.natureId = row.natureId;
      this.tableNatureForm.natureName = row.natureName;
      this.tableNatureForm.natureNum = row.natureNum;
      this.tableNatureForm.natureRemark = row.natureRemark;
    },// 编辑房屋性质

    deleteFgNature(row) {
      // console.log(row.id,"3333333333")
      // let parm = {
      //   typeId:row.id
      // }
      //
      // console.log("wwwwwwwwwww",parm)
      // // this.tableType.typeId = row.id
      // this.axios.delete("http://localhost:8848/roomtype/deleteFgRoomType",parm).then((v) => {
      //   this.getFgRoomTypeList()
      // })
    },//根据当前行id进行删除

    clearNature() {
      this.dialogVisible2 = false
      this.tableNatureForm.natureId = "";
      this.tableNatureForm.natureName = "";
      this.tableNatureForm.natureNum = "";
      this.tableNatureForm.natureRemark = "";
    }, // 清空房屋性质表单数据

    // 房屋性质---结束-----------------------


    getFgOrientationList() {
      this.axios.get("http://localhost:8848/orientation/getFgOrientationList").then((v) => {
        this.tableOrientation = v.data.data
        console.log(this.tableOrientation, "22222233333333333333")
      })
    }, // 查询所有房间朝向

    addOrientation() {
      this.axios.post("http://localhost:8848/orientation/addOrientation", this.tableOrientationForm).then((v) => {
        this.getFgOrientationList()
      })
    }, // 新增房屋朝向

    editOrientation(row) {
      this.dialogVisible3 = true
      this.tableOrientationForm.orientationId = row.orientationId;
      this.tableOrientationForm.orientationName = row.orientationName;
      this.tableOrientationForm.orientationNum = row.orientationNum;
      this.tableOrientationForm.orientationRemark = row.orientationRemark;
    },// 编辑房屋朝向

    deleteOrientation(row) {
      // console.log(row.id,"3333333333")
      // let parm = {
      //   typeId:row.id
      // }
      //
      // console.log("wwwwwwwwwww",parm)
      // // this.tableType.typeId = row.id
      // this.axios.delete("http://localhost:8848/roomtype/deleteFgRoomType",parm).then((v) => {
      //   this.getFgRoomTypeList()
      // })
    },//根据当前行id进行删除

    clearOrientation() {
      this.dialogVisible3 = false
      this.tableOrientationForm.orientationId = '';
      this.tableOrientationForm.orientationName = '';
      this.tableOrientationForm.orientationNum = '';
      this.tableOrientationForm.orientationRemark = '';
    }, // 清空房屋朝向表单数据

    // 房屋朝向模块---结束-----------------------


    getFgFeatureList() {
      this.axios.get("http://localhost:8848/fgfeature/getFgFeatureList").then((v) => {
        this.tableFeature = v.data.data
      })
    }, // 查询所有房间特色

    addFgFeature() {
      this.axios.post("http://localhost:8848/fgfeature/addFgFeature", this.tableFeatureForm).then((v) => {
        this.getFgFeatureList()
      })
    }, // 新增房屋特色

    editFgFeature(row) {
      this.dialogVisible3 = true
      this.tableFeatureForm.featureId = row.featureId;
      this.tableFeatureForm.featureName = row.featureName;
      this.tableFeatureForm.featureNum = row.featureNum;
      this.tableFeatureForm.featureRemark = row.featureRemark
    },// 编辑房屋特色

    deleteFgFeture(row) {
      // console.log(row.id,"3333333333")
      // let parm = {
      //   typeId:row.id
      // }
      //
      // console.log("wwwwwwwwwww",parm)
      // // this.tableType.typeId = row.id
      // this.axios.delete("http://localhost:8848/roomtype/deleteFgRoomType",parm).then((v) => {
      //   this.getFgRoomTypeList()
      // })
    },//根据当前行id进行删除

    clearFeature() {
      this.dialogVisible4 = false
      this.tableFeatureForm.featureId = '';
      this.tableFeatureForm.featureName = '';
      this.tableFeatureForm.featureNum = '';
      this.tableFeatureForm.featureRemark = '';
    }, // 清空房屋特色表单数据

    //房屋特色-------结束-------------------------

    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pageSize = size;
      console.log(this.pageSize)  //每页下拉显示数据
    },


    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },

    //按钮表单弹出
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },

    // tabs 切换
    handleClick(tab, event) {
      console.log(tab, event)
    },

  },

  created() {
    this.getFgRoomTypeList() // 预先加载房间户型数据
    this.getFgFitmentList() // 预先加载装修类型
    this.getFgNatureList() // 预先加载房屋性质数据
    this.getFgOrientationList() // 预先加载房屋朝向
    this.getFgFeatureList() // 预先加载所有房间特色
  }

}
</script>

<style scoped>

/*分页样式*/
.fy_div {
  margin-top: 20px;
  margin-left: -30px;
}
</style>
